import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Coins, 
  ArrowUpRight, 
  Clock, 
  Heart, 
  Trash2, 
  SlidersHorizontal, 
  ChevronRight, 
  Plus, 
  Eye, 
  Lightbulb, 
  User,
  Compass,
  Zap,
  CheckCircle,
  Wrench
} from "lucide-react";
import { UserProfile, Project, RoomStyle } from "../types";
import { ROOM_STYLES } from "../data/mockData";
import CompareSlider from "./CompareSlider";

interface DashboardProps {
  user: UserProfile;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  setCurrentView: (view: string) => void;
  onAddCredits: (amount: number) => void;
}

export default function Dashboard({
  user,
  projects,
  setProjects,
  setCurrentView,
  onAddCredits
}: DashboardProps) {
  // Inspecting specific project state
  const [activeCompareProject, setActiveCompareProject] = useState<Project | null>(null);

  // Buy modal state
  const [showBuySuccess, setShowBuySuccess] = useState(false);

  // Style affinity stats
  const styleAffinity = [
    { name: "Japandi", percentage: 48, color: "from-indigo-600 to-indigo-400" },
    { name: "Industrial Loft", percentage: 28, color: "from-cyan-500 to-teal-400" },
    { name: "Scandinavian", percentage: 14, color: "from-amber-500 to-orange-400" },
    { name: "Modern Minimalist", percentage: 10, color: "from-rose-500 to-pink-500" }
  ];

  // Simulated Weekly Renders for SVG Line Chart
  const weeklyRenderData = [
    { day: "Mon", count: 2, coordX: 50, coordY: 150 },
    { day: "Tue", count: 5, coordX: 130, coordY: 90 },
    { day: "Wed", count: 3, coordX: 210, coordY: 130 },
    { day: "Thu", count: 8, coordX: 290, coordY: 40 },
    { day: "Fri", count: 6, coordX: 370, coordY: 70 },
    { day: "Sat", count: 12, coordX: 450, coordY: 10 },
    { day: "Sun", count: 9, coordX: 530, coordY: 50 }
  ];

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to permanently delete this redesigned space from your gallery?")) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handlePurchaseCredits = () => {
    onAddCredits(25);
    setShowBuySuccess(true);
    setTimeout(() => setShowBuySuccess(false), 3000);
  };

  // Radial credit gauge mathematics
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const creditPercentage = (user.credits / user.maxCredits) * 100;
  const strokeDashoffset = circumference - (creditPercentage / 100) * circumference;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-200 transition-colors duration-200 relative z-10">
      
      {/* Toast Notification for Credit Purchases */}
      <AnimatePresence>
        {showBuySuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4.5 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 shadow-xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm text-emerald-900 dark:text-emerald-300 block leading-tight">
                Credits Added
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                +25 AI Credits loaded successfully!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Layout of Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Primary Column: Greetings & Projects */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Welcome Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-cyan-950 p-8 text-white border border-slate-800 shadow-xl">
            {/* Ambient light flares */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold block mb-1">
                  Active Developer Sandbox
                </span>
                <h1 className="text-3xl sm:text-4.5xl font-sans font-extrabold tracking-tight">
                  Welcome, {user.name}!
                </h1>
                <p className="text-sm text-slate-300 max-w-md mt-2 leading-relaxed">
                  You are running in a certified workspace. Design new interiors, inspect before/after comparisons, and review rendering analytics.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
                    🔑 Account Type: {user.isPro ? "Enterprise Pro" : "Free Sandbox"}
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
                    📅 Subscription: Active
                  </div>
                </div>
              </div>

              {/* Fast Quick Action inside welcome card */}
              <button
                onClick={() => setCurrentView("studio")}
                className="shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-650 to-cyan-500 hover:opacity-95 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>New Design</span>
              </button>
            </div>
          </div>

          {/* Activity / Generation Analytics Line Chart */}
          <div className="glass-card rounded-[32px] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
                  Analytics Stream
                </span>
                <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white">
                  Design Generations Velocity
                </h3>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-lg font-medium">
                Last 7 Days
              </span>
            </div>

            {/* Premium Custom SVG Line/Area Chart */}
            <div className="w-full h-56 relative">
              <svg viewBox="0 0 600 180" className="w-full h-full">
                <defs>
                  {/* Glowing Gradient underneath area curve */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference lines */}
                <line x1="40" y1="10" x2="560" y2="10" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
                <line x1="40" y1="50" x2="560" y2="50" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
                <line x1="40" y1="90" x2="560" y2="90" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
                <line x1="40" y1="130" x2="560" y2="130" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="3,3" />
                <line x1="40" y1="160" x2="560" y2="160" stroke="#94a3b8" strokeOpacity="0.15" />

                {/* Shaded Area Fill */}
                <path
                  d={`M 50 160 Q 90 120, 130 90 T 210 130 T 290 40 T 370 70 T 450 10 T 530 50 L 530 160 Z`}
                  fill="url(#chartGradient)"
                />

                {/* Smooth Curve Cubic Bezier Line */}
                <path
                  d={`M 50 150 Q 90 120, 130 90 T 210 130 T 290 40 T 370 70 T 450 10 T 530 50`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="stroke-indigo-600 dark:stroke-indigo-400"
                />

                {/* Linear gradient for stroke */}
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>

                {/* Dynamic Coordinate Points and Hover dots */}
                {weeklyRenderData.map((data, index) => (
                  <g key={index} className="group/dot cursor-pointer">
                    {/* Hover Glow Ring */}
                    <circle
                      cx={data.coordX}
                      cy={data.coordY}
                      r="10"
                      fill="#4F46E5"
                      fillOpacity="0"
                      className="group-hover/dot:fill-opacity-15 transition-all duration-200"
                    />
                    {/* Inner Solid Dot */}
                    <circle
                      cx={data.coordX}
                      cy={data.coordY}
                      r="4.5"
                      fill={index === 5 ? "#06B6D4" : "#4F46E5"}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    {/* Tooltip text when hovering over coordinates */}
                    <text
                      x={data.coordX}
                      y={data.coordY - 14}
                      textAnchor="middle"
                      className="opacity-0 group-hover/dot:opacity-100 fill-slate-900 dark:fill-white text-[10px] font-sans font-extrabold transition-all duration-150"
                    >
                      {data.count} renders
                    </text>
                  </g>
                ))}
              </svg>

              {/* Day Labels */}
              <div className="absolute bottom-[-10px] left-0 right-0 flex justify-between px-[34px] text-[10px] font-mono text-slate-400 uppercase font-semibold">
                {weeklyRenderData.map((data, index) => (
                  <span key={index}>{data.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Projects List / Gallery */}
          <div className="glass-card rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
                  Personal Vault
                </span>
                <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white">
                  Recent Redesign Project Gallery ({projects.length})
                </h3>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <SlidersHorizontal className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">No active projects found</span>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Start staging and generating your rooms. Your completed renders will be saved in your dashboard securely.
                </p>
                <button
                  onClick={() => setCurrentView("studio")}
                  className="mt-4 px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:bg-indigo-700 transition-all cursor-pointer shadow-indigo-500/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Staging New Space</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group flex flex-col bg-white/40 dark:bg-slate-900/40 border border-slate-200/55 dark:border-slate-800/60 rounded-2xl overflow-hidden p-3 hover:shadow-md transition-all duration-200"
                  >
                    {/* Image Wrapper */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-950">
                      <img
                        src={project.afterImage}
                        alt={project.title}
                        className="w-full h-full object-cover pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Before snapshot thumbnail on corner */}
                      <div className="absolute top-2.5 left-2.5 h-12 w-12 rounded-lg overflow-hidden border-2 border-white dark:border-slate-900 shadow-md">
                        <img
                          src={project.beforeImage}
                          alt="Before thumbnail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Interactive Buttons */}
                      <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
                        <button
                          onClick={() => setActiveCompareProject(project)}
                          className="p-2 rounded-lg bg-white/95 dark:bg-slate-900/95 text-slate-750 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 shadow-sm transition-all cursor-pointer"
                          title="Compare slider view"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 rounded-lg bg-white/95 dark:bg-slate-900/95 text-rose-500 hover:text-rose-600 hover:scale-105 active:scale-95 shadow-sm transition-all cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                          {project.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400 mt-1 font-bold">
                        <span>{project.style}</span>
                        <span>•</span>
                        <span>{project.roomType}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-450 mt-2 line-clamp-2 leading-relaxed italic border-t border-slate-200/30 dark:border-slate-800 pt-2">
                        "{project.prompt}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar Column: AI Credits & Quick Actions */}
        <div className="space-y-8">
          
          {/* AI Credits Panel */}
          <div className="glass-card rounded-[32px] p-6">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              Credit Resources
            </span>
            <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white mt-0.5 mb-6">
              Visual AI Credits
            </h3>

            {/* Radial Circle and Details */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-200/40 dark:border-slate-800">
              <div className="relative flex items-center justify-center">
                {/* SVG Circle Gauge */}
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="stroke-slate-100 dark:stroke-slate-800"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="stroke-indigo-600 dark:stroke-indigo-400"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
                  />
                </svg>
                {/* Inside details */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-sans font-extrabold text-slate-900 dark:text-white">
                    {user.credits}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                    / {user.maxCredits} Left
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Coins className="w-4 h-4 text-indigo-500" />
                  <span>Staging Renders: 1 Credit</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>Renews monthly on Pro</span>
                </div>
                <button
                  onClick={handlePurchaseCredits}
                  className="w-full mt-3 flex items-center justify-center gap-1 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/80 dark:text-indigo-300 rounded-xl text-xs font-semibold shadow-sm transition-all duration-150 cursor-pointer shadow-indigo-500/5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Reload +25 Credits</span>
                </button>
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 font-mono">
                System Quick Actions
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentView("studio")}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-850/50 hover:bg-indigo-600 hover:text-white transition-all text-left text-sm group cursor-pointer hover:shadow-md"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors">
                    Stage Custom Room
                  </span>
                  <ChevronRight className="w-4.5 h-4.5 text-slate-400 group-hover:text-white" />
                </button>
                <button
                  onClick={() => setCurrentView("landing")}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-850/50 hover:bg-indigo-600 hover:text-white transition-all text-left text-sm group cursor-pointer hover:shadow-md"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors">
                    Browse Pricing Tiers
                  </span>
                  <ChevronRight className="w-4.5 h-4.5 text-slate-400 group-hover:text-white" />
                </button>
                <button
                  onClick={() => alert("Connecting you with a licensed architectural consultant... Staging portfolio link launched.")}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-850/50 hover:bg-indigo-600 hover:text-white transition-all text-left text-sm group cursor-pointer hover:shadow-md"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors">
                    Consult Designer Pro
                  </span>
                  <ChevronRight className="w-4.5 h-4.5 text-slate-400 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Style Affinity */}
          <div className="glass-card rounded-[32px] p-6">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              Style Matrix
            </span>
            <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white mt-0.5 mb-6">
              Favorite Style Affinities
            </h3>

            <div className="space-y-4">
              {styleAffinity.map((style, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {style.name}
                    </span>
                    <span className="font-mono font-bold text-slate-500 dark:text-slate-400">
                      {style.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${style.percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${style.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Design Inspirations */}
          <div className="glass-card rounded-[32px] p-6">
            <div className="flex items-center gap-1.5 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
              <h3 className="text-sm font-sans font-extrabold text-slate-900 dark:text-white">
                Daily Architectural Inspiration
              </h3>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              "Try blending Japandi warm teak panel textures with soft Nordic duck-egg blue textiles. Under cozy ambient glow, this induces slow neural states ideal for bedrooms."
            </p>

            <div className="rounded-xl overflow-hidden h-28 bg-slate-100 dark:bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80"
                alt="Daily Inspiration space"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>

            {/* Compare Slider Modal */}
      <AnimatePresence>
        {activeCompareProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="glass-card rounded-[32px] max-w-4xl w-full p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setActiveCompareProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-505 hover:text-slate-850 dark:hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/40 dark:border-indigo-900/40 px-3 py-1 rounded-full">
                    {activeCompareProject.style} REDESIGN
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/40 dark:border-cyan-900/40 px-3 py-1 rounded-full">
                    {activeCompareProject.roomType}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 dark:text-white mt-2">
                  {activeCompareProject.title}
                </h3>
              </div>

              {/* Slider Component */}
              <div className="mb-6 p-2 bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl glass-thick-border">
                <CompareSlider
                  beforeImage={activeCompareProject.beforeImage}
                  afterImage={activeCompareProject.afterImage}
                  beforeLabel="Original Snap"
                  afterLabel="AI Stage Concept"
                  heightClass="h-[250px] sm:h-[400px]"
                />
              </div>

              {/* Details specs inside dashboard comparison */}
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">
                    Guidelines & Directives
                  </span>
                  <span className="text-slate-500 font-mono">
                    Rendered on {activeCompareProject.date}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-350 italic font-medium leading-relaxed">
                  "{activeCompareProject.prompt}"
                </p>
                <div className="flex flex-wrap gap-4 mt-2 border-t border-slate-200/50 dark:border-slate-800/80 pt-2 text-[11px] font-bold">
                  <span className="text-slate-500">Color Palette: <strong className="text-slate-800 dark:text-white font-semibold">{activeCompareProject.colorPalette}</strong></span>
                  <span className="text-slate-500">Atmospheric Light: <strong className="text-slate-800 dark:text-white font-semibold">{activeCompareProject.lighting}</strong></span>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => alert("Unique configuration staging files exported successfully.")}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Export Design Package
                </button>
                <button
                  onClick={() => setActiveCompareProject(null)}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-md shadow-indigo-500/10"
                >
                  Close Viewer
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
