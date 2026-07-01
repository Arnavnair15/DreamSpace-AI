import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  Layers, 
  Zap, 
  ShieldAlert, 
  Palette, 
  CloudSun, 
  Eye, 
  Download,
  Share2
} from "lucide-react";
import { ROOM_STYLES, SAMPLE_PROJECTS, FAQ_ITEMS, TESTIMONIALS } from "../data/mockData";
import CompareSlider from "./CompareSlider";
import { Project } from "../types";

interface LandingPageProps {
  setCurrentView: (view: string) => void;
  projects: Project[];
}

export default function LandingPage({ setCurrentView, projects }: LandingPageProps) {
  // Pricing toggle state
  const [isYearly, setIsYearly] = useState(false);
  
  // FAQ accordion open tracker
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Gallery filter state
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>("All");

  // Project inspect modal state
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  // Buy modal state for showing purchase simulation
  const [showBuyModal, setShowBuyModal] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const uniqueStyles = ["All", ...Array.from(new Set(projects.map(p => p.style)))];

  const filteredProjects = selectedStyleFilter === "All" 
    ? projects 
    : projects.filter(p => p.style === selectedStyleFilter);

  return (
    <div className="relative text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-200 z-10">
      
      {/* 1. Animated Canvas Ambient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/15 blur-[120px] dark:bg-indigo-650/15 animate-pulse pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/15 blur-[120px] dark:bg-cyan-600/15 animate-pulse pointer-events-none" />

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center" id="hero">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-750 border border-indigo-200/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/50 text-xs font-mono font-bold mb-6 tracking-wide uppercase shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation AI Interior Renderer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7.5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl leading-[1.08] mb-6"
        >
          Transform Any Room Into Your{" "}
          <span className="bg-gradient-to-r from-indigo-650 to-cyan-500 bg-clip-text text-transparent">
            Dream Space
          </span>{" "}
          With AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed mb-10"
        >
          Visualize Your Dream Home Before You Build It. Upload a single photo, select from bespoke architectural styles, and instantly generate photorealistic redesigns in 4K resolution.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16 w-full max-w-md sm:max-w-none"
        >
          <button
            onClick={() => setCurrentView("studio")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-650 to-cyan-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/15 hover:scale-102 hover:shadow-indigo-500/25 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <span>Start Designing Free</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
          
          <a
            href="#gallery"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/45 dark:bg-slate-900/45 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-semibold rounded-2xl shadow-md border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <span>Explore Design Gallery</span>
          </a>
        </motion.div>

        {/* Hero Compare Slider Demonstration */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl relative z-10"
        >
          <div className="absolute inset-x-0 -top-6 h-12 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="p-3 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md rounded-[32px] glass-thick-border shadow-2xl">
            <CompareSlider
              beforeImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
              beforeLabel="Raw Concrete & Empty Wall"
              afterLabel="Generated Japandi Redesign"
              heightClass="h-[300px] sm:h-[480px]"
            />
          </div>
          
          {/* Slider Hint */}
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mt-4 select-none font-semibold">
            ◄ Drag Slider Handle To Compare Raw Space vs AI Interior Design ►
          </p>
        </motion.div>
      </section>

      {/* 3. Stats section */}
      <section className="border-y border-slate-200/40 dark:border-slate-900/40 bg-white/20 dark:bg-slate-950/20 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4.5xl font-sans font-extrabold text-slate-900 dark:text-white leading-tight">
              1.2M<span className="text-indigo-600 dark:text-indigo-400">+</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono font-semibold">
              Rooms Redesigned
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4.5xl font-sans font-extrabold text-slate-900 dark:text-white leading-tight">
              99.2<span className="text-cyan-500">%</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono font-semibold">
              Client Satisfaction
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4.5xl font-sans font-extrabold text-slate-900 dark:text-white leading-tight">
              4.9<span className="text-amber-500">/5</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono font-semibold">
              App Store Rating
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4.5xl font-sans font-extrabold text-slate-900 dark:text-white leading-tight">
              &lt; 10s
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono font-semibold">
              Generation Time
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="features">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Unrivaled Spatial Intelligence
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Professional Grade Features Built for Everyone
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-3.5 leading-relaxed">
            Whether you are a professional architect staging a house or a renter planning an office setup, DreamSpace AI is optimized to render clean designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Depth Perception */}
          <div className="glass-card rounded-[32px] p-8 hover:shadow-xl dark:hover:border-indigo-500/20 transition-all duration-300">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-indigo-100/50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Precise Geometry & Depth
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Our advanced depth segmentation preserves window fixtures, structural walls, columns, and spatial boundaries while overlaying gorgeous textures.
            </p>
          </div>

          {/* Card 2: Material Customization */}
          <div className="glass-card rounded-[32px] p-8 hover:shadow-xl dark:hover:border-indigo-500/20 transition-all duration-300">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-cyan-100/50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 mb-6">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Harmonious Color Palettes
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Apply meticulously balanced color harmonies spanning warm oak neutrals, rich forest retreats, earthy terracotta, and clean monochrome settings.
            </p>
          </div>

          {/* Card 3: Cinematic Lighting */}
          <div className="glass-card rounded-[32px] p-8 hover:shadow-xl dark:hover:border-indigo-500/20 transition-all duration-300">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-500 dark:text-indigo-300 mb-6">
              <CloudSun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Atmospheric Lighting Previews
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Witness your room across different times of day: bathe it in diffuses daylight, dynamic golden hour glow, cozy warm hearth, or moody contrast spotlight.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Design Styles Gallery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-slate-200/40 dark:border-slate-900/40" id="gallery">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
              Bespoke Gallery
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Explore Rendered Masterpieces
            </h2>
          </div>
          
          {/* Style Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 max-w-full overflow-x-auto scrollbar-none py-1">
            {uniqueStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyleFilter(style)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  selectedStyleFilter === style
                    ? "bg-indigo-600 text-white border-indigo-650 shadow-md shadow-indigo-600/10"
                    : "bg-white/40 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative glass-card rounded-[32px] p-4.5 hover:shadow-2xl hover:border-indigo-500/25 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-2xl h-[260px] sm:h-[320px] mb-4 bg-slate-100 dark:bg-slate-950">
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {project.style}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-600 uppercase tracking-widest">
                    {project.roomType}
                  </div>

                  {/* Overlaid Action Button */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <button
                      onClick={() => setInspectedProject(project)}
                      className="px-5 py-2.5 bg-white text-slate-900 dark:bg-slate-950 dark:text-white font-semibold text-xs rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-indigo-550" />
                      <span>Compare Before/After</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans font-bold text-slate-900 dark:text-white text-lg">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono uppercase tracking-widest font-semibold">
                      Rendered on {project.date}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-lg">
                    {project.lighting}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/40 dark:border-slate-900/40 relative z-10" id="testimonials">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Client Applause
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Adored by Over 10,000+ Designers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-[32px] glass-card hover:shadow-lg transition-all relative"
            >
              <div className="flex gap-1 text-amber-500 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic mb-6">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200/40 dark:border-slate-800/40"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>

              <div className="absolute top-6 right-6 text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
                Style: {t.designStyle}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/40 dark:border-slate-900/40 relative z-10" id="pricing">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
            Transparent Subscription
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Choose Your Creative Capacity
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            Upgrade your credit pool to unlock 4K renders, advanced style presets, and fast rendering models.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-semibold transition-colors ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
              Monthly billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6.5 w-12 items-center rounded-full bg-slate-200 dark:bg-slate-800 transition-colors cursor-pointer"
            >
              <span
                className={`inline-block h-5.5 w-5.5 transform rounded-full bg-indigo-600 transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
              Yearly billing{" "}
              <span className="text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full ml-1">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Free */}
          <div className="glass-card p-8 rounded-[32px] hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Initiate
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Free Sandbox</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Experience spatial AI room rendering completely free. Suitable for basic prototypes.
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                <span className="text-slate-500 text-sm"> / forever</span>
              </div>

              <ul className="space-y-3.5 text-sm border-t border-slate-100/40 dark:border-slate-800/50 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>10 complimentary AI design credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Standard 1080p generation speed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Access to 4 standard room styles</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400 dark:text-slate-500 line-through">
                  <span>No watermarks & 4K exports</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setCurrentView("studio")}
              className="w-full mt-8 py-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer text-center"
            >
              Start Rendering
            </button>
          </div>

          {/* Plan 2: Pro (Most popular) */}
          <div className="glass-card p-8 rounded-[32px] border-2 border-indigo-500 shadow-2xl relative flex flex-col justify-between ring-4 ring-indigo-500/5">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-mono uppercase tracking-widest text-[9px] font-extrabold px-3 py-1 rounded-full shadow-md shadow-indigo-600/10">
              Most Popular
            </span>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 font-mono">
                Visualize Pro
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Creator Tier</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Perfect for homeowners, remodelers, and independent designers staging active spaces.
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {isYearly ? "$19" : "$24"}
                </span>
                <span className="text-slate-500 text-sm"> / month</span>
              </div>

              <ul className="space-y-3.5 text-sm border-t border-slate-100/40 dark:border-slate-800/50 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="font-semibold">100 monthly AI credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Priority rendering (under 10s)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Access to all 8+ style themes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>High-res 4K image downloads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Materials & color palette extractor</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowBuyModal("Creator Tier")}
              className="w-full mt-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-sm shadow-md shadow-indigo-600/10 transition-all cursor-pointer text-center"
            >
              Get Started Now
            </button>
          </div>

          {/* Plan 3: Studio */}
          <div className="glass-card p-8 rounded-[32px] hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Enterprise
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Design Studio</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                For design firms, real estate agencies, and home decor brands requiring massive scale.
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {isYearly ? "$59" : "$72"}
                </span>
                <span className="text-slate-500 text-sm"> / month</span>
              </div>

              <ul className="space-y-3.5 text-sm border-t border-slate-100 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold">Unlimited credits / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Hypersonic rendering channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Custom fine-tuned styles training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>API access & custom branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Collaborative client workspaces</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowBuyModal("Design Studio")}
              className="w-full mt-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer text-center"
            >
              Contact Sales
            </button>
          </div>

        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-200/50 dark:border-slate-900 relative z-10" id="faq">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-bold">
            Support Center
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Frequently Answered Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left font-sans font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-250 ${
                    openFaqIndex === index ? "rotate-180 text-purple-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="p-6 pt-0 text-sm leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Interactive Gallery Compare Modal */}
      <AnimatePresence>
        {inspectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-[32px] max-w-4xl w-full p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setInspectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-850 dark:hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase font-mono font-bold text-indigo-650 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/50 px-3 py-1 rounded-full">
                  {inspectedProject.style} Theme
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 dark:text-white mt-2">
                  {inspectedProject.title}
                </h3>
              </div>

              {/* Slider inside modal */}
              <div className="mb-6 p-2 bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl glass-thick-border">
                <CompareSlider
                  beforeImage={inspectedProject.beforeImage}
                  afterImage={inspectedProject.afterImage}
                  beforeLabel="Raw space snapshot"
                  afterLabel={`AI Redesigned: ${inspectedProject.style}`}
                  heightClass="h-[250px] sm:h-[400px]"
                />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Custom AI Prompt
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{inspectedProject.prompt}"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Color Palette
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
                      {inspectedProject.colorPalette}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Lighting
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
                      {inspectedProject.lighting}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = inspectedProject.afterImage;
                    link.download = `dreamspace_${inspectedProject.id}.jpg`;
                    link.click();
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl flex items-center gap-1.5 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 4K</span>
                </button>
                <button
                  onClick={() => alert("Unique design link copied to clipboard!")}
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-xl flex items-center gap-1.5 hover:bg-indigo-700 transition-all cursor-pointer shadow-md shadow-indigo-500/15"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Design</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. Purchase Simulation Modal */}
      <AnimatePresence>
        {showBuyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-[32px] max-w-md w-full p-8 relative text-center"
            >
              <button
                onClick={() => setShowBuyModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-850 dark:hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto mb-4">
                <Sparkles className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-sans font-bold text-slate-900 dark:text-white">
                Simulate Subscription Upgrade
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Thank you for testing DreamSpace AI! In this demo workspace, subscribing to the <strong className="text-indigo-650 dark:text-indigo-400">{showBuyModal}</strong> is fully simulated.
              </p>

              <div className="my-6 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/40 dark:border-indigo-900/40 text-left text-xs">
                <span className="font-bold block uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-1">
                  Developer Sandbox Node
                </span>
                We have credited your account with unlimited local generation capacity, unlocked priority renders, and activated all 8 luxury design styles. Enjoy visualizing!
              </div>

              <button
                onClick={() => {
                  setShowBuyModal(null);
                  setCurrentView("studio");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm rounded-xl hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                Awesome, Start Staging Rooms!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
