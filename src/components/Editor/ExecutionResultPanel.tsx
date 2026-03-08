import React from "react";
import { ExecutionResult } from "@/types/problem";
import { CheckCircle2, XCircle, Clock, Database, Terminal } from "lucide-react";

interface ExecutionResultPanelProps {
    result: ExecutionResult | null;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Accepted": return "text-green-400 bg-green-400/10 border-green-400/20";
        case "Wrong Answer": return "text-red-400 bg-red-400/10 border-red-400/20";
        case "Time Limit Exceeded": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
        case "Compilation Error": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
        case "Runtime Error": return "text-red-400 bg-red-400/10 border-red-400/20";
        case "Pending": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
        default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
};

export const ExecutionResultPanel: React.FC<ExecutionResultPanelProps> = ({ result }) => {
    if (!result) return null;

    return (
        <div className="flex flex-col h-full bg-[#111] overflow-hidden border-t border-[#333]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <Terminal size={14} /> Console Output
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {result.status === "Pending" ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-blue-400">
                        <div className="w-12 h-1 bg-[#222] rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-blue-500 w-1/2 animate-[shimmer_1s_infinite]"></div>
                        </div>
                        <span className="text-xs font-mono animate-pulse uppercase tracking-widest">Executing code...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Status Banner */}
                        <div className={`flex items-center gap-3 p-3 rounded-lg border ${getStatusColor(result.status)}`}>
                            {result.status === "Accepted" ? (
                                <CheckCircle2 size={20} />
                            ) : (
                                <XCircle size={20} />
                            )}
                            <div>
                                <div className="text-sm font-bold">{result.status}</div>
                                <div className="text-[10px] opacity-70 flex items-center gap-3 mt-1">
                                    <span className="flex items-center gap-1"><Clock size={10} /> {result.runtime} ms</span>
                                    <span className="flex items-center gap-1"><Database size={10} /> {result.memory.toFixed(1)} MB</span>
                                </div>
                            </div>
                        </div>

                        {/* Output Block */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                Standards Output
                            </div>
                            <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-xs border border-[#333] transition-all hover:border-[#444]">
                                <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {result.output || "No output generated."}
                                </pre>
                            </div>
                        </div>

                        {result.expectedOutput && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                                    Expected Output
                                </div>
                                <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-xs border border-green-900/20">
                                    <pre className="text-green-400/70 whitespace-pre-wrap leading-relaxed">
                                        {result.expectedOutput}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
