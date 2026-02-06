import { TrendingUp, Star } from "lucide-react";
import CelestialCard from "./CelestialCard";

const JourneyProgress = () => {
  const consultations = 3;
  const alignedMaster = "Zhang Guolao";
  const currentPhase = "Foundation";
  const phaseProgress = 35;
  const streakDays = 7;

  return (
    <CelestialCard className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-cel-text-secondary" />
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
          Your Journey
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Phase Card */}
        <div className="flex-1 rounded-xl border border-[hsl(var(--cel-gold)/0.1)] bg-[hsl(var(--cel-gold-glow)/0.03)] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-cel-text-secondary uppercase tracking-wider">
              Life Architect Phase
            </span>
            <span className="text-xs text-cel-gold font-semibold">{phaseProgress}%</span>
          </div>
          <p className="text-lg font-serif font-semibold text-cel-text-primary">{currentPhase}</p>
          <div className="h-1.5 w-full rounded-full bg-[hsl(var(--cel-glass)/0.08)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--cel-gold))] to-[hsl(var(--cel-gold-hover))] transition-all duration-700"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 flex gap-3">
          <div className="flex-1 rounded-xl border border-[hsl(var(--cel-glass-border)/0.06)] bg-[hsl(var(--cel-glass)/0.02)] p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-serif font-bold text-cel-text-primary tabular-nums">{streakDays}</span>
            <span className="text-[10px] text-cel-text-secondary uppercase tracking-wider text-center">Day Streak</span>
          </div>

          <div className="flex-1 rounded-xl border border-[hsl(var(--cel-glass-border)/0.06)] bg-[hsl(var(--cel-glass)/0.02)] p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-serif font-bold text-cel-text-primary tabular-nums">{consultations}</span>
            <span className="text-[10px] text-cel-text-secondary uppercase tracking-wider text-center">Consultations</span>
          </div>

          <div className="flex-1 rounded-xl border border-[hsl(var(--cel-gold)/0.12)] bg-[hsl(var(--cel-gold-glow)/0.04)] p-4 flex flex-col items-center justify-center gap-1">
            <Star className="w-4 h-4 text-cel-gold" />
            <span className="text-xs font-semibold text-cel-text-primary text-center">{alignedMaster}</span>
            <span className="text-[10px] text-cel-text-secondary uppercase tracking-wider text-center">Top Master</span>
          </div>
        </div>
      </div>
    </CelestialCard>
  );
};

export default JourneyProgress;
