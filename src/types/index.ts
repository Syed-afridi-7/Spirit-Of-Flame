import type { LucideIcon } from "lucide-react";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type SolveStatus = "solved" | "attempted" | "unsolved";
export type ProblemSource = "LeetCode" | "HackerRank" | "Codeforces" | "CodeChef";

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
  difficulty: Difficulty | "All";
  topic: string;
  source: string;
  status: SolveStatus | "All";
}

export interface PaginationState {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export type EditorLanguage = "C++" | "Java" | "Python" | "JavaScript";
export type Language = EditorLanguage;
export type ExecutionStatus =
  | "Accepted"
  | "Wrong Answer"
  | "Time Limit Exceeded"
  | "Compilation Error"
  | "Runtime Error"
  | "Pending";

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemDetail {
  id: number;
  title: string;
  difficulty: Difficulty;
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

export interface ExecutionTestCaseResult {
  index: number;
  input: string;
  expectedOutput: string;
  output: string;
  passed: boolean;
  runtime: number;
  memory: number;
}

export interface SubmissionRecord {
  id: string;
  problemId: number;
  language: EditorLanguage | string;
  code: string;
  verdict: Exclude<ExecutionStatus, "Pending">;
  runtime: number;
  memory: number;
  timestamp: number;
}

export interface ExecutionResult {
  status: ExecutionStatus;
  runtime: number;
  memory: number;
  output: string;
  expectedOutput?: string;
  testCases?: ExecutionTestCaseResult[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "admin";
  createdAt: string;
}

export interface RoadmapResource {
  name: string;
  url: string;
  level: "Basic" | "Intermediate" | "Advanced";
  free: boolean;
}

export interface RoadmapPhase {
  title: string;
  level: "Basic" | "Intermediate" | "Advanced";
  skills: string[];
  resources: RoadmapResource[];
}

export interface Roadmap {
  id: string;
  title: string;
  icon?: LucideIcon;
  description: string;
  avgSalary: string;
  demand: string;
  phases: RoadmapPhase[];
}
