import { Brain, Heart, Shield, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import CelestialCard from "./CelestialCard";

interface SmartAction {
  icon: React.ReactNode;
  title: string;
  reason: string;
  to: string;
}

const getSmartActions = (score: number): SmartAction[] => {
  if (score <= 40) {
    return [
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Consult Liu Bowen",
        reason: "Challenging energy today — get crisis strategy from the master tactician",
        to: "/oracle",
      },
      {
        icon: <Compass className="w-5 h-5" />,
        title: "Qi Men Oracle",
        reason: "Use strategic divination to navigate today's obstacles",
        to: "/oracle",
      },
    ];
  }

  if (score >= 80) {
    return [
      {
        icon: <Heart className="w-5 h-5" />,
        title: "Relationship Intelligence",
        reason: "High harmony energy — perfect for deepening connections today",
        to: "/matcher",
      },
      {
        icon: <Brain className="w-5 h-5" />,
        title: "Strategic Planning",
        reason: "Your clarity peaks today — map out your next quarter",
        to: "/oracle",
      },
    ];
  }

  return [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Consult the Oracle",
      reason: "Metal day favors precise questions — ask about negotiations or finances",
      to: "/oracle",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Cosmic Compatibility",
      reason: "Check how today's energy affects your key relationships",
      to: "/matcher",
    },
  ];
};

const SmartActions = () => {
  const score = 60;
  const actions = getSmartActions(score);

  return (
    <CelestialCard className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Compass className="w-4 h-4 text-cel-text-secondary" />
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
          Suggested for Today
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className="group flex flex-col gap-3 rounded-xl border border-[hsl(var(--cel-gold)/0.1)] p-4 bg-[hsl(var(--cel-gold-glow)/0.03)] transition-all hover:bg-[hsl(var(--cel-gold-glow)/0.06)] hover:border-[hsl(var(--cel-gold)/0.18)]"
          >
            <div className="flex items-center gap-2.5">
              <div className="text-cel-text-secondary group-hover:text-cel-gold transition-colors">
                {action.icon}
              </div>
              <h3 className="text-sm font-semibold text-cel-text-primary group-hover:text-cel-gold transition-colors">
                {action.title}
              </h3>
            </div>
            <p className="text-xs text-cel-text-secondary leading-relaxed">
              {action.reason}
            </p>
          </Link>
        ))}
      </div>
    </CelestialCard>
  );
};

export default SmartActions;
