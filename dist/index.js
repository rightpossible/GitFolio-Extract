#!/usr/bin/env node
import { Command } from 'commander';
import { githubService } from './services/github.service.js';
import { configureCommand } from './commands/configure.js';
import { extractCommand } from './commands/extract.js';
const program = new Command();
program
    .name('gitfolio-extract')
    .description('Extract GitHub portfolio information into JSON format')
    .version('1.0.0');
// Add commands
program.addCommand(configureCommand);
program.addCommand(extractCommand);
// Initialize GitHub client before running commands
program.hook('preAction', async (thisCommand) => {
    if (thisCommand.name() !== 'configure') {
        const initialized = await githubService.initialize();
        if (!initialized) {
            process.exit(1);
        }
    }
});
program.parse();
