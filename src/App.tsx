import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import { ProblemRouteGuard } from "@/components/routes/ProblemRouteGuard";
import { AuthProvider } from "@/contexts/AuthContext";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const CodeLab = lazy(() => import("./pages/CodeLab"));
const AptitudeHub = lazy(() => import("./pages/AptitudeHub"));
const Communication = lazy(() => import("./pages/Communication"));
const RolePaths = lazy(() => import("./pages/RolePaths"));
const ProblemEditorPage = lazy(() => import("./pages/ProblemEditorPage"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const TutorialViewer = lazy(() => import("./pages/TutorialViewer"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleView = lazy(() => import("./pages/ArticleView"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Roadmaps = lazy(() => import("./pages/Roadmaps"));
const ContestPage = lazy(() => import("./pages/ContestPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
    Loading...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppErrorBoundary>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/codelab/problem/:id"
                  element={
                    <ProblemRouteGuard>
                      <ProblemEditorPage />
                    </ProblemRouteGuard>
                  }
                />
                <Route path="/contest" element={<ContestPage />} />

                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/codelab" element={<CodeLab />} />
                  <Route path="/aptitude" element={<AptitudeHub />} />
                  <Route path="/communication" element={<Communication />} />
                  <Route path="/path/:role" element={<RolePaths />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/tutorials/:topicId" element={<TutorialViewer />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id" element={<ArticleView />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/roadmaps" element={<Roadmaps />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AppErrorBoundary>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
