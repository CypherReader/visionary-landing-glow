import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Star, AlertTriangle } from "lucide-react";

interface WeekViewProps {
  selectedDate: Date;
  energyLayers: {
    auspicious: boolean;
    challenging: boolean;
    neutral: boolean;
  };
}

const auspiciousDays = [3, 7, 12, 15, 21, 28];
const challengingDays = [5, 13, 19, 26];

const WeekView = ({ selectedDate, energyLayers }: WeekViewProps) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 gap-3">
      {weekDays.map((day, index) => {
        const dayNum = day.getDate();
        const isAuspicious = auspiciousDays.includes(dayNum);
        const isChallenging = challengingDays.includes(dayNum);
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());

        return (
          <div
            key={index}
            className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
              isSelected
                ? "border-cosmic-gold bg-cosmic-gold/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            {/* Top Glow for Auspicious */}
            {isAuspicious && energyLayers.auspicious && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-8 bg-emerald-500/30 rounded-full blur-xl" />
            )}

            <div className="relative z-10 text-center space-y-2">
              <p className="text-xs text-muted-foreground uppercase">
                {format(day, "EEE")}
              </p>
              <p className={`text-2xl font-serif ${
                isToday ? "text-cosmic-gold" : "text-foreground"
              }`}>
                {format(day, "d")}
              </p>
              
              {/* Energy Indicator */}
              <div className="h-6 flex items-center justify-center">
                {isAuspicious && energyLayers.auspicious && (
                  <Star className="w-4 h-4 text-cosmic-gold fill-cosmic-gold animate-pulse" />
                )}
                {isChallenging && energyLayers.challenging && (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
              </div>

              {/* Energy Label */}
              <p className={`text-xs ${
                isAuspicious && energyLayers.auspicious
                  ? "text-emerald-400"
                  : isChallenging && energyLayers.challenging
                  ? "text-amber-400"
                  : "text-muted-foreground"
              }`}>
                {isAuspicious && energyLayers.auspicious
                  ? "Favorable"
                  : isChallenging && energyLayers.challenging
                  ? "Caution"
                  : "Balanced"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
