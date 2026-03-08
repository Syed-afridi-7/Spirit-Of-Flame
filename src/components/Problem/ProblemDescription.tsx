import React from "react";
import { ProblemDetail } from "@/types/problem";

interface ProblemDescriptionProps {
    problem: ProblemDetail;
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "Easy": return "text-green-500 bg-green-500/10";
        case "Medium": return "text-yellow-500 bg-yellow-500/10";
        case "Hard": return "text-red-500 bg-red-500/10";
        default: return "text-gray-500 bg-gray-500/10";
    }
};

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-white overflow-y-auto w-full">
            <div className="p-6 max-w-4xl mx-auto w-full">
                <h1 className="text-2xl font-bold mb-3">{problem.id}. {problem.title}</h1>

                <div className="flex items-center gap-3 mb-6">
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                    {problem.tags?.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded text-xs bg-gray-800 text-gray-300">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="text-gray-300 mb-8 whitespace-pre-wrap leading-relaxed">
                    {problem.description}
                </div>

                {problem.optimalComplexity && (
                    <div className="mb-8 border border-blue-500/30 bg-blue-900/10 rounded-lg p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                            Optimal Complexity Hint
                        </h3>
                        <div className="grid grid-cols-1 gap-2 text-sm font-medium">
                            {problem.optimalComplexity.time && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-36">Time Complexity:</span>
                                    <span className="text-emerald-400 font-mono">{problem.optimalComplexity.time}</span>
                                </div>
                            )}
                            {problem.optimalComplexity.space && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 w-36">Space Complexity:</span>
                                    <span className="text-emerald-400 font-mono">{problem.optimalComplexity.space}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="space-y-6 mb-8">
                    {problem.examples.map((ex, i) => (
                        <div key={i} className="bg-[#2d2d2d] rounded-lg p-5 border border-[#333]">
                            <p className="text-sm font-semibold text-white mb-3">Example {i + 1}:</p>
                            <div className="font-mono text-sm space-y-2">
                                <p><span className="text-gray-400">Input:</span> <span className="text-gray-200">{ex.input}</span></p>
                                <p><span className="text-gray-400">Output:</span> <span className="text-gray-200">{ex.output}</span></p>
                                {ex.explanation && (
                                    <p className="whitespace-pre-wrap mt-2 text-gray-300 border-t border-[#444] pt-2"><span className="text-gray-400">Explanation:</span> {ex.explanation}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <p className="text-sm font-semibold text-white mb-3">Constraints:</p>
                    <ul className="list-disc list-inside space-y-2 bg-[#2d2d2d] p-5 rounded-lg border border-[#333]">
                        {problem.constraints.map((c, i) => (
                            <li key={i} className="text-sm text-gray-300 font-mono" dangerouslySetInnerHTML={{ __html: c }} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
