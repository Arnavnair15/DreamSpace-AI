import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Upload, 
  Sofa, 
  Bed, 
  ChefHat, 
  Briefcase, 
  Utensils, 
  Bath, 
  Sun, 
  Sunset, 
  Flame, 
  Sparkle,
  Loader2,
  Download,
  Share2,
  FolderHeart,
  ChevronRight,
  Info,
  Layers,
  Palette,
  Eye,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { ROOM_TYPES, ROOM_STYLES, COLOR_PALETTES, LIGHTING_PRESETS } from "../data/mockData";
import { UserProfile, Project, DesignConfig } from "../types";
import CompareSlider from "./CompareSlider";

interface DesignStudioProps {
  user: UserProfile;
  deductCredit: () => boolean;
  onSaveProject: (project: Project) => void;
  setCurrentView: (view: string) => void;
}

// Map icon string to Lucide component
function renderRoomIcon(iconName: string, className: string = "w-5 h-5") {
  switch (iconName) {
    case "Sofa": return <Sofa className={className} />;
    case "Bed": return <Bed className={className} />;
    case "ChefHat": return <ChefHat className={className} />;
    case "Briefcase": return <Briefcase className={className} />;
    case "Utensils": return <Utensils className={className} />;
    case "Bath": return <Bath className={className} />;
    default: return <Sofa className={className} />;
  }
}

function renderLightingIcon(iconName: string, className: string = "w-4 h-4") {
  switch (iconName) {
    case "Sun": return <Sun className={className} />;
    case "Sunset": return <Sunset className={className} />;
    case "Flame": return <Flame className={className} />;
    case "Sparkles": return <Sparkle className={className} />;
    default: return <Sun className={className} />;
  }
}

const SAMPLE_ROOM_IMAGES = [
  {
    id: "sample_living",
    name: "Plain Living Room",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample_office",
    name: "Concrete Loft Space",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample_bedroom",
    name: "Standard Yellow Bedroom",
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
  }
];

export default function DesignStudio({
  user,
  deductCredit,
  onSaveProject,
  setCurrentView
}: DesignStudioProps) {
  // Form Staging Configuration State
  const [config, setConfig] = useState<DesignConfig>({
    roomType: "living_room",
    styleId: "japandi",
    colorPaletteId: "warm_neutrals",
    lightingId: "natural_daylight",
    customPrompt: "",
    uploadedImage: SAMPLE_ROOM_IMAGES[0].url, // default to first sample
    uploadedImageName: SAMPLE_ROOM_IMAGES[0].name
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Staging Flow States
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [renderedProject, setRenderedProject] = useState<Project | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setConfig({
            ...config,
            uploadedImage: event.target.result as string,
            uploadedImageName: file.name
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (imageUrl: string, name: string) => {
    setConfig({
      ...config,
      uploadedImage: imageUrl,
      uploadedImageName: name
    });
  };

  const startStagingRender = () => {
    if (!config.uploadedImage) {
      alert("Please upload a room image or select one of our premium sample rooms to proceed.");
      return;
    }

    // Deduct credit first
    const hasSufficientCredits = deductCredit();
    if (!hasSufficientCredits) {
      alert("Insufficient AI credits! Reload credits on your dashboard to continue rendering.");
      setCurrentView("dashboard");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setRenderedProject(null);
    setIsSaved(false);

    // Dynamic progression states over ~4 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        
        // Progress console logs messages
        if (next < 20) {
          setProgressMessage("Analyzing structural geometry & ceiling coordinates...");
        } else if (next < 45) {
          setProgressMessage("Generating perspective depth segments & occlusion maps...");
        } else if (next < 65) {
          setProgressMessage(`Baking selected color harmony palette: ${COLOR_PALETTES.find(c => c.id === config.colorPaletteId)?.name}...`);
        } else if (next < 85) {
          setProgressMessage(`Simulating chosen atmosphere bounce lighting: ${LIGHTING_PRESETS.find(l => l.id === config.lightingId)?.name}...`);
        } else if (next < 98) {
          setProgressMessage(`Superimposing refined furniture textures matching style: ${ROOM_STYLES.find(s => s.id === config.styleId)?.name}...`);
        } else {
          setProgressMessage("Composing 4K output render & setting slider matrices...");
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finalizeStagedResult();
          }, 300);
          return 100;
        }
        return next;
      });
    }, 45);
  };

  const finalizeStagedResult = () => {
    const activeStyle = ROOM_STYLES.find(s => s.id === config.styleId)!;
    const activePalette = COLOR_PALETTES.find(c => c.id === config.colorPaletteId)!;
    const activeLighting = LIGHTING_PRESETS.find(l => l.id === config.lightingId)!;
    const activeRoom = ROOM_TYPES.find(r => r.id === config.roomType)!;

    // Map style Id to beautiful After images in Unsplash
    let afterImage = activeStyle.imageUrl; // fallback

    const mockPrompt = config.customPrompt.trim() 
      ? config.customPrompt 
      : `Render the raw ${activeRoom.name} into an elegant ${activeStyle.name} layout with ${activePalette.name} accents and ${activeLighting.name} atmosphere.`;

    const staged: Project = {
      id: `generated_${Date.now()}`,
      title: `${activeStyle.name} ${activeRoom.name}`,
      roomType: activeRoom.name,
      style: activeStyle.name,
      beforeImage: config.uploadedImage!,
      afterImage: afterImage,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      prompt: mockPrompt,
      colorPalette: activePalette.name,
      lighting: activeLighting.name
    };

    setRenderedProject(staged);
    setIsGenerating(false);
  };

  const handleSaveToDashboard = () => {
    if (renderedProject) {
      onSaveProject(renderedProject);
      setIsSaved(true);
    }
  };

  const handleReset = () => {
    setRenderedProject(null);
    setIsSaved(false);
    setConfig({
      ...config,
      customPrompt: ""
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-200 transition-colors duration-200 relative z-10">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
          Workspace Sandbox
        </span>
        <h1 className="text-3xl sm:text-4.5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          AI Design Playground
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl">
          Customize room layouts in real-time. Upload raw apartment files, specify architectural style configurations, and witness instant photorealistic renders.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* State A: Loading Progression glassmorphic overlay */}
        {isGenerating && (
          <motion.div
            key="generating-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md"
          >
            <div className="glass-card rounded-[32px] max-w-md w-full p-8 text-center relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/25 mx-auto mb-6">
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              </div>

              <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">
                Generating Dream Space
              </h3>
              
              {/* Telemetry log messages */}
              <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-2 h-8 leading-tight">
                {progressMessage}
              </p>

              {/* Progress Slider */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden mt-6 relative shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="inline-block text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-4">
                {progress}%
              </span>

              <div className="mt-8 p-3.5 bg-slate-50/50 dark:bg-slate-850/50 rounded-xl text-left border border-slate-200/50 dark:border-slate-800/50">
                <span className="text-[10px] uppercase font-mono font-extrabold text-slate-400 block mb-1">
                  Rendering Metadata
                </span>
                <div className="grid grid-cols-2 gap-y-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>Style: {ROOM_STYLES.find(s => s.id === config.styleId)?.name}</span>
                  <span>Lighting: {LIGHTING_PRESETS.find(l => l.id === config.lightingId)?.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* State B: Rendered results comparator */}
        {renderedProject ? (
          <motion.div
            key="results-state"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Left Result Columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-2 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md rounded-3xl glass-thick-border">
                <CompareSlider
                  beforeImage={renderedProject.beforeImage}
                  afterImage={renderedProject.afterImage}
                  beforeLabel="Raw Original Snaps"
                  afterLabel={`AI Redesign: ${renderedProject.style}`}
                  heightClass="h-[300px] sm:h-[500px]"
                />
              </div>

              {/* Tips banner */}
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 text-center select-none font-semibold">
                ◄ Slide Handle to compare design transformation boundaries ►
              </p>
            </div>

            {/* Right Result Metadata Controls */}
            <div className="space-y-6">
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">
                    AI Rendering Complete
                  </span>
                </div>
                
                <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">
                  {renderedProject.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1 font-semibold">
                  Processed locally on {renderedProject.date}
                </p>

                {/* Staging Specs */}
                <div className="space-y-4 my-6 border-y border-slate-200/40 dark:border-slate-800/80 py-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-extrabold text-slate-400 block mb-1">
                      Applied Theme Guidelines
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">
                      "{renderedProject.prompt}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-100/50 dark:bg-slate-850/50 rounded-xl">
                      <span className="text-[10px] uppercase font-mono font-extrabold text-slate-400 block mb-0.5">
                        Color Scheme
                      </span>
                      <span className="text-xs text-slate-850 dark:text-slate-200 font-bold">
                        {renderedProject.colorPalette}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-100/50 dark:bg-slate-850/50 rounded-xl">
                      <span className="text-[10px] uppercase font-mono font-extrabold text-slate-400 block mb-0.5">
                        Lighting Bounce
                      </span>
                      <span className="text-xs text-slate-850 dark:text-slate-200 font-bold">
                        {renderedProject.lighting}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isSaved ? (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 select-none">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saved Successfully to Dashboard</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleSaveToDashboard}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer shadow-indigo-500/20"
                    >
                      <FolderHeart className="w-4.5 h-4.5" />
                      <span>Save Design To Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = renderedProject.afterImage;
                      link.download = `dreamspace_${renderedProject.id}.jpg`;
                      link.click();
                    }}
                    className="w-full py-3 bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4.5 h-4.5" />
                    <span>Download High-Resolution 4K</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full py-3 border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                    <span>Stage Another Room</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          
          // State C: Config Form playground
          <motion.div
            key="config-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12"
          >
            {/* Left 7 Columns: Image & Setup Fields */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Field 1: Choose Room Image */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-1.5 mb-4">
                  <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                    1. Choose Room Snap
                  </h3>
                </div>

                {/* Upload drag drop zone */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  {/* Upload button area */}
                  <div className="md:col-span-2">
                    <div
                      onClick={handleUploadClick}
                      className="border-2 border-dashed border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center h-44 group bg-slate-50/20 dark:bg-slate-950/20"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 group-hover:scale-105 transition-all mb-3" />
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        Upload Image file
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        PNG, JPG up to 10MB
                      </span>
                    </div>
                  </div>

                  {/* Sample room selection columns */}
                  <div className="md:col-span-3 space-y-3.5">
                    <span className="text-[10px] uppercase font-mono font-extrabold text-slate-400 block tracking-wider">
                      Or Select From Sample Staging Files:
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {SAMPLE_ROOM_IMAGES.map((sample) => (
                        <div
                          key={sample.id}
                          onClick={() => handleSelectSample(sample.url, sample.name)}
                          className={`group cursor-pointer rounded-xl overflow-hidden border-2 h-24 relative ${
                            config.uploadedImage === sample.url
                              ? "border-indigo-500 ring-2 ring-indigo-500/10"
                              : "border-transparent opacity-80 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={sample.url}
                            alt={sample.name}
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-slate-950/70 p-1 text-center text-[9px] font-sans font-semibold text-white leading-tight">
                            {sample.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Selected File Banner */}
                {config.uploadedImage && (
                  <div className="mt-4 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/40 dark:border-indigo-900/40 rounded-xl flex items-center justify-between text-xs select-none">
                    <span className="text-indigo-700 dark:text-indigo-300 font-semibold truncate max-w-xs sm:max-w-md">
                      ✓ Active snap: <strong className="font-extrabold">{config.uploadedImageName || "Custom upload snapshot"}</strong>
                    </span>
                    <button
                      onClick={() => setConfig({ ...config, uploadedImage: null, uploadedImageName: null })}
                      className="text-slate-400 hover:text-rose-500 font-bold"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Field 2: Select Room Type */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-1.5 mb-4">
                  <Sofa className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                    2. Select Room Category
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ROOM_TYPES.map((type) => {
                    const isSelected = config.roomType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setConfig({ ...config, roomType: type.id })}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                          isSelected
                            ? "glass-active-indigo font-bold"
                            : "border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100" : "bg-slate-100 dark:bg-slate-800 text-slate-505"}`}>
                          {renderRoomIcon(type.icon, "w-4.5 h-4.5")}
                        </div>
                        <span className="text-xs truncate">{type.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Field 3: Select Design Style */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-1.5 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                    3. Select Architectural Style
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROOM_STYLES.map((style) => {
                    const isSelected = config.styleId === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setConfig({ ...config, styleId: style.id })}
                        className={`group cursor-pointer border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 ring-2 ring-indigo-500/15 shadow-md"
                            : "border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-850/50"
                        }`}
                      >
                        {/* Style Visual Cover */}
                        <div className="h-32 overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                          <img
                            src={style.imageUrl}
                            alt={style.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                            <h4 className="font-bold text-white text-sm">
                              {style.name}
                            </h4>
                          </div>
                        </div>

                        {/* Description & tags */}
                        <div className="p-4">
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                            {style.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {style.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Palettes, Lighting, Prompts & Action triggers */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Field 4: Color Palette */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-1.5 mb-4">
                  <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                    4. Color Palette Harmony
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {COLOR_PALETTES.map((palette) => {
                    const isSelected = config.colorPaletteId === palette.id;
                    return (
                      <div
                        key={palette.id}
                        onClick={() => setConfig({ ...config, colorPaletteId: palette.id })}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? "glass-active-indigo"
                            : "border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {palette.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {isSelected && "✓ Active"}
                          </span>
                        </div>

                        {/* Color swatches strip */}
                        <div className="flex gap-1.5 h-6 rounded-lg overflow-hidden border border-slate-200/30 dark:border-slate-850">
                          {palette.colors.map((color, i) => (
                            <div
                              key={i}
                              className="flex-1 h-full"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed mt-1.5">
                          {palette.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Field 5: Lighting bounces */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-1.5 mb-4">
                  <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                    5. Atmospheric Light
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {LIGHTING_PRESETS.map((preset) => {
                    const isSelected = config.lightingId === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => setConfig({ ...config, lightingId: preset.id })}
                        className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col gap-1.5 text-left transition-all ${
                          isSelected
                            ? "glass-active-indigo"
                            : "border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg w-7 h-7 flex items-center justify-center ${
                          isSelected ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100" : "bg-slate-100 dark:bg-slate-800 text-slate-650"
                        }`}>
                          {renderLightingIcon(preset.icon, "w-4 h-4")}
                        </div>
                        <div>
                          <h4 className={`text-xs ${isSelected ? "font-bold text-indigo-600 dark:text-indigo-400" : "font-semibold text-slate-800 dark:text-slate-200"}`}>
                            {preset.name}
                          </h4>
                          <p className="text-[9px] text-slate-400 leading-normal mt-0.5 line-clamp-2">
                            {preset.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Field 6: Custom Guidelines Prompt */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-sm">
                    6. Custom Guidelines Prompt (Optional)
                  </h3>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
                    Bespoke Mode
                  </span>
                </div>

                <textarea
                  value={config.customPrompt}
                  onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
                  placeholder="E.g., Add an elegant beige velvet modular sectional, a low rustic oak block coffee table, and an oversized brass arch floor lamp..."
                  className="w-full bg-slate-50/40 dark:bg-slate-850/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-24 transition-all resize-none"
                />

                <p className="text-[10px] text-slate-400 leading-normal mt-1.5 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 shrink-0 text-cyan-500 mt-0.5" />
                  <span>Custom prompt guides are analyzed dynamically. Our staging algorithms will prioritizes rendering your written text directives literally.</span>
                </p>
              </div>

              {/* Submit Trigger Actions Panel */}
              <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 p-6 rounded-[32px] border border-slate-800 shadow-xl text-white">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <span>Rendering Cost: <strong>1 AI Credit</strong></span>
                  </div>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[10px] font-mono uppercase font-bold text-indigo-300">
                    Pool: {user.credits} left
                  </span>
                </div>

                <button
                  onClick={startStagingRender}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
                  <span>Visualize Dream Space</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
