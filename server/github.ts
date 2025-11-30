import { Octokit } from "@octokit/rest";

let connectionSettings: any;

async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }

  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=github",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("GitHub not connected");
  }
  return accessToken;
}

export async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export async function createAndPushRepository(
  repoName: string,
  description: string
) {
  const octokit = await getGitHubClient();

  // Get authenticated user
  const user = await octokit.rest.users.getAuthenticated();
  const owner = user.data.login;

  // Create repository
  const repoResponse = await octokit.rest.repos.createForAuthenticatedUser({
    name: repoName,
    description: description,
    private: false,
    auto_init: false,
  });

  const repoUrl = repoResponse.data.clone_url;
  const repoHttpUrl = repoResponse.data.html_url;

  // Configure git and push
  const { execSync } = require("child_process");

  try {
    // Configure git if not already done
    execSync("git config --global user.email personality-blender@replit.com", {
      cwd: process.cwd(),
    });
    execSync("git config --global user.name Personality-Blender", {
      cwd: process.cwd(),
    });

    // Add remote
    try {
      execSync("git remote remove origin", { cwd: process.cwd() });
    } catch (e) {
      // Remote might not exist, that's okay
    }

    execSync(`git remote add origin ${repoUrl}`, { cwd: process.cwd() });

    // Stage all files
    execSync("git add .", { cwd: process.cwd() });

    // Check if there are changes to commit
    try {
      execSync("git commit -m 'Initial commit: Personality Blender app'", {
        cwd: process.cwd(),
      });
    } catch (e) {
      // Might have nothing to commit, that's okay
    }

    // Push to GitHub
    execSync("git branch -M main", { cwd: process.cwd() });
    execSync("git push -u origin main", { cwd: process.cwd() });

    return {
      success: true,
      repoUrl: repoHttpUrl,
      message: `Repository created and code pushed to GitHub!`,
    };
  } catch (error: any) {
    throw new Error(`Failed to push to GitHub: ${error.message}`);
  }
}
