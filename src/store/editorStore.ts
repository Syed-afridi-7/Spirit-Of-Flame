import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SubmissionRecord } from '@/types/problem';

export interface ContestState {
  active: boolean;
  problemIds: number[];
  startTime: number;
  duration: number;
  solvedInContest: number[];
  finished: boolean;
  score: number;
}

export interface TestResult {
  passed: boolean;
  output: string;
  expected: string;
  time: string;
  memory: string;
  input: string;
}

interface EditorState {
  // Code storage: keyed by `${problemId}-${language}`
  codeMap: Record<string, string>;
  // Per-problem selected language
  langMap: Record<number, string>;
  // Global default language
  defaultLang: string;
  // Console state
  consoleOpen: boolean;
  consoleTab: 'testcase' | 'output';
  // Run/submit state (NOT persisted)
  running: boolean;
  submitting: boolean;
  testResults: TestResult[];
  verdict: 'idle' | 'pass' | 'fail' | 'error';
  // Problem-level solved tracking
  solvedProblems: number[];
  submissionHistory: Record<number, SubmissionRecord[]>;
  notesMap: Record<number, string>;
  editorTheme: string;
  contest: ContestState | null;

  // Actions
  getCode: (problemId: number, lang: string, fallback: string) => string;
  setCode: (problemId: number, lang: string, code: string) => void;
  getLang: (problemId: number) => string;
  setLang: (problemId: number, lang: string) => void;
  setDefaultLang: (lang: string) => void;
  toggleConsole: () => void;
  setConsoleOpen: (open: boolean) => void;
  setConsoleTab: (tab: 'testcase' | 'output') => void;
  setRunning: (running: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
  setTestResults: (results: TestResult[]) => void;
  setVerdict: (verdict: 'idle' | 'pass' | 'fail' | 'error') => void;
  markSolved: (problemId: number) => void;
  isSolved: (problemId: number) => boolean;
  resetProblem: (problemId: number, lang: string, starterCode: string) => void;
  addSubmission: (record: SubmissionRecord) => void;
  getSubmissions: (problemId: number) => SubmissionRecord[];
  getNote: (problemId: number) => string;
  setNote: (problemId: number, note: string) => void;
  setEditorTheme: (theme: string) => void;
  startContest: (problemIds: number[]) => void;
  endContest: () => void;
  submitContestProblem: (problemId: number) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      codeMap: {},
      langMap: {},
      defaultLang: 'python',
      consoleOpen: false,
      consoleTab: 'testcase',
      running: false,
      submitting: false,
      testResults: [],
      verdict: 'idle',
      solvedProblems: [],
      submissionHistory: {},
      notesMap: {},
      editorTheme: 'tokyo-night',
      contest: null,

      getCode: (problemId, lang, fallback) => {
        const key = `${problemId}-${lang}`;
        return get().codeMap[key] ?? fallback;
      },

      setCode: (problemId, lang, code) => {
        const key = `${problemId}-${lang}`;
        set((s) => ({ codeMap: { ...s.codeMap, [key]: code } }));
      },

      getLang: (problemId) => {
        return get().langMap[problemId] ?? get().defaultLang;
      },

      setLang: (problemId, lang) => {
        set((s) => ({ langMap: { ...s.langMap, [problemId]: lang } }));
      },

      setDefaultLang: (lang) => set({ defaultLang: lang }),
      toggleConsole: () => set((s) => ({ consoleOpen: !s.consoleOpen })),
      setConsoleOpen: (open) => set({ consoleOpen: open }),
      setConsoleTab: (tab) => set({ consoleTab: tab }),
      setRunning: (running) => set({ running }),
      setSubmitting: (submitting) => set({ submitting }),
      setTestResults: (results) => set({ testResults: results }),
      setVerdict: (verdict) => set({ verdict }),

      markSolved: (problemId) => {
        set((s) => ({
          solvedProblems: s.solvedProblems.includes(problemId)
            ? s.solvedProblems
            : [...s.solvedProblems, problemId],
        }));
      },

      isSolved: (problemId) => get().solvedProblems.includes(problemId),

      resetProblem: (problemId, lang, starterCode) => {
        const key = `${problemId}-${lang}`;
        set((s) => ({
          codeMap: { ...s.codeMap, [key]: starterCode },
          verdict: 'idle',
          testResults: [],
        }));
      },

      addSubmission: (record) => {
        set((s) => {
          const history = s.submissionHistory[record.problemId] ?? [];
          const truncated = { ...record, code: record.code.slice(0, 2000) };
          const updated = [truncated, ...history].slice(0, 50);
          return { submissionHistory: { ...s.submissionHistory, [record.problemId]: updated } };
        });
      },

      getSubmissions: (problemId) => get().submissionHistory[problemId] ?? [],

      getNote: (problemId) => get().notesMap[problemId] ?? '',

      setNote: (problemId, note) => {
        set((s) => ({ notesMap: { ...s.notesMap, [problemId]: note } }));
      },

      setEditorTheme: (theme) => set({ editorTheme: theme }),

      startContest: (problemIds) => {
        set({
          contest: {
            active: true,
            problemIds,
            startTime: Date.now(),
            duration: 3600000,
            solvedInContest: [],
            finished: false,
            score: 0,
          },
        });
      },

      endContest: () => {
        set((s) => ({
          contest: s.contest ? { ...s.contest, active: false, finished: true } : null,
        }));
      },

      submitContestProblem: (problemId) => {
        set((s) => {
          if (!s.contest || s.contest.solvedInContest.includes(problemId)) return {};
          return {
            contest: {
              ...s.contest,
              solvedInContest: [...s.contest.solvedInContest, problemId],
            },
          };
        });
      },
    }),
    {
      name: 'anbudevs-editor',
      partialize: (state) => ({
        codeMap: state.codeMap,
        langMap: state.langMap,
        defaultLang: state.defaultLang,
        solvedProblems: state.solvedProblems,
        submissionHistory: state.submissionHistory,
        notesMap: state.notesMap,
        editorTheme: state.editorTheme,
      }),
    },
  ),
);

export interface MockTestCase {
  input: string;
  expectedOutput: string;
}

export function mockRunCode(
  _code: string,
  _lang: string,
  testCases: MockTestCase[],
): Promise<TestResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results: TestResult[] = testCases.map((tc, i) => {
        const passed = Math.random() > 0.3;
        return {
          passed,
          input: tc.input,
          expected: tc.expectedOutput,
          output: passed ? tc.expectedOutput : `Wrong Answer`,
          time: `${Math.floor(Math.random() * 80 + 20)}ms`,
          memory: `${(Math.random() * 5 + 12).toFixed(1)} MB`,
        };
      });
      resolve(results);
    }, 800 + Math.random() * 1200);
  });
}

export function mockSubmitCode(
  _code: string,
  _lang: string,
  testCases: MockTestCase[],
): Promise<TestResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results: TestResult[] = testCases.map((tc) => ({
        passed: true,
        input: tc.input,
        expected: tc.expectedOutput,
        output: tc.expectedOutput,
        time: `${Math.floor(Math.random() * 60 + 15)}ms`,
        memory: `${(Math.random() * 4 + 13).toFixed(1)} MB`,
      }));
      resolve(results);
    }, 1500 + Math.random() * 1000);
  });
}
