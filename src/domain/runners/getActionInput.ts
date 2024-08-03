import * as core from '@actions/core';

export default (inputName: string): string => {
  const input = core.getInput('inputName');
  if (!input) {
    throw new Error(`${inputName} is required`);
  }
  return input;
};