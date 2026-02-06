import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

/* ─── Mock data — would come from user state ─── */

const hasAncestralReading = false;
const hasConvergenceReport = true;

/* ─── Component ─── */

const ActiveReadings = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-6 pb-0 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <span className="text-sm">📖</span>
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground/60">
                Active Readings
              </h2>
            </div>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>

        {!isOpen && (
          <p className="px-6 py-4 text-xs text-muted-foreground">
            🔮 Oracle · 💜 Relationship · 📊 Convergence · 🧬 Ancestral — tap to expand
          </p>
        )}

        <CollapsibleContent>
          <div className="p-6 pt-4 space-y-4">
            {/* Extended Oracle */}
            <ExtendedOracleCard />

            {/* Relationship Intelligence */}
            <RelationshipCard />

            {/* Convergence Report */}
            {hasConvergenceReport ? (
              <ConvergenceCardCompleted />
            ) : (
              <ConvergenceCardTeaser />
            )}

            {/* Ancestral Reading */}
            {hasAncestralReading ? (
              <AncestralCardCompleted />
            ) : (
              <AncestralCardTeaser />
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

/* ─── Extended Oracle ─── */

const ExtendedOracleCard = () => (
  <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5 space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-base">🔮</span>
      <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground/70">
        Extended Oracle
      </h3>
    </div>

    <div className="space-y-1.5">
      <p className="text-sm font-medium text-foreground/80">
        Last question: "Should I accept the job offer from the new company?"
      </p>
      <p className="text-xs text-muted-foreground">Asked: February 3, 2026</p>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm font-serif font-semibold text-amber-400">
        Verdict: Proceed with caution
      </span>
    </div>

    <div className="rounded-lg bg-muted/30 border border-border px-4 py-3 space-y-1.5">
      <p className="text-xs font-semibold text-secondary">
        3 follow-up questions available
      </p>
      <p className="text-xs text-muted-foreground italic">
        Suggested: "What timing optimises the outcome of accepting?"
      </p>
    </div>

    <div className="flex items-center gap-4">
      <Link
        to="/oracle"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
      >
        Ask Follow-Up
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
      <Link
        to="/oracle"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        New Question
      </Link>
    </div>
  </div>
);

/* ─── Relationship Intelligence ─── */

const RelationshipCard = () => (
  <div className="rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent p-5 space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-base">💜</span>
      <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground/70">
        Relationship Intelligence
      </h3>
    </div>

    <div className="flex items-center gap-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground/80">
          Last analysis: You + Sarah
        </p>
        <p className="text-xs text-muted-foreground">Harmony score: 72%</p>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <span className="text-2xl font-serif font-bold text-rose-400 tabular-nums">
          72
        </span>
        <span className="text-xs text-muted-foreground">%</span>
      </div>
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed">
      Strong Wood-Water resonance but Fire clash in communication pillar. Be
      mindful of tone in heated moments.
    </p>

    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/15 px-4 py-3">
      <p className="text-xs text-emerald-400">
        <span className="font-semibold">⚡ Today's boost:</span> Fire energy
        today actually helps — it burns through the communication clash
        temporarily. Good day for difficult conversations.
      </p>
    </div>

    <div className="flex items-center gap-4">
      <Link
        to="/matcher"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
      >
        Full Analysis
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
      <Link
        to="/matcher"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        New Pair
      </Link>
    </div>
  </div>
);

/* ─── Convergence Report ─── */

const ConvergenceCardCompleted = () => (
  <div className="rounded-xl border border-cosmic-blue/20 bg-gradient-to-br from-cosmic-blue/5 to-transparent p-5 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-base">📊</span>
        <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground/70">
          Convergence Report
        </h3>
      </div>
      <span className="text-2xl font-serif font-bold text-cosmic-gold tabular-nums">
        85%
      </span>
    </div>

    <p className="text-xs text-muted-foreground">4-System Alignment</p>

    {/* Per-system dots */}
    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
      <SystemDots label="BaZi" filled={4} total={5} />
      <SystemDots label="QMDJ" filled={5} total={5} />
      <SystemDots label="Western" filled={3} total={5} />
      <SystemDots label="Angelic" filled={5} total={5} />
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed">
      Strong alignment across 3 of 4 systems. Western astrology shows Mercury
      retrograde tension — the one dissenting voice this month.
    </p>

    <Link
      to="/dashboard"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
    >
      View Full Report
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

const ConvergenceCardTeaser = () => (
  <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-base">📊</span>
      <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground/70">
        Convergence Report
      </h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Your 4 cosmic systems haven't been aligned yet. Generate your Convergence
      Report to unlock cross-system insights and daily alignment tracking.
    </p>
    <Link
      to="/dashboard"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
    >
      Generate Report
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

/* ─── Ancestral Reading ─── */

const AncestralCardCompleted = () => (
  <div className="rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-5 space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-base">🧬</span>
      <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground/70">
        Ancestral Reading
      </h3>
    </div>
    <p className="text-sm font-medium text-foreground/80">
      Your ancestral pattern: Earth lineage with hidden Water
    </p>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Your family's Earth dominance gives you natural stability but the hidden
      Water suggests a pattern of unexpressed emotion across generations.
    </p>
    <div className="rounded-lg bg-primary/5 border border-primary/15 px-4 py-3">
      <p className="text-xs text-foreground/70">
        <span className="font-semibold text-primary">Impact on today:</span>{" "}
        Earth energy in your lineage amplifies today's stability — lean into
        your natural groundedness.
      </p>
    </div>
    <Link
      to="/dashboard"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
    >
      Review Full Reading
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

const AncestralCardTeaser = () => (
  <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-transparent p-5 space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-base">🧬</span>
      <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground/70">
        Ancestral Reading
      </h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed italic">
      "Your family's hidden patterns shape your chart in ways that daily
      readings can't fully capture. Unlock your ancestral layer to deepen every
      reading."
    </p>
    <Link
      to="/dashboard"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
    >
      Begin Ancestral Reading
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

/* ─── Helpers ─── */

const SystemDots = ({
  label,
  filled,
  total,
}: {
  label: string;
  filled: number;
  total: number;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-muted-foreground w-16">{label}:</span>
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < filled ? "bg-cosmic-gold" : "bg-muted"
          }`}
        />
      ))}
    </div>
  </div>
);

export default ActiveReadings;
