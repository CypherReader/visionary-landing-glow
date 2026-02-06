import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CelestialCard from "./CelestialCard";

/* ─── Mock data ─── */
const hasAncestralReading = false;
const hasConvergenceReport = true;

/* ─── Component ─── */

const ActiveReadings = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CelestialCard>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 pb-0 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📖</span>
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
            Active Readings
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-4 h-4 text-cel-text-secondary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-4 text-xs text-cel-text-secondary overflow-hidden"
          >
            🔮 Oracle · 💜 Relationship · 📊 Convergence · 🧬 Ancestral — tap to expand
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-4 space-y-4">
              <ReadingCard index={0}><ExtendedOracleCard /></ReadingCard>
              <ReadingCard index={1}><RelationshipCard /></ReadingCard>
              <ReadingCard index={2}>
                {hasConvergenceReport ? <ConvergenceCardCompleted /> : <ConvergenceCardTeaser />}
              </ReadingCard>
              <ReadingCard index={3}>
                {hasAncestralReading ? <AncestralCardCompleted /> : <AncestralCardTeaser />}
              </ReadingCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CelestialCard>
  );
};

/* ─── Animated wrapper for stagger ─── */
const ReadingCard = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

/* ─── Shared inner card styles ─── */
const innerCard = "rounded-xl border border-[hsl(var(--cel-glass-border)/0.06)] bg-[hsl(var(--cel-glass)/0.02)] p-5 space-y-3";
const sectionTitle = "text-xs font-medium tracking-[0.15em] uppercase text-cel-gold/80";
const linkStyle = "inline-flex items-center gap-1.5 text-xs font-semibold text-cel-gold hover:text-cel-gold-hover transition-colors group";
const arrowIcon = <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />;

/* ─── Extended Oracle ─── */

const ExtendedOracleCard = () => (
  <div className={innerCard}>
    <div className="flex items-center gap-2">
      <span className="text-base">🔮</span>
      <h3 className={sectionTitle}>Extended Oracle</h3>
    </div>

    <div className="space-y-1.5">
      <p className="text-sm font-medium text-cel-text-primary/80">
        Last question: "Should I accept the job offer from the new company?"
      </p>
      <p className="text-xs text-cel-text-secondary">Asked: February 3, 2026</p>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm font-serif font-semibold text-cel-controlled-burn">
        Verdict: Proceed with caution
      </span>
    </div>

    <div className="rounded-lg bg-[hsl(var(--cel-gold-glow)/0.04)] border border-[hsl(var(--cel-gold)/0.1)] px-4 py-3 space-y-1.5">
      <p className="text-xs font-semibold text-cel-gold">
        3 follow-up questions available
      </p>
      <p className="text-xs text-cel-text-secondary italic">
        Suggested: "What timing optimises the outcome of accepting?"
      </p>
    </div>

    <div className="flex items-center gap-4">
      <Link to="/oracle" className={linkStyle}>
        Ask Follow-Up {arrowIcon}
      </Link>
      <Link to="/oracle" className="text-xs font-semibold text-cel-text-secondary hover:text-cel-text-primary transition-colors">
        New Question
      </Link>
    </div>
  </div>
);

/* ─── Relationship Intelligence ─── */

const RelationshipCard = () => (
  <div className={innerCard}>
    <div className="flex items-center gap-2">
      <span className="text-base">💜</span>
      <h3 className={sectionTitle}>Relationship Intelligence</h3>
    </div>

    <div className="flex items-center gap-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-cel-text-primary/80">Last analysis: You + Sarah</p>
        <p className="text-xs text-cel-text-secondary">Harmony score: 72%</p>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <span className="text-2xl font-serif font-bold text-cel-controlled-burn tabular-nums">72</span>
        <span className="text-xs text-cel-text-secondary">%</span>
      </div>
    </div>

    <p className="text-sm text-cel-text-secondary leading-relaxed">
      Strong Wood-Water resonance but Fire clash in communication pillar. Be mindful of tone in heated moments.
    </p>

    <div className="rounded-lg bg-[hsl(var(--cel-rising-tide)/0.06)] border border-[hsl(var(--cel-rising-tide)/0.12)] px-4 py-3">
      <p className="text-xs text-cel-rising-tide">
        <span className="font-semibold">⚡ Today's boost:</span> Fire energy today actually helps — it burns through the communication clash temporarily. Good day for difficult conversations.
      </p>
    </div>

    <div className="flex items-center gap-4">
      <Link to="/matcher" className={linkStyle}>
        Full Analysis {arrowIcon}
      </Link>
      <Link to="/matcher" className="text-xs font-semibold text-cel-text-secondary hover:text-cel-text-primary transition-colors">
        New Pair
      </Link>
    </div>
  </div>
);

/* ─── Convergence Report ─── */

const ConvergenceCardCompleted = () => (
  <div className={innerCard}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-base">📊</span>
        <h3 className={sectionTitle}>Convergence Report</h3>
      </div>
      <span className="text-2xl font-serif font-bold text-cel-gold tabular-nums">85%</span>
    </div>

    <p className="text-xs text-cel-text-secondary">4-System Alignment</p>

    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
      <SystemDots label="BaZi" filled={4} total={5} />
      <SystemDots label="QMDJ" filled={5} total={5} />
      <SystemDots label="Western" filled={3} total={5} />
      <SystemDots label="Angelic" filled={5} total={5} />
    </div>

    <p className="text-sm text-cel-text-secondary leading-relaxed">
      Strong alignment across 3 of 4 systems. Western astrology shows Mercury retrograde tension — the one dissenting voice this month.
    </p>

    <Link to="/dashboard" className={linkStyle}>
      View Full Report {arrowIcon}
    </Link>
  </div>
);

const ConvergenceCardTeaser = () => (
  <div className={`${innerCard} border-[hsl(var(--cel-glass-border)/0.04)]`}>
    <div className="flex items-center gap-2">
      <span className="text-base">📊</span>
      <h3 className={sectionTitle}>Convergence Report</h3>
    </div>
    <p className="text-sm text-cel-text-secondary leading-relaxed">
      Your 4 cosmic systems haven't been aligned yet. Generate your Convergence Report to unlock cross-system insights and daily alignment tracking.
    </p>
    <Link to="/dashboard" className={linkStyle}>
      Generate Report {arrowIcon}
    </Link>
  </div>
);

/* ─── Ancestral Reading ─── */

const AncestralCardCompleted = () => (
  <div className={innerCard}>
    <div className="flex items-center gap-2">
      <span className="text-base">🧬</span>
      <h3 className={sectionTitle}>Ancestral Reading</h3>
    </div>
    <p className="text-sm font-medium text-cel-text-primary/80">
      Your ancestral pattern: Earth lineage with hidden Water
    </p>
    <p className="text-sm text-cel-text-secondary leading-relaxed">
      Your family's Earth dominance gives you natural stability but the hidden Water suggests a pattern of unexpressed emotion across generations.
    </p>
    <div className="rounded-lg bg-[hsl(var(--cel-gold-glow)/0.04)] border border-[hsl(var(--cel-gold)/0.1)] px-4 py-3">
      <p className="text-xs text-cel-text-primary/70">
        <span className="font-semibold text-cel-gold">Impact on today:</span> Earth energy in your lineage amplifies today's stability — lean into your natural groundedness.
      </p>
    </div>
    <Link to="/dashboard" className={linkStyle}>
      Review Full Reading {arrowIcon}
    </Link>
  </div>
);

const AncestralCardTeaser = () => (
  <div className={`${innerCard} border-[hsl(var(--cel-glass-border)/0.04)]`}>
    <div className="flex items-center gap-2">
      <span className="text-base">🧬</span>
      <h3 className={sectionTitle}>Ancestral Reading</h3>
    </div>
    <p className="text-sm text-cel-text-secondary leading-relaxed italic">
      "Your family's hidden patterns shape your chart in ways that daily readings can't fully capture. Unlock your ancestral layer to deepen every reading."
    </p>
    <Link to="/dashboard" className={linkStyle}>
      Begin Ancestral Reading {arrowIcon}
    </Link>
  </div>
);

/* ─── Helpers ─── */

const SystemDots = ({ label, filled, total }: { label: string; filled: number; total: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-cel-text-secondary w-16">{label}:</span>
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i < filled ? "bg-cel-gold" : "bg-[hsl(var(--cel-glass)/0.1)]"}`}
        />
      ))}
    </div>
  </div>
);

export default ActiveReadings;
