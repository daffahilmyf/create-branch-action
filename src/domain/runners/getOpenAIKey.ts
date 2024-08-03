import * as core from '@actions/core';

export default (): string => {
  const apiKey = core.getInput('openai_key');
  if (!apiKey) {
    throw new Error('Open AI API key is required');
  }
  return apiKey;
};