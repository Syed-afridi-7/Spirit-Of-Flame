import React, { useState } from "react";
import { Lightbulb, Eye, EyeOff, Clock, Cpu, ChevronRight } from "lucide-react";
import type { ProblemDetail } from "@/types";

interface EditorialPanelProps {
  problem: ProblemDetail;
}

// Progressive hints system
const generateHints = (problem: ProblemDetail): string[] => {
  const hints: string[] = [];

  if (problem.tags?.includes("Array") || problem.tags?.includes("Hash Table")) {
    hints.push("Think about what data structure allows O(1) lookups.");
  }
  if (problem.tags?.includes("Two Pointers")) {
    hints.push("Consider using two pointers from different ends of the array.");
  }
  if (problem.tags?.includes("Dynamic Programming")) {
    hints.push("Can you break this problem into overlapping subproblems?");
    hints.push("Try defining a recurrence relation first, then optimize with memoization.");
  }
  if (problem.tags?.includes("Binary Search")) {
    hints.push("The input might be sorted or have a monotonic property you can exploit.");
  }
  if (problem.tags?.includes("String")) {
    hints.push("Consider using a sliding window or character frequency map.");
  }
  if (problem.tags?.includes("Tree") || problem.tags?.includes("DFS")) {
    hints.push("Think about recursive tree traversal. What do you need from left and right subtrees?");
  }
  if (problem.tags?.includes("Graph") || problem.tags?.includes("BFS")) {
    hints.push("Model this as a graph problem. Consider BFS for shortest path in unweighted graphs.");
  }

  if (hints.length === 0) {
    hints.push("Start by identifying the brute force approach, then think about how to optimize.");
    hints.push("Consider edge cases: empty input, single element, duplicates.");
  }

  hints.push("Try to solve it on paper first before coding.");

  return hints;
};

// Related problems suggestions based on tags
const getRelatedTopics = (problem: ProblemDetail): string[] => {
  const related: string[] = [];
  const tags = problem.tags ?? [];

  if (tags.includes("Array")) related.push("Two Sum", "Best Time to Buy and Sell Stock", "Contains Duplicate");
  if (tags.includes("String")) related.push("Valid Anagram", "Longest Substring Without Repeating", "Palindrome");
  if (tags.includes("Dynamic Programming")) related.push("Climbing Stairs", "House Robber", "Coin Change");
  if (tags.includes("Tree")) related.push("Maximum Depth of Binary Tree", "Invert Binary Tree", "Validate BST");
  if (tags.includes("Graph")) related.push("Number of Islands", "Clone Graph", "Course Schedule");

  return related.length > 0 ? related.slice(0, 5) : ["Two Sum", "Valid Parentheses", "Merge Sorted Array"];
};

export const EditorialPanel: React.FC<EditorialPanelProps> = ({ problem }) => {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showEditorial, setShowEditorial] = useState(false);

  const hints = generateHints(problem);
  const relatedTopics = getRelatedTopics(problem);

  const revealNextHint = () => {
    setRevealedHints((prev) => Math.min(prev + 1, hints.length));
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e] px-5 py-4 space-y-6">
      {/* Hints Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-yellow-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Hints ({revealedHints}/{hints.length})
          </span>
        </div>

        <div className="space-y-2">
          {hints.map((hint, i) => (
            <div
              key={i}
              className={`rounded-lg border p-3 transition-all ${
                i < revealedHints
                  ? "border-yellow-500/20 bg-yellow-500/5"
                  : "border-[#333] bg-[#161616]"
              }`}
            >
              {i < revealedHints ? (
                <p className="text-sm text-yellow-200/80 leading-relaxed">{hint}</p>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Hint #{i + 1}</span>
                  <span className="text-[10px] text-gray-600">Hidden</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {revealedHints < hints.length && (
          <button
            onClick={revealNextHint}
            className="mt-3 flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-colors"
          >
            <Eye size={12} /> Reveal Hint #{revealedHints + 1}
          </button>
        )}
      </div>

      {/* Complexity Analysis */}
      {problem.optimalComplexity && (
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Optimal Complexity
          </div>
          <div className="flex gap-3">
            <div className="flex-1 rounded-lg border border-[#333] bg-[#161616] p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Time</span>
              </div>
              <code className="text-sm text-blue-300 font-mono">{problem.optimalComplexity.time}</code>
            </div>
            <div className="flex-1 rounded-lg border border-[#333] bg-[#161616] p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Cpu size={12} className="text-green-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Space</span>
              </div>
              <code className="text-sm text-green-300 font-mono">{problem.optimalComplexity.space}</code>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Toggle */}
      <div>
        <button
          onClick={() => setShowEditorial(!showEditorial)}
          className="flex items-center gap-2 px-4 py-2.5 w-full text-xs font-medium rounded-lg border border-[#333] bg-[#161616] text-gray-300 hover:border-purple-500/30 hover:text-purple-300 transition-colors"
        >
          {showEditorial ? <EyeOff size={14} /> : <Eye size={14} />}
          {showEditorial ? "Hide Editorial" : "Show Editorial Solution"}
        </button>

        {showEditorial && (
          <div className="mt-3 rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
            <h4 className="text-sm font-semibold text-purple-300 mb-2">Approach</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              This problem can be solved efficiently by thinking about the relationship between the input and the desired output.
              Consider what auxiliary data structure would help you avoid redundant comparisons.
            </p>
            <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Steps</h4>
            <ol className="text-xs text-gray-400 leading-relaxed space-y-1 list-decimal list-inside">
              <li>Identify the brute force approach and its time complexity</li>
              <li>Look for repeated work that can be eliminated</li>
              <li>Choose the right data structure (hash map, set, etc.)</li>
              <li>Implement the optimized solution</li>
              <li>Handle edge cases</li>
            </ol>
          </div>
        )}
      </div>

      {/* Related Problems */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Related Problems
        </div>
        <div className="space-y-1.5">
          {relatedTopics.map((topic, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#333] bg-[#161616] hover:border-orange-500/20 transition-colors cursor-pointer"
            >
              <span className="text-xs text-gray-300">{topic}</span>
              <ChevronRight size={12} className="text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
