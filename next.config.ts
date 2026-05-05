import type { NextConfig } from "next";

const repoName = "fast-fourier-transform-presentation";
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubActions ? `/${repoName}` : undefined,
  assetPrefix: isGitHubActions ? `/${repoName}/` : undefined,
};

export default nextConfig;
