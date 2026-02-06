import { Crown, Sparkles } from "lucide-react";
import { format } from "date-fns";
import CelestialCard from "./CelestialCard";

const DailyBriefing = () => {
  const today = new Date();
  const score = 60;
  const dayMaster = "Earth";
  const todayElement = "Metal";
  const stateName = "Controlled Burn";

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-cel-cosmic-surge";
    if (s >= 60) return "text-cel-controlled-burn";
    if (s >= 40) return "text-cel-fog-of-war";
    return "text-cel-clash-day";
  };

  const getScoreGlow = (s: number) => {
    if (s >= 80) return "shadow-[0_0_60px_hsl(var(--cel-cosmic-surge)/0.25)]";
    if (s >= 60) return "shadow-[0_0_60px_hsl(var(--cel-controlled-burn)/0.25)]";
    if (s >= 40) return "shadow-[0_0_60px_hsl(var(--cel-fog-of-war)/0.25)]";
    return "shadow-[0_0_60px_hsl(var(--cel-clash-day)/0.25)]";
  };

  return (
    <CelestialCard highlighted className="p-8">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[hsl(var(--cel-gold-glow)/0.06)] rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Score + Meta */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-48 shrink-0">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-cel-gold" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-cel-gold">
              Command Center
            </span>
          </div>

          <div
            className={`relative flex items-center justify-center w-28 h-28 rounded-full border border-[hsl(var(--cel-gold)/0.25)] ${getScoreGlow(score)}`}
          >
            <div className="absolute inset-1 rounded-full bg-[hsl(var(--cel-surface)/0.8)]" />
            <span
              className={`relative text-5xl font-serif font-bold tabular-nums ${getScoreColor(score)}`}
            >
              {score}
            </span>
          </div>

          {/* State name */}
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-cel-gold">
            {stateName} 🔥
          </p>

          <div className="text-center lg:text-left space-y-0.5">
            <p className="text-xs text-cel-text-secondary">
              {format(today, "EEEE, d MMMM")}
            </p>
            <p className="text-xs text-cel-text-secondary">
              {dayMaster} Day Master · {todayElement} Day
            </p>
          </div>
        </div>

        {/* Right: AI Briefing */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cel-gold" />
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
              Your Day in 30 Seconds
            </h2>
          </div>

          <p className="text-lg lg:text-xl font-serif leading-[1.6] text-cel-text-primary">
            Today's Metal energy tests your Earth Day Master — expect resistance
            in creative pursuits but strength in negotiations. Your best window
            is{" "}
            <span className="text-cel-gold font-semibold">9–11 AM</span> — use
            it for financial decisions and career conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="flex items-start gap-2.5 rounded-xl bg-[hsl(var(--cel-rising-tide)/0.08)] border border-[hsl(var(--cel-rising-tide)/0.15)] px-4 py-3 flex-1">
              <span className="text-cel-gold text-lg mt-0.5">✦</span>
              <div>
                <p className="text-xs font-semibold text-cel-rising-tide uppercase tracking-wider">
                  Do This
                </p>
                <p className="text-sm text-cel-text-primary/80 mt-0.5 leading-relaxed">
                  Schedule important meetings before noon. Metal strengthens
                  your authority.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl bg-[hsl(var(--cel-clash-day)/0.08)] border border-[hsl(var(--cel-clash-day)/0.15)] px-4 py-3 flex-1">
              <span className="text-cel-clash-day text-lg mt-0.5">⚠</span>
              <div>
                <p className="text-xs font-semibold text-cel-clash-day uppercase tracking-wider">
                  Avoid
                </p>
                <p className="text-sm text-cel-text-primary/80 mt-0.5 leading-relaxed">
                  Don't sign contracts after 3 PM. Evening Earth clash weakens
                  commitments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CelestialCard>
  );
};

export default DailyBriefing;
