"""<h3>Download FASTQ's given either a specific accession or a .txt file with an accession on each line.</h3>

Meant to be run as a command line script. Run with `--help` flag for options."""

import os
import glob
import argparse

def parse_args():
    """Uses argparse to enable user to customize script functionality, returns a dictionary object."""
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("-acc", "--SRA_accession", default=None, help="SRA Accession to download")
    parser.add_argument("-in_file", "--input_file", default=None, help="Files with SRA Accessions to download, one accession per line")
    parser.add_argument("-split", "--split_mode", default="--split-3", help="Option to split output files, see `fastq-dump --help` for more options`")
    parser.add_argument("--gzip", action="store_true", help="Will keep downloaded FASTQ's gzipped if present")
    parser.add_argument("-out", "--output_dir", default="./", help="Optional output directory, default is current directory")
    parser.add_argument("-n", "--num_cores", default="1", help="slurm job submission option")
    parser.add_argument("-t", "--runtime", default="0-5:00:00", help="slurm job submission option")
    parser.add_argument("-p", "--queue", default="park", help="slurm job submission option")
    parser.add_argument("--mem_per_cpu", default="10G", help="slurm job submission option")
    parser.add_argument("--mail_type", default="ALL", help="slurm job submission option")
    parser.add_argument("--mail_user", default="alon_galor@hms.harvard.edu", help="slurm job submission option")
    return vars(parser.parse_args())

def clean_arg_paths(args_dict):
    """Replaces '.' in paths, modifying input dictionary."""
    # replace path starting with "./" for input file
    if args_dict["input_file"] is not None and args_dict["input_file"].startswith("." + os.sep): 
        args_dict["input_file"] = os.path.join(os.getcwd(), args_dict["input_file"][2:])
    
    # replaces paths starting with "." for output directory
    output_dir = args_dict["output_dir"]
    if output_dir is not None:
        if output_dir.startswith("."): 
            split_output = output_dir.split(os.sep)
            if len(split_output) > 1:
                split_output = split_output[1:]
            split_output = os.sep.join(split_output)
            args_dict["output_dir"] = os.path.join(os.getcwd(), split_output)

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

def return_primary_command(args_dict, accession):
    """Returns primary command to be executed as string."""
    primary_command = "module load sratoolkit\n" + \
                    "fastq-dump {}".format(args_dict["split_mode"])
    if args_dict["output_dir"] is not None:
        primary_command += " --outdir {}".format(args_dict["output_dir"])
    if args_dict["gzip"]:
        primary_command += " --gzip"
    primary_command += " " + accession
    return primary_command

def make_download_sh(args_dict, slurm_command, accession):
    """Creates and submits to O2 a shell script to download a specific accession, no return value."""
    output_dir = args_dict["output_dir"]
    SHELL_DIR = os.path.join(output_dir, ".sh")
    os.makedirs(SHELL_DIR, exist_ok=True)
    
    if args_dict["gzip"] is not None:
        SHELL_PATH = os.path.join(SHELL_DIR, accession + "_gzip_download.sh")
    else:
        SHELL_PATH = os.path.join(SHELL_DIR, accession + "_download.sh")
    
    primary_command = return_primary_command(args_dict, accession)
    
    with open(SHELL_PATH, "w") as fp:
        fp.write(slurm_command + primary_command)
    os.chmod(SHELL_PATH, 0o700)
    os.system("sbatch " + SHELL_PATH)

if __name__ == "__main__":
    args_dict = parse_args()
    clean_arg_paths(args_dict)
    
    slurm_command = return_slurm_command(args_dict)
    
    print("Will output results to {}".format(args_dict["output_dir"]))
    
    input_file = args_dict["input_file"]
    input_accession = args_dict["SRA_accession"]
    if input_file is not None:
        # read from input_file
        print("Reading from input file {}".format(input_file))
        with open(input_file, "r") as fp:
            for line in fp:
                accession = line.strip()
                if len(accession) > 0:
                    make_download_sh(args_dict, slurm_command, accession)
    elif input_accession is not None: 
        print("Downloading accession {}".format(input_accession))
        make_download_sh(args_dict, slurm_command, input_accession)
    else:
        print("No SRA Accession or input file specified.")