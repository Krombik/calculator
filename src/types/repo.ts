export type RepoT = {
  html_url: string;
  forks: number;
  stargazers_count: number;
  name: string;
};

export type RepoData = {
  incomplete_results: boolean;
  items: RepoT[];
  total_count: number;
};
