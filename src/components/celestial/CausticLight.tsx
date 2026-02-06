import { useEffect, useRef } from "react";

/**
 * Slow golden-light caustics — cathedral sunlight drifting across a surface.
 * Uses canvas for smooth, organic ripple shapes that CSS gradients can't achieve.
 * ~45s full cycle, very low opacity.
 */

const CAUSTIC_COUNT = 5;
const CYCLE_MS = 45000;

interface Caustic {
  cx: number;       // center x  (0-1)
  cy: number;       // center y  (0-1)
  rx: number;       // ellipse x radius (px)
  ry: number;       // ellipse y radius (px)
  phase: number;    // offset into cycle
  driftX: number;   // drift amplitude x
  driftY: number;   // drift amplitude y
  scalePhase: number;
  baseOpacity: number;
}

const CausticLight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const causticsRef = useRef<Caustic[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed caustic blobs — spread across viewport
    causticsRef.current = Array.from({ length: CAUSTIC_COUNT }, (_, i) => ({
      cx: 0.15 + (i / CAUSTIC_COUNT) * 0.7 + (Math.random() - 0.5) * 0.15,
      cy: 0.1 + Math.random() * 0.6,
      rx: 180 + Math.random() * 250,
      ry: 120 + Math.random() * 180,
      phase: (i / CAUSTIC_COUNT) * Math.PI * 2,
      driftX: 60 + Math.random() * 120,
      driftY: 30 + Math.random() * 80,
      scalePhase: Math.random() * Math.PI * 2,
      baseOpacity: 0.025 + Math.random() * 0.025,  // 0.025–0.05
    }));

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = (time % CYCLE_MS) / CYCLE_MS * Math.PI * 2;

      causticsRef.current.forEach((c) => {
        const x = c.cx * canvas.width + Math.sin(t + c.phase) * c.driftX;
        const y = c.cy * canvas.height + Math.cos(t * 0.7 + c.phase) * c.driftY;
        const scale = 0.8 + 0.4 * Math.sin(t * 0.5 + c.scalePhase);
        const opacity = c.baseOpacity * (0.4 + 0.6 * Math.sin(t * 0.3 + c.phase + 1));

        const rx = c.rx * scale;
        const ry = c.ry * scale;

        // Radial gradient for soft caustic blob
        const grad = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
        // Gold: hsl(43, 73%, 42%) ≈ rgb(185, 149, 29)
        grad.addColorStop(0, `rgba(195, 165, 50, ${opacity})`);
        grad.addColorStop(0.4, `rgba(185, 149, 29, ${opacity * 0.6})`);
        grad.addColorStop(0.7, `rgba(175, 140, 25, ${opacity * 0.2})`);
        grad.addColorStop(1, `rgba(170, 135, 20, 0)`);

        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, Math.sin(t * 0.2 + c.phase) * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "overlay" }}
      aria-hidden="true"
    />
  );
};

export default CausticLight;
