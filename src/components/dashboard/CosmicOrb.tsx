import { useEffect, useState } from "react";
import { X, Sparkles, Moon, Sun, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CosmicOrbProps {
  selectedDate?: Date;
}

const CosmicOrb = ({ selectedDate }: CosmicOrbProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);
  const [orbitParticles, setOrbitParticles] = useState<Array<{ id: number; angle: number; radius: number; speed: number; size: number }>>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate cosmic reading based on date
  const getCosmicReading = () => {
    const day = selectedDate?.getDate() || new Date().getDate();
    return {
      yangEnergy: 50 + (day * 3) % 50,
      yinEnergy: 40 + (day * 7) % 50,
      balance: 60 + (day * 5) % 35,
      lunarPhase: ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"][day % 8],
      cosmicMessage: [
        "The universe whispers of new beginnings...",
        "Trust the cosmic flow guiding your path.",
        "Hidden opportunities await your discovery.",
        "Your energy aligns with celestial forces.",
        "A moment of transformation approaches.",
        "The stars illuminate your inner wisdom.",
        "Balance between action and reflection serves you.",
      ][day % 7],
      elementalInfluence: ["Fire ascendant", "Water flows strong", "Earth grounds you", "Metal sharpens focus", "Wood brings growth"][day % 5],
    };
  };

  const reading = getCosmicReading();

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
    }));
    setParticles(newParticles);

    const newOrbitParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * 360,
      radius: 60 + Math.random() * 30,
      speed: 15 + Math.random() * 15,
      size: Math.random() * 4 + 2,
    }));
    setOrbitParticles(newOrbitParticles);
  }, []);

  return (
    <div className="relative">
      {/* Collapsed Orb View */}
      <div 
        className={`relative cursor-pointer transition-all duration-500 ${isExpanded ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"}`}
        onClick={() => setIsExpanded(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-6 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cosmic-gold/30 transition-all duration-300">
          {/* Mini Orb */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-cosmic-blue/30 blur-xl transition-all duration-300 ${isHovered ? "scale-125 opacity-100" : "opacity-50"}`} />
            
            {/* Orbiting rings */}
            <div className="absolute inset-2 rounded-full border border-cosmic-purple/30 animate-spin-slow" style={{ animationDuration: "20s" }} />
            <div className="absolute inset-4 rounded-full border border-cosmic-gold/30 animate-spin-slow" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
            
            {/* Orbiting particles */}
            {orbitParticles.slice(0, 4).map((particle) => (
              <div
                key={particle.id}
                className="absolute top-1/2 left-1/2 animate-spin-slow"
                style={{ animationDuration: `${particle.speed}s` }}
              >
                <div
                  className="rounded-full bg-cosmic-gold"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    transform: `translate(-50%, -50%) translateX(${particle.radius * 0.4}px)`,
                    boxShadow: `0 0 ${particle.size * 2}px hsl(45 95% 65% / 0.5)`,
                  }}
                />
              </div>
            ))}
            
            {/* Central orb */}
            <div className="absolute inset-6 rounded-full overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-cosmic-glow transition-all duration-300 ${isHovered ? "animate-pulse" : ""}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-cosmic-gold" />
              <span className="text-sm text-cosmic-gold">{reading.lunarPhase}</span>
            </div>
            <p className="text-foreground font-serif text-lg mb-1">Cosmic Energy Field</p>
            <p className="text-sm text-muted-foreground">{reading.elementalInfluence}</p>
            <p className="text-xs text-muted-foreground mt-2 italic">Click to explore cosmic insights →</p>
          </div>

          {/* Energy bars mini */}
          <div className="hidden sm:flex flex-col gap-2 w-32">
            <MiniEnergyBar label="Yang" value={reading.yangEnergy} color="#FFD700" />
            <MiniEnergyBar label="Yin" value={reading.yinEnergy} color="#A855F7" />
            <MiniEnergyBar label="Balance" value={reading.balance} color="#10B981" />
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="animate-fade-in rounded-3xl border border-cosmic-gold/30 bg-black/90 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cosmic-purple/20 rounded-full blur-3xl" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cosmic-gold" />
                <h3 className="text-xl font-serif text-foreground">Cosmic Energy Reading</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Interactive Orb */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-cosmic-blue/30 blur-3xl animate-pulse" />
                
                {/* Orbiting rings */}
                <div className="absolute inset-2 rounded-full border border-cosmic-purple/30 animate-spin-slow" style={{ animationDuration: "25s" }} />
                <div className="absolute inset-6 rounded-full border border-cosmic-gold/30 animate-spin-slow" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
                <div className="absolute inset-10 rounded-full border border-cosmic-blue/30 animate-spin-slow" style={{ animationDuration: "15s" }} />
                
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
                <div className="absolute inset-12 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-cosmic-glow animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "10s" }}>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-cosmic-gold/30 rounded-full blur-xl" />
                  </div>
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
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
              </div>

              {/* Lunar phase */}
              <div className="mt-6 text-center">
                <p className="text-2xl font-serif text-cosmic-gold">☽ ⋆ ☆</p>
                <p className="text-sm text-muted-foreground mt-1">{reading.lunarPhase}</p>
              </div>
            </div>

            {/* Energy Details */}
            <div className="space-y-6">
              {/* Cosmic Message */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-cosmic-gold" />
                  <span className="text-sm font-medium text-foreground">Cosmic Message</span>
                </div>
                <p className="text-muted-foreground italic">"{reading.cosmicMessage}"</p>
              </div>

              {/* Elemental Influence */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium text-foreground">Elemental Influence</span>
                </div>
                <p className="text-lg text-foreground">{reading.elementalInfluence}</p>
              </div>

              {/* Energy Levels */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Sun className="w-4 h-4 text-cosmic-gold" />
                  Energy Levels
                </h4>
                <EnergyBar label="Yang Energy" value={reading.yangEnergy} color="cosmic-gold" description="Active, expansive force" />
                <EnergyBar label="Yin Energy" value={reading.yinEnergy} color="cosmic-purple" description="Receptive, nurturing force" />
                <EnergyBar label="Cosmic Balance" value={reading.balance} color="emerald" description="Harmony between forces" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MiniEnergyBarProps {
  label: string;
  value: number;
  color: string;
}

const MiniEnergyBar = ({ label, value, color }: MiniEnergyBarProps) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

interface EnergyBarProps {
  label: string;
  value: number;
  color: string;
  description: string;
}

const EnergyBar = ({ label, value, color, description }: EnergyBarProps) => {
  const colorMap: Record<string, string> = {
    "cosmic-gold": "hsl(45 95% 65%)",
    "cosmic-purple": "hsl(270 65% 55%)",
    "emerald": "hsl(160 84% 39%)",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-foreground">{label}</span>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="text-lg font-bold" style={{ color: colorMap[color] }}>{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, backgroundColor: colorMap[color] }}
        />
      </div>
    </div>
  );
};

export default CosmicOrb;
