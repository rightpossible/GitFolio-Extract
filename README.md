# GitFolio-Extract 🚀

Extract GitHub projects information into a structured JSON format for your portfolio website.

## Features ✨

- 🔑 Simple GitHub authentication via browser
- 📊 Extracts repository details including:
  - Basic information (name, description, URL)
  - Statistics (stars, forks, last updated)
  - Technical details (languages used)
  - Repository content (README)
- 💾 Saves data in a clean JSON format
- 🛠️ Easy to use CLI interface

## Installation 📦

```bash
# Install globally using npm
npm install -g @rightalx/gitfolio-extract@latest

# Or using pnpm
pnpm add -g @rightalx/gitfolio-extract@latest

# Or using yarn
yarn global add @rightalx/gitfolio-extract@latest
```

## Usage 🔨

After installation, you can use the CLI directly:

```bash
# Configure GitHub authentication
gitfolio-extract configure

# Extract repository data (saves to current directory as portfolio.json)
gitfolio-extract extract

# Extract to custom location (specify full path or relative to current directory)
gitfolio-extract extract -o ./my-portfolio.json
gitfolio-extract extract -o C:/Users/username/Documents/my-portfolio.json

# Show help
gitfolio-extract --help
```

### Output Location 📂
- When using `./my-portfolio.json`, the file is saved in your current working directory
- You can use absolute paths like `C:/path/to/my-portfolio.json`
- If the specified directory doesn't exist, it will be created automatically

The tool will save:
- Your GitHub authentication securely in your system's config directory
- The portfolio data in JSON format at your specified location (or `./portfolio.json` by default)

## Output Format 📄

The tool generates a JSON file with the following structure:

```json
{
  "metadata": {
    "generated": "2024-01-20T12:00:00Z",
    "username": "yourusername",
    "totalRepos": 10
  },
  "repositories": [
    {
      "basic": {
        "name": "repo-name",
        "description": "Repository description",
        "url": "https://github.com/user/repo",
        "homepage": "https://project-homepage.com"
      },
      "stats": {
        "stars": 5,
        "forks": 2,
        "lastUpdated": "2024-01-19T10:30:00Z"
      },
      "technical": {
        "languages": ["TypeScript", "JavaScript"],
        "techStack": []
      },
      "content": {
        "readme": "# Project README content..."
      }
    }
  ]
}
```

## Development 🛠️

### Project Structure

```
gitfolio-extract/
├── src/
│   ├── commands/
│   │   ├── configure.ts   # Authentication command
│   │   └── extract.ts     # Data extraction command
│   ├── services/
│   │   ├── github.service.ts    # GitHub API interactions
│   │   └── repository.service.ts # Repository data handling
│   └── index.ts           # CLI entry point
├── package.json
└── tsconfig.json
```

### Building

```bash
# Build the project
pnpm build

# Development with watch mode
pnpm dev
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Built with TypeScript
- Uses GitHub's OAuth Device Flow for authentication
- Powered by Octokit for GitHub API interactions 