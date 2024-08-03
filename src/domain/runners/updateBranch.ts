export default async (octokit: any, owner: string, repo: string, newBranchName: string, sha: string): Promise<void> => {
    const response = await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${newBranchName}`,
      sha,
    });
    const message = response.status === 200 ? 'updated' : 'not updated';
    console.log(`Branch ${newBranchName} is ${message}`);
  };
  