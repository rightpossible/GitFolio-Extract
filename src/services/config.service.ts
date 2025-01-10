import Conf from 'conf';
import chalk from 'chalk';

interface ConfigStore {
  githubToken?: string;
}

class ConfigService {
  private config: Conf<ConfigStore>;

  constructor() {
    this.config = new Conf<ConfigStore>({
      projectName: 'gitfolio-extract',
      defaults: {
        githubToken: undefined,
      },
    });
  }

  setGithubToken(token: string): void {
    this.config.set('githubToken', token);
    console.log(chalk.green('✓ GitHub token saved successfully'));
  }

  getGithubToken(): string | undefined {
    return this.config.get('githubToken');
  }

  clearGithubToken(): void {
    this.config.delete('githubToken');
    console.log(chalk.yellow('✓ GitHub token cleared'));
  }
}

export const configService = new ConfigService(); 