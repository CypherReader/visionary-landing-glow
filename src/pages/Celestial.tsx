import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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

const Celestial = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-cel-bg">
      {/* Deep space gradient layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-[hsl(var(--cel-bg))] via-[hsl(var(--cel-bg-mid))] to-[hsl(var(--cel-bg-end))]" />
      {/* Ambient nebula glows — warm purple */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[400px] bg-[hsl(var(--cel-bg-mid)/0.5)] rounded-full blur-[180px]" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[300px] bg-[hsl(var(--cel-gold-glow)/0.04)] rounded-full blur-[160px]" />
      {/* Very faint gold atmospheric glow at top */}
      <div className="fixed top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[hsl(var(--cel-gold-glow)/0.03)] to-transparent" />

      {/* Particle field */}
      <ParticleField />

      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-8 py-6 space-y-5">
        {/* Nav */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-cel-text-secondary hover:text-cel-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Section 1: Daily Briefing — HERO */}
        <DailyBriefing />

        {/* Section 2: Today's Master — HERO */}
        <TodaysMaster />

        {/* Section 3: Today's Actions — HERO */}
        <SmartActions />

        {/* Section 4: Live Energy — HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <CurrentMoment />
          <ActivePowerWindows />
        </div>

        {/* Section 5: Cosmic Intelligence Feed — SURFACE */}
        <CosmicIntelligenceFeed />

        {/* Section 6: 7-Day Outlook — HERO */}
        <WeekOutlook />

        {/* Section 7: Active Readings — SURFACE */}
        <ActiveReadings />

        {/* Section 8: Daily Insight Card — HERO */}
        <DailyInsightShareCard />

        {/* Section 9: Journey — SURFACE */}
        <JourneyProgress />

        {/* Overflow link */}
        <div className="flex justify-center py-4">
          <Link
            to="/dashboard"
            className="text-sm text-cel-text-secondary hover:text-cel-gold transition-colors"
          >
            All Features →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Celestial;
