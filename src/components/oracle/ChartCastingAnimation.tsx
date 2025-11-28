import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface ChartCastingAnimationProps {
  question: string;
}

const symbols = ["乾", "坎", "艮", "震", "巽", "離", "坤", "兌", "中"];
const directions = ["NW", "N", "NE", "E", "SE", "S", "SW", "W", "Center"];

const ChartCastingAnimation = ({ question }: ChartCastingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [activeCell, setActiveCell] = useState(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; symbol: string }>>([]);

  useEffect(() => {
    // Show grid after initial delay
    setTimeout(() => setShowGrid(true), 500);

    // Generate flying particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setParticles(newParticles);

    // Animate cells filling
    const cellInterval = setInterval(() => {
      setActiveCell((c) => {
        if (c >= 8) {
          clearInterval(cellInterval);
          return c;
        }
        return c + 1;
      });
    }, 350);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 60);

    return () => {
      clearInterval(cellInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const gridOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // SE, S, SW, E, Center, W, NE, N, NW
  const elementColors: Record<number, string> = {
    0: "text-green-400", // SE - Wood
    1: "text-red-400",   // S - Fire
    2: "text-amber-400", // SW - Earth
    3: "text-green-400", // E - Wood
    4: "text-amber-400", // Center - Earth
    5: "text-slate-300", // W - Metal
    6: "text-amber-400", // NE - Earth
    7: "text-blue-400",  // N - Water
    8: "text-slate-300", // NW - Metal
  };

  return (
    <div className="relative min-h-[600px] flex flex-col items-center justify-center animate-fade-in">
      {/* Flying particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl font-serif animate-float opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              color: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#94a3b8"][particle.id % 5],
            }}
          >
            {particle.symbol}
          </div>
        ))}
      </div>

      {/* The Grid */}
      <div 
        className={`relative transition-all duration-1000 ${showGrid ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        {/* Outer glow rings */}
        <div className="absolute -inset-16 rounded-full border border-emerald-500/20 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute -inset-12 rounded-full border border-amber-500/20 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        <div className="absolute -inset-8 rounded-full border border-cosmic-purple/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10">
          {gridOrder.map((cellIndex, i) => (
            <div
              key={i}
              className={`w-24 h-24 lg:w-28 lg:h-28 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center ${
                activeCell >= i
                  ? "bg-white/10 border-white/20"
                  : "bg-white/5 border-white/5"
              }`}
              style={{
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {activeCell >= i && (
                <>
                  <span className={`text-3xl font-serif ${elementColors[i]} animate-fade-in`}>
                    {symbols[cellIndex]}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {directions[cellIndex]}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Center compass */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-cosmic-gold/50 animate-spin-slow" />
        </div>
      </div>

      {/* Status */}
      <div className="mt-12 text-center">
        <div className="relative w-48 h-2 bg-white/10 rounded-full overflow-hidden mb-4 mx-auto">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-cosmic-purple to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <h2 className="text-xl font-serif text-foreground mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-cosmic-gold animate-pulse" />
          Casting the Nine Palaces
        </h2>
        
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {progress < 30 
            ? "Aligning the celestial stems..."
            : progress < 60
            ? "Positioning the eight doors..."
            : progress < 90
            ? "Reading the cosmic formation..."
            : "Interpreting the oracle's wisdom..."
          }
        </p>
      </div>

      {/* Question reminder */}
      <div className="mt-8 px-6 py-3 rounded-full bg-white/5 border border-white/10 max-w-md">
        <p className="text-xs text-muted-foreground text-center truncate">
          "{question}"
        </p>
      </div>
    </div>
  );
};

export default ChartCastingAnimation;
