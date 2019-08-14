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
        
def _split_all_ext(input_path):
    """Returns path with all extensions removed"""
    ext_removed_path = input_path
    ext_removed = ""
    while "." in ext_removed_path:
        (ext_removed_path, ext_removed_part) = os.path.splitext(ext_removed_path)
        ext_removed = ext_removed_part + ext_removed
        
    return (ext_removed_path, ext_removed)