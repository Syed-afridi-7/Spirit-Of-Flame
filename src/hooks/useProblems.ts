import { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';
import type { CsvProblem, CsvProblemRaw, Difficulty, ProblemFilters, PaginationState, SolveStatus } from '@/types/problem';

const STORAGE_KEY = 'anbudevs-solved-problems';
const PER_PAGE = 25;

function parseCsvRow(raw: CsvProblemRaw): CsvProblem {
  return {
    id: parseInt(raw.id, 10),
    title: raw.title?.trim() ?? '',
    source: (raw.source?.trim() ?? 'LeetCode') as CsvProblem['source'],
    difficulty: (raw.difficulty?.trim() ?? 'Medium') as Difficulty,
    tags: raw.tags
      ? raw.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [],
    link: raw.link?.trim() ?? '',
    summary: raw.summary?.trim() ?? '',
  };
}

function getSolvedSet(): Set<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored) as number[]);
  } catch { /* ignore */ }
  return new Set();
}

function saveSolvedSet(set: Set<number>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function useProblems() {
  const [allProblems, setAllProblems] = useState<CsvProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solvedSet, setSolvedSet] = useState<Set<number>>(getSolvedSet);

  const [filters, setFilters] = useState<ProblemFilters>({
    search: '',
    difficulty: 'All',
    topic: 'All',
    source: 'All',
    status: 'All',
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    perPage: PER_PAGE,
    totalPages: 1,
    totalItems: 0,
  });

  // Load CSV on mount
  useEffect(() => {
    setLoading(true);
    fetch('/data/problems.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load problems: ${res.status}`);
        return res.text();
      })
      .then((csvText) => {
        const result = Papa.parse<CsvProblemRaw>(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        if (result.errors.length > 0) {
          console.warn('CSV parse warnings:', result.errors.slice(0, 5));
        }

        const parsed = result.data
          .map(parseCsvRow)
          .filter((p) => p.id > 0 && p.title.length > 0);

        setAllProblems(parsed);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error loading problems');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Unique tags for filter dropdown
  const allTopics = useMemo(() => {
    const tagSet = new Set<string>();
    allProblems.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [allProblems]);

  // Unique sources
  const allSources = useMemo(() => {
    const sourceSet = new Set<string>();
    allProblems.forEach((p) => sourceSet.add(p.source));
    return Array.from(sourceSet).sort();
  }, [allProblems]);

  // Filtered list
  const filtered = useMemo(() => {
    return allProblems.filter((p) => {
      const searchLower = filters.search.toLowerCase();
      const matchSearch =
        !filters.search ||
        p.title.toLowerCase().includes(searchLower) ||
        p.tags.some((t) => t.toLowerCase().includes(searchLower)) ||
        p.summary.toLowerCase().includes(searchLower) ||
        p.id.toString() === filters.search;

      const matchDifficulty =
        filters.difficulty === 'All' || p.difficulty === filters.difficulty;

      const matchTopic =
        filters.topic === 'All' || p.tags.includes(filters.topic);

      const matchSource =
        filters.source === 'All' || p.source === filters.source;

      const matchStatus = (() => {
        if (filters.status === 'All') return true;
        const isSolved = solvedSet.has(p.id);
        if (filters.status === 'solved') return isSolved;
        if (filters.status === 'unsolved') return !isSolved;
        return true;
      })();

      return matchSearch && matchDifficulty && matchTopic && matchSource && matchStatus;
    });
  }, [allProblems, filters, solvedSet]);

  // Stats
  const stats = useMemo(() => {
    const total = allProblems.length;
    const easy = allProblems.filter((p) => p.difficulty === 'Easy').length;
    const medium = allProblems.filter((p) => p.difficulty === 'Medium').length;
    const hard = allProblems.filter((p) => p.difficulty === 'Hard').length;
    const solved = solvedSet.size;
    return { total, easy, medium, hard, solved, filtered: filtered.length };
  }, [allProblems, filtered, solvedSet]);

  // Update pagination when filtered list changes
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / pagination.perPage));
    setPagination((prev) => ({
      ...prev,
      totalPages,
      totalItems: filtered.length,
      page: Math.min(prev.page, totalPages),
    }));
  }, [filtered.length, pagination.perPage]);

  // Current page slice
  const pageProblems = useMemo(() => {
    const start = (pagination.page - 1) * pagination.perPage;
    return filtered.slice(start, start + pagination.perPage);
  }, [filtered, pagination.page, pagination.perPage]);

  // Actions
  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page: Math.max(1, Math.min(page, prev.totalPages)) }));
  }, []);

  const updateFilter = useCallback((key: keyof ProblemFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const toggleSolved = useCallback((id: number) => {
    setSolvedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveSolvedSet(next);
      return next;
    });
  }, []);

  const getStatus = useCallback(
    (id: number): SolveStatus => {
      return solvedSet.has(id) ? 'solved' : 'unsolved';
    },
    [solvedSet],
  );

  return {
    loading,
    error,
    allProblems,
    pageProblems,
    filtered,
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
  };
}
