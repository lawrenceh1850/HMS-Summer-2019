"""File path helper functions."""

import os
import glob

# Helpers
def _handle_directory_cleaning(dir_path):
    """Returns directory starting with "." as an absolute path"""
    if dir_path.startswith("."):
        split_output = dir_path.split(os.sep)
        if len(split_output) > 1:
            split_output = split_output[1:]
        split_output = os.sep.join(split_output)
        return os.path.join(os.getcwd(), split_output)
    return dir_path

def _remove_periods_from_front(input):
    """Removes "." character from beginning of input string"""
    while input and input.startswith("."):
        input = input[1:]
    return input
    
def _split_all_ext(input_path):
    """Returns path with all extensions removed"""
    ext_removed_path = os.path.basename(input_path)
    ext_removed = ""
    
    while "." in _remove_periods_from_front(ext_removed_path):
        (ext_removed_path, ext_removed_part) = os.path.splitext(ext_removed_path)
        ext_removed = ext_removed_part + ext_removed
        
    return (os.path.join(os.path.dirname(input_path), ext_removed_path), ext_removed)

if __name__ == "__main__":
    """Jank testing"""
    print(_remove_periods_from_front(None))
    print(_remove_periods_from_front("...sdkflj"))
    print(_remove_periods_from_front("sdkflj"))
    
    print(_split_all_ext("."))
    print(_split_all_ext("./"))
    print(_split_all_ext("./abc"))
    print(_split_all_ext("/.abc"))
    print(_split_all_ext("/.abc.gz"))
    print(_split_all_ext("./abc.sd.sdf"))
    print(_split_all_ext("./abc/def.ds"))
    print(_split_all_ext("/abc/def.ds"))
    print(_split_all_ext("/abc.def.ds"))
    print(_split_all_ext("/n/data1/hms/dbmi/park/lawrence/FCD/PRJNA527057_kobow_et_al_epilepsia2019/.HTSeq/.sh/SRR8728543_1_fixedAligned_HTSeq.sh"))