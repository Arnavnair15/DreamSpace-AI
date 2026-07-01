import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import DesignStudio from "./components/DesignStudio";
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import { USER_PROFILE, SAMPLE_PROJECTS } from "./data/mockData";
import { UserProfile, Project } from "./types";

export default function App() {
  // Current view tracker ("landing" | "studio" | "dashboard" | "auth")
  const [currentView, setCurrentView] = useState<string>("landing");

  // Premium Dark Mode state (defaults to true for a luxurious, futuristic vibe)
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Authenticated user profile state (pre-authenticated out of the box for supreme sandbox usability)
  const [user, setUser] = useState<UserProfile | null>(USER_PROFILE);

  // Active projects database state (allows live additions and deletions)
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);

  // Synchronize document dark mode classes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle credit deductions
  const deductCredit = (): boolean => {
    if (!user) return false;
    if (user.credits <= 0) return false;

    setUser({
      ...user,
      credits: user.credits - 1
    });
    return true;
  };

  // Handle dynamic additions of credits
  const handleAddCredits = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        credits: Math.min(user.maxCredits, user.credits + amount)
      });
    }
  };

  // Handle saving new projects from the AI Design Studio
  const handleSaveProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  // Handle authentications
  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("landing");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-250 font-sans pb-16 md:pb-0 relative overflow-hidden">
      
      {/* Decorative Frosted Glass Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-[15%] left-[-10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-cyan-500/5 dark:bg-cyan-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-[35%] left-[20%] w-[500px] h-[500px] bg-purple-500/3 dark:bg-purple-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Glassmorphic Navigation */}
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          onLogout={handleLogout}
        />

        {/* Main View Transition Stage */}
        <main className="flex-1">
          {currentView === "landing" && (
            <LandingPage 
              setCurrentView={setCurrentView} 
              projects={projects} 
            />
          )}
          
          {currentView === "studio" && (
            user ? (
              <DesignStudio
                user={user}
                deductCredit={deductCredit}
                onSaveProject={handleSaveProject}
                setCurrentView={setCurrentView}
              />
            ) : (
              <AuthPage 
                onLogin={handleLogin} 
                setCurrentView={setCurrentView} 
              />
            )
          )}

          {currentView === "dashboard" && (
            user ? (
              <Dashboard
                user={user}
                projects={projects}
                setProjects={setProjects}
                setCurrentView={setCurrentView}
                onAddCredits={handleAddCredits}
              />
            ) : (
              <AuthPage 
                onLogin={handleLogin} 
                setCurrentView={setCurrentView} 
              />
            )
          )}

          {currentView === "auth" && (
            <AuthPage 
              onLogin={handleLogin} 
              setCurrentView={setCurrentView} 
            />
          )}
        </main>

        {/* Global Sleek Footer (Omitted on Auth Screen for supreme form focus) */}
        {currentView !== "auth" && <Footer />}
      </div>

    </div>
  );
}
