// // eslint-disable

// import { run } from "../index";
// import { getInput, setFailed } from "@actions/core";
// import { getOctokit } from "@actions/github";

// // Mock getInput and setFailed functions
// jest.mock("@actions/core", () => ({
//   getInput: jest.fn(),
//   setFailed: jest.fn(),
// }));

// // Mock context and getOctokit functions
// jest.mock("@actions/github", () => ({
//   context: {
//     repo: {
//       owner: "owner",
//       repo: "repo",
//     },
//   },
//   getOctokit: jest.fn(),
// }));

// describe("run", () => {
//   beforeEach(() => {
//     // Clear all mock function calls and reset mock implementation
//     jest.clearAllMocks();
//   });

//   it("should throw an error if branch name is not provided", async () => {
//     (getInput as jest.Mock).mockReturnValueOnce(""); // branch_name
//     (getInput as jest.Mock).mockReturnValueOnce("gh-token-value"); // token

//     await run();

//     expect(setFailed).toHaveBeenCalledWith("Branch name is required");
//   });

//   it("should throw an error if GitHub token is not provided", async () => {
//     (getInput as jest.Mock).mockReturnValueOnce("branch_name"); // branch_name
//     (getInput as jest.Mock).mockReturnValueOnce(""); // token

//     await run();

//     expect(setFailed).toHaveBeenCalledWith("GitHub token is required");
//   });

//   it("should create a new branch successfully", async () => {
//     // Mock the return values for getInput
//     (getInput as jest.Mock).mockReturnValueOnce("branch_name"); // branch_name
//     (getInput as jest.Mock).mockReturnValueOnce("gh-token-value"); // token

//     // Mock the Octokit instance and its methods
//     const mockGetRef = jest.fn().mockResolvedValue({
//       data: { object: { sha: "defaultBranchSha" } },
//     });
//     const mockCreateRef = jest.fn().mockResolvedValue({});
//     const mockGetRepo = jest.fn().mockResolvedValue({
//       data: { default_branch: "main" },
//     });

//     const mockOctokit = {
//       rest: {
//         repos: {
//           get: mockGetRepo,
//         },
//         git: {
//           getRef: mockGetRef,
//           createRef: mockCreateRef,
//         },
//       },
//     };
//     (getOctokit as jest.Mock).mockReturnValue(mockOctokit);

//     await run();

//     expect(getInput).toHaveBeenCalledWith("branch_name");
//     expect(getInput).toHaveBeenCalledWith("token");
//     expect(getOctokit).toHaveBeenCalledWith("gh-token-value");

//     expect(mockGetRepo).toHaveBeenCalledWith({
//       owner: "owner",
//       repo: "repo",
//     });
//     expect(mockGetRef).toHaveBeenCalledWith({
//       owner: "owner",
//       repo: "repo",
//       ref: "heads/main",
//     });
//     expect(mockCreateRef).toHaveBeenCalledWith({
//       owner: "owner",
//       repo: "repo",
//       ref: "refs/heads/branch_name-ai-recommender",
//       sha: "defaultBranchSha",
//     });

//     expect(setFailed).not.toHaveBeenCalled();
//   });

//   it("should handle error and set failed", async () => {
//     (getInput as jest.Mock).mockReturnValueOnce("branch_name"); // branch_name
//     (getInput as jest.Mock).mockReturnValueOnce("gh-token-value"); // token

//     const mockGetRepo = jest.fn().mockRejectedValueOnce(new Error("Test error"));

//     const mockOctokit = {
//       rest: {
//         repos: {
//           get: mockGetRepo,
//         },
//         git: {
//           getRef: jest.fn(),
//           createRef: jest.fn(),
//         },
//       },
//     };
//     (getOctokit as jest.Mock).mockReturnValue(mockOctokit);

//     await run();

//     expect(setFailed).toHaveBeenCalledWith("Test error");
//   });
// });
