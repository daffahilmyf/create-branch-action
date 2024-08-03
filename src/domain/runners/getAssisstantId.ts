import * as core from '@actions/core';

export default (): string => {
  const assistantID = core.getInput('assistant_id');
  if (!assistantID) {
    throw new Error('Assistant ID is required');
  }
  return assistantID;
};