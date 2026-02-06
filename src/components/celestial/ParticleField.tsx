import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 25;
const DRIFT_CYCLE = 60000;
const OPACITY_PULSE = 3000;

interface Particle {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  driftAngle: number;
  driftRadius: number;
  phase: number;
  pulsePhase: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

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

    // Initialize particles — slightly more visible on light background
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 1.5,
      baseOpacity: 0.10 + Math.random() * 0.12,
      driftAngle: Math.random() * Math.PI * 2,
      driftRadius: 20 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        const driftProgress = ((time % DRIFT_CYCLE) / DRIFT_CYCLE) * Math.PI * 2;
        const pulseProgress = ((time % OPACITY_PULSE) / OPACITY_PULSE) * Math.PI * 2;

        const x = p.x + Math.cos(driftProgress + p.phase) * p.driftRadius;
        const y = p.y + Math.sin(driftProgress + p.phase) * p.driftRadius * 0.6;
        const opacity =
          p.baseOpacity *
          (0.5 + 0.5 * Math.sin(pulseProgress + p.pulsePhase));

        // Gold color: hsl(43, 73%, 42%) ≈ rgb(185, 149, 29)
        ctx.beginPath();
        ctx.arc(x % canvas.width, y % canvas.height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185, 149, 29, ${opacity})`;
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
      aria-hidden="true"
    />
  );
};

export default ParticleField;
