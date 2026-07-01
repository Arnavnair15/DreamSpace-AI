import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface CompareSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  heightClass?: string;
}

export default function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "AI DreamSpace Redesign",
  heightClass = "h-[450px]"
}: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} overflow-hidden rounded-2xl select-none shadow-xl border border-slate-200/50 dark:border-slate-800/50 cursor-ew-resize`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      id="compare-slider-container"
    >
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt="Original space before"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Before Label */}
      <span className="absolute bottom-4 left-4 z-10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-white/20 select-none">
        {beforeLabel}
      </span>

      {/* After Image (Foreground, clipped) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt="AI redesigned space after"
          className="absolute top-0 left-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* After Label */}
      <span className="absolute bottom-4 right-4 z-10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-indigo-200/30 select-none dark:bg-slate-900/70 dark:text-indigo-400 dark:border-indigo-800/30">
        {afterLabel}
      </span>

      {/* Vertical Split Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.7)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Slider Handle Button */}
      <div
        className="absolute top-1/2 z-30 flex items-center justify-center w-12 h-12 -ml-6 -mt-6 bg-white dark:bg-slate-950 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] border-2 border-indigo-500 hover:scale-105 active:scale-95 transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
        style={{ left: `${sliderPosition}%` }}
      >
        <ChevronsLeftRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      </div>
    </div>
  );
}
