"""
<h3>Determines HLA Class I alleles from <strong><u>paired end</u></strong> 
FASTQ's using the Optitype tool.</h3>

Meant to be run as a command line script. Run with `--help` flag for options. 
Assumes that input FASTQs have the format SRR{accession}_{#} where {#} is 
either 1 or 2, indicating the paired read.

Each FASTQ undergoes two stages of processing:

1. Filtering of reads that map to the HLA regions (this step is technically 
optional but enables faster reprocessing if `optitype` needs to be run again)

2. Determination of HLA class I alleles from the filtered reads

<strong>NB: paired reads are filtered and HLA typed separately. A script 
downstream in the pipeline will handle the pairing together of paired reads.</strong>

<strong>NB:</strong> Requires installation of the `optitype` `conda` environment
(see <a href="https://bioconda.github.io/recipes/optitype/README.html"><u>link</u></a>).

Original Github documentation <a href="https://github.com/FRED-2/OptiType">
<u>here</u></a> (contains explanation of filtering step, specific dependencies, 
etc.). It's also possible to install from source, but the `conda` environment is
one simple command to install (some of the dependencies were slightly different 
between the original Optitype directions and what was in the `conda` install but
this did not affect functionality).
"""

import os
import glob
import argparse
import re

from helpers import _split_all_ext, _handle_directory_cleaning

# CONSTANTS
OPTITYPE_CONFIG_PATH = "/n/data1/hms/dbmi/park/alon/command_line_tools/Optitype/config.ini"
PAIRED_END_ACCESSION = re.compile("(SRR[0-9]+)_([0-9]{1})")
INPUT_EXTENSION_REGEX = "*.fastq*"

# Pipeline methods
def generate_paired_reads_dict(input_dir):
    """Associates paths of paired end reads together by accession, returns a dictionary of paths"""
    paired_reads_path_dict = {}
    acc_to_paths_dict = {}
    
    for file_path in glob.glob(os.path.join(input_dir, INPUT_EXTENSION_REGEX)):
        accession_match = PAIRED_END_ACCESSION.search(file_path)
        
        read_num = None
        if accession_match:
            accession = accession_match.group(1)
            read_num = int(accession_match.group(2))
        
            # each accession should point to two file paths in the list, 
            # indicating paired reads one and two
            if accession not in acc_to_paths_dict:
                acc_to_paths_dict[accession] = [None, None]
            acc_to_paths_dict[accession][read_num-1] = file_path
            
    for accession in acc_to_paths_dict:
        collected_paths = acc_to_paths_dict[accession]
        if None not in collected_paths:
            paired_reads_path_dict[collected_paths[0]] = collected_paths[1]
    
    return paired_reads_path_dict

def parse_args():
    """Uses argparse to enable user to customize script functionality, returns a dictionary object."""
    
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("-in_dir", "--input_directory", default=None, help="Files with SRA Accessions to download, one accession per line")
    parser.add_argument("-out", "--output_directory", default="./", help="Optional output directory, default is current directory")
    parser.add_argument("-n", "--num_cores", default="16", help="slurm job submission option")
    parser.add_argument("-t", "--runtime", default="0-1:15:00", help="slurm job submission option")
    parser.add_argument("-p", "--queue", default="park", help="slurm job submission option")
    parser.add_argument("--mem_per_cpu", default="80G", help="slurm job submission option, NB: the filtering step requires a lot of memory because the mapper razers3 loads all the reads into memory")
    parser.add_argument("--mail_type", default="ALL", help="slurm job submission option")
    parser.add_argument("--mail_user", default="alon_galor@hms.harvard.edu", help="slurm job submission option")
    return vars(parser.parse_args())

def clean_arg_paths(args_dict):
    """Replaces '.' in paths, modifying args_dict."""
    
    # replaces paths starting with "." for input/output directory
    input_dir = args_dict["input_directory"]
    output_dir = args_dict["output_directory"]
    if input_dir is not None:
        args_dict["input_directory"] = _handle_directory_cleaning(input_dir)
    if output_dir is not None:
        args_dict["output_directory"] = _handle_directory_cleaning(output_dir)

def return_slurm_command(args_dict):
    """Returns slurm command given args_dict provided as string."""
    
    slurm_command = "#!/bin/bash\n" + \
                "#SBATCH -n " + args_dict["num_cores"] + "\n" + \
                "#SBATCH -t " + args_dict["runtime"] + "\n" + \
                "#SBATCH -p " + args_dict["queue"] + "\n" + \
                "#SBATCH --mem-per-cpu=" + args_dict["mem_per_cpu"] + "\n" + \
                "#SBATCH --mail-type=" + args_dict["mail_type"] + "\n" + \
                "#SBATCH --mail-user=" + args_dict["mail_user"] + "\n"
    if args_dict["queue"] in ["park", "priopark"]:
        slurm_command += "#SBATCH --account=park_contrib" + "\n"
    slurm_command += "module load conda2/4.2.13.lua\n" + \
    "source activate /home/ag457/anaconda3/envs/optitype\n"

    return slurm_command

def return_filter_command(output_dir, input_file):
    """
    Returns command to filters HLA reads into an intermediate directory contained in the output directory for faster repeated optitype runs.
    
    See `optitype` Github for explanation of this step. The filtered files are appended with `_fished.{original extension of input_file}`.
    """
    output_base_name = os.path.join(output_dir, _split_all_ext(os.path.basename(input_file))[0])
    input_extension = _split_all_ext(os.path.basename(input_file))[1]
    
    filter_command = "echo \"Starting razers3 for file {base_name} at $(date +\"%T\")\"\n" + \
    "razers3 -i 95 -m 1 -dr 0 -o {base_name}_fished.bam /n/data1/hms/dbmi/park/alon/command_line_tools/Optitype/data/hla_reference_dna.fasta {input_file}\n" + \
    "echo \"Finished razers3 for file {base_name}, starting bam2fq at $(date +\"%T\")\"\n" + \
    "samtools bam2fq {base_name}_fished.bam > {base_name}_fished{input_extension}\n" + \
    "rm {base_name}_fished.bam\n" + \
    "echo \"Finished filtering for file {base_name} at $(date +\"%T\")\"\n"
    filter_command = filter_command.format(base_name=output_base_name, input_file=input_file, input_extension=input_extension)
    
    filtered_output_path = "{base_name}_fished{input_extension}".format(base_name=output_base_name, input_extension=input_extension)
    return (filter_command, filtered_output_path)

def return_optitype_command(input_fished_file_1, input_fished_file_2, optitype_out_dir):
    """Returns command to run optitype on filtered HLA paired reads file."""
    
    optitype_command = "python /home/ag457/anaconda3/envs/optitype/bin/OptiTypePipeline.py -i {input_fished_file_1} {input_fished_file_2} --dna -c {CONFIG} --verbose --outdir {out_dir}\n".format(input_fished_file_1=input_fished_file_1, input_fished_file_2=input_fished_file_2, CONFIG=OPTITYPE_CONFIG_PATH, out_dir=optitype_out_dir)
    
    return optitype_command

def make_optitype_sh(output_dir, complete_command, input_accession):
    """Generates shell script for given paired reads and submits to O2"""
    SCRIPTS_DIR = os.path.join(output_dir, ".optitype_sh")
    os.makedirs(SCRIPTS_DIR, exist_ok = True)
    script_path = os.path.join(SCRIPTS_DIR, input_accession + "_optitype.sh")
    
    with open(script_path, "w") as fp:
        fp.write(complete_command)
    # change permissions and submit to O2
    os.chmod(script_path, 0o700)
    os.system("sbatch " + script_path)

def run_filter_optitype(paired_reads_path_dict, slurm_command, output_dir):
    """Driver method to process all paired reads specified in the dictionary"""
    filtered_read_dir = os.path.join(output_dir, ".HLA_FILTERED")
    os.makedirs(filtered_read_dir, exist_ok=True)
    
    for read_1_path in paired_reads_path_dict:
        read_2_path = paired_reads_path_dict[read_1_path]
        
        # generate filter commands for each paired read, which need to run
        # before HLA typing
        (filter_command_1, filtered_read_1_path) = return_filter_command(filtered_read_dir, read_1_path)
        (filter_command_2, filtered_read_2_path) = return_filter_command(filtered_read_dir, read_2_path)
        
        # create output directory by accession because the output of optitype
        # is a timestamped folder that loses accession information
        accession = PAIRED_END_ACCESSION.search(os.path.basename(read_1_path)).group(1)
        final_HLA_types_dir = os.path.join(output_dir, ".HLA", accession)
        os.makedirs(final_HLA_types_dir, exist_ok=True)
        optitype_command = return_optitype_command(filtered_read_1_path, filtered_read_2_path, final_HLA_types_dir)
        
        complete_command = slurm_command + filter_command_1 + filter_command_2 + optitype_command
        make_optitype_sh(output_dir, complete_command, accession)
        

if __name__ == "__main__":
    args_dict = parse_args()
    clean_arg_paths(args_dict)
    
    input_dir = args_dict["input_directory"]
    output_dir = args_dict["output_directory"]
    
    if input_dir is not None: 
        slurm_command = return_slurm_command(args_dict)
        paired_reads_path_dict = generate_paired_reads_dict(input_dir)
        run_filter_optitype(paired_reads_path_dict, slurm_command, output_dir)
    else:
        print("No input directory specified.")