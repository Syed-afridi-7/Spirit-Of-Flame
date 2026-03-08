import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Database, Calendar, Code2 } from "lucide-react";
import { SubmissionRecord } from "@/types/problem";
import { formatDistanceToNow } from "date-fns";

interface SubmissionHistoryProps {
    submissions: SubmissionRecord[];
}

const getVerdictColor = (verdict: string) => {
    switch (verdict) {
        case "Accepted": return "text-green-500 bg-green-500/10";
        case "Wrong Answer": return "text-red-500 bg-red-500/10";
        case "Time Limit Exceeded": return "text-orange-500 bg-orange-500/10";
        case "Compilation Error": return "text-yellow-500 bg-yellow-500/10";
        case "Runtime Error": return "text-red-500 bg-red-500/10";
        default: return "text-gray-400 bg-gray-400/10";
    }
};

export const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({ submissions }) => {
    if (submissions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#1e1e1e]">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <Calendar className="text-gray-500 w-8 h-8" />
                </div>
                <h3 className="text-gray-300 font-semibold mb-2">No Submissions Yet</h3>
                <p className="text-gray-500 text-sm max-w-[200px]">
                    Start solving the problem and your results will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] overflow-y-auto">
            <div className="p-4 space-y-3">
                {submissions.map((sub, index) => (
                    <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-[#2d2d2d] rounded-lg border border-[#333] hover:border-gray-500 transition-all p-4 group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {sub.verdict === "Accepted" ? (
                                    <CheckCircle2 size={16} className="text-green-500" />
                                ) : (
                                    <XCircle size={16} className="text-red-500" />
                                )}
                                <span className={`text-sm font-bold ${getVerdictColor(sub.verdict).split(' ')[0]}`}>
                                    {sub.verdict}
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                                {formatDistanceToNow(sub.timestamp, { addSuffix: true })}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-[11px] mb-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Code2 size={12} />
                                <span>{sub.language}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 justify-end">
                                <Clock size={12} />
                                <span>{sub.runtime} ms</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Database size={12} />
                                <span>{sub.memory.toFixed(1)} MB</span>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] rounded p-2 text-[10px] font-mono whitespace-pre overflow-hidden text-gray-500 group-hover:text-gray-400 transition-colors max-h-16">
                            {sub.code.split('\n').slice(0, 3).join('\n')}
                            {sub.code.split('\n').length > 3 && "\n..."}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
