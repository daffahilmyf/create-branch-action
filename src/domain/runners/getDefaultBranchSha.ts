export default async (octokit: any, owner: string, repo: string, branchName: string): Promise<string> => {
    const { data } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    });
    return data.object.sha;
};