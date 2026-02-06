import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CelestialCard from "./CelestialCard";

interface Master {
  id: string;
  emoji: string;
  name: string;
  title: string;
  quote: string;
  reason: string;
}

const masters: Master[] = [
  {
    id: "liu-bowen",
    emoji: "⚔️",
    name: "Liu Bowen",
    title: "Military Strategist",
    quote:
      "Metal hour pressure at 3 PM creates a tactical challenge for your Wood Day Master. I can map the optimal path through this afternoon's energy.",
    reason:
      "Metal-Wood clash requires strategic timing — Liu Bowen's specialty",
  },
  {
    id: "master-yang",
    emoji: "⛰️",
    name: "Master Yang",
    title: "BaZi Architect",
    quote:
      "Your chart's hidden stems are active today. The Earth-Metal interaction reveals a secondary wealth path most readings overlook.",
    reason:
      "Hidden stem activation requires deep chart analysis — Master Yang's domain",
  },
  {
    id: "dr-chen",
    emoji: "🧠",
    name: "Dr Chen",
    title: "Psychologist",
    quote:
      "Venus-Saturn square today affects communication patterns. I can help you navigate emotional conversations with clarity.",
    reason:
      "Venus-Saturn square affecting communication — Dr Chen specialises in this",
  },
  {
    id: "archangel-uriel",
    emoji: "✦",
    name: "Archangel Uriel",
    title: "Divine Mentor",
    quote:
      "A karmic alignment window opens today. The convergence of your natal promise and current transits creates a rare opportunity for spiritual insight.",
    reason:
      "Karmic alignment window — guidance from the divine perspective",
  },
];

const getTodaysMaster = (): { recommended: Master; others: Master[] } => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % masters.length;
  const recommended = masters[index];
  const others = masters.filter((_, i) => i !== index);
  return { recommended, others };
};

const TodaysMaster = () => {
  const { recommended, others } = getTodaysMaster();

  return (
    <CelestialCard className="p-6 lg:p-8 space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">{recommended.emoji}</span>
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
          Today's Master
        </h2>
      </div>

      {/* Recommended Master Card */}
      <div className="rounded-xl border border-[hsl(var(--cel-gold)/0.12)] bg-[hsl(var(--cel-gold-glow)/0.04)] p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{recommended.emoji}</span>
            <div>
              <h3 className="text-lg font-serif font-semibold text-cel-text-primary">
                {recommended.name}
              </h3>
              <p className="text-xs text-cel-text-secondary">
                {recommended.title}
              </p>
            </div>
          </div>
        </div>

        <blockquote className="text-base font-serif leading-[1.6] text-cel-text-primary/85 italic border-l-2 border-[hsl(var(--cel-gold)/0.3)] pl-4">
          "{recommended.quote}"
        </blockquote>

        <div className="flex items-start gap-2 text-xs text-cel-text-secondary">
          <span className="text-cel-gold font-semibold shrink-0">
            Why today:
          </span>
          <span>{recommended.reason}</span>
        </div>

        <Link
          to="/oracle"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cel-gold hover:text-cel-gold-hover transition-colors group"
        >
          Consult {recommended.name}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Also Available */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-cel-text-secondary">Also available:</span>
        {others.map((master) => (
          <Link
            key={master.id}
            to="/oracle"
            className="inline-flex items-center gap-1.5 text-xs text-cel-text-primary/70 hover:text-cel-text-primary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[hsl(var(--cel-glass)/0.04)] border border-transparent hover:border-[hsl(var(--cel-glass-border)/0.06)]"
          >
            <span>{master.emoji}</span>
            <span>{master.name}</span>
          </Link>
        ))}
      </div>
    </CelestialCard>
  );
};

export default TodaysMaster;
