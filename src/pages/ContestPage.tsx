import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import Editor from '@monaco-editor/react';
import { useEditorStore, mockRunCode, mockSubmitCode } from '@/store/editorStore';
import type { MockTestCase } from '@/store/editorStore';
import { getProblemById, getEasyProblems, getMediumProblems, getHardProblems } from '@/data/problems';
import type { Problem } from '@/data/problems';
import { registerThemes } from '@/lib/monacoThemes';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Play, Send, CheckCircle2, XCircle, Loader2,
  GripVertical, Clock, AlertTriangle, Zap, ArrowLeft,
  Medal, Star, Crown, RotateCcw, Timer, Cpu,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LANGUAGES = [
  { key: 'python', label: 'Python', monacoLang: 'python', ext: 'py' },
  { key: 'javascript', label: 'JavaScript', monacoLang: 'javascript', ext: 'js' },
  { key: 'java', label: 'Java', monacoLang: 'java', ext: 'java' },
  { key: 'cpp', label: 'C++', monacoLang: 'cpp', ext: 'cpp' },
];

const DIFF_STYLES = {
  Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  Medium: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
} as const;

const DIFF_POINTS: Record<Problem['difficulty'], number> = {
  Easy: 100,
  Medium: 200,
  Hard: 300,
};

const FAKE_OPPONENTS = [
  'CodeNinja42', 'AlgoMaster', 'ByteWizard', 'DevSprint',
  'HashQueen', 'LoopLord', 'StackOverflow99', 'RecursiveRex',
  'BinaryBoss',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(ms: number): string {
  if (ms <= 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function generateFakeScores(userScore: number): { name: string; score: number; rank: number }[] {
  const opponents = FAKE_OPPONENTS.map((name) => ({
    name,
    score: Math.floor(Math.random() * 601),
    rank: 0,
  }));
  const all = [{ name: 'You', score: userScore, rank: 0 }, ...opponents];
  all.sort((a, b) => b.score - a.score);
  all.forEach((entry, i) => {
    entry.rank = i + 1;
  });
  return all;
}

interface TestResult {
  passed: boolean;
  output: string;
  expected: string;
  time: string;
  memory: string;
  input: string;
}

// ---------------------------------------------------------------------------
// Resize Handle
// ---------------------------------------------------------------------------

const ResizeHandleVertical: React.FC = () => (
  <PanelResizeHandle className="w-1.5 bg-border/40 hover:bg-orange-500/40 active:bg-orange-500/60 transition-colors relative group flex items-center justify-center">
    <GripVertical size={12} className="text-muted-foreground/40 group-hover:text-orange-400 transition-colors" />
  </PanelResizeHandle>
);

// ===========================================================================
// ContestPage (root component)
// ===========================================================================

const ContestPage: React.FC = () => {
  const { contest, startContest, endContest } = useEditorStore();

  const handleStart = useCallback(() => {
    const easy = getEasyProblems();
    const medium = getMediumProblems();
    const hard = getHardProblems();
    const ids = [
      easy[Math.floor(Math.random() * easy.length)].id,
      medium[Math.floor(Math.random() * medium.length)].id,
      hard[Math.floor(Math.random() * hard.length)].id,
    ];
    startContest(ids);
  }, [startContest]);

  const handleNewContest = useCallback(() => {
    endContest();
    // Small delay so store updates, then start fresh
    setTimeout(() => {
      const easy = getEasyProblems();
      const medium = getMediumProblems();
      const hard = getHardProblems();
      const ids = [
        easy[Math.floor(Math.random() * easy.length)].id,
        medium[Math.floor(Math.random() * medium.length)].id,
        hard[Math.floor(Math.random() * hard.length)].id,
      ];
      startContest(ids);
    }, 50);
  }, [endContest, startContest]);

  // Determine which screen to show
  if (contest && contest.active && !contest.finished) {
    return <><SEO title="Contest Mode" description="Test your coding skills in timed contests." path="/contest" /><ActiveContestScreen /></>;
  }

  if (contest && contest.finished) {
    return <><SEO title="Contest Mode" description="Test your coding skills in timed contests." path="/contest" /><ResultsScreen onNewContest={handleNewContest} /></>;
  }

  return <><SEO title="Contest Mode" description="Test your coding skills in timed contests." path="/contest" /><SetupScreen onStart={handleStart} /></>;
};

// ===========================================================================
// 1. Setup Screen
// ===========================================================================

interface SetupScreenProps {
  onStart: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const { contest } = useEditorStore();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Trophy size={28} className="text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Coding Contest</h1>
            <p className="text-sm text-muted-foreground">Test your skills under pressure</p>
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-3 mb-8">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Contest Rules
          </h2>
          {[
            { icon: Zap, text: '3 Problems (1 Easy + 1 Medium + 1 Hard)', color: 'text-yellow-400' },
            { icon: Clock, text: '60 Minutes Time Limit', color: 'text-blue-400' },
            { icon: Star, text: 'Scoring: Easy=100, Medium=200, Hard=300 + Time Bonus', color: 'text-orange-400' },
          ].map(({ icon: Icon, text, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30"
            >
              <Icon size={18} className={color} />
              <span className="text-sm text-foreground/90">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Last score display */}
        {contest && contest.finished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Contest Score</span>
              <span className="text-xl font-bold text-orange-400">{contest.score} pts</span>
            </div>
          </motion.div>
        )}

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-3.5 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <Zap size={18} />
          Start Contest
        </motion.button>

        {/* Back link */}
        <Link
          to="/codelab"
          className="flex items-center justify-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Code Lab
        </Link>
      </motion.div>
    </div>
  );
};

// ===========================================================================
// 2. Active Contest Screen
// ===========================================================================

const ActiveContestScreen: React.FC = () => {
  const {
    contest, endContest, submitContestProblem,
    getCode, setCode, getLang, setLang,
    editorTheme, markSolved, isSolved,
  } = useEditorStore();

  // Local state
  const [activeTab, setActiveTab] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Per-problem run/submit state (local, not global store)
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [verdict, setVerdict] = useState<'idle' | 'pass' | 'fail' | 'error'>('idle');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Contest problem objects
  const contestProblems: Problem[] = useMemo(() => {
    if (!contest) return [];
    return contest.problemIds
      .map((id) => getProblemById(id))
      .filter((p): p is Problem => p !== undefined);
  }, [contest]);

  const currentProblem = contestProblems[activeTab] ?? null;
  const problemId = currentProblem?.id ?? 0;
  const lang = getLang(problemId);
  const starterCode = currentProblem?.starterCode[lang] ?? '# Write your code here';
  const code = getCode(problemId, lang, starterCode);
  const langInfo = LANGUAGES.find((l) => l.key === lang) ?? LANGUAGES[0];

  // Calculate score
  const contestScore = useMemo(() => {
    if (!contest) return 0;
    let score = 0;
    for (const solvedId of contest.solvedInContest) {
      const p = getProblemById(solvedId);
      if (p) score += DIFF_POINTS[p.difficulty];
    }
    return score;
  }, [contest]);

  // Timer
  useEffect(() => {
    if (!contest || !contest.active) return;

    const tick = () => {
      const now = Date.now();
      const left = contest.startTime + contest.duration - now;
      if (left <= 0) {
        setRemaining(0);
        endContest();
      } else {
        setRemaining(left);
      }
    };

    tick(); // immediate first tick
    timerRef.current = setInterval(tick, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [contest, endContest]);

  // Reset results when switching problems
  useEffect(() => {
    setVerdict('idle');
    setTestResults([]);
  }, [activeTab]);

  // Build test cases
  const buildTestCases = useCallback((): MockTestCase[] => {
    if (!currentProblem) return [];
    return currentProblem.examples.map((ex) => ({
      input: ex.input,
      expectedOutput: ex.output,
    }));
  }, [currentProblem]);

  // Run code
  const handleRun = useCallback(async () => {
    setRunning(true);
    setVerdict('idle');
    try {
      const results = await mockRunCode(code, lang, buildTestCases());
      setTestResults(results);
      const allPassed = results.every((r) => r.passed);
      setVerdict(allPassed ? 'pass' : 'fail');
    } catch {
      setVerdict('error');
    } finally {
      setRunning(false);
    }
  }, [code, lang, buildTestCases]);

  // Submit code
  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setVerdict('idle');
    try {
      const results = await mockSubmitCode(code, lang, buildTestCases());
      setTestResults(results);
      const allPassed = results.every((r) => r.passed);
      setVerdict(allPassed ? 'pass' : 'fail');
      if (allPassed) {
        submitContestProblem(problemId);
        markSolved(problemId);
      }
    } catch {
      setVerdict('error');
    } finally {
      setSubmitting(false);
    }
  }, [code, lang, buildTestCases, problemId, submitContestProblem, markSolved]);

  // Language change
  const handleLangChange = useCallback(
    (newLang: string) => {
      setLang(problemId, newLang);
    },
    [problemId, setLang],
  );

  // Code change
  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      setCode(problemId, lang, value ?? '');
    },
    [problemId, lang, setCode],
  );

  // End contest with confirmation
  const handleEndContest = useCallback(() => {
    setShowEndConfirm(false);
    endContest();
  }, [endContest]);

  const isProcessing = running || submitting;
  const isTimeLow = remaining > 0 && remaining <= 5 * 60 * 1000;

  if (!contest || contestProblems.length === 0) return null;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* ===== Top Bar ===== */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-card/90 backdrop-blur-sm flex-shrink-0 z-20">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-orange-400" />
          <span className="text-sm font-bold text-foreground">Contest Mode</span>
        </div>

        <span className="text-border/50">|</span>

        {/* Timer */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-mono font-bold transition-colors ${
            isTimeLow
              ? 'bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse'
              : 'bg-muted text-foreground'
          }`}
        >
          <Clock size={14} className={isTimeLow ? 'text-red-400' : 'text-muted-foreground'} />
          {formatTime(remaining)}
        </div>

        <span className="text-border/50">|</span>

        {/* Score */}
        <div className="flex items-center gap-1.5 text-sm">
          <Star size={14} className="text-orange-400" />
          <span className="font-bold text-foreground">{contestScore}</span>
          <span className="text-muted-foreground">pts</span>
        </div>

        {/* Problem tabs */}
        <div className="flex items-center gap-1 ml-4">
          {contestProblems.map((p, i) => {
            const solved = contest.solvedInContest.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === i
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {solved && <CheckCircle2 size={12} className="text-green-400" />}
                <span className="truncate max-w-[120px]">{p.title}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${DIFF_STYLES[p.difficulty]}`}
                >
                  {p.difficulty}
                </span>
              </button>
            );
          })}
        </div>

        {/* End Contest */}
        <div className="ml-auto relative">
          {showEndConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">End contest?</span>
              <button
                onClick={handleEndContest}
                className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, End
              </button>
              <button
                onClick={() => setShowEndConfirm(false)}
                className="px-3 py-1 text-xs font-semibold bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowEndConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-muted border border-border text-muted-foreground hover:text-red-400 hover:border-red-500/50 rounded-lg transition-all"
            >
              <AlertTriangle size={13} />
              End Contest
            </button>
          )}
        </div>
      </div>

      {/* ===== Main Area: Description | Editor ===== */}
      {currentProblem && (
        <PanelGroup direction="horizontal" className="flex-1">
          {/* Left: Problem Description */}
          <Panel defaultSize={38} minSize={25} maxSize={55}>
            <ContestDescriptionPanel problem={currentProblem} />
          </Panel>

          <ResizeHandleVertical />

          {/* Right: Editor + Results */}
          <Panel defaultSize={62} minSize={40}>
            <div className="flex flex-col h-full">
              {/* Editor toolbar */}
              <div className="flex items-center gap-2 px-4 py-1.5 bg-muted/20 border-b border-border flex-shrink-0">
                <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  solution.{langInfo.ext}
                </span>

                <div className="ml-auto flex items-center gap-2">
                  {/* Language selector */}
                  <select
                    value={lang}
                    onChange={(e) => handleLangChange(e.target.value)}
                    className="text-xs px-2.5 py-1.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50 cursor-pointer"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.key} value={l.key}>
                        {l.label}
                      </option>
                    ))}
                  </select>

                  {/* Run */}
                  <button
                    onClick={handleRun}
                    disabled={isProcessing}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-muted border border-border text-foreground hover:border-green-500/50 hover:text-green-400 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {running ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Play size={13} />
                    )}
                    {running ? 'Running...' : 'Run'}
                  </button>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Send size={13} />
                    )}
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  language={langInfo.monacoLang}
                  value={code}
                  onChange={handleCodeChange}
                  beforeMount={registerThemes}
                  theme={editorTheme}
                  options={{
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    padding: { top: 12, bottom: 12 },
                    automaticLayout: true,
                    wordWrap: 'on',
                    bracketPairColorization: { enabled: true },
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                  }}
                />
              </div>

              {/* Results panel (inline) */}
              <AnimatePresence>
                {(testResults.length > 0 || isProcessing) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border bg-card overflow-hidden"
                  >
                    <div className="p-4 max-h-52 overflow-y-auto custom-scrollbar space-y-3">
                      {isProcessing ? (
                        <div className="flex items-center gap-3 py-4 justify-center">
                          <Loader2 size={18} className="text-orange-400 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            {running ? 'Running test cases...' : 'Submitting solution...'}
                          </span>
                        </div>
                      ) : (
                        <>
                          {/* Verdict banner */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-xl p-3 border flex items-center gap-3 ${
                              verdict === 'pass'
                                ? 'bg-green-500/10 border-green-500/30'
                                : verdict === 'fail'
                                  ? 'bg-red-500/10 border-red-500/30'
                                  : 'bg-yellow-500/10 border-yellow-500/30'
                            }`}
                          >
                            {verdict === 'pass' ? (
                              <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                            ) : (
                              <XCircle size={18} className="text-red-400 flex-shrink-0" />
                            )}
                            <div>
                              <div
                                className={`text-sm font-bold ${
                                  verdict === 'pass' ? 'text-green-400' : 'text-red-400'
                                }`}
                              >
                                {verdict === 'pass' ? 'All Test Cases Passed!' : 'Some Test Cases Failed'}
                              </div>
                              <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Timer size={10} /> {testResults[0]?.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Cpu size={10} /> {testResults[0]?.memory}
                                </span>
                                <span>
                                  {testResults.filter((r) => r.passed).length}/{testResults.length} passed
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Individual results */}
                          {testResults.map((res, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className={`rounded-lg p-3 border text-xs font-mono space-y-1 ${
                                res.passed
                                  ? 'border-green-500/20 bg-green-500/5'
                                  : 'border-red-500/20 bg-red-500/5'
                              }`}
                            >
                              <div
                                className={`flex items-center gap-1.5 font-semibold ${
                                  res.passed ? 'text-green-400' : 'text-red-400'
                                }`}
                              >
                                {res.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                Case {i + 1} — {res.passed ? 'Passed' : 'Failed'}
                              </div>
                              <div className="text-muted-foreground">Input: {res.input}</div>
                              <div className="text-foreground">Output: {res.output}</div>
                              {!res.passed && (
                                <div className="text-green-400/70">Expected: {res.expected}</div>
                              )}
                              <div className="text-muted-foreground/60">
                                {res.time} | {res.memory}
                              </div>
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Panel>
        </PanelGroup>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Contest Description Panel
// ---------------------------------------------------------------------------

interface ContestDescriptionPanelProps {
  problem: Problem;
}

const ContestDescriptionPanel: React.FC<ContestDescriptionPanelProps> = ({ problem }) => {
  const diffClass =
    problem.difficulty === 'Easy'
      ? 'text-green-400'
      : problem.difficulty === 'Medium'
        ? 'text-orange-400'
        : 'text-red-400';

  const { isSolved } = useEditorStore();
  const solved = isSolved(problem.id);

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="overflow-y-auto flex-1 p-5 custom-scrollbar">
        <motion.div
          key={problem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-5"
        >
          {/* Title and meta */}
          <div>
            <h1 className="text-lg font-bold text-foreground mb-1">
              {problem.id}. {problem.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs font-semibold ${diffClass}`}>{problem.difficulty}</span>
              <span className="text-xs text-muted-foreground">
                {DIFF_POINTS[problem.difficulty]} pts
              </span>
              <span className="text-xs text-muted-foreground">
                Acceptance: {problem.acceptance}%
              </span>
              {solved && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-400">
                  <CheckCircle2 size={12} /> Solved
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
            {problem.description}
          </div>

          {/* Examples */}
          {problem.examples.map((ex, i) => (
            <div key={i} className="bg-muted/40 rounded-xl p-4 space-y-2 border border-border/50">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Example {i + 1}
              </div>
              <div className="font-mono text-xs space-y-1.5">
                <div>
                  <span className="text-muted-foreground">Input: </span>
                  <span className="text-foreground">{ex.input}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Output: </span>
                  <span className="text-green-400 font-semibold">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div className="text-muted-foreground text-[11px] pt-1 border-t border-border/30">
                    <span className="font-semibold">Explanation: </span>
                    {ex.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Constraints */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Constraints
            </div>
            <ul className="space-y-1.5">
              {problem.constraints.map((c, i) => (
                <li key={i} className="text-xs font-mono text-muted-foreground flex gap-2">
                  <span className="text-orange-400 flex-shrink-0">&#8226;</span>
                  <code className="text-foreground/70">{c}</code>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ===========================================================================
// 3. Results Screen
// ===========================================================================

interface ResultsScreenProps {
  onNewContest: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ onNewContest }) => {
  const { contest } = useEditorStore();

  const { breakdown, timeBonus, totalScore, leaderboard } = useMemo(() => {
    if (!contest) {
      return { breakdown: [], timeBonus: 0, totalScore: 0, leaderboard: [] };
    }

    const bd: { label: string; difficulty: Problem['difficulty']; points: number; solved: boolean }[] = [];
    let base = 0;

    for (const pid of contest.problemIds) {
      const p = getProblemById(pid);
      if (!p) continue;
      const solved = contest.solvedInContest.includes(pid);
      const pts = solved ? DIFF_POINTS[p.difficulty] : 0;
      base += pts;
      bd.push({ label: p.title, difficulty: p.difficulty, points: pts, solved });
    }

    // Time bonus: proportional to time remaining (max 100 pts)
    const elapsed = Math.min(contest.duration, Date.now() - contest.startTime);
    const fractionRemaining = Math.max(0, 1 - elapsed / contest.duration);
    const tb = contest.solvedInContest.length > 0 ? Math.round(fractionRemaining * 100) : 0;

    const total = base + tb;

    // Update score in store display (computed, not persisting here)
    const lb = generateFakeScores(total);

    return { breakdown: bd, timeBonus: tb, totalScore: total, leaderboard: lb };
  }, [contest]);

  if (!contest) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4"
          >
            <Trophy size={36} className="text-orange-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Contest Complete!</h1>
          <p className="text-muted-foreground text-sm mt-1">Here are your results</p>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3 mb-6">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Score Breakdown
          </h2>

          {breakdown.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/30"
            >
              <div className="flex items-center gap-3">
                {item.solved ? (
                  <CheckCircle2 size={16} className="text-green-400" />
                ) : (
                  <XCircle size={16} className="text-red-400/50" />
                )}
                <span className="text-sm text-foreground truncate">{item.label}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${DIFF_STYLES[item.difficulty]}`}
                >
                  {item.difficulty}
                </span>
              </div>
              <span
                className={`text-sm font-bold ${item.solved ? 'text-green-400' : 'text-muted-foreground'}`}
              >
                {item.points} pts
              </span>
            </motion.div>
          ))}

          {/* Time bonus */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/30"
          >
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-blue-400" />
              <span className="text-sm text-foreground">Time Bonus</span>
            </div>
            <span className="text-sm font-bold text-blue-400">{timeBonus} pts</span>
          </motion.div>
        </div>

        {/* Total Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-center py-5 mb-8 rounded-xl bg-orange-500/10 border border-orange-500/20"
        >
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
            Total Score
          </div>
          <div className="text-4xl font-bold text-orange-400">{totalScore}</div>
          <div className="text-sm text-muted-foreground mt-1">points</div>
        </motion.div>

        {/* Leaderboard */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Leaderboard
          </h2>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left py-2.5 px-4 font-semibold">Rank</th>
                  <th className="text-left py-2.5 px-4 font-semibold">Player</th>
                  <th className="text-right py-2.5 px-4 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => {
                  const isUser = entry.name === 'You';
                  return (
                    <motion.tr
                      key={entry.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + entry.rank * 0.04 }}
                      className={`border-t border-border/30 text-sm ${
                        isUser ? 'bg-orange-500/5' : ''
                      }`}
                    >
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {entry.rank === 1 && <Crown size={14} className="text-yellow-400" />}
                          {entry.rank === 2 && <Medal size={14} className="text-gray-400" />}
                          {entry.rank === 3 && <Medal size={14} className="text-amber-600" />}
                          <span
                            className={`font-mono ${isUser ? 'text-orange-400 font-bold' : 'text-muted-foreground'}`}
                          >
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`${isUser ? 'text-orange-400 font-bold' : 'text-foreground'}`}>
                          {entry.name}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span
                          className={`font-mono font-semibold ${
                            isUser ? 'text-orange-400' : 'text-foreground'
                          }`}
                        >
                          {entry.score}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to="/codelab"
            className="flex-1 py-3 px-4 bg-muted border border-border text-foreground font-semibold rounded-xl text-center text-sm hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Code Lab
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewContest}
            className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            New Contest
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ContestPage;
