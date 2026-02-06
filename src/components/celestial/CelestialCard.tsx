import { cn } from "@/lib/utils";

interface CelestialCardProps {
  children: React.ReactNode;
  className?: string;
  /** Apply a subtle gold highlight to the border */
  highlighted?: boolean;
}

/**
 * Luminous glass card for Celestial tier — white frosted glass on warm cream
 * with subtle gold shadow and optional gold border highlight.
 */
const CelestialCard = ({ children, className, highlighted = false }: CelestialCardProps) => (
  <div
    className={cn(
      "relative rounded-2xl overflow-hidden",
      // Luminous white glass surface
      "bg-[hsl(var(--cel-surface)/0.72)] backdrop-blur-xl",
      // Border — subtle gold edge or stronger gold highlight
      highlighted
        ? "border border-[hsl(var(--cel-gold)/0.18)]"
        : "border border-[hsl(var(--cel-glass-border)/0.12)]",
      // Warm golden shadow
      "shadow-[0_4px_24px_-4px_rgba(180,160,120,0.10)]",
      className
    )}
  >
    {/* Very subtle gold inner-glow overlay */}
    <div className="absolute inset-0 bg-[hsl(var(--cel-gold-glow)/0.02)] pointer-events-none rounded-2xl" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default CelestialCard;
