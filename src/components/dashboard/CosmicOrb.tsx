import { useEffect, useState } from "react";

const CosmicOrb = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);
  const [orbitParticles, setOrbitParticles] = useState<Array<{ id: number; angle: number; radius: number; speed: number; size: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
    }));
    setParticles(newParticles);

    // Generate orbiting particles
    const newOrbitParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * 360,
      radius: 80 + Math.random() * 40,
      speed: 20 + Math.random() * 20,
      size: Math.random() * 4 + 2,
    }));
    setOrbitParticles(newOrbitParticles);
  }, []);

  return (
    <div className="hidden xl:flex flex-col items-center justify-center w-80 flex-shrink-0">
      <div className="relative w-64 h-64">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-cosmic-blue/30 blur-3xl animate-pulse" />
        
        {/* Orbiting rings */}
        <div className="absolute inset-4 rounded-full border border-cosmic-purple/20 animate-spin-slow" style={{ animationDuration: "30s" }} />
        <div className="absolute inset-8 rounded-full border border-cosmic-gold/20 animate-spin-slow" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
        <div className="absolute inset-12 rounded-full border border-cosmic-blue/20 animate-spin-slow" style={{ animationDuration: "20s" }} />
        
        {/* Orbiting particles */}
        {orbitParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute top-1/2 left-1/2 animate-spin-slow"
            style={{
              animationDuration: `${particle.speed}s`,
              animationDirection: particle.id % 2 === 0 ? "normal" : "reverse",
            }}
          >
            <div
              className="rounded-full bg-cosmic-gold"
              style={{
                width: particle.size,
                height: particle.size,
                transform: `translate(-50%, -50%) translateX(${particle.radius}px)`,
                boxShadow: `0 0 ${particle.size * 2}px hsl(45 95% 65% / 0.5)`,
              }}
            />
          </div>
        ))}
        
        {/* Central orb */}
        <div className="absolute inset-16 rounded-full overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-cosmic-glow animate-pulse" />
          
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
          
          {/* Swirling effect */}
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "15s" }}>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-cosmic-gold/30 rounded-full blur-xl" />
          </div>
          
          {/* Core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        </div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: ["#FFD700", "#A855F7", "#3B82F6", "#10B981"][particle.id % 4],
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              boxShadow: `0 0 ${particle.size * 2}px currentColor`,
            }}
          />
        ))}
        
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <line x1="20%" y1="30%" x2="50%" y2="20%" stroke="currentColor" strokeWidth="0.5" className="text-cosmic-gold" />
          <line x1="50%" y1="20%" x2="80%" y2="35%" stroke="currentColor" strokeWidth="0.5" className="text-cosmic-gold" />
          <line x1="80%" y1="35%" x2="70%" y2="70%" stroke="currentColor" strokeWidth="0.5" className="text-cosmic-gold" />
          <line x1="70%" y1="70%" x2="30%" y2="75%" stroke="currentColor" strokeWidth="0.5" className="text-cosmic-gold" />
          <line x1="30%" y1="75%" x2="20%" y2="30%" stroke="currentColor" strokeWidth="0.5" className="text-cosmic-gold" />
        </svg>
      </div>
      
      {/* Label */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">Cosmic Energy</p>
        <p className="text-2xl font-serif text-cosmic-gold animate-pulse">☽ ⋆ ☆</p>
        <p className="text-xs text-muted-foreground mt-2">Lunar Phase: Waxing Crescent</p>
      </div>
      
      {/* Energy indicators */}
      <div className="mt-6 w-full max-w-[200px] space-y-3">
        <EnergyBar label="Yang Energy" value={72} color="cosmic-gold" />
        <EnergyBar label="Yin Energy" value={58} color="cosmic-purple" />
        <EnergyBar label="Balance" value={85} color="emerald-400" />
      </div>
    </div>
  );
};

interface EnergyBarProps {
  label: string;
  value: number;
  color: string;
}

const EnergyBar = ({ label, value, color }: EnergyBarProps) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-${color}`}>{value}%</span>
    </div>
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-${color} rounded-full transition-all duration-1000`}
        style={{ 
          width: `${value}%`,
          backgroundColor: color === "cosmic-gold" ? "hsl(45 95% 65%)" : 
                          color === "cosmic-purple" ? "hsl(270 65% 55%)" : 
                          "hsl(160 84% 39%)"
        }}
      />
    </div>
  </div>
);

export default CosmicOrb;
