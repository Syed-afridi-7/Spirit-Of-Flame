import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Code2, Brain, MessageSquare, ChevronLeft,
  ChevronRight, Trophy, Shield, BookOpen, X, FileText, Map, LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  {
    section: 'DASHBOARD',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    ],
  },
  {
    section: 'MODULE A: TECHNICAL CORE',
    items: [
      { to: '/codelab', icon: Code2, label: 'Coding Practice' },
      { to: '/tutorials', icon: BookOpen, label: 'Learning Tutorials' },
      { to: '/contest', icon: Trophy, label: 'Contest Mode' },
      { to: '/practice/cyber-security', icon: Shield, label: 'Cybersecurity' },
    ],
  },
  {
    section: 'MODULE B: PLACEMENT',
    items: [
      { to: '/aptitude', icon: Brain, label: 'Aptitude' },
      { to: '/communication', icon: MessageSquare, label: 'English & Verbal' },
    ],
  },
  {
    section: 'RESOURCES',
    items: [
      { to: '/articles', icon: FileText, label: 'Dev-Blog' },
      { to: '/roadmaps', icon: Map, label: 'Career Roadmaps' },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const getInitials = () => {
    if (!user) return "?";
    if (user.displayName) {
      return user.displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    }
    if (user.email) return user.email[0].toUpperCase();
    return "U";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border/60 transition-all duration-300",
        collapsed ? "justify-center" : ""
      )}>
        <div className="flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center glow-orange border border-orange-500/20">
          <img src="/mylogo.jpeg" alt="AnbuDevs Logo" className="w-full h-full object-cover" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-bold text-base text-foreground leading-tight">AnbuDevs</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar" aria-label="Main navigation">
        {navItems.map((group) => (
          <div key={group.section} className="mb-4">
            {!collapsed && (
              <div className="px-4 mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const active = isActive(item.to, item.exact);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                    active
                      ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <item.icon className={cn(
                    "flex-shrink-0 w-4.5 h-4.5 transition-colors",
                    active ? "text-orange-400" : "text-muted-foreground group-hover:text-foreground"
                  )} size={18} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {active && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User / Footer */}
      <div className={cn(
        "border-t border-border/60 p-3",
        collapsed ? "flex justify-center" : ""
      )}>
        {user ? (
          <div className={cn(
            "flex items-center gap-3 rounded-lg p-2 hover:bg-muted cursor-pointer transition-colors",
            collapsed ? "justify-center" : ""
          )}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-orange-500/30"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {getInitials()}
              </div>
            )}
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {user.displayName || "User"}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user.email}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className={cn(
              "flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
              collapsed ? "justify-center" : ""
            )}
          >
            <LogIn size={18} />
            {!collapsed && <span>Sign In</span>}
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:hidden transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <button
          onClick={onMobileClose}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted text-muted-foreground"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col relative border-r border-border/60 bg-card transition-all duration-300 h-full",
        collapsed ? "w-16" : "w-60"
      )}>
        <SidebarContent />

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
