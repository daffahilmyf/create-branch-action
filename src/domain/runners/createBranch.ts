export default async (octokit: any, owner: string, repo: string, newBranchName: string, sha: string): Promise<void> => {
    const response = await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranchName}`,
      sha,
    });
    if (response.status !== 201) {
      throw new Error(`Failed to create branch ${newBranchName}`);
    }
    console.log(`Branch ${newBranchName} created successfully`);
  };