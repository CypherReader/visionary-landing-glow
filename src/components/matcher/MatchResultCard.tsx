import { MatchResult } from "@/pages/Matcher";
import { Heart, Flame, Droplet, Wind, Mountain, Sparkles, Gift, BookOpen, Zap, RefreshCw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchResultCardProps {
  userA: { name: string };
  userB: { name: string };
  result: MatchResult;
  onReset: () => void;
}

const elementIcons: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-6 h-6 text-orange-400" />,
  Water: <Droplet className="w-6 h-6 text-blue-400" />,
  Wood: <Wind className="w-6 h-6 text-green-400" />,
  Earth: <Mountain className="w-6 h-6 text-amber-400" />,
  Metal: <Sparkles className="w-6 h-6 text-slate-300" />,
};

const connectionColors: Record<string, string> = {
  "Twin Flame": "from-orange-500 to-red-500",
  "Soulmate": "from-pink-500 to-rose-500",
  "Karmic Teacher": "from-indigo-500 to-purple-500",
  "Divine Complement": "from-emerald-500 to-teal-500",
};

const MatchResultCard = ({ userA, userB, result, onReset }: MatchResultCardProps) => {
  const gradientClass = connectionColors[result.connectionType] || "from-cosmic-purple to-cosmic-blue";

  return (
    <div className="animate-fade-in space-y-8">
      {/* Composite Mandala & Score */}
      <div className="relative">
        {/* Background mandala glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-96 h-96 rounded-full bg-gradient-to-br ${gradientClass} opacity-20 blur-3xl`} />
        </div>

        {/* Main result card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          {/* Top glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-br ${gradientClass} opacity-30 rounded-full blur-3xl`} />

          <div className="relative z-10 p-8 lg:p-12 text-center">
            {/* Connection Type Badge */}
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r ${gradientClass} mb-6`}>
              <Heart className="w-5 h-5 text-white fill-white" />
              <span className="text-white font-medium">{result.connectionType} Match</span>
            </div>

            {/* Score Ring */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              {/* Rotating outer ring */}
              <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: "30s" }}>
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="4"
                  strokeDasharray={`${(result.resonanceScore / 100) * 565} 565`}
                  strokeLinecap="round"
                  transform="rotate(-90 96 96)"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Inner mandala pattern */}
              <div className="absolute inset-4 rounded-full border border-white/10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full">
                  {/* Sacred geometry lines */}
                  <svg className="w-full h-full">
                    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
                      <line
                        key={i}
                        x1="80"
                        y1="80"
                        x2={80 + Math.cos((angle * Math.PI) / 180) * 70}
                        y2={80 + Math.sin((angle * Math.PI) / 180) * 70}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                    ))}
                  </svg>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-bold bg-gradient-to-br from-pink-400 via-cosmic-purple to-cyan-400 bg-clip-text text-transparent">
                    {result.resonanceScore}%
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">Cosmic Resonance</p>
                </div>
              </div>
            </div>

            {/* Connection Description */}
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              {result.connectionDescription}
            </p>

            {/* Names */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-pink-400 font-serif text-xl">{userA.name}</span>
              <Heart className="w-6 h-6 text-cosmic-gold animate-pulse" />
              <span className="text-cyan-400 font-serif text-xl">{userB.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elemental Alchemy */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 lg:p-8">
        <h3 className="text-lg font-serif text-foreground mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cosmic-gold" />
          Elemental Alchemy
        </h3>
        
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-center p-4 rounded-xl bg-white/5">
            {elementIcons[result.elementalAlchemy.userAElement] || <Sparkles className="w-6 h-6 text-cosmic-gold mx-auto" />}
            <p className="text-sm text-foreground mt-2">{result.elementalAlchemy.userAElement}</p>
            <p className="text-xs text-muted-foreground">{userA.name}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 flex items-center justify-center animate-pulse">
              <span className="text-white text-xl">⚗️</span>
            </div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-white/5">
            {elementIcons[result.elementalAlchemy.userBElement] || <Sparkles className="w-6 h-6 text-cosmic-gold mx-auto" />}
            <p className="text-sm text-foreground mt-2">{result.elementalAlchemy.userBElement}</p>
            <p className="text-xs text-muted-foreground">{userB.name}</p>
          </div>
        </div>
        
        <p className="text-center text-muted-foreground mt-6 italic">
          "{result.elementalAlchemy.alchemyDescription}"
        </p>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* The Gift */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Gift className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-serif text-foreground">The Gift</h4>
          </div>
          <p className="text-sm text-muted-foreground">{result.theGift}</p>
        </div>

        {/* The Lesson */}
        <div className="rounded-2xl border border-cosmic-purple/20 bg-cosmic-purple/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-cosmic-purple/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cosmic-purple" />
            </div>
            <h4 className="font-serif text-foreground">The Lesson</h4>
          </div>
          <p className="text-sm text-muted-foreground">{result.theLesson}</p>
        </div>

        {/* The Friction */}
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <h4 className="font-serif text-foreground">The Friction</h4>
          </div>
          <p className="text-sm text-muted-foreground">{result.theFriction}</p>
        </div>
      </div>

      {/* Harmony & Growth Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h4 className="font-serif text-foreground mb-4">Harmony Areas</h4>
          <div className="flex flex-wrap gap-2">
            {result.harmonyAreas.map((area, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h4 className="font-serif text-foreground mb-4">Growth Areas</h4>
          <div className="flex flex-wrap gap-2">
            {result.growthAreas.map((area, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-orange-500/10 border border-orange-500/20 text-orange-400">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" onClick={onReset} className="text-muted-foreground">
          <RefreshCw className="w-4 h-4 mr-2" />
          New Match
        </Button>
        <Button className="bg-gradient-to-r from-pink-500 via-cosmic-purple to-cyan-500 text-white">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default MatchResultCard;
