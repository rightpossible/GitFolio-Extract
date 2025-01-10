import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { repositoryService } from '../services/repository.service.js';
export const extractCommand = new Command('extract')
    .description('Extract repository information')
    .option('-o, --output <path>', 'Output file path', './portfolio.json')
    .action(async (options) => {
    try {
        const data = await repositoryService.extractRepositories();
        // Ensure output directory exists
        await fs.mkdir(path.dirname(options.output), { recursive: true });
        // Write data to file
        await fs.writeFile(options.output, JSON.stringify(data, null, 2), 'utf-8');
        console.log(chalk.green('\n✓ Portfolio data extracted successfully!'));
        console.log(chalk.white(`📁 Saved to: ${chalk.cyan(options.output)}`));
        console.log(chalk.white(`📊 Total repositories: ${chalk.cyan(data.metadata.totalRepos)}`));
    }
    catch (error) {
        console.error(chalk.red('Failed to extract portfolio data'));
        if (error instanceof Error) {
            console.error(chalk.red('Error:'), error.message);
        }
        process.exit(1);
    }
});
