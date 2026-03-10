import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search, LogOut, LogIn, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface TopbarProps {
    onMobileMenuToggle: () => void;
    title?: string;
}

const Topbar: React.FC<TopbarProps> = ({ onMobileMenuToggle, title = 'Dashboard' }) => {
    const { user, signOut } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getInitials = () => {
        if (!user) return "?";
        if (user.displayName) {
            return user.displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
        }
        if (user.email) return user.email[0].toUpperCase();
        return "U";
    };

    return (
        <header className="sticky top-0 z-30 flex items-center h-14 px-4 gap-4 bg-card border-b border-border/60 shadow-sm">
            {/* Mobile menu button */}
            <button
                className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
                onClick={onMobileMenuToggle}
                aria-label="Toggle menu"
            >
                <Menu size={20} />
            </button>

            {/* Title */}
            <h1 className="text-sm font-semibold text-foreground hidden sm:block">{title}</h1>

            {/* Search */}
            <div className="flex-1 max-w-xs mx-auto lg:mx-0">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                    <input
                        type="text"
                        placeholder="Search problems, topics..."
                        className="w-full pl-8 pr-4 py-1.5 text-xs bg-muted rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-orange-500/50 text-foreground placeholder:text-muted-foreground"
                        aria-label="Search problems and topics"
                    />
                </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
                {/* Streak */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <span className="text-sm" aria-hidden="true">🔥</span>
                    <span className="text-xs font-bold text-orange-400">7 days</span>
                </div>

                {/* Notifications */}
                <button
                    className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
                </button>

                {/* User Avatar / Auth */}
                <div className="relative" ref={dropdownRef}>
                    {user ? (
                        <>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2"
                                aria-label="User menu"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="w-8 h-8 rounded-full object-cover border-2 border-orange-500/30"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                                        {getInitials()}
                                    </div>
                                )}
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                                    <div className="px-4 py-2 border-b border-border">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {user.displayName || "User"}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-red-400 hover:bg-muted transition-colors"
                                    >
                                        <LogOut size={14} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            <LogIn size={14} /> Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
