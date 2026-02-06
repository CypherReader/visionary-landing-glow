import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChineseHour {
  label: string;
  time: string;
  element: string;
  score: number;
}

const chineseHours: ChineseHour[] = [
  { label: "Zi", time: "23:00", element: "Water", score: 50 },
  { label: "Chou", time: "01:00", element: "Earth", score: 75 },
  { label: "Yin", time: "03:00", element: "Wood", score: 45 },
  { label: "Mao", time: "05:00", element: "Wood", score: 55 },
  { label: "Chen", time: "07:00", element: "Earth", score: 65 },
  { label: "Si", time: "09:00", element: "Fire", score: 90 },
  { label: "Wu", time: "11:00", element: "Fire", score: 90 },
  { label: "Wei", time: "13:00", element: "Earth", score: 60 },
  { label: "Shen", time: "15:00", element: "Metal", score: 40 },
  { label: "You", time: "17:00", element: "Metal", score: 30 },
  { label: "Xu", time: "19:00", element: "Earth", score: 55 },
  { label: "Hai", time: "21:00", element: "Water", score: 45 },
];

const getBarColor = (score: number) => {
  if (score >= 80) return "from-emerald-500 to-emerald-400";
  if (score >= 60) return "from-cosmic-gold to-amber-400";
  if (score >= 40) return "from-amber-500 to-orange-400";
  return "from-rose-500 to-rose-400";
};

const getQuality = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Challenging";
};

const getScoreTextColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-cosmic-gold";
  if (score >= 40) return "text-amber-400";
  return "text-rose-400";
};

const EnergyHeatmap = () => {
  const maxScore = 100;

  return (
    <div className="rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-serif text-foreground">Today's Energy Heatmap</h2>
          <p className="text-xs text-muted-foreground mt-0.5">12 Chinese hours (時辰)</p>
        </div>
      </div>

      {/* Bars */}
      <div className="grid grid-cols-12 gap-2 items-end" style={{ minHeight: 220 }}>
        {chineseHours.map((hour) => {
          const heightPercent = (hour.score / maxScore) * 100;
          return (
            <Tooltip key={hour.label}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  {/* Score label */}
                  <span className={`text-xs font-bold tabular-nums ${getScoreTextColor(hour.score)}`}>
                    {hour.score}
                  </span>
                  {/* Bar */}
                  <div className="w-full flex items-end" style={{ height: 160 }}>
                    <div
                      className={`w-full rounded-t-lg bg-gradient-to-t ${getBarColor(hour.score)} transition-all duration-500 group-hover:opacity-90 group-hover:scale-x-110`}
                      style={{ height: `${heightPercent}%`, minHeight: 8 }}
                    />
                  </div>
                  {/* Labels */}
                  <span className="text-xs font-semibold text-foreground">{hour.label}</span>
                  <span className="text-[10px] text-muted-foreground">{hour.time}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-card border-white/15 text-foreground text-xs space-y-1 p-3"
              >
                <p className="font-semibold">{hour.label} ({hour.time})</p>
                <p>Element: <span className="font-medium">{hour.element}</span></p>
                <p>Quality: <span className={`font-medium ${getScoreTextColor(hour.score)}`}>{getQuality(hour.score)}</span></p>
                <p>Score: <span className="font-bold">{hour.score}</span></p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-2 border-t border-white/5">
        {[
          { label: "Excellent", color: "bg-emerald-400" },
          { label: "Good", color: "bg-cosmic-gold" },
          { label: "Moderate", color: "bg-amber-500" },
          { label: "Challenging", color: "bg-rose-500" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${item.color}`} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyHeatmap;
