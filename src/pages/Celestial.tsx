import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ParticleField from "@/components/celestial/ParticleField";
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
      {/* Deep space gradient layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-[hsl(var(--cel-bg))] via-[hsl(var(--cel-bg-mid))] to-[hsl(var(--cel-bg-end))]" />
      <div className="fixed top-0 left-1/3 w-[600px] h-[400px] bg-[hsl(var(--cel-bg-mid)/0.5)] rounded-full blur-[180px]" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[300px] bg-[hsl(var(--cel-gold-glow)/0.04)] rounded-full blur-[160px]" />
      <div className="fixed top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[hsl(var(--cel-gold-glow)/0.03)] to-transparent" />

      <ParticleField />

      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-8 py-6 space-y-5">
        {/* Nav — instant, no animation */}
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

        {/* Section 1: Daily Briefing — loads immediately with slight delay */}
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

        {/* Overflow link */}
        <ScrollReveal>
          <div className="flex justify-center py-4">
            <Link
              to="/dashboard"
              className="text-sm text-cel-text-secondary hover:text-cel-gold transition-colors"
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
