import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { WifiOff } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/codelab": "Code Lab",
  "/aptitude": "Aptitude Hub",
  "/communication": "English & Verbal",
  "/tutorials": "Learning Tutorials",
  "/articles": "Dev-Blog",
  "/leaderboard": "Leaderboard",
  "/roadmaps": "Career Roadmaps",
};

const getPageTitle = (pathname: string): string => {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/roadmaps")) return "Career Roadmaps";
  if (pathname.startsWith("/path/")) return "Role Path";
  if (pathname.startsWith("/codelab/")) return "Code Lab";
  if (pathname.startsWith("/aptitude/")) return "Aptitude Hub";
  if (pathname.startsWith("/tutorials/")) return "Tutorial Viewer";
  if (pathname.startsWith("/articles/")) return "Article";
  return "AnbuDevs";
};

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  // Focus management on route change for accessibility
  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((previous) => !previous)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {isOffline && (
          <div className="flex items-center justify-center gap-2 bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-xs text-yellow-400" role="alert">
            <WifiOff size={14} />
            <span>You are offline. Some features may be unavailable.</span>
          </div>
        )}

        <Topbar
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          title={getPageTitle(location.pathname)}
        />

        <main className="flex-1 overflow-y-auto" role="main" aria-label="Page content">
          <Outlet />
        </main>

        <footer className="border-t border-border/60 bg-card px-4 py-3 text-xs text-muted-foreground">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span>AnbuDevs</span>
            <span>Practice consistently. Ship confidently.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
