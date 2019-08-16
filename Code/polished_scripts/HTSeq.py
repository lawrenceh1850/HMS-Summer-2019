"""
<h3>Runs HTSeq read counts script.</h3>

Utilizes the HTSeq conda environment from `/home/ag457/anaconda3/envs/HTSeq`. 
Check to see if you have replicates before you get to this step, might want to merge at the BAM level instead of dealing with merging the HTSeq counts output.

See HTSeq developer reference <a href="https://htseq.readthedocs.io/en/release_0.11.1/count.html"><u>here</u></a> 
for details on options.

See <a href="https://docs.gdc.cancer.gov/Data/Bioinformatics_Pipelines/Expression_mRNA_Pipeline/#mrna-quantification-command-line-parameters"><u>here</u></a> 
for suggested TCGA settings. The file `/n/data1/hms/dbmi/park/lawrence/reference_data/gencode.v31.annotation.gff3` is required for annotations.
"""

import os
import glob
import argparse
import re

from helpers import _split_all_ext, _handle_directory_cleaning

# CONSTANTS
INPUT_EXTENSION_REGEX = "*.sam"

def parse_args():
    """Uses argparse to enable user to customize script functionality, returns a dictionary object."""
    
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("-in_dir", "--input_directory", default=None, help="Directory with aligned RNA reads (expecting SAM's)")
    parser.add_argument("-out", "--output_directory", default="./", help="Optional output directory, default is current directory")
    parser.add_argument("-gff", "--annotations_gff", default="/n/data1/hms/dbmi/park/lawrence/reference_data/gencode.v31.annotation.gff3", help="Annotations file to be used for gene names in expression output, default is for hg38")
    
    # HTSeq specific options: see https://htseq.readthedocs.io/en/release_0.11.1/count.html
    parser.add_argument("-i", "--id_attribute", default="gene_id", help="Attribute in GTF column that is used to identify the counts")
    parser.add_argument("-r", "--sort_order", default="name", help="Ordering of the reads in the input data")
    parser.add_argument("-s", "--stranded", default="no", help="Indicates whether reads are from a stranded library")
    parser.add_argument("-m", "--mode", default="intersection-nonempty", help="Indicates how overlapping reads are assigned")
    
    parser.add_argument("-n", "--num_cores", default="5", help="slurm job submission option")
    parser.add_argument("-t", "--runtime", default="0-2:00:00", help="slurm job submission option, NB: runtimes are relatively short for this")
    parser.add_argument("-p", "--queue", default="park", help="slurm job submission option")
    parser.add_argument("--mem_per_cpu", default="20G", help="slurm job submission option, NB: the filtering step requires a lot of memory because the mapper razers3 loads all the reads into memory")
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
    "source activate /home/ag457/anaconda3/envs/HTSeq\n"

    return slurm_command

def return_primary_command(input_file, output_file, args_dict):
    """Returns command to run HTSeq"""
    
    primary_command = "htseq-count -m {mode} -i {id_attribute} -r {sort_order} -s {stranded} {input_file} {GFF_file} > {output_file}".format(mode=args_dict["mode"], id_attribute=args_dict["id_attribute"], sort_order=args_dict["sort_order"], stranded=args_dict["stranded"], input_file=input_file, GFF_file=args_dict["annotations_gff"], output_file=output_file)
    return primary_command
    
def make_HTSeq_sh(input_dir, output_dir, slurm_command, args_dict):
    """Creates and submits HTSeq scripts."""

    scripts_dir = os.path.join(output_dir, ".HTSeq_sh")
    os.makedirs(scripts_dir, exist_ok=True)
    
    for file_name in glob.glob(os.path.join(input_dir, INPUT_EXTENSION_REGEX)):
        base_name = os.path.basename(_split_all_ext(file_name)[0])
        primary_command = return_primary_command(file_name, os.path.join(output_dir, base_name + "_HTSeq_results.txt"), args_dict)
        
        script_name = os.path.join(scripts_dir, base_name+"_HTSeq.sh")
        print(script_name)
        with open(script_name, "w") as fp:
            fp.write(slurm_command + primary_command)
        os.chmod(script_name, 0o777)
        os.system("sbatch " + script_name)
    
if __name__ == "__main__":
    args_dict = parse_args()
    clean_arg_paths(args_dict)
    
    input_dir = args_dict["input_directory"]
    output_dir = args_dict["output_directory"]
    
    if input_dir is not None: 
        slurm_command = return_slurm_command(args_dict)
        make_HTSeq_sh(input_dir, output_dir, slurm_command, args_dict)
    else:
        print("No input directory specified.")