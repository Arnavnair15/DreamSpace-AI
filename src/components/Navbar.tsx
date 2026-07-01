import { Sun, Moon, Sparkles, LayoutDashboard, Compass, LogIn, LogOut, Coins, Home } from "lucide-react";
import { UserProfile } from "../types";

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  user,
  onLogout
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-header transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand */}
        <div 
          onClick={() => setCurrentView("landing")} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="h-5.5 w-5.5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold tracking-tight text-slate-900 dark:text-white text-lg leading-tight">
              DreamSpace<span className="text-indigo-600 dark:text-indigo-400"> AI</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
              Design Workspace
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/20 dark:bg-slate-900/30 p-1 rounded-full border border-slate-200/30 dark:border-slate-800/40 backdrop-blur-md">
          <button
            onClick={() => setCurrentView("landing")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              currentView === "landing"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          
          <button
            onClick={() => setCurrentView("studio")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              currentView === "studio"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            Design Studio
          </button>

          <button
            onClick={() => setCurrentView("dashboard")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              currentView === "dashboard"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Credit Status */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span>{user.credits} Credits</span>
              </div>

              {/* Profile dropdown / Avatar */}
              <div className="flex items-center gap-2">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl border-2 border-white dark:border-slate-800 object-cover shadow-sm"
                />
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView("auth")}
              className="flex items-center gap-1.5 px-4.5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/15 transition-all duration-200 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}

        </div>
      </div>

      {/* Mobile Nav Bar Footer (Tab-like navigation for great usability on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 border-t border-slate-200/50 dark:border-slate-800/50 px-6 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setCurrentView("landing")}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
              currentView === "landing" ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setCurrentView("studio")}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
              currentView === "studio" ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Studio</span>
          </button>
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
              currentView === "dashboard" ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => (user ? setCurrentView("dashboard") : setCurrentView("auth"))}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
              currentView === "auth" ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span>{user ? "Profile" : "Sign In"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
