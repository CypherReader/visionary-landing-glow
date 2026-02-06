import { Clock, ArrowRight } from "lucide-react";

interface ChineseHour {
  label: string;
  time: string;
  element: string;
  score: number;
  guidance: string;
}

const chineseHours: ChineseHour[] = [
  { label: "Zi", time: "23:00", element: "Water", score: 50, guidance: "Rest and reflect. Water energy supports meditation." },
  { label: "Chou", time: "01:00", element: "Earth", score: 75, guidance: "Deep planning. Earth grounds your midnight insights." },
  { label: "Yin", time: "03:00", element: "Wood", score: 45, guidance: "Sleep deeply. Wood regenerates your vitality." },
  { label: "Mao", time: "05:00", element: "Wood", score: 55, guidance: "Early rise benefits. Wood energy sparks new ideas." },
  { label: "Chen", time: "07:00", element: "Earth", score: 65, guidance: "Good for routine tasks. Stable energy for preparation." },
  { label: "Si", time: "09:00", element: "Fire", score: 90, guidance: "Peak performance. Make your boldest moves now." },
  { label: "Wu", time: "11:00", element: "Fire", score: 90, guidance: "Social power hour. Present, pitch, and persuade." },
  { label: "Wei", time: "13:00", element: "Earth", score: 60, guidance: "Steady effort. Good for detailed work and follow-ups." },
  { label: "Shen", time: "15:00", element: "Metal", score: 40, guidance: "Caution with decisions. Metal clashes with your Day Master." },
  { label: "You", time: "17:00", element: "Metal", score: 30, guidance: "Wind down active work. Avoid commitments and contracts." },
  { label: "Xu", time: "19:00", element: "Earth", score: 55, guidance: "Reconnect with family. Earth supports relationships tonight." },
  { label: "Hai", time: "21:00", element: "Water", score: 45, guidance: "Journaling time. Water helps process the day's events." },
];

const getCurrentHourIndex = (): number => {
  const hour = new Date().getHours();
  if (hour >= 23 || hour < 1) return 0;
  if (hour >= 1 && hour < 3) return 1;
  if (hour >= 3 && hour < 5) return 2;
  if (hour >= 5 && hour < 7) return 3;
  if (hour >= 7 && hour < 9) return 4;
  if (hour >= 9 && hour < 11) return 5;
  if (hour >= 11 && hour < 13) return 6;
  if (hour >= 13 && hour < 15) return 7;
  if (hour >= 15 && hour < 17) return 8;
  if (hour >= 17 && hour < 19) return 9;
  if (hour >= 19 && hour < 21) return 10;
  return 11;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-secondary";
  if (score >= 40) return "text-amber-400";
  return "text-rose-400";
};

const getBarColor = (score: number, isActive: boolean) => {
  if (isActive) return "bg-primary";
  if (score >= 80) return "bg-emerald-500/60";
  if (score >= 60) return "bg-secondary/50";
  if (score >= 40) return "bg-amber-500/40";
  return "bg-rose-500/40";
};

const elementIcons: Record<string, string> = {
  Fire: "🔥",
  Water: "💧",
  Wood: "🌿",
  Metal: "⚔️",
  Earth: "🪨",
};

const CurrentMoment = () => {
  const currentIndex = getCurrentHourIndex();
  const current = chineseHours[currentIndex];
  const nextIndex = (currentIndex + 1) % chineseHours.length;
  const next = chineseHours[nextIndex];

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Clock className="w-5 h-5 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-glow-pulse" />
          </div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-primary">Right Now</h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {current.label} Hour · {current.time}–{next.time}
        </span>
      </div>

      {/* Current Moment Hero */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-3xl">{elementIcons[current.element]}</span>
            <span className={`text-3xl font-serif font-bold tabular-nums ${getScoreColor(current.score)}`}>
              {current.score}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">{current.element}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-base font-serif text-foreground leading-relaxed">
            {current.guidance}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowRight className="w-3 h-3" />
            <span>
              Next: <span className="text-foreground/70">{next.label} ({next.element})</span> — {next.guidance.split(".")[0]}.
            </span>
          </div>
        </div>
      </div>

      {/* Mini Timeline */}
      <div className="flex items-end gap-1 h-16">
        {chineseHours.map((hour, i) => {
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;
          const heightPercent = (hour.score / 100) * 100;

          return (
            <div key={hour.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end" style={{ height: 48 }}>
                <div
                  className={`w-full rounded-t transition-all ${getBarColor(hour.score, isActive)} ${isPast ? "opacity-40" : ""} ${isActive ? "ring-1 ring-primary/50" : ""}`}
                  style={{ height: `${heightPercent}%`, minHeight: 4 }}
                />
              </div>
              <span className={`text-[8px] ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}>
                {hour.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentMoment;
