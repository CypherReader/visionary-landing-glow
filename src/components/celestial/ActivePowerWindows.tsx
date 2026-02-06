import { Zap, ArrowRight } from "lucide-react";
import CelestialCard from "./CelestialCard";

interface PowerWindow {
  rank: number;
  timeRange: string;
  element: string;
  chineseHour: string;
  score: number;
  action: string;
  reason: string;
}

const powerWindows: PowerWindow[] = [
  {
    rank: 1,
    timeRange: "09:00–11:00",
    element: "Fire",
    chineseHour: "Si",
    score: 90,
    action: "Career conversations & financial decisions",
    reason: "Fire fuels your authority — your words carry maximum weight",
  },
  {
    rank: 2,
    timeRange: "11:00–13:00",
    element: "Fire",
    chineseHour: "Wu",
    score: 90,
    action: "Presentations, pitches & social influence",
    reason: "Peak charisma window — people are drawn to your energy",
  },
  {
    rank: 3,
    timeRange: "01:00–03:00",
    element: "Earth",
    chineseHour: "Chou",
    score: 75,
    action: "Deep strategic planning & reflection",
    reason: "Earth grounds your vision — clarity peaks in stillness",
  },
];

const elementColors: Record<string, { bg: string; text: string; border: string }> = {
  Fire: { bg: "bg-[hsl(var(--cel-controlled-burn)/0.1)]", text: "text-cel-controlled-burn", border: "border-[hsl(var(--cel-controlled-burn)/0.2)]" },
  Earth: { bg: "bg-[hsl(var(--cel-cosmic-surge)/0.1)]", text: "text-cel-cosmic-surge", border: "border-[hsl(var(--cel-cosmic-surge)/0.2)]" },
  Water: { bg: "bg-[hsl(var(--cel-still-waters)/0.1)]", text: "text-cel-still-waters", border: "border-[hsl(var(--cel-still-waters)/0.2)]" },
  Wood: { bg: "bg-[hsl(var(--cel-rising-tide)/0.1)]", text: "text-cel-rising-tide", border: "border-[hsl(var(--cel-rising-tide)/0.2)]" },
  Metal: { bg: "bg-[hsl(var(--cel-fog-of-war)/0.1)]", text: "text-cel-fog-of-war", border: "border-[hsl(var(--cel-fog-of-war)/0.2)]" },
};

const ActivePowerWindows = () => {
  return (
    <CelestialCard highlighted className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-cel-gold" />
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
          Power Windows
        </h2>
      </div>

      <div className="space-y-3">
        {powerWindows.map((pw) => {
          const colors = elementColors[pw.element] || elementColors.Metal;
          return (
            <div
              key={pw.rank}
              className={`group rounded-xl border p-4 transition-all ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-xl font-serif font-bold text-cel-gold/60 w-6 text-center shrink-0 pt-0.5">
                  {pw.rank}
                </span>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-cel-text-primary">{pw.timeRange}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {pw.element}
                    </span>
                  </div>
                  <p className="text-sm text-cel-text-primary/80 font-medium flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-cel-gold shrink-0" />
                    {pw.action}
                  </p>
                  <p className="text-xs text-cel-text-secondary italic">{pw.reason}</p>
                </div>
                <span className={`text-2xl font-serif font-bold tabular-nums shrink-0 ${colors.text}`}>
                  {pw.score}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </CelestialCard>
  );
};

export default ActivePowerWindows;
