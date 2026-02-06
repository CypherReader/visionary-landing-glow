import { TrendingUp, Star } from "lucide-react";

const JourneyProgress = () => {
  // Mock data — would come from user profile
  const consultations = 3;
  const alignedMaster = "Zhang Guolao";
  const currentPhase = "Foundation";
  const phaseProgress = 35;
  const streakDays = 7;

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-foreground/60" />
        <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground/60">
          Your Journey
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Phase Card */}
        <div className="flex-1 rounded-xl border border-primary/15 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Life Architect Phase</span>
            <span className="text-xs text-primary font-semibold">{phaseProgress}%</span>
          </div>
          <p className="text-lg font-serif font-semibold text-foreground">{currentPhase}</p>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 flex gap-3">
          <div className="flex-1 rounded-xl border border-border bg-muted/30 p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-serif font-bold text-foreground tabular-nums">{streakDays}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">Day Streak</span>
          </div>

          <div className="flex-1 rounded-xl border border-border bg-muted/30 p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-serif font-bold text-foreground tabular-nums">{consultations}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">Consultations</span>
          </div>

          <div className="flex-1 rounded-xl border border-secondary/20 bg-secondary/5 p-4 flex flex-col items-center justify-center gap-1">
            <Star className="w-4 h-4 text-secondary" />
            <span className="text-xs font-semibold text-foreground text-center">{alignedMaster}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">Top Master</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyProgress;
