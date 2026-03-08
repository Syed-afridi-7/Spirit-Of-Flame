import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, CheckCircle2, Circle, ChevronRight, ChevronLeft,
  ExternalLink, Filter, X, Loader2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProblems } from '@/hooks/useProblems';
import CodingHeatmap from '@/components/CodingHeatmap';
import type { Difficulty } from '@/types/problem';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  Medium: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const TOP_TOPICS = [
  'Array', 'String', 'Dynamic Programming', 'Math', 'Sorting',
  'Graphs', 'Two Pointers', 'Hash Table', 'DFS', 'BFS',
  'Binary Search', 'Stack', 'Sliding Window', 'Backtracking',
];

const CodeLab: React.FC = () => {
  const {
    loading,
    error,
    pageProblems,
    filters,
    pagination,
    stats,
    allTopics,
    allSources,
    solvedSet,
    setPage,
    updateFilter,
    toggleSolved,
    getStatus,
  } = useProblems();

  const [showFilters, setShowFilters] = useState(false);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-red-400 font-medium">Failed to load problems</p>
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Code Lab</h2>
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${stats.total.toLocaleString()} problems curated curated for your growth`}
          </p>
        </div>
        <div className="sm:ml-auto flex gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
            <span className="text-xs font-bold text-green-400">Easy</span>
            <span className="text-xs text-muted-foreground">{stats.easy.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <span className="text-xs font-bold text-orange-400">Medium</span>
            <span className="text-xs text-muted-foreground">{stats.medium.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
            <span className="text-xs font-bold text-red-400">Hard</span>
            <span className="text-xs text-muted-foreground">{stats.hard.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <CheckCircle2 size={12} className="text-purple-400" />
            <span className="text-xs font-bold text-purple-400">{stats.solved}</span>
            <span className="text-xs text-muted-foreground">Solved</span>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <CodingHeatmap />

      {/* Topic Quick Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => updateFilter('topic', 'All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filters.topic === 'All'
            ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
            : 'bg-card border-border text-muted-foreground hover:border-orange-500/20'
            }`}
        >
          All Topics
        </button>
        {TOP_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => updateFilter('topic', topic === filters.topic ? 'All' : topic)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filters.topic === topic
              ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
              : 'bg-card border-border text-muted-foreground hover:border-orange-500/20'
              }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Search + Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search by title, tag, or ID..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card/80 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={filters.difficulty}
          onChange={(e) => updateFilter('difficulty', e.target.value)}
          className="px-3 py-2.5 text-sm bg-card/80 backdrop-blur-sm border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
        >
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          className="px-3 py-2.5 text-sm bg-card/80 backdrop-blur-sm border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {((pagination.page - 1) * pagination.perPage) + 1}–{Math.min(pagination.page * pagination.perPage, pagination.totalItems)} of{' '}
          <span className="text-foreground font-semibold">{pagination.totalItems.toLocaleString()}</span> problems
        </p>
      </div>

      {/* Problem Table — Glassmorphism Style */}
      <div className="bg-card/60 backdrop-blur-md border border-border/80 rounded-2xl overflow-hidden shadow-lg shadow-black/5">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[40px_1fr_90px_140px_80px] gap-3 px-5 py-3 border-b border-border/60 bg-muted/30">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">#</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Title</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Difficulty</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Topics</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border/30">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 size={20} className="text-orange-400 animate-spin" />
              <span className="text-sm text-muted-foreground">Loading 3000 problems...</span>
            </div>
          ) : pageProblems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground text-sm">No problems found matching your filters.</p>
              <button
                onClick={() => {
                  updateFilter('search', '');
                  updateFilter('difficulty', 'All');
                  updateFilter('topic', 'All');
                  updateFilter('source', 'All');
                  updateFilter('status', 'All');
                }}
                className="mt-3 text-xs text-orange-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {pageProblems.map((problem, idx) => {
                const isSolved = solvedSet.has(problem.id);
                return (
                  <motion.div
                    key={`${problem.id}-${pagination.page}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: idx * 0.02 }}
                    className="group"
                  >
                    {/* Desktop Row */}
                    <div className="hidden md:grid grid-cols-[40px_1fr_90px_140px_80px] gap-3 px-5 py-3 items-center hover:bg-orange-500/[0.03] transition-colors cursor-pointer">
                      <span className="text-xs text-muted-foreground font-mono">{problem.id}</span>

                      <div className="flex items-center gap-2 min-w-0">
                        <Link
                          to={`/codelab/problem/${problem.id}`}
                          className="text-sm font-medium text-foreground group-hover:text-orange-400 transition-colors truncate"
                        >
                          {problem.title}
                        </Link>
                      </div>

                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border w-fit ${DIFFICULTY_STYLES[problem.difficulty]}`}>
                        {problem.difficulty}
                      </span>

                      <div className="flex gap-1 flex-wrap">
                        {problem.tags.slice(0, 2).map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault();
                              updateFilter('topic', tag);
                            }}
                            className="text-[10px] px-2 py-0.5 bg-muted/60 rounded-md text-muted-foreground hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                        {problem.tags.length > 2 && (
                          <span className="text-[10px] text-muted-foreground/50">+{problem.tags.length - 2}</span>
                        )}
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleSolved(problem.id)}
                          className="transition-transform hover:scale-110"
                          title={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                        >
                          {isSolved ? (
                            <CheckCircle2 size={18} className="text-green-400" />
                          ) : (
                            <Circle size={18} className="text-border hover:text-orange-400 transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Mobile Card */}
                    <Link
                      to={`/codelab/problem/${problem.id}`}
                      className="md:hidden flex items-start gap-3 px-4 py-3 hover:bg-orange-500/[0.03] transition-colors"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSolved(problem.id);
                        }}
                        className="mt-0.5 flex-shrink-0"
                      >
                        {isSolved ? (
                          <CheckCircle2 size={16} className="text-green-400" />
                        ) : (
                          <Circle size={16} className="text-border" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-muted-foreground font-mono">#{problem.id}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[problem.difficulty]}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">{problem.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{problem.summary}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-orange-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={14} /> Prev
          </button>

          {generatePageNumbers(pagination.page, pagination.totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`dots-${i}`} className="px-2 text-muted-foreground text-xs">...</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`w-9 h-9 text-xs font-semibold rounded-lg border transition-all ${pagination.page === p
                  ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-orange-500/20'
                  }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => setPage(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-orange-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

function generatePageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | string)[] = [];

  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return pages;
}

export default CodeLab;
