import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { getProblemById } from "@/data/problems";

interface ProblemRouteGuardProps {
  children: React.ReactNode;
}

export const ProblemRouteGuard: React.FC<ProblemRouteGuardProps> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const problemId = Number(id);

  if (!id || Number.isNaN(problemId) || !getProblemById(problemId)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};
