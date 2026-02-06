import { cn } from "@/lib/utils";

interface CelestialCardProps {
  children: React.ReactNode;
  className?: string;
  /** Apply a subtle gold highlight to the glass border */
  highlighted?: boolean;
}

/**
 * Glass card for Celestial tier — frosted glass effect with faint gold inner glow.
 * Uses CSS backdrop-blur + transparent overlays (no extra library needed).
 */
const CelestialCard = ({ children, className, highlighted = false }: CelestialCardProps) => (
  <div
    className={cn(
      "relative rounded-2xl overflow-hidden",
      // Glass surface
      "bg-[hsl(var(--cel-surface)/0.55)] backdrop-blur-xl",
      // Border — white glass edge or gold highlight
      highlighted
        ? "border border-[hsl(var(--cel-gold)/0.18)]"
        : "border border-[hsl(var(--cel-glass-border)/0.06)]",
      // Inner glow via box-shadow
      "shadow-[inset_0_1px_0_0_hsl(var(--cel-glass)/0.04),0_0_40px_-12px_hsl(var(--cel-gold-glow)/0.06)]",
      className
    )}
  >
    {/* Very subtle gold inner-glow overlay */}
    <div className="absolute inset-0 bg-[hsl(var(--cel-gold-glow)/0.02)] pointer-events-none rounded-2xl" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default CelestialCard;
