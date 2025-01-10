import Conf from 'conf';
import chalk from 'chalk';
class ConfigService {
    constructor() {
        this.config = new Conf({
            projectName: 'gitfolio-extract',
            defaults: {
                githubToken: undefined,
            },
        });
    }
    setGithubToken(token) {
        this.config.set('githubToken', token);
        console.log(chalk.green('✓ GitHub token saved successfully'));
    }
    getGithubToken() {
        return this.config.get('githubToken');
    }
    clearGithubToken() {
        this.config.delete('githubToken');
        console.log(chalk.yellow('✓ GitHub token cleared'));
    }
}
export const configService = new ConfigService();
