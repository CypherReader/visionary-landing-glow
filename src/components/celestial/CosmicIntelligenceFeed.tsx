import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CelestialCard from "./CelestialCard";

/* ─── Secret Schools ─── */

interface SchoolSpotlight {
  module: string;
  emoji: string;
  content: string;
  link: string;
  linkLabel: string;
}

const schoolRotation: SchoolSpotlight[] = [
  { module: "Jade Pivot", emoji: "🐉", content: "Your Spleen meridian is most active 9–11 AM today. Eat warm, cooked foods this morning — avoid cold drinks before noon.", link: "/dashboard", linkLabel: "Explore Jade Pivot" },
  { module: "Thunder Rites", emoji: "⚡", content: "Today's Thunder Gate opens in the East. Face east during morning meditation for amplified intention-setting.", link: "/dashboard", linkLabel: "Explore Thunder Rites" },
  { module: "Jade Pivot", emoji: "🐉", content: "Lung meridian governs 3–5 AM. Deep breathing exercises before breakfast will optimise today's Metal energy.", link: "/dashboard", linkLabel: "Explore Jade Pivot" },
  { module: "Water Methods", emoji: "🌊", content: "Water Star 8 visits your bedroom sector this month. Sleep quality improves if you add a small water feature or blue accents.", link: "/dashboard", linkLabel: "Explore Water Methods" },
  { module: "Thunder Rites", emoji: "⚡", content: "The Red Phoenix direction is South today. Important conversations benefit from the speaker facing South.", link: "/dashboard", linkLabel: "Explore Thunder Rites" },
  { module: "Jade Pivot", emoji: "🐉", content: "Weekend: Heart meridian is strongest 11 AM–1 PM. Vigorous exercise should happen BEFORE this window, rest during it.", link: "/dashboard", linkLabel: "Explore Jade Pivot" },
  { module: "Water Methods", emoji: "🌊", content: "Weekly reset: Check your home's Southwest corner. Relationship energy accumulates here — clear clutter.", link: "/dashboard", linkLabel: "Explore Water Methods" },
];

const getTodaySchool = () => {
  const day = new Date().getDay();
  return schoolRotation[day];
};

/* ─── Component ─── */

const CosmicIntelligenceFeed = () => {
  const [isOpen, setIsOpen] = useState(true);
  const school = getTodaySchool();

  return (
    <CelestialCard>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-6 pb-0 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <span className="text-sm">🔮</span>
              <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
                Cosmic Intelligence
              </h2>
            </div>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-cel-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-cel-text-secondary" />
            )}
          </button>
        </CollapsibleTrigger>

        {!isOpen && (
          <p className="px-6 py-4 text-xs text-cel-text-secondary">
            {school.emoji} {school.module} · 🏛️ Life Architect · 🏠 Feng Shui · 📅 Life Events — tap to expand
          </p>
        )}

        <CollapsibleContent>
          <div className="p-6 pt-4 space-y-4">
            {/* Secret Schools */}
            <IntelCard
              emoji={school.emoji}
              title={`SECRET SCHOOLS · ${school.module}`}
              content={school.content}
              linkTo={school.link}
              linkLabel={school.linkLabel}
            />

            {/* Life Architect */}
            <IntelCard
              emoji="🏛️"
              title="LIFE ARCHITECT · Zi Wei Dou Shu"
              subtitle="Current decade: Health Palace (40s) · Year 1 of 10 · Theme: Physical renewal"
              content="This decade emphasises your body's relationship with your ambitions. Career pushes that ignore health will backfire in this palace."
              linkTo="/dashboard"
              linkLabel="View Full Life Map"
            />

            {/* Feng Shui */}
            <IntelCard
              emoji="🏠"
              title="FENG SHUI · Monthly Adjustment"
              subtitle="February focus: Northwest sector"
              content="Add Metal elements — a metal bowl or white/grey decor. The Tiger month's Wood energy is depleting your Northwest Metal, affecting career luck."
              linkTo="/dashboard"
              linkLabel="Full Feng Shui Analysis"
            />

            {/* Life Event Planner */}
            <IntelCard
              emoji="📅"
              title="LIFE EVENT PLANNER"
              subtitle='Your last search: "Best day to sign employment contract"'
              content="Next best date: March 9, 2026 — Wood-Water harmony day. Your Day Master is fully supported."
              linkTo="/dashboard"
              linkLabel="Plan Another Event"
              urgent
              urgentText="Optimal date in 31 days"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </CelestialCard>
  );
};

/* ─── Shared Intel Card ─── */

interface IntelCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
  content: string;
  linkTo: string;
  linkLabel: string;
  urgent?: boolean;
  urgentText?: string;
}

const IntelCard = ({
  emoji,
  title,
  subtitle,
  content,
  linkTo,
  linkLabel,
  urgent,
  urgentText,
}: IntelCardProps) => (
  <div
    className={`rounded-xl border p-5 space-y-3 ${
      urgent
        ? "border-[hsl(var(--cel-gold)/0.2)] bg-[hsl(var(--cel-gold-glow)/0.04)]"
        : "border-[hsl(var(--cel-glass-border)/0.06)] bg-[hsl(var(--cel-glass)/0.02)]"
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-base">{emoji}</span>
        <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-cel-gold/80">
          {title}
        </h3>
      </div>
      {urgent && urgentText && (
        <span className="text-[10px] font-semibold text-cel-gold bg-[hsl(var(--cel-gold-glow)/0.1)] border border-[hsl(var(--cel-gold)/0.2)] px-2 py-0.5 rounded-full">
          {urgentText}
        </span>
      )}
    </div>

    {subtitle && (
      <p className="text-sm font-medium text-cel-text-primary/80">{subtitle}</p>
    )}

    <p className="text-sm text-cel-text-secondary leading-relaxed">{content}</p>

    <Link
      to={linkTo}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cel-gold hover:text-cel-gold-hover transition-colors group"
    >
      {linkLabel}
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

export default CosmicIntelligenceFeed;
