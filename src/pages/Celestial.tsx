import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DailyBriefing from "@/components/celestial/DailyBriefing";
import TodaysMaster from "@/components/celestial/TodaysMaster";
import SmartActions from "@/components/celestial/SmartActions";
import CurrentMoment from "@/components/celestial/CurrentMoment";
import ActivePowerWindows from "@/components/celestial/ActivePowerWindows";
import CosmicIntelligenceFeed from "@/components/celestial/CosmicIntelligenceFeed";
import WeekOutlook from "@/components/celestial/WeekOutlook";
import ActiveReadings from "@/components/celestial/ActiveReadings";
import DailyInsightShareCard from "@/components/celestial/DailyInsightShareCard";
import JourneyProgress from "@/components/celestial/JourneyProgress";
import { ScrollReveal } from "@/components/celestial/ScrollReveal";

const Celestial = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-cel-bg">
      {/* Clean pearl gradient — Apple style */}
      <div className="fixed inset-0 bg-gradient-to-b from-[hsl(var(--cel-bg))] via-[hsl(var(--cel-bg-mid))] to-[hsl(var(--cel-bg-end))]" />

      {/* Apple-style ambient spotlight behind hero area */}
      <div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-[1] opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--cel-gold) / 0.08), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-8 py-6 space-y-5">
        {/* Nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-cel-text-secondary hover:text-cel-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Section 1: Daily Briefing */}
        <ScrollReveal delay={0.1}>
          <DailyBriefing />
        </ScrollReveal>

        {/* Section 2: Today's Master */}
        <ScrollReveal>
          <TodaysMaster />
        </ScrollReveal>

        {/* Section 3: Today's Actions */}
        <ScrollReveal>
          <SmartActions />
        </ScrollReveal>

        {/* Section 4: Live Energy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ScrollReveal>
            <CurrentMoment />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ActivePowerWindows />
          </ScrollReveal>
        </div>

        {/* Section 5: Cosmic Intelligence Feed */}
        <ScrollReveal>
          <CosmicIntelligenceFeed />
        </ScrollReveal>

        {/* Section 6: 7-Day Outlook */}
        <ScrollReveal>
          <WeekOutlook />
        </ScrollReveal>

        {/* Section 7: Active Readings */}
        <ScrollReveal>
          <ActiveReadings />
        </ScrollReveal>

        {/* Section 8: Daily Insight Card */}
        <ScrollReveal>
          <DailyInsightShareCard />
        </ScrollReveal>

        {/* Section 9: Journey */}
        <ScrollReveal>
          <JourneyProgress />
        </ScrollReveal>

        {/* Footer link */}
        <ScrollReveal>
          <div className="flex justify-center py-4">
            <Link
              to="/dashboard"
              className="text-sm text-cel-text-secondary hover:text-cel-text-primary transition-colors"
            >
              All Features →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Celestial;
