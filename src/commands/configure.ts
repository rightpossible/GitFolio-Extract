import { Command } from 'commander';
import chalk from 'chalk';
import { configService } from '../services/config.service.js';
import { githubService } from '../services/github.service.js';

export const configureCommand = new Command('configure')
  .description('Configure GitHub authentication')
  .option('--clear', 'Clear stored GitHub token')
  .action(async (options) => {
    if (options.clear) {
      configService.clearGithubToken();
      return;
    }

    try {
      await githubService.authenticateWithBrowser();
      console.log(chalk.green('\n✓ Configuration completed successfully!'));
    } catch (error: any) {
      console.log(chalk.red('\n❌ Configuration failed:'), error.message);
    }
  }); 