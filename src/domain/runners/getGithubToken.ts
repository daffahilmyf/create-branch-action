import * as core from '@actions/core';

export default (): string => {
  const githubToken = core.getInput('token');
  if (!githubToken) {
    throw new Error('GitHub token is required');
  }
  return githubToken;
};