import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Sparkles, AlertTriangle, Circle } from "lucide-react";

interface CalendarSidebarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  energyLayers: {
    auspicious: boolean;
    challenging: boolean;
    neutral: boolean;
  };
  onToggleLayer: (layer: "auspicious" | "challenging" | "neutral") => void;
}

// Mock auspicious dates for the current month
const getAuspiciousDates = () => {
  const now = new Date();
  return [3, 7, 12, 15, 21, 28].map(day => new Date(now.getFullYear(), now.getMonth(), day));
};

const CalendarSidebar = ({ 
  selectedDate, 
  onDateSelect, 
  energyLayers, 
  onToggleLayer 
}: CalendarSidebarProps) => {
  const auspiciousDates = getAuspiciousDates();

  return (
    <aside className="w-full lg:w-80 space-y-6 flex-shrink-0">
      {/* Mini Calendar */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 overflow-hidden relative">
        {/* Top glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-cosmic-gold/20 rounded-full blur-3xl" />
        
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          className="rounded-lg"
          modifiers={{
            auspicious: energyLayers.auspicious ? auspiciousDates : [],
          }}
          modifiersClassNames={{
            auspicious: "bg-emerald-500/20 text-emerald-400 font-bold relative before:absolute before:inset-0 before:rounded-full before:bg-emerald-500/30 before:animate-pulse",
          }}
        />
      </div>

      {/* Energy Layers */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Energy Layers
        </h3>
        
        <div className="space-y-3">
          <EnergyToggle
            icon={<Sparkles className="w-4 h-4 text-emerald-400" />}
            label="Auspicious Days"
            description="Favorable cosmic energy"
            checked={energyLayers.auspicious}
            onCheckedChange={() => onToggleLayer("auspicious")}
            color="emerald"
          />
          
          <EnergyToggle
            icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}
            label="Challenging Days"
            description="Days requiring caution"
            checked={energyLayers.challenging}
            onCheckedChange={() => onToggleLayer("challenging")}
            color="amber"
          />
          
          <EnergyToggle
            icon={<Circle className="w-4 h-4 text-slate-400" />}
            label="Neutral Days"
            description="Standard energy flow"
            checked={energyLayers.neutral}
            onCheckedChange={() => onToggleLayer("neutral")}
            color="slate"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          This Month
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <StatCard value="6" label="Auspicious" color="emerald" />
          <StatCard value="4" label="Challenging" color="amber" />
          <StatCard value="21" label="Neutral" color="slate" />
        </div>
      </div>
    </aside>
  );
};

interface EnergyToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
  color: "emerald" | "amber" | "slate";
}

const EnergyToggle = ({ icon, label, description, checked, onCheckedChange, color }: EnergyToggleProps) => {
  const colorClasses = {
    emerald: "data-[state=checked]:bg-emerald-500",
    amber: "data-[state=checked]:bg-amber-500",
    slate: "data-[state=checked]:bg-slate-500",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch 
        checked={checked} 
        onCheckedChange={onCheckedChange}
        className={colorClasses[color]}
      />
    </div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  color: "emerald" | "amber" | "slate";
}

const StatCard = ({ value, label, color }: StatCardProps) => {
  const colorClasses = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    slate: "text-slate-400",
  };

  return (
    <div className="text-center p-3 rounded-xl bg-white/5">
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default CalendarSidebar;
