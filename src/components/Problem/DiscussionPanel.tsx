import React, { useState, useMemo } from "react";
import { MessageSquare, ThumbsUp, Send, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: number;
  likes: number;
  liked: boolean;
  replies: Comment[];
}

interface DiscussionPanelProps {
  problemId: number;
}

// Local state discussions for now — will be synced to Firestore when auth is configured
const generateMockDiscussions = (problemId: number): Comment[] => [
  {
    id: "1",
    author: "CodeNinja42",
    avatar: null,
    content: "I solved this using a hash map approach. O(n) time and O(n) space. The key insight is to store complements as you iterate.",
    timestamp: Date.now() - 3600000 * 2,
    likes: 12,
    liked: false,
    replies: [
      {
        id: "1-1",
        author: "AlgoMaster",
        avatar: null,
        content: "Great approach! You can also use two pointers if the array is sorted.",
        timestamp: Date.now() - 3600000,
        likes: 5,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "ByteWizard",
    avatar: null,
    content: "For anyone stuck: think about what information you need to look up quickly. That's a hint towards the right data structure.",
    timestamp: Date.now() - 86400000,
    likes: 8,
    liked: false,
    replies: [],
  },
];

export const DiscussionPanel: React.FC<DiscussionPanelProps> = ({ problemId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(() => generateMockDiscussions(problemId));
  const [newComment, setNewComment] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const sortedComments = useMemo(
    () => [...comments].sort((a, b) => b.likes - a.likes),
    [comments],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      author: user?.displayName || "Anonymous",
      avatar: user?.photoURL || null,
      content: newComment.trim(),
      timestamp: Date.now(),
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const toggleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c,
      ),
    );
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-[#333]">
        <MessageSquare size={14} className="text-blue-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Discussion ({comments.length})
        </span>
      </div>

      {/* Comments */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-4">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="rounded-lg border border-[#333] bg-[#161616] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                  {comment.author[0]}
                </div>
                <span className="text-xs font-medium text-gray-300">{comment.author}</span>
                <span className="text-[10px] text-gray-600">{formatTime(comment.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{comment.content}</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    comment.liked ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <ThumbsUp size={12} /> {comment.likes}
                </button>
                {comment.replies.length > 0 && (
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {expandedReplies.has(comment.id) ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                  </button>
                )}
              </div>
            </div>

            {/* Replies */}
            {expandedReplies.has(comment.id) && comment.replies.length > 0 && (
              <div className="ml-6 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-[9px] text-white font-bold">
                        {reply.author[0]}
                      </div>
                      <span className="text-[11px] font-medium text-gray-300">{reply.author}</span>
                      <span className="text-[10px] text-gray-600">{formatTime(reply.timestamp)}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="border-t border-[#333] px-5 py-3">
        <div className="flex items-center gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? "Share your approach..." : "Sign in to discuss"}
            disabled={!user}
            className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-gray-300 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!user || !newComment.trim()}
            className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-30"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};
