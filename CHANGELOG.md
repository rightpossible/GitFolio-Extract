# Changelog

All notable changes to GitFolio-Extract will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2024-01-20

### Changed
- Updated package description to better reflect the tool's purpose
- Improved package metadata for npm registry

## [1.0.1] - 2024-01-20

### Fixed
- Added missing dependencies to package.json
- Fixed global CLI installation issues
- Updated installation instructions in README
- Clarified output file locations in documentation

### Added
- Better error handling for missing dependencies
- Clearer documentation about file paths
- Version tag recommendations in installation guide

## [1.0.0] - 2024-01-20

### Added
- Initial release of GitFolio-Extract
- GitHub OAuth device flow authentication
- Repository data extraction including:
  - Basic repository information
  - Repository statistics
  - Language detection
  - README content
- CLI commands:
  - `configure` - Set up GitHub authentication
  - `extract` - Extract repository data
- JSON output format with metadata
- Custom output path support
- Progress indicators and colorful CLI output

### Technical Details
- Built with TypeScript
- Uses pnpm for package management
- Implements GitHub's OAuth device flow
- Uses Octokit for GitHub API interactions

## [Unreleased]

### Planned
- Tech stack detection from package files
- Repository filtering options
- Multiple output formats (YAML, MD)
- Custom template support
- Caching support for faster subsequent runs
- Repository statistics and analytics
- Project screenshots extraction

[1.0.1]: https://github.com/rightpossible/gitfolio-extract/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/rightpossible/gitfolio-extract/releases/tag/v1.0.0 