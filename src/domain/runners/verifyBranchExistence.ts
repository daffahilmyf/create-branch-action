export default async (octokit: any, owner: string, repo: string, newBranchName: string): Promise<boolean> => {
    try {
      await octokit.rest.git.getRef({
        owner,
        repo,
        ref: `heads/${newBranchName}`,
      });
      return true;
    } catch {
      return false;
    }
  };
  