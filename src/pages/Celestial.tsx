import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnergyScoreCard from "@/components/celestial/EnergyScoreCard";
import PowerWindowsCard from "@/components/celestial/PowerWindowsCard";
import EnergyHeatmap from "@/components/celestial/EnergyHeatmap";
import WeekOutlook from "@/components/celestial/WeekOutlook";

const Celestial = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmic background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-cosmic-purple/10 via-background to-cosmic-blue/8" />
      <div className="fixed inset-0 bg-gradient-to-t from-background via-transparent to-cosmic-purple/12" />
      <div className="fixed top-0 left-1/3 w-[700px] h-[500px] bg-cosmic-purple/15 rounded-full blur-[180px]" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[350px] bg-cosmic-blue/10 rounded-full blur-[140px]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cosmic-gold/3 rounded-full blur-[250px]" />
      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Nav */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Hero Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <EnergyScoreCard />
          <PowerWindowsCard />
        </div>

        {/* Energy Heatmap */}
        <EnergyHeatmap />

        {/* 7-Day Outlook */}
        <WeekOutlook />
      </div>
    </div>
  );
};

export default Celestial;
