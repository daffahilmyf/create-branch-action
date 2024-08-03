// import * as core from '@actions/core';
// import * as github from '@actions/github';
// import {
//   createBranch,
//   getDefaultBranchSha,
//   updateBranch,
//   verifyBranchExistence 
// } from '../domain/runners';



// const logInputs = (branchName: string, githubToken: string): void => {
//   console.log(`Branch name: ${branchName}`);
//   console.log(`GitHub token: ${githubToken ? 'Token provided' : 'No token provided'}`);
// };

// export default async (): Promise<void> => {
//   try {
//     const branchName = getBranchName();
//     const githubToken = getGitHubToken();
//     const newBranchName = `${branchName}-ai-recommender`;

//     logInputs(branchName, githubToken);

//     const octokit = github.getOctokit(githubToken);
//     const { owner, repo } = github.context.repo;
//     const defaultBranchSha = await getDefaultBranchSha(octokit, owner, repo, branchName);

//     const isBranchExist = await verifyBranchExistence(octokit, owner, repo, newBranchName);

//     if (isBranchExist) {
//       console.log(`Branch ${newBranchName} already exists`);
//       await updateBranch(octokit, owner, repo, newBranchName, defaultBranchSha);
//     } else {
//       console.log(`Branch ${newBranchName} does not exist`);
//       await createBranch(octokit, owner, repo, newBranchName, defaultBranchSha);
//     }



//   } catch (exception) {
//     const error = exception as Error;
//     core.setFailed(error.message);
//   }
// };
