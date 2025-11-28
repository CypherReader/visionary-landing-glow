import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CalendarSidebar from "@/components/dashboard/CalendarSidebar";
import CalendarMainStage from "@/components/dashboard/CalendarMainStage";
import SettingsPanel from "@/components/dashboard/SettingsPanel";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [energyLayers, setEnergyLayers] = useState({
    auspicious: true,
    challenging: true,
    neutral: false,
  });

  const toggleEnergyLayer = (layer: keyof typeof energyLayers) => {
    setEnergyLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-cosmic-purple/10 via-transparent to-cosmic-blue/5" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cosmic-purple/20 rounded-full blur-[120px] opacity-30" />
      
      <div className="relative z-10">
        <DashboardHeader onSettingsClick={() => setShowSettings(!showSettings)} />
        
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}
        
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1600px] mx-auto">
          {/* Sidebar */}
          <CalendarSidebar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            energyLayers={energyLayers}
            onToggleLayer={toggleEnergyLayer}
          />
          
          {/* Main Stage */}
          <CalendarMainStage selectedDate={selectedDate} energyLayers={energyLayers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
