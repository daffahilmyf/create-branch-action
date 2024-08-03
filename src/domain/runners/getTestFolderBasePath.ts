import * as core from '@actions/core';

export default (): string => {
  const folderPath = core.getInput('test_folder_base_path');
  if (!folderPath) {
    throw new Error('Test folder is required');
  }
  return folderPath;
};