export default async (octokit: any, owner: string, repo: string, branchName: string): Promise<string> => {
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    });
    return refData.object.sha;
};