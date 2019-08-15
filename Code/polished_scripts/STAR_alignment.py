"""<h3>Methods for running RNA alignment with STAR, including index generation.</h3>

See <a href="http://labshare.cshl.edu/shares/gingeraslab/www-data/dobin/STAR/STAR.posix/doc/STARmanual.pdf"><u>here</u></a>
for resources on STAR (especially helpful was section 2.2 for determining which `.GFF` files are compatible).

<strong>NB:</strong> Annotations used for alignment were from <a href="https://www.gencodegenes.org/human/"><u>GENCODE</u></a>, 
which uses the UCSC convention labelling chromosomes like "chr1".

The default index used by this script can be found at: 
`/n/data1/hms/dbmi/park/lawrence/bin/RNA_Seq/STAR_INDEX_GRCh38_GENCODE_annotations`.

This index was generated using the reference genome from: 
`/n/data1/hms/dbmi/park/lawrence/reference_data/GRCh38.primary_assembly.genome_gencode.fa` 
and the annotations file here: `/n/data1/hms/dbmi/park/lawrence/reference_data/gencode.v31.annotation.gff3`.

The full command to generate the STAR index was as follows:

```
module load gcc/6.2.0 star/2.7.0f.lua
STAR --runMode genomeGenerate \
\n    --runThreadN 16 \
\n    --genomeDir /n/data1/hms/dbmi/park/lawrence/bin/RNA_Seq/STAR_INDEX_GRCh38_GENCODE_annotations \
\n    --genomeFastaFiles /n/data1/hms/dbmi/park/lawrence/reference_data/GRCh38.primary_assembly.genome_gencode.fa \
\n    --sjdbGTFfile /n/data1/hms/dbmi/park/lawrence/reference_data/gencode.v31.annotation.gff3 \
\n    --sjdbOverhang 100 \
\n    --sjdbGTFtagExonParentTranscript Parent
```
"""

import os
import glob
import argparse
import re

from .helpers import _split_all_ext, _handle_directory_cleaning

# CONSTANTS
ACCESSION_REGEX = re.compile("(SRR[0-9]+)")
INPUT_EXTENSION_REGEX = "*.fastq*"
    
def parse_args():
    """Uses argparse to enable user to customize script functionality, returns a dictionary object."""
    
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("-input_dir", "--input_directory", default=None, help="Files with SRA Accessions to download, one accession per line")
    parser.add_argument("-index_dir", "--index_directory", default="/n/data1/hms/dbmi/park/lawrence/bin/RNA_Seq/STAR_INDEX_GRCh38_GENCODE_annotations/", help="Optional directory with STAR indices, otherwise will use existing")
    parser.add_argument("-out", "--output_directory", default="./", help="Output directory for aligned reads")
    parser.add_argument("-n", "--num_cores", default="16", help="slurm job submission option")
    parser.add_argument("-t", "--runtime", default="0-2:00:00", help="slurm job submission option")
    parser.add_argument("-p", "--queue", default="park", help="slurm job submission option")
    parser.add_argument("--mem_per_cpu", default="50G", help="slurm job submission option, NB: the filtering step requires a lot of memory because the mapper razers3 loads all the reads into memory")
    parser.add_argument("--mail_type", default="ALL", help="slurm job submission option")
    # parser.add_argument("--mail_user", default="alon_galor@hms.harvard.edu", help="slurm job submission option")
    parser.add_argument("--mail_user", default="lawrence_huang1@brown.edu", help="slurm job submission option")
    return vars(parser.parse_args())

def clean_arg_paths(args_dict):
    """Replaces '.' in paths, modifying args_dict."""
    
    # replaces paths starting with "." for input/output directory
    input_dir = args_dict["input_directory"]
    output_dir = args_dict["output_directory"]
    index_dir = args_dict["index_directory"]
    if input_dir is not None:
        args_dict["input_directory"] = _handle_directory_cleaning(input_dir)
    if index_dir is not None:
        args_dict["index_directory"] = _handle_directory_cleaning(index_dir)
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

    return slurm_command

def get_input_files(input_dir):
    """Returns list of input FASTQ's from input directory."""
    return [input_file for input_file in glob.glob(os.path.join(input_dir, INPUT_EXTENSION_REGEX))]

def run_alignment(slurm_command, input_files, index_dir, output_dir, numThreads):
    """Creates and submits alignment scripts."""
    os.makedirs(os.path.join(output_dir, ".sh"), exist_ok=True)
    for input_file in input_files:
        # search for accession in file name
        run_name_match = ACCESSION_REGEX.search(os.path.basename(input_file))
        if run_name_match:
            run_name = run_name_match.group(1)
            main_command = f"module load gcc/6.2.0 star/2.7.0f; STAR --genomeDir {index_dir} " + \
            f"--runThreadN {numThreads} --readFilesIn {input_file} --outFileNamePrefix {run_name}"
            
            script_name = os.path.join(output_dir, ".sh", run_name + "_STAR_align.sh")
            with open(script_name, "w+") as fp:
                fp.write(slurm_command + main_command)
            os.system("chmod u+x " + script_name)
            os.system("sbatch " + script_name)

if __name__ == "__main__":
    args_dict = parse_args()
    clean_arg_paths(args_dict)
    
    input_dir = args_dict["input_directory"]
    index_dir = args_dict["index_directory"]
    output_dir = args_dict["output_directory"]
    
    if input_dir is not None: 
        slurm_command = return_slurm_command(args_dict)
        input_files = get_input_files(input_dir)
        
        run_alignment(slurm_command, input_files, index_dir, output_dir, args_dict["num_cores"])
    else:
        print("No input directory specified.")