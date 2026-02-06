import { Crown } from "lucide-react";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const EnergyScoreCard = () => {
  const today = new Date();
  const score = 60;
  const dayMaster = "Earth";
  const todayElement = "Metal";
  const sunSign = "Aries";

  const getScoreLabel = (s: number) => {
    if (s >= 80) return "Excellent Energy";
    if (s >= 60) return "Good Energy";
    if (s >= 40) return "Moderate Energy";
    return "Challenging Energy";
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-400";
    if (s >= 60) return "text-cosmic-gold";
    if (s >= 40) return "text-amber-400";
    return "text-rose-400";
  };

  const getProgressColor = (s: number) => {
    if (s >= 80) return "bg-emerald-400";
    if (s >= 60) return "bg-cosmic-gold";
    if (s >= 40) return "bg-amber-400";
    return "bg-rose-400";
  };

  return (
    <div className="flex-1 rounded-2xl border border-white/10 bg-gradient-to-br from-cosmic-purple/20 via-card to-cosmic-blue/10 p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-cosmic-purple" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cosmic-purple">
            Celestial Command Center
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {format(today, "EEEE d MMMM")}
        </p>
      </div>

      {/* Score */}
      <div className="flex items-end gap-3">
        <span className={`text-7xl font-serif font-bold tabular-nums ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className={`text-lg font-medium pb-2 ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-700 ${getProgressColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Info Chips */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Badge variant="outline" className="bg-white/5 border-white/15 text-foreground gap-1.5 px-3 py-1.5">
          <span className="text-muted-foreground text-xs">Day Master</span>
          <span className="font-semibold text-sm">{dayMaster}</span>
        </Badge>
        <Badge variant="outline" className="bg-white/5 border-white/15 text-foreground gap-1.5 px-3 py-1.5">
          <span className="text-muted-foreground text-xs">Today's Element</span>
          <span className="font-semibold text-sm">{todayElement}</span>
        </Badge>
        <Badge variant="outline" className="bg-white/5 border-white/15 text-foreground gap-1.5 px-3 py-1.5">
          <span className="text-muted-foreground text-xs">Sun Sign</span>
          <span className="font-semibold text-sm">{sunSign}</span>
        </Badge>
      </div>
    </div>
  );
};

export default EnergyScoreCard;
