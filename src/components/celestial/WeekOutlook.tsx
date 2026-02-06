import { format, addDays, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import CelestialCard from "./CelestialCard";
import { useCountUp } from "@/hooks/use-count-up";

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
  if (score >= 80) return "text-cel-cosmic-surge";
  if (score >= 60) return "text-cel-controlled-burn";
  if (score >= 40) return "text-cel-fog-of-war";
  return "text-cel-clash-day";
};

const elementIcons: Record<string, string> = {
  Fire: "🔥", Water: "💧", Wood: "🌿", Metal: "⚔️", Earth: "🪨",
};

const DayScore = ({ score }: { score: number }) => {
  const [displayScore, ref] = useCountUp({ end: score, duration: 900 });
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`text-3xl font-serif font-bold tabular-nums ${getScoreColor(score)}`}>
      {displayScore}
    </span>
  );
};

const WeekOutlook = () => {
  const days = getOutlookDays();
  const today = new Date();

  return (
    <CelestialCard className="p-6 space-y-5">
      <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
        7-Day Energy Outlook
      </h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, i) => {
          const isToday = isSameDay(day.date, today);
          return (
            <motion.div
              key={day.date.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
              className={`relative flex flex-col items-center rounded-2xl border p-4 transition-all space-y-2 ${
                isToday
                  ? "border-[hsl(var(--cel-gold)/0.35)] ring-2 ring-[hsl(var(--cel-gold)/0.15)] bg-[hsl(var(--cel-gold-glow)/0.06)]"
                  : "border-[hsl(var(--cel-glass-border)/0.06)] bg-[hsl(var(--cel-glass)/0.02)] hover:bg-[hsl(var(--cel-glass)/0.04)]"
              }`}
            >
              {isToday && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-[hsl(var(--cel-gold))] to-[hsl(var(--cel-gold-hover))] text-[hsl(var(--cel-bg))] px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}

              <span className="text-xs text-cel-text-secondary uppercase font-medium">
                {format(day.date, "EEE")}
              </span>

              <span className="text-sm text-cel-text-primary/70">
                {format(day.date, "d MMM")}
              </span>

              <DayScore score={day.score} />

              <div className="flex items-center gap-1">
                <span className="text-sm">{elementIcons[day.element] || "✦"}</span>
                <span className="text-xs text-cel-text-secondary">{day.element}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </CelestialCard>
  );
};

export default WeekOutlook;
