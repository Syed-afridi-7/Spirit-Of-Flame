import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "@/components/Navbar";
import { problems, getProblemById } from "@/data/problems";
import { ProblemDetail as ProblemDetailType, ExecutionResult } from "@/types/problem";
import { ProblemDescription } from "@/components/Problem/ProblemDescription";
import { CodeEditor } from "@/components/Editor/CodeEditor";
import { ExecutionResultPanel } from "@/components/Editor/ExecutionResultPanel";

// Map data problem format slightly if needed, or cast it:
const getFormattedProblem = (id: string | undefined): ProblemDetailType | undefined => {
  const p = getProblemById(Number(id));
  if (!p) return undefined;

  // Cast safely, ensuring the structure
  return {
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    description: p.description,
    constraints: p.constraints,
    examples: p.examples,
    starterCode: p.starterCode,
    tags: p.tags,
    optimalComplexity: p.optimalComplexity,
  } as ProblemDetailType;
};

const ProblemIDEPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problemIndex = problems.findIndex((p) => p.id === Number(id));
  const problem = getFormattedProblem(id);

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
            <button onClick={() => navigate("/problemset")} className="text-blue-400 hover:underline">
              Return to Problem List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const prevProblem = problemIndex > 0 ? problems[problemIndex - 1] : null;
  const nextProblem = problemIndex < problems.length - 1 ? problems[problemIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col bg-[#1e1e1e] overflow-hidden"
    >
      <Navbar />

      {/* IDE Header */}
      <div className="h-12 bg-[#2d2d2d] border-b border-[#111] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/problemset" className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>
          <div className="flex items-center gap-1 bg-[#1e1e1e] rounded-md p-1 border border-[#333]">
            <button
              onClick={() => prevProblem && navigate(`/problems/${prevProblem.id}`)}
              disabled={!prevProblem}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-30 transition"
              title="Previous Problem"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextProblem && navigate(`/problems/${nextProblem.id}`)}
              disabled={!nextProblem}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-30 transition"
              title="Next Problem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Could add timer, auth, etc. here */}
      </div>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel: Problem Description */}
          <Panel defaultSize={45} minSize={30}>
            <AnimatePresence mode="wait">
              <motion.div
                key={problem.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ProblemDescription problem={problem} />
              </motion.div>
            </AnimatePresence>
          </Panel>

          {/* Resizer Handle */}
          <PanelResizeHandle className="w-1.5 bg-[#111] hover:bg-blue-600 transition-colors cursor-col-resize flex flex-col justify-center items-center group relative z-10">
            <div className="h-8 w-1 bg-gray-600 rounded-full group-hover:bg-blue-300"></div>
          </PanelResizeHandle>

          {/* Right Panel: Editor & Terminal */}
          <Panel minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditor problem={problem} setExecutionResult={setExecutionResult} />
              </Panel>

              {executionResult && (
                <>
                  <PanelResizeHandle className="h-1.5 bg-[#111] hover:bg-blue-600 transition-colors cursor-row-resize flex justify-center items-center group relative z-10">
                    <div className="w-8 h-1 bg-gray-600 rounded-full group-hover:bg-blue-300"></div>
                  </PanelResizeHandle>

                  <Panel defaultSize={30} minSize={15}>
                    <ExecutionResultPanel result={executionResult} />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </motion.div>
  );
};

export default ProblemIDEPage;
