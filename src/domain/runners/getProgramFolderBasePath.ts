import * as core from '@actions/core';

export default (): string => {
  const folderPath = core.getInput('program_folder_base_path');
  if (!folderPath) {
    throw new Error('Program folder is required');
  }
  return folderPath;
};