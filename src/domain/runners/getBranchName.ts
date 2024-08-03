import * as core from '@actions/core';

export default (): string => {
  const branchName = core.getInput('branch_name');
  if (!branchName) {
    throw new Error('Branch name is required');
  }
  return branchName;
};