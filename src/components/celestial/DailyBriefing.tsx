import { Crown, Sparkles } from "lucide-react";
import { format } from "date-fns";

const DailyBriefing = () => {
  const today = new Date();
  const score = 60;
  const dayMaster = "Earth";
  const todayElement = "Metal";

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-400";
    if (s >= 60) return "text-secondary";
    if (s >= 40) return "text-amber-400";
    return "text-rose-400";
  };

  const getScoreGlow = (s: number) => {
    if (s >= 80) return "shadow-[0_0_60px_hsl(160_60%_40%/0.3)]";
    if (s >= 60) return "shadow-[0_0_60px_hsl(var(--cosmic-gold)/0.3)]";
    if (s >= 40) return "shadow-[0_0_60px_hsl(40_80%_50%/0.3)]";
    return "shadow-[0_0_60px_hsl(0_70%_50%/0.3)]";
  };

  return (
    <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-cosmic-blue/10 p-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-secondary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Left: Score + Meta */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-48 shrink-0">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary">
              Command Center
            </span>
          </div>

          <div className={`relative flex items-center justify-center w-28 h-28 rounded-full border-2 border-secondary/30 ${getScoreGlow(score)}`}>
            <div className="absolute inset-1 rounded-full bg-card/80" />
            <span className={`relative text-5xl font-serif font-bold tabular-nums ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>

          <div className="text-center lg:text-left space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {format(today, "EEEE, d MMMM")}
            </p>
            <p className="text-xs text-muted-foreground">
              {dayMaster} Day Master · {todayElement} Day
            </p>
          </div>
        </div>

        {/* Right: AI Briefing */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-semibold tracking-wide uppercase text-secondary">
              Your Day in 30 Seconds
            </h2>
          </div>

          <p className="text-lg lg:text-xl font-serif leading-relaxed text-foreground/90">
            Today's Metal energy tests your Earth Day Master — expect resistance in creative pursuits but
            strength in negotiations. Your best window is{" "}
            <span className="text-secondary font-semibold">9–11 AM</span> — use it for financial decisions
            and career conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="flex items-start gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 flex-1">
              <span className="text-lg mt-0.5">✦</span>
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Do This</p>
                <p className="text-sm text-foreground/80 mt-0.5">
                  Schedule important meetings before noon. Metal strengthens your authority.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 flex-1">
              <span className="text-lg mt-0.5">⚠</span>
              <div>
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Avoid</p>
                <p className="text-sm text-foreground/80 mt-0.5">
                  Don't sign contracts after 3 PM. Evening Earth clash weakens commitments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyBriefing;
