# GitFolio-Extract MVP Implementation Plan

## 1. Project Setup (Step 1)
- Initialize new TypeScript project with pnpm
- Set up basic project structure
- Configure TypeScript and essential dev dependencies
- Create CLI entry point

## 2. GitHub Authentication (Step 2)
- Implement GitHub token-based authentication
- Create configuration storage for tokens
- Add token validation
- Handle authentication errors gracefully

## 3. Repository Data Fetching (Step 3)
- Set up GitHub API client (Octokit)
- Create service to fetch:
  - Basic repository details
  - Language data
  - README content
- Implement rate limiting handling
- Add error handling for API requests

## 4. Data Processing (Step 4)
- Create data transformation layer
- Parse README content
- Extract tech stack from package files
- Structure data according to output schema

## 5. Output Generation (Step 5)
- Implement JSON file generation
- Add basic output formatting
- Create output directory handling
- Implement file writing with error handling

## 6. CLI Interface (Step 6)
- Create command-line interface
- Add progress indicators
- Implement basic commands:
  - `configure` - Set up GitHub token
  - `extract` - Extract repository data
  - `--help` - Show help information

## MVP Output Schema
```typescript
interface PortfolioData {
  metadata: {
    generated: string;
    username: string;
    totalRepos: number;
  };
  repositories: Array<{
    basic: {
      name: string;
      description: string;
      url: string;
      homepage: string | null;
    };
    stats: {
      stars: number;
      forks: number;
      lastUpdated: string;
    };
    technical: {
      languages: string[];
      techStack: string[];
    };
    content: {
      readme: string;
    };
  }>;
}
```

## Implementation Order
1. **Day 1: Project Setup & Authentication**
   - Set up project structure
   - Implement GitHub authentication
   - Create configuration storage

2. **Day 2: Data Fetching**
   - Implement GitHub API client
   - Create repository fetching service
   - Add basic error handling

3. **Day 3: Data Processing**
   - Create data transformation
   - Implement README parsing
   - Add tech stack detection

4. **Day 4: Output & CLI**
   - Create JSON output generation
   - Implement CLI interface
   - Add progress indicators

5. **Day 5: Testing & Polish**
   - Add basic tests
   - Polish error handling
   - Add documentation
   - Create usage examples

