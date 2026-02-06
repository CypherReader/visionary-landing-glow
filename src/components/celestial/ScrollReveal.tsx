import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/** Stagger container — wrap around children that use ScrollRevealItem */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Individual item variant — fade up on scroll */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds added on top of stagger */
  delay?: number;
}

/** Wraps a single section so it fades-up when scrolled into view */
export const ScrollReveal = ({ children, className, delay = 0 }: ScrollRevealProps) => (
  <motion.div
    variants={revealItem}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    transition={delay ? { delay } : undefined}
    className={className}
  >
    {children}
  </motion.div>
);

/** Stagger wrapper — children should each be a ScrollReveal or motion element with revealItem */
export const StaggerContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.08 }}
    className={className}
  >
    {children}
  </motion.div>
);
