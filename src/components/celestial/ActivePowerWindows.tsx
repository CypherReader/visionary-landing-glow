import { Zap, ArrowRight } from "lucide-react";

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

const elementColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Fire: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", glow: "shadow-[0_0_30px_hsl(0_70%_50%/0.1)]" },
  Earth: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "shadow-[0_0_30px_hsl(40_80%_50%/0.1)]" },
  Water: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", glow: "shadow-[0_0_30px_hsl(200_80%_50%/0.1)]" },
  Wood: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-[0_0_30px_hsl(160_60%_40%/0.1)]" },
  Metal: { bg: "bg-slate-400/10", text: "text-slate-300", border: "border-slate-400/20", glow: "shadow-[0_0_30px_hsl(220_10%_60%/0.1)]" },
};

const ActivePowerWindows = () => {
  return (
    <div className="rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 via-card to-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-secondary" />
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-secondary">
          Power Windows
        </h2>
      </div>

      <div className="space-y-3">
        {powerWindows.map((pw) => {
          const colors = elementColors[pw.element] || elementColors.Metal;
          return (
            <div
              key={pw.rank}
              className={`group rounded-xl border p-4 transition-all hover:scale-[1.005] ${colors.bg} ${colors.border} ${colors.glow}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-xl font-serif font-bold text-secondary/70 w-6 text-center shrink-0 pt-0.5">
                  {pw.rank}
                </span>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{pw.timeRange}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {pw.element}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 font-medium flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-secondary shrink-0" />
                    {pw.action}
                  </p>
                  <p className="text-xs text-muted-foreground italic">{pw.reason}</p>
                </div>
                <span className={`text-2xl font-serif font-bold tabular-nums shrink-0 ${colors.text}`}>
                  {pw.score}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivePowerWindows;
