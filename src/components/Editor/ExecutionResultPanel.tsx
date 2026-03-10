import React, { useState } from "react";
import { CheckCircle2, Clock, Database, Terminal, XCircle, Plus, Trash2, Play } from "lucide-react";
import type { ExecutionResult, ExecutionStatus } from "@/types";

interface CustomTestCase {
  input: string;
  expectedOutput: string;
}

interface ExecutionResultPanelProps {
  result: ExecutionResult | null;
  customTestCases?: CustomTestCase[];
  onCustomTestCasesChange?: (cases: CustomTestCase[]) => void;
  onRunCustomTests?: (cases: CustomTestCase[]) => void;
}

const getStatusColor = (status: ExecutionStatus): string => {
  switch (status) {
    case "Accepted":
      return "border-green-400/20 bg-green-400/10 text-green-400";
    case "Wrong Answer":
      return "border-red-400/20 bg-red-400/10 text-red-400";
    case "Time Limit Exceeded":
      return "border-orange-400/20 bg-orange-400/10 text-orange-400";
    case "Compilation Error":
      return "border-yellow-400/20 bg-yellow-400/10 text-yellow-400";
    case "Runtime Error":
      return "border-red-400/20 bg-red-400/10 text-red-400";
    case "Pending":
      return "border-blue-400/20 bg-blue-400/10 text-blue-400";
    default:
      return "border-gray-400/20 bg-gray-400/10 text-gray-400";
  }
};

export const ExecutionResultPanel: React.FC<ExecutionResultPanelProps> = ({
  result,
  customTestCases = [],
  onCustomTestCasesChange,
  onRunCustomTests,
}) => {
  const [activeTab, setActiveTab] = useState<"output" | "custom">("output");

  const addCustomTestCase = () => {
    onCustomTestCasesChange?.([...customTestCases, { input: "", expectedOutput: "" }]);
  };

  const updateCustomTestCase = (index: number, field: keyof CustomTestCase, value: string) => {
    const updated = [...customTestCases];
    updated[index] = { ...updated[index], [field]: value };
    onCustomTestCasesChange?.(updated);
  };

  const removeCustomTestCase = (index: number) => {
    onCustomTestCasesChange?.(customTestCases.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden border-t border-[#333] bg-[#111]">
      {/* Tab Header */}
      <div className="flex items-center justify-between border-b border-[#333] bg-[#1a1a1a] px-4 py-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab("output")}
            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTab === "output" ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Terminal size={14} /> Console Output
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTab === "custom" ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Plus size={14} /> Custom Tests
          </button>
        </div>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        {activeTab === "custom" ? (
          <div className="space-y-3">
            {customTestCases.map((tc, i) => (
              <div key={i} className="rounded-lg border border-[#333] bg-[#1e1e1e] p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Custom Test #{i + 1}
                  </span>
                  <button
                    onClick={() => removeCustomTestCase(i)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                    aria-label={`Remove test case ${i + 1}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Input
                  </label>
                  <textarea
                    value={tc.input}
                    onChange={(e) => updateCustomTestCase(i, "input", e.target.value)}
                    placeholder="Enter input..."
                    rows={2}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-xs font-mono text-gray-300 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Expected Output
                  </label>
                  <textarea
                    value={tc.expectedOutput}
                    onChange={(e) => updateCustomTestCase(i, "expectedOutput", e.target.value)}
                    placeholder="Expected output..."
                    rows={2}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-xs font-mono text-gray-300 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                  />
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <button
                onClick={addCustomTestCase}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-400 bg-[#1e1e1e] border border-dashed border-[#444] rounded-lg hover:text-blue-400 hover:border-blue-400/30 transition-colors"
              >
                <Plus size={12} /> Add Test Case
              </button>
              {customTestCases.length > 0 && onRunCustomTests && (
                <button
                  onClick={() => onRunCustomTests(customTestCases)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <Play size={12} /> Run Custom Tests
                </button>
              )}
            </div>
          </div>
        ) : !result ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-500 text-xs">
            Run your code to see output here.
          </div>
        ) : result.status === "Pending" ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-blue-400">
            <div className="relative h-1 w-12 overflow-hidden rounded-full bg-[#222]">
              <div className="absolute inset-0 w-1/2 animate-[shimmer_1s_infinite] bg-blue-500" />
            </div>
            <span className="animate-pulse text-xs font-mono uppercase tracking-widest">
              Executing code...
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`flex items-center gap-3 rounded-lg border p-3 ${getStatusColor(result.status)}`}>
              {result.status === "Accepted" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <div>
                <div className="text-sm font-bold">{result.status}</div>
                <div className="mt-1 flex items-center gap-3 text-[10px] opacity-70">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {result.runtime} ms
                  </span>
                  <span className="flex items-center gap-1">
                    <Database size={10} /> {result.memory.toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Standard Output
              </div>
              <div className="rounded-lg border border-[#333] bg-[#1e1e1e] p-4 transition-all hover:border-[#444]">
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-300">
                  {result.output || "No output generated."}
                </pre>
              </div>
            </div>

            {result.expectedOutput && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-green-500">
                  Expected Output
                </div>
                <div className="rounded-lg border border-green-900/20 bg-[#1e1e1e] p-4">
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-green-400/80">
                    {result.expectedOutput}
                  </pre>
                </div>
              </div>
            )}

            {result.testCases && result.testCases.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Test Case Comparison
                </div>
                <div className="overflow-hidden rounded-lg border border-[#333]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#161616] text-[10px] uppercase tracking-wider text-gray-500">
                      <tr>
                        <th className="px-3 py-2">Case</th>
                        <th className="px-3 py-2">Input</th>
                        <th className="px-3 py-2">Expected</th>
                        <th className="px-3 py-2">Output</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2c2c2c]">
                      {result.testCases.map((testCase) => (
                        <tr key={testCase.index} className="bg-[#1a1a1a]">
                          <td className="px-3 py-2 text-gray-400">#{testCase.index}</td>
                          <td className="px-3 py-2 font-mono text-gray-300">{testCase.input}</td>
                          <td className="px-3 py-2 font-mono text-gray-300">
                            {testCase.expectedOutput}
                          </td>
                          <td
                            className={`px-3 py-2 font-mono ${
                              testCase.passed ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {testCase.output}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                testCase.passed
                                  ? "bg-green-500/15 text-green-400"
                                  : "bg-red-500/15 text-red-400"
                              }`}
                            >
                              {testCase.passed ? "Pass" : "Fail"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
