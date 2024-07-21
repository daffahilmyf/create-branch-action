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

    // Fetch the pull request details
    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pullRequestNumber,
    });

    // The branch from which the pull request was created
    const baseBranch = pullRequest.base.ref;
    console.log(`Base branch of the PR: ${baseBranch}`);

    // Get the SHA of the base branch
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    });

    const baseBranchSha = refData.object.sha;

    // Create the new branch from the base branch
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranchName}`,
      sha: baseBranchSha,
    });

    console.log(`Branch ${newBranchName} created successfully`);
  } catch (exception) { 
    const error = exception as Error;
    core.setFailed(error.message);
  }
};

if (!process.env.JEST_WORKER_ID) {
  run();
}
