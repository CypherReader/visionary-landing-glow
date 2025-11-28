import { Star, Compass, Palette, Hash, Sparkles, Lock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DailyInsight {
  date: Date;
  isAuspicious: boolean;
  isChallenging: boolean;
  energy: string;
  element: string;
  luckyColor: string;
  luckyDirection: string;
  luckyNumber: number;
  summary: string;
  activities: string[];
}

interface DailyInsightCardProps {
  insight: DailyInsight;
  isLocked?: boolean;
}

const DailyInsightCard = ({ insight, isLocked = false }: DailyInsightCardProps) => {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
      {/* Top Glow Effect */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl transition-colors ${
          insight.isAuspicious 
            ? "bg-cosmic-gold/30" 
            : insight.isChallenging 
            ? "bg-amber-500/20" 
            : "bg-cosmic-purple/20"
        }`} 
      />

      {/* Auspicious Badge */}
      {insight.isAuspicious && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 animate-pulse">
          <Star className="w-4 h-4 text-cosmic-gold fill-cosmic-gold" />
          <span className="text-sm font-medium text-cosmic-gold">Auspicious Day</span>
          <Star className="w-4 h-4 text-cosmic-gold fill-cosmic-gold" />
        </div>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
          <Lock className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-serif text-foreground mb-2">Sage Member Only</h3>
          <p className="text-sm text-muted-foreground mb-4">Unlock daily guidance for every day</p>
          <Button className="bg-gradient-to-r from-cosmic-gold to-cosmic-purple text-black font-medium">
            Upgrade to Sage
          </Button>
        </div>
      )}

      <div className={`relative z-10 p-6 lg:p-8 space-y-6 ${isLocked ? "blur-sm" : ""}`}>
        {/* Energy Status */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Cosmic Energy
          </h2>
          <p className={`text-2xl font-serif ${
            insight.isAuspicious 
              ? "text-emerald-400" 
              : insight.isChallenging 
              ? "text-amber-400" 
              : "text-foreground"
          }`}>
            {insight.energy}
          </p>
        </div>

        {/* Summary */}
        <div className="space-y-3">
          <h3 className="text-lg font-serif text-foreground">Daily Cosmic Insight</h3>
          <p className="text-muted-foreground leading-relaxed">{insight.summary}</p>
        </div>

        {/* Lucky Elements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LuckyElement
            icon={<Sparkles className="w-5 h-5" />}
            label="Element"
            value={insight.element}
          />
          <LuckyElement
            icon={<Palette className="w-5 h-5" />}
            label="Lucky Color"
            value={insight.luckyColor}
          />
          <LuckyElement
            icon={<Compass className="w-5 h-5" />}
            label="Lucky Direction"
            value={insight.luckyDirection}
          />
          <LuckyElement
            icon={<Hash className="w-5 h-5" />}
            label="Lucky Number"
            value={insight.luckyNumber.toString()}
          />
        </div>

        {/* Recommended Activities */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {insight.isAuspicious ? "Favorable Activities" : insight.isChallenging ? "Recommended Focus" : "Suggested Activities"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {insight.activities.map((activity, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                  insight.isAuspicious
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : insight.isChallenging
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    : "bg-white/5 border-white/10 text-muted-foreground"
                }`}
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Share2 className="w-4 h-4 mr-2" />
            Share Insight
          </Button>
        </div>
      </div>
    </div>
  );
};

interface LuckyElementProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const LuckyElement = ({ icon, label, value }: LuckyElementProps) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
    <div className="flex items-center gap-2 text-cosmic-gold">
      {icon}
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-lg font-medium text-foreground">{value}</p>
  </div>
);

export default DailyInsightCard;
