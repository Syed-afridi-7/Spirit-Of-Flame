import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, GripVertical, GripHorizontal, BookOpen, Clock } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { problems, getProblemById } from "@/data/problems";
import { ProblemDetail as ProblemDetailType, ExecutionResult } from "@/types/problem";
import { ProblemDescription } from "@/components/Problem/ProblemDescription";
import { SubmissionHistory } from "@/components/Problem/SubmissionHistory";
import { CodeEditor } from "@/components/Editor/CodeEditor";
import { ExecutionResultPanel } from "@/components/Editor/ExecutionResultPanel";
import { useEditorStore } from "@/store/editorStore";

const getFormattedProblem = (id: string | undefined): ProblemDetailType | undefined => {
  const p = getProblemById(Number(id));
  if (!p) return undefined;

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

const ProblemEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problemIndex = problems.findIndex((p) => p.id === Number(id));
  const problem = getFormattedProblem(id);

  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
  const { submissionHistory } = useEditorStore();

  const problemSubmissions = useMemo(() => {
    return submissionHistory[Number(id)] || [];
  }, [submissionHistory, id]);

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
            <button onClick={() => navigate("/codelab")} className="text-blue-400 hover:underline">
              Return to Code Lab
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
      className="h-screen flex flex-col bg-[#1e1e1e] overflow-hidden text-gray-200 font-sans"
    >
      {/* IDE Header */}
      <div className="h-14 bg-[#111] border-b border-[#333] flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <Link to="/codelab" className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline tracking-wider uppercase text-xs">Code Lab</span>
          </Link>
          <div className="w-px h-6 bg-[#333]"></div>
          <div className="flex items-center gap-1 bg-[#222] rounded-lg p-1 border border-[#333]">
            <button
              onClick={() => prevProblem && navigate(`/codelab/problem/${prevProblem.id}`)}
              disabled={!prevProblem}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded disabled:opacity-30 disabled:hover:bg-transparent transition"
              title="Previous Problem"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextProblem && navigate(`/codelab/problem/${nextProblem.id}`)}
              disabled={!nextProblem}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded disabled:opacity-30 disabled:hover:bg-transparent transition"
              title="Next Problem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-sm font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          AnbuDevs IDE
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel: Description & Submissions */}
          <Panel defaultSize={45} minSize={30}>
            <div className="h-full flex flex-col bg-[#1e1e1e] border-r border-[#333]">
              {/* Tab Header */}
              <div className="flex items-center px-4 bg-[#111] border-b border-[#333] gap-4">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 ${activeTab === "description" ? "text-blue-400 border-blue-400" : "text-gray-500 border-transparent hover:text-gray-300"
                    }`}
                >
                  <BookOpen size={14} /> Description
                </button>
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 ${activeTab === "submissions" ? "text-blue-400 border-blue-400" : "text-gray-500 border-transparent hover:text-gray-300"
                    }`}
                >
                  <Clock size={14} /> Submissions
                  {problemSubmissions.length > 0 && (
                    <span className="bg-[#333] text-[9px] px-1.5 py-0.5 rounded-full text-gray-400">
                      {problemSubmissions.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {activeTab === "description" ? (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="h-full"
                    >
                      <ProblemDescription problem={problem} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submissions"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="h-full"
                    >
                      <SubmissionHistory submissions={problemSubmissions} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Panel>

          {/* Resizer Handle */}
          <PanelResizeHandle className="w-1.5 bg-[#111] hover:bg-blue-600 active:bg-blue-500 transition-colors cursor-col-resize flex flex-col justify-center items-center group relative z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <GripVertical size={14} className="text-gray-600 group-hover:text-blue-300 transition-colors" />
          </PanelResizeHandle>

          {/* Right Panel: Editor & Terminal */}
          <Panel minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditor problem={problem} setExecutionResult={setExecutionResult} />
              </Panel>

              {executionResult && (
                <>
                  <PanelResizeHandle className="h-1.5 bg-[#111] hover:bg-blue-600 active:bg-blue-500 transition-colors cursor-row-resize flex justify-center items-center group relative z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <GripHorizontal size={14} className="text-gray-600 group-hover:text-blue-300 transition-colors" />
                  </PanelResizeHandle>

                  <Panel defaultSize={30} minSize={15}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full"
                    >
                      <ExecutionResultPanel result={executionResult} />
                    </motion.div>
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

export default ProblemEditorPage;
