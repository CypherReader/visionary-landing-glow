import { cn } from "@/lib/utils";

interface CelestialCardProps {
  children: React.ReactNode;
  className?: string;
  /** Apply a subtle highlight to the border */
  highlighted?: boolean;
}

/**
 * Apple-style frosted glass card — clean white surface with
 * high backdrop-blur, subtle gray border, and soft shadow.
 */
const CelestialCard = ({ children, className, highlighted = false }: CelestialCardProps) => (
  <div
    className={cn(
      "relative rounded-2xl overflow-hidden",
      // Frosted glass surface
      "bg-[hsl(var(--cel-surface)/0.72)] backdrop-blur-2xl",
      // Border — clean gray or subtle accent highlight
      highlighted
        ? "border border-[hsl(var(--cel-gold)/0.20)] shadow-[0_1px_0_hsl(var(--cel-gold)/0.06)]"
        : "border border-[hsl(var(--cel-glass-border)/0.45)]",
      // Soft neutral shadow
      "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)]",
      className
    )}
  >
    <div className="relative z-10">{children}</div>
  </div>
);

export default CelestialCard;
