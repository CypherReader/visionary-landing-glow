import { format, isSameDay } from "date-fns";
import DailyInsightCard from "./DailyInsightCard";
import WeekView from "./WeekView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarMainStageProps {
  selectedDate: Date;
  energyLayers: {
    auspicious: boolean;
    challenging: boolean;
    neutral: boolean;
  };
}

// Mock data for cosmic insights
const getCosmicInsight = (date: Date) => {
  const auspiciousDays = [3, 7, 12, 15, 21, 28];
  const challengingDays = [5, 13, 19, 26];
  const day = date.getDate();
  
  const isAuspicious = auspiciousDays.includes(day);
  const isChallenging = challengingDays.includes(day);
  
  return {
    date,
    isAuspicious,
    isChallenging,
    energy: isAuspicious ? "Highly Favorable" : isChallenging ? "Exercise Caution" : "Balanced",
    element: ["Wood", "Fire", "Earth", "Metal", "Water"][day % 5],
    luckyColor: ["Jade Green", "Cosmic Gold", "Royal Purple", "Ocean Blue", "Rose Pink"][day % 5],
    luckyDirection: ["East", "South", "West", "North", "Southeast"][day % 5],
    luckyNumber: (day % 9) + 1,
    summary: isAuspicious 
      ? "The stars align favorably today. This is an excellent day for new beginnings, important meetings, and taking decisive action. The cosmic energy supports growth and manifestation."
      : isChallenging
      ? "The celestial energies call for patience and reflection today. Avoid major decisions and focus on inner work. This is a day for contemplation and preparation."
      : "A day of balanced energies. Routine activities proceed smoothly. Focus on steady progress rather than dramatic changes.",
    activities: isAuspicious 
      ? ["Sign contracts", "Start new projects", "Make investments", "Important meetings"]
      : isChallenging
      ? ["Meditation", "Rest and recovery", "Planning", "Avoid confrontations"]
      : ["Daily routines", "Light planning", "Social activities", "Self-care"],
  };
};

const CalendarMainStage = ({ selectedDate, energyLayers }: CalendarMainStageProps) => {
  const insight = getCosmicInsight(selectedDate);
  const isToday = isSameDay(selectedDate, new Date());

  return (
    <main className="flex-1 space-y-6">
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif text-foreground">
            {format(selectedDate, "EEEE")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {format(selectedDate, "MMMM d, yyyy")}
            {isToday && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-cosmic-gold/20 text-cosmic-gold">
                Today
              </span>
            )}
          </p>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="daily" className="data-[state=active]:bg-white/10">
            Daily Insight
          </TabsTrigger>
          <TabsTrigger value="week" className="data-[state=active]:bg-white/10">
            Week View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <DailyInsightCard insight={insight} />
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <WeekView selectedDate={selectedDate} energyLayers={energyLayers} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default CalendarMainStage;
