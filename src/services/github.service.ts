import { Octokit } from '@octokit/rest';
import chalk from 'chalk';
import ora from 'ora';
import open from 'open';
import { configService } from './config.service.js';

// Define error types
interface GitHubError {
  message: string;
  status?: number;
}

class GitHubService {
  private octokit: Octokit | null = null;
  // Your new Client ID
  private static readonly GITHUB_CLIENT_ID = 'Ov23liW3E35YlO4J5E81';
  private static readonly SCOPES = ['repo', 'read:user'];

  async authenticateWithBrowser(): Promise<void> {
    const spinner = ora('Initializing GitHub authentication...').start();

    try {
      // Step 1: Request device and user verification codes
      const deviceResponse = await fetch('https://github.com/login/device/code', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: GitHubService.GITHUB_CLIENT_ID,
          scope: GitHubService.SCOPES.join(' ')
        })
      });

      if (!deviceResponse.ok) {
        throw new Error(`GitHub API error: ${deviceResponse.statusText}`);
      }

      const deviceData = await deviceResponse.json();
      
      spinner.stop();
      
      // Step 2: Prompt user to enter code
      console.log(chalk.blue('\n🔑 To authenticate GitFolio-Extract:'));
      console.log(chalk.white('\n1. Your code is: ') + chalk.cyan(deviceData.user_code));
      console.log(chalk.white('2. Visit: ') + chalk.cyan(deviceData.verification_uri));
      console.log(chalk.white('3. Enter the code shown above\n'));

      // Open verification URL in browser
      await open(deviceData.verification_uri);

      spinner.text = 'Waiting for GitHub authentication...';
      spinner.start();

      // Step 3: Poll for the access token
      const token = await this.pollForToken(
        deviceData.device_code,
        deviceData.interval || 5
      );
      
      spinner.succeed('Successfully authenticated with GitHub!');
      configService.setGithubToken(token);
      await this.initialize();

    } catch (error: unknown) {
      spinner.fail('Authentication failed');
      if (error instanceof Error) {
        console.error(chalk.red('Error:'), error.message);
      }
      throw error;
    }
  }

  private async pollForToken(deviceCode: string, interval: number): Promise<string> {
    const pollRequest = async () => {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: GitHubService.GITHUB_CLIENT_ID,
          device_code: deviceCode,
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
        })
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        // Handle known error types
        switch (data.error) {
          case 'authorization_pending':
            return null; // Continue polling
          case 'slow_down':
            // Increase interval if we're told to slow down
            interval += 5;
            return null;
          case 'expired_token':
            throw new Error('Device code expired. Please try again.');
          default:
            throw new Error(data.error_description || data.error);
        }
      }

      return data.access_token;
    };

    // Poll until we get a token or an error
    while (true) {
      const token = await pollRequest();
      if (token) return token;
      await new Promise(resolve => setTimeout(resolve, interval * 1000));
    }
  }

  async initialize(): Promise<boolean> {
    const token = configService.getGithubToken();
    
    if (!token) {
      console.log(chalk.red('❌ No GitHub token found. Please configure using:'));
      console.log(chalk.yellow('pnpm configure'));
      return false;
    }

    try {
      this.octokit = new Octokit({ auth: token });
      await this.validateToken();
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleAuthError(error);
      } else {
        console.log(chalk.red('An unknown error occurred during initialization'));
      }
      return false;
    }
  }

  private async validateToken(): Promise<void> {
    if (!this.octokit) throw new Error('Octokit not initialized');

    try {
      const { data: user } = await this.octokit.users.getAuthenticated();
      console.log(chalk.green(`✓ Authenticated as ${chalk.bold(user.login)}`));
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }

  private handleAuthError(error: Error & { status?: number }): void {
    console.log(chalk.red('❌ GitHub authentication failed:'));
    
    if (error.status === 401) {
      console.log(chalk.yellow('Invalid token. Please check your GitHub token and try again.'));
    } else if (error.status === 403) {
      console.log(chalk.yellow('Rate limit exceeded. Please try again later.'));
    } else {
      console.log(chalk.yellow('An unexpected error occurred:', error.message));
    }
  }

  getClient(): Octokit {
    if (!this.octokit) {
      throw new Error('GitHub client not initialized');
    }
    return this.octokit;
  }
}

export const githubService = new GitHubService();