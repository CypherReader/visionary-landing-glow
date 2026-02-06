import { Brain, Heart, Shield, Compass } from "lucide-react";
import { Link } from "react-router-dom";

interface SmartAction {
  icon: React.ReactNode;
  title: string;
  reason: string;
  to: string;
  gradient: string;
  border: string;
}

const getSmartActions = (score: number): SmartAction[] => {
  if (score <= 40) {
    // Challenging day → crisis tools
    return [
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Consult Liu Bowen",
        reason: "Challenging energy today — get crisis strategy from the master tactician",
        to: "/oracle",
        gradient: "from-rose-500/15 to-amber-500/10",
        border: "border-rose-500/20",
      },
      {
        icon: <Compass className="w-5 h-5" />,
        title: "Qi Men Oracle",
        reason: "Use strategic divination to navigate today's obstacles",
        to: "/oracle",
        gradient: "from-primary/15 to-accent/10",
        border: "border-primary/20",
      },
    ];
  }

  if (score >= 80) {
    // Excellent day → expansion tools
    return [
      {
        icon: <Heart className="w-5 h-5" />,
        title: "Relationship Intelligence",
        reason: "High harmony energy — perfect for deepening connections today",
        to: "/matcher",
        gradient: "from-rose-500/15 to-pink-500/10",
        border: "border-rose-500/20",
      },
      {
        icon: <Brain className="w-5 h-5" />,
        title: "Strategic Planning",
        reason: "Your clarity peaks today — map out your next quarter",
        to: "/oracle",
        gradient: "from-secondary/15 to-amber-500/10",
        border: "border-secondary/20",
      },
    ];
  }

  // Moderate day → balanced tools
  return [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Consult the Oracle",
      reason: "Metal day favors precise questions — ask about negotiations or finances",
      to: "/oracle",
      gradient: "from-primary/15 to-cosmic-blue/10",
      border: "border-primary/20",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Cosmic Compatibility",
      reason: "Check how today's energy affects your key relationships",
      to: "/matcher",
      gradient: "from-rose-500/15 to-pink-500/10",
      border: "border-rose-500/20",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Life Architect",
      reason: "Review your strategic plan with today's elemental lens",
      to: "/dashboard",
      gradient: "from-secondary/15 to-emerald-500/10",
      border: "border-secondary/20",
    },
  ];
};

const SmartActions = () => {
  const score = 60; // Would come from user data
  const actions = getSmartActions(score);

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Compass className="w-4 h-4 text-foreground/60" />
        <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground/60">
          Suggested for Today
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`group flex flex-col gap-3 rounded-xl border p-4 bg-gradient-to-br ${action.gradient} ${action.border} transition-all hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-center gap-2.5">
              <div className="text-foreground/70 group-hover:text-foreground transition-colors">
                {action.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-foreground transition-colors">
                {action.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{action.reason}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SmartActions;
