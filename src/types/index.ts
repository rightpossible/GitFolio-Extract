export interface PortfolioData {
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