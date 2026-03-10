import React, { useEffect, useMemo, useState, useCallback } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { LanguageSelector } from "./LanguageSelector";
import { EditorActions } from "./EditorActions";
import { runCode, type ExecutionTestCase } from "@/services/judge0Service";
import { registerThemes } from "@/lib/monacoThemes";
import type { ExecutionResult, ProblemDetail, SubmissionRecord } from "@/types";

interface CodeEditorProps {
  problem: ProblemDetail;
  setExecutionResult: (result: ExecutionResult) => void;
  customTestCases: ExecutionTestCase[];
  onCustomTestCasesChange: (cases: ExecutionTestCase[]) => void;
}

const mapLanguageToMonaco = (language: string): string => {
  switch (language.toLowerCase()) {
    case "c++":
    case "cpp":
      return "cpp";
    case "java":
      return "java";
    case "python":
      return "python";
    case "javascript":
      return "javascript";
    default:
      return "python";
  }
};

const toStarterCodeKey = (language: string): string => {
  switch (language.toLowerCase()) {
    case "c++":
      return "cpp";
    default:
      return language.toLowerCase();
  }
};

const toSubmissionVerdict = (
  status: ExecutionResult["status"],
): SubmissionRecord["verdict"] => {
  if (status === "Pending") return "Runtime Error";
  return status;
};

export const CodeEditor: React.FC<CodeEditorProps> = ({
  problem,
  setExecutionResult,
  customTestCases,
  onCustomTestCasesChange,
}) => {
  const {
    getLang,
    getCode,
    setCode,
    editorTheme,
    addSubmission,
    markSolved,
    setRunning,
    setSubmitting,
    running,
    submitting,
  } = useEditorStore();

  const language = getLang(problem.id);
  const [localCode, setLocalCode] = useState("");

  const storageKey = useMemo(
    () => `anbudevs-editor-code-${problem.id}-${language.toLowerCase()}`,
    [problem.id, language],
  );
  const testCases = useMemo(
    () =>
      problem.examples.map((example) => ({
        input: example.input,
        expectedOutput: example.output,
      })),
    [problem.examples],
  );

  useEffect(() => {
    const langKey = toStarterCodeKey(language);
    const starterCode = problem.starterCode[langKey] ?? "";
    const localStorageCode = window.localStorage.getItem(storageKey);
    const persistedStoreCode = getCode(problem.id, language, starterCode);
    const resolvedCode = localStorageCode ?? persistedStoreCode;

    setLocalCode(resolvedCode);
    setCode(problem.id, language, resolvedCode);
  }, [language, problem.id, problem.starterCode, getCode, setCode, storageKey]);

  const handleEditorChange = (value: string | undefined): void => {
    const updatedCode = value ?? "";
    setLocalCode(updatedCode);
    setCode(problem.id, language, updatedCode);
    window.localStorage.setItem(storageKey, updatedCode);
  };

  const executeCode = async (mode: "run" | "submit"): Promise<void> => {
    const isSubmit = mode === "submit";
    if (isSubmit) {
      setSubmitting(true);
    } else {
      setRunning(true);
    }

    setExecutionResult({
      status: "Pending",
      runtime: 0,
      memory: 0,
      output: "",
      testCases: [],
    });

    try {
      const result = await runCode(localCode, language, testCases, { mode });
      setExecutionResult(result);

      if (isSubmit) {
        const submission: SubmissionRecord = {
          id: crypto.randomUUID(),
          problemId: problem.id,
          language,
          code: localCode,
          verdict: toSubmissionVerdict(result.status),
          runtime: result.runtime,
          memory: result.memory,
          timestamp: Date.now(),
        };
        addSubmission(submission);

        if (result.status === "Accepted") {
          markSolved(problem.id);
        }
      }
    } catch {
      setExecutionResult({
        status: "Runtime Error",
        runtime: 0,
        memory: 0,
        output: "Execution failed. Please try again.",
      });
    } finally {
      if (isSubmit) {
        setSubmitting(false);
      } else {
        setRunning(false);
      }
    }
  };

  const runCustomTests = useCallback(
    async (cases: ExecutionTestCase[]) => {
      if (cases.length === 0) return;
      setRunning(true);
      setExecutionResult({
        status: "Pending",
        runtime: 0,
        memory: 0,
        output: "",
        testCases: [],
      });

      try {
        const result = await runCode(localCode, language, cases, { mode: "run" });
        setExecutionResult(result);
      } catch {
        setExecutionResult({
          status: "Runtime Error",
          runtime: 0,
          memory: 0,
          output: "Custom test execution failed.",
        });
      } finally {
        setRunning(false);
      }
    },
    [localCode, language, setRunning, setExecutionResult],
  );

  return (
    <div className="flex h-full flex-col border-l border-[#333] bg-[#1e1e1e]">
      <LanguageSelector problemId={problem.id} />

      <div className="relative min-h-0 flex-1">
        <MonacoEditor
          beforeMount={registerThemes}
          language={mapLanguageToMonaco(language)}
          theme={editorTheme}
          value={localCode}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "all",
            cursorBlinking: "smooth",
            smoothScrolling: true,
            formatOnPaste: true,
            wordWrap: "on",
            ariaLabel: `${problem.title} code editor`,
          }}
          loading={
            <div className="flex h-full w-full items-center justify-center bg-[#1e1e1e] text-gray-400">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        />
      </div>

      <EditorActions
        onRunMode={() => executeCode("run")}
        onSubmit={() => executeCode("submit")}
        isExecuting={running || submitting}
      />
    </div>
  );
};
