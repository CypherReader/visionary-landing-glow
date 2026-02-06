import { format, addDays, isSameDay } from "date-fns";

interface DayOutlook {
  date: Date;
  score: number;
  element: string;
}

const elements = ["Metal", "Water", "Wood", "Fire", "Earth", "Metal", "Water"];
const scores = [60, 70, 55, 30, 65, 90, 75];

const getOutlookDays = (): DayOutlook[] => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => ({
    date: addDays(today, i),
    score: scores[i],
    element: elements[i],
  }));
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-cosmic-gold";
  if (score >= 40) return "text-amber-400";
  return "text-rose-400";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-emerald-500/10";
  if (score >= 60) return "bg-cosmic-gold/10";
  if (score >= 40) return "bg-amber-500/10";
  return "bg-rose-500/10";
};

const getScoreRing = (score: number) => {
  if (score >= 80) return "ring-emerald-500/30";
  if (score >= 60) return "ring-cosmic-gold/30";
  if (score >= 40) return "ring-amber-500/30";
  return "ring-rose-500/30";
};

const elementIcons: Record<string, string> = {
  Fire: "🔥",
  Water: "💧",
  Wood: "🌿",
  Metal: "⚔️",
  Earth: "🪨",
};

const WeekOutlook = () => {
  const days = getOutlookDays();
  const today = new Date();

  return (
    <div className="rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm p-6 space-y-5">
      <h2 className="text-lg font-serif text-foreground">7-Day Energy Outlook</h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          const isToday = isSameDay(day.date, today);
          return (
            <div
              key={day.date.toISOString()}
              className={`relative flex flex-col items-center rounded-2xl border p-4 transition-all space-y-2 ${
                isToday
                  ? "border-cosmic-purple ring-2 ring-cosmic-purple/40 bg-cosmic-purple/10"
                  : `border-white/10 ${getScoreBg(day.score)} hover:bg-white/5`
              }`}
            >
              {isToday && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider bg-cosmic-purple text-primary-foreground px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}

              <span className="text-xs text-muted-foreground uppercase font-medium">
                {format(day.date, "EEE")}
              </span>

              <span className="text-sm text-foreground/70">
                {format(day.date, "d MMM")}
              </span>

              <span className={`text-3xl font-serif font-bold tabular-nums ${getScoreColor(day.score)}`}>
                {day.score}
              </span>

              <div className="flex items-center gap-1">
                <span className="text-sm">{elementIcons[day.element] || "✦"}</span>
                <span className="text-xs text-muted-foreground">{day.element}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekOutlook;
