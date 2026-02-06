import { Zap } from "lucide-react";

interface PowerWindow {
  rank: number;
  timeRange: string;
  element: string;
  chineseHour: string;
  score: number;
}

const powerWindows: PowerWindow[] = [
  { rank: 1, timeRange: "09:00–11:00", element: "Fire", chineseHour: "Si", score: 90 },
  { rank: 2, timeRange: "11:00–13:00", element: "Fire", chineseHour: "Wu", score: 90 },
  { rank: 3, timeRange: "01:00–03:00", element: "Earth", chineseHour: "Chou", score: 75 },
];

const elementColors: Record<string, { bg: string; text: string; border: string }> = {
  Fire: { bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/30" },
  Earth: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  Water: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30" },
  Wood: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  Metal: { bg: "bg-slate-400/15", text: "text-slate-300", border: "border-slate-400/30" },
};

const PowerWindowsCard = () => {
  return (
    <div className="flex-1 rounded-2xl border border-cosmic-gold/30 bg-gradient-to-br from-cosmic-gold/5 via-card to-card p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-cosmic-gold" />
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-cosmic-gold">
          Power Windows
        </h2>
      </div>

      <div className="space-y-3">
        {powerWindows.map((pw) => {
          const colors = elementColors[pw.element] || elementColors.Metal;
          return (
            <div
              key={pw.rank}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all hover:scale-[1.01] ${colors.bg} ${colors.border}`}
            >
              <span className="text-2xl font-serif font-bold text-cosmic-gold w-8 text-center">
                #{pw.rank}
              </span>
              <div className="flex-1 space-y-0.5">
                <p className="text-foreground font-semibold text-sm">{pw.timeRange}</p>
                <p className="text-xs text-muted-foreground">
                  <span className={colors.text}>{pw.element}</span> — {pw.chineseHour}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-2xl font-serif font-bold tabular-nums ${colors.text}`}>
                  {pw.score}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PowerWindowsCard;
