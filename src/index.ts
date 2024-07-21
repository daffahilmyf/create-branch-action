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

    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    const defaultBranch = repoData.default_branch;

    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${defaultBranch}`,
    });

    const defaultBranchSha = refData.object.sha;

    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranchName}`,
      sha: defaultBranchSha,
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