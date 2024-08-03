import * as core from "@actions/core";
import * as github from "@actions/github";

import {
  createBranch,
  getActionInput,
  getDefaultBranchSha,
  updateBranch,
  verifyBranchExistence 
} from './domain/runners';

const logInputs = (branchName: string, githubToken: string): void => {
  console.log(`Branch name: ${branchName}`);
  console.log(`GitHub token: ${githubToken ? 'Token provided' : 'No token provided'}`);
};

const run =  async (): Promise<void> => {
  try {
    const branchName = getActionInput('branch_name');
    const githubToken = getActionInput('token');

    const newBranchName = `${branchName}-ai-recommender`;

    logInputs(branchName, githubToken);

    const octokit = github.getOctokit(githubToken);
    const { owner, repo } = github.context.repo;
    const defaultBranchSha = await getDefaultBranchSha(octokit, owner, repo, branchName);

    const isBranchExist = await verifyBranchExistence(octokit, owner, repo, newBranchName);



    if (isBranchExist) {
      console.log(`Branch ${newBranchName} already exists`);
      await updateBranch(octokit, owner, repo, newBranchName, defaultBranchSha);
    } else {
      console.log(`Branch ${newBranchName} does not exist`);
      await createBranch(octokit, owner, repo, newBranchName, defaultBranchSha);
    }

    

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'test.txt',
      message: 'Create test.txt',
      content: Buffer.from('Hello World').toString('base64'),
      branch: newBranchName
    })




  } catch (exception) {
    const error = exception as Error;
    core.setFailed(error.message);
  }
};


if (!process.env.JEST_WORKER_ID) {
  run();
}



// export const run = async () => {
//   try {
//     const branchName = core.getInput('branch_name');
//     const githubToken = core.getInput('token');

//     console.log(`Branch name: ${branchName}`);
//     console.log(`GitHub token: ${githubToken ? 'Token provided' : 'No token provided'}`);

//     if (!branchName) {
//       throw new Error('Branch name is required');
//     }

//     if (!githubToken) {
//       throw new Error('GitHub token is required');
//     }

//     const newBranchName = `${branchName}-ai-recommender`;
//     const octokit = github.getOctokit(githubToken);
//     const { owner, repo } = github.context.repo;

//     console.log(`Owner: ${owner}, Repo: ${repo}`);

//     const { data: refData } = await octokit.rest.git.getRef({
//       owner,
//       repo,
//       ref: `heads/${branchName}`,
//     });

//     const defaultBranchSha = refData.object.sha;

//     try{
//       const getBranchRef = await octokit.rest.git.getRef({
//         owner,
//         repo,
//         ref: `heads/${newBranchName}`,
//       })

//       if(getBranchRef.status === 200) {
//         console.log(`Branch ${newBranchName} already exists`);
  
//         const response = await octokit.rest.git.updateRef({
//           owner,
//           repo,
//           ref: `heads/${newBranchName}`,
//           sha: defaultBranchSha,
//         });
  
//         const message = response.status === 200 ? 'updated' : 'not updated';
  
//         console.log(`Branch ${newBranchName} is ${message}`);
  
//         return;
//       }
//     }catch(e){
//       console.log(`Branch ${newBranchName} does not exist`);

//       const response = await octokit.rest.git.createRef({
//         owner,
//         repo,
//         ref: `refs/heads/${newBranchName}`,
//         sha: defaultBranchSha,
//       });
  
//       if (response.status !== 201) {
//         throw new Error(`Failed to create branch ${newBranchName}`);
//       }
  
//       console.log(`Branch ${newBranchName} created successfully`);
      
//       return;
//     }
    
//   } catch (exception) { 
//     const error = exception as Error;
//     core.setFailed(error.message);
//   }
// };

