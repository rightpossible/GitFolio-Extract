import { Octokit } from '@octokit/rest';
import chalk from 'chalk';
import ora from 'ora';
import { githubService } from './github.service.js';

class RepositoryService {
  private octokit: Octokit | null = null;

  async extractRepositories() {
    const spinner = ora('Initializing GitHub client...').start();

    try {
      // Initialize GitHub client first
      const initialized = await githubService.initialize();
      if (!initialized) {
        spinner.fail('Failed to initialize GitHub client');
        throw new Error('GitHub authentication required. Please run: pnpm configure');
      }

      this.octokit = githubService.getClient();
      spinner.text = 'Fetching repositories...';

      // Get authenticated user's repositories
      const { data: repos } = await this.octokit.repos.listForAuthenticatedUser({
        sort: 'updated',
        direction: 'desc',
        per_page: 100, // Max repos per page
      });

      spinner.text = 'Processing repository data...';

      const portfolioData = {
        metadata: {
          generated: new Date().toISOString(),
          username: (await this.octokit.users.getAuthenticated()).data.login,
          totalRepos: repos.length,
        },
        repositories: await Promise.all(
          repos.map(async (repo) => {
            // Get additional data for each repo
            const [languages, readme] = await Promise.all([
              this.getLanguages(repo.name),
              this.getReadme(repo.name),
            ]);

            return {
              basic: {
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                homepage: repo.homepage,
              },
              stats: {
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                lastUpdated: repo.updated_at,
              },
              technical: {
                languages: Object.keys(languages),
                techStack: [], // We'll implement this in the next iteration
              },
              content: {
                readme: readme,
              },
            };
          })
        ),
      };

      spinner.succeed('Repository data extracted successfully!');
      return portfolioData;

    } catch (error: unknown) {
      spinner.fail('Failed to extract repository data');
      if (error instanceof Error) {
        console.error(chalk.red('Error:'), error.message);
      }
      throw error;
    }
  }

  private async getLanguages(repo: string): Promise<Record<string, number>> {
    if (!this.octokit) throw new Error('GitHub client not initialized');
    try {
      const { data } = await this.octokit.repos.listLanguages({
        owner: (await this.octokit.users.getAuthenticated()).data.login,
        repo,
      });
      return data;
    } catch {
      return {};
    }
  }

  private async getReadme(repo: string): Promise<string> {
    if (!this.octokit) throw new Error('GitHub client not initialized');
    try {
      const { data } = await this.octokit.repos.getReadme({
        owner: (await this.octokit.users.getAuthenticated()).data.login,
        repo,
      });
      return Buffer.from(data.content, 'base64').toString('utf-8');
    } catch {
      return '';
    }
  }
}

export const repositoryService = new RepositoryService(); 