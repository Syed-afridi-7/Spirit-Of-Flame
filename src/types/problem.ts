export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SolveStatus = 'solved' | 'attempted' | 'unsolved';
export type ProblemSource = 'LeetCode' | 'HackerRank' | 'Codeforces' | 'CodeChef';

export interface CsvProblem {
  id: number;
  title: string;
  source: ProblemSource;
  difficulty: Difficulty;
  tags: string[];
  link: string;
  summary: string;
}

export interface CsvProblemRaw {
  id: string;
  title: string;
  source: string;
  difficulty: string;
  tags: string;
  link: string;
  summary: string;
}

export interface ProblemFilters {
  search: string;
  difficulty: Difficulty | 'All';
  topic: string;
  source: string;
  status: SolveStatus | 'All';
}

export interface PaginationState {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

// My new types for the IDE
export type Language = "C++" | "Java" | "Python" | "JavaScript";

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemDetail {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  constraints: string[];
  examples: TestCase[];
  starterCode: Record<string, string>;
  tags?: string[];
  optimalComplexity?: {
    time: string;
    space: string;
  };
}

export interface SubmissionRecord {
  id: string;
  problemId: number;
  language: string;
  code: string;
  verdict: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compilation Error" | "Runtime Error";
  runtime: number;
  memory: number;
  timestamp: number;
}

export interface ExecutionResult {
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compilation Error" | "Runtime Error" | "Pending";
  runtime: number; // ms
  memory: number; // MB
  output: string;
  expectedOutput?: string;
}
