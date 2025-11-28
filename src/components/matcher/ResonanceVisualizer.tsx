import { useEffect, useState } from "react";
import { MatchResult } from "@/pages/Matcher";

interface ResonanceVisualizerProps {
  userA: { name: string };
  userB: { name: string };
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const ResonanceVisualizer = ({ userA, userB, isAnalyzing, matchResult }: ResonanceVisualizerProps) => {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: i % 3 === 0 ? "#F472B6" : i % 3 === 1 ? "#22D3EE" : "#A855F7",
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    // Animate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] flex items-center justify-center animate-fade-in">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              opacity: 0.6,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        {/* Animated connection lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="20%"
            y1={`${35 + i * 8}%`}
            x2={`${20 + (progress / 100) * 60}%`}
            y2={`${35 + i * 8}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeOpacity={0.5 - i * 0.1}
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>

      {/* User A Star Map */}
      <div 
        className="absolute left-[10%] top-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          transform: `translate(${progress}%, -50%)`,
        }}
      >
        <div className="relative">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/30 to-cosmic-purple/30 flex items-center justify-center relative backdrop-blur-sm border border-pink-500/30">
            <div className="absolute inset-0 rounded-full animate-pulse bg-pink-500/20" />
            {/* Star pattern */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: "20s" }}>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle
                  key={i}
                  cx={80 + Math.cos((angle * Math.PI) / 180) * 50}
                  cy={80 + Math.sin((angle * Math.PI) / 180) * 50}
                  r="3"
                  fill="#F472B6"
                  opacity={0.8}
                />
              ))}
            </svg>
            <span className="text-2xl font-serif text-pink-400 relative z-10">✦</span>
          </div>
          <p className="text-center mt-4 text-foreground font-medium">{userA.name}</p>
        </div>
      </div>

      {/* User B Star Map */}
      <div 
        className="absolute right-[10%] top-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          transform: `translate(-${progress}%, -50%)`,
        }}
      >
        <div className="relative">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-cosmic-blue/30 flex items-center justify-center relative backdrop-blur-sm border border-cyan-500/30">
            <div className="absolute inset-0 rounded-full animate-pulse bg-cyan-500/20" />
            {/* Star pattern */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: "25s", animationDirection: "reverse" }}>
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx={80 + Math.cos((angle * Math.PI) / 180) * 50}
                  cy={80 + Math.sin((angle * Math.PI) / 180) * 50}
                  r="3"
                  fill="#22D3EE"
                  opacity={0.8}
                />
              ))}
            </svg>
            <span className="text-2xl font-serif text-cyan-400 relative z-10">✧</span>
          </div>
          <p className="text-center mt-4 text-foreground font-medium">{userB.name}</p>
        </div>
      </div>

      {/* Center Status */}
      <div className="relative z-10 text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Rotating rings */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cosmic-purple/50 animate-spin" style={{ animationDuration: "10s" }} />
          <div className="absolute inset-2 rounded-full border border-cosmic-gold/50 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          <div className="absolute inset-4 rounded-full border border-pink-500/50 animate-spin" style={{ animationDuration: "8s" }} />
          
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-cosmic-purple to-cyan-500 animate-pulse flex items-center justify-center">
              <span className="text-white font-bold">{progress}%</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-serif text-foreground mb-2">
          {isAnalyzing ? "Calculating Resonance..." : "Analysis Complete"}
        </h2>
        <p className="text-sm text-muted-foreground animate-pulse">
          {isAnalyzing 
            ? "Drawing constellation lines between your stars"
            : "Preparing your cosmic revelation"
          }
        </p>
      </div>
    </div>
  );
};

export default ResonanceVisualizer;
