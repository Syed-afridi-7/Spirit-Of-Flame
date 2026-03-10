import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import type {
  CsvProblem,
  CsvProblemRaw,
  Difficulty,
  PaginationState,
  ProblemFilters,
  SolveStatus,
} from "@/types";

const STORAGE_KEY = "anbudevs-solved-problems";
const PER_PAGE = 25;

const parseCsvRow = (raw: CsvProblemRaw): CsvProblem => ({
  id: Number.parseInt(raw.id, 10),
  title: raw.title?.trim() ?? "",
  source: (raw.source?.trim() ?? "LeetCode") as CsvProblem["source"],
  difficulty: (raw.difficulty?.trim() ?? "Medium") as Difficulty,
  tags: raw.tags ? raw.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
  link: raw.link?.trim() ?? "",
  summary: raw.summary?.trim() ?? "",
});

const getSolvedSet = (): Set<number> => {
  if (typeof window === "undefined") {
    return new Set<number>();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as number[];
      return new Set<number>(parsed);
    }
  } catch {
    return new Set<number>();
  }

  return new Set<number>();
};

const saveSolvedSet = (set: Set<number>): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
};

const fetchProblemsCsv = async (): Promise<CsvProblem[]> => {
  const response = await fetch("/data/problems.csv");
  if (!response.ok) {
    throw new Error(`Failed to load problems: ${response.status}`);
  }

  const csvText = await response.text();
  const result = Papa.parse<CsvProblemRaw>(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  if (result.errors.length > 0) {
    const firstError = result.errors[0];
    throw new Error(`CSV parse error: ${firstError.message}`);
  }

  return result.data
    .map(parseCsvRow)
    .filter((problem) => problem.id > 0 && problem.title.length > 0);
};

export function useProblems() {
  const [filters, setFilters] = useState<ProblemFilters>({
    search: "",
    difficulty: "All",
    topic: "All",
    source: "All",
    status: "All",
  });
  const [solvedSet, setSolvedSet] = useState<Set<number>>(getSolvedSet);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    perPage: PER_PAGE,
    totalPages: 1,
    totalItems: 0,
  });

  const {
    data: allProblems = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["problems-csv"],
    queryFn: fetchProblemsCsv,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    allProblems.forEach((problem) => {
      problem.tags.forEach((tag) => topics.add(tag));
    });
    return Array.from(topics).sort();
  }, [allProblems]);

  const allSources = useMemo(() => {
    const sources = new Set<string>();
    allProblems.forEach((problem) => sources.add(problem.source));
    return Array.from(sources).sort();
  }, [allProblems]);

  const filtered = useMemo(() => {
    return allProblems.filter((problem) => {
      const searchValue = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        problem.title.toLowerCase().includes(searchValue) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(searchValue)) ||
        problem.summary.toLowerCase().includes(searchValue) ||
        problem.id.toString() === filters.search;

      const matchesDifficulty =
        filters.difficulty === "All" || problem.difficulty === filters.difficulty;
      const matchesTopic = filters.topic === "All" || problem.tags.includes(filters.topic);
      const matchesSource = filters.source === "All" || problem.source === filters.source;

      if (filters.status === "All") {
        return matchesSearch && matchesDifficulty && matchesTopic && matchesSource;
      }

      const isSolved = solvedSet.has(problem.id);
      const matchesStatus =
        filters.status === "solved" ? isSolved : filters.status === "unsolved" ? !isSolved : true;

      return (
        matchesSearch && matchesDifficulty && matchesTopic && matchesSource && matchesStatus
      );
    });
  }, [allProblems, filters, solvedSet]);

  const stats = useMemo(() => {
    const total = allProblems.length;
    const easy = allProblems.filter((problem) => problem.difficulty === "Easy").length;
    const medium = allProblems.filter((problem) => problem.difficulty === "Medium").length;
    const hard = allProblems.filter((problem) => problem.difficulty === "Hard").length;
    const solved = solvedSet.size;
    return { total, easy, medium, hard, solved, filtered: filtered.length };
  }, [allProblems, filtered.length, solvedSet]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / pagination.perPage));
    setPagination((previous) => ({
      ...previous,
      totalPages,
      totalItems: filtered.length,
      page: Math.min(previous.page, totalPages),
    }));
  }, [filtered.length, pagination.perPage]);

  const pageProblems = useMemo(() => {
    const start = (pagination.page - 1) * pagination.perPage;
    return filtered.slice(start, start + pagination.perPage);
  }, [filtered, pagination.page, pagination.perPage]);

  const setPage = useCallback((page: number) => {
    setPagination((previous) => ({
      ...previous,
      page: Math.max(1, Math.min(page, previous.totalPages)),
    }));
  }, []);

  const updateFilter = useCallback((key: keyof ProblemFilters, value: string) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPagination((previous) => ({ ...previous, page: 1 }));
  }, []);

  const toggleSolved = useCallback((id: number) => {
    setSolvedSet((previous) => {
      const next = new Set<number>(previous);
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
    (id: number): SolveStatus => (solvedSet.has(id) ? "solved" : "unsolved"),
    [solvedSet],
  );

  return {
    loading,
    error: error instanceof Error ? error.message : null,
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
