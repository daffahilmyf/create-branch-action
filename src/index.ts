import * as core from "@actions/core";
import * as github from "@actions/github";

export const run = async () => {
  try {
    const branchName = core.getInput('branch_name');
    const githubToken = core.getInput('token');

    console.log(`Branch name: ${branchName}`);
    console.log(`GitHub token: ${githubToken ? 'Token provided' : 'No token provided'}`);

    if (!branchName) {
      throw new Error('Branch name is required');
    }

    if (!githubToken) {
      throw new Error('GitHub token is required');
    }

    const newBranchName = `${branchName}-ai-recommender`;
    const octokit = github.getOctokit(githubToken);
    const { owner, repo } = github.context.repo;

    console.log(`Owner: ${owner}, Repo: ${repo}`);

    // Get the pull request number from the context
    const pullRequestNumber = github.context.issue.number;
    if (!pullRequestNumber) {
      throw new Error('No pull request number found in the context');
    }

    console.log(`Base branch of the PR: ${branchName}`);

    // Get the SHA of the base branch
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    });

    const baseBranchSha = refData.object.sha;

    try {
      // Check if the new branch already exists
      await octokit.rest.git.getRef({
        owner,
        repo,
        ref: `heads/${newBranchName}`,
      });

      // If it exists, update it with a new commit
      console.log(`Branch ${newBranchName} exists. Updating with a new commit.`);

      await octokit.rest.git.updateRef({
        owner,
        repo,
        ref: `heads/${newBranchName}`,
        sha: baseBranchSha,
      });

      console.log(`Branch ${newBranchName} updated successfully.`);
    } catch (error) {
      // If the branch does not exist, create it
      console.log(`Branch ${newBranchName} does not exist. Creating it.`);

      await octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${newBranchName}`,
        sha: baseBranchSha,
      });

      console.log(`Branch ${newBranchName} created successfully.`);
    }
  } catch (exception) { 
    const error = exception as Error;
    core.setFailed(error.message);
  }
};

if (!process.env.JEST_WORKER_ID) {
  run();
}
