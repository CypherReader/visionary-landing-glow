import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cnyVideo from "@/assets/cny-hero-video.mp4";
import cnyHero from "@/assets/cny-hero.jpg";

const PROMO_CODE = "HORSE2026";

const CNYPromo = () => {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const playSound = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-sfx`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt:
              "Traditional Chinese guzheng and erhu melody with gentle bamboo flute, festive and auspicious Lunar New Year celebration music, warm and elegant",
            duration: 8,
          }),
        }
      );

      if (!response.ok) {
        console.warn("SFX request failed:", response.status);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audio.volume = 0.4;
      audioRef.current = audio;
      setAudioLoaded(true);
      await audio.play();
    } catch (err) {
      console.warn("Sound effect failed to load:", err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => playSound(), 800);
    return () => clearTimeout(timer);
  }, [playSound]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0.4 : 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(165deg, hsl(350 60% 8%), hsl(270 40% 6%), hsl(240 25% 5%))",
      }}
    >
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background:
                i % 2 === 0 ? "hsl(45 95% 65%)" : "hsl(0 70% 60%)",
              left: `${5 + i * 4.5}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [-10, -40, -10],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Top nav */}
      <div className="fixed top-6 left-6 right-6 z-20 flex items-center justify-between">
        <Button
          asChild
          variant="ghost"
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        {audioLoaded && (
          <motion.button
            onClick={toggleMute}
            className="rounded-full bg-white/5 p-2.5 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
            aria-label={isMuted ? "Unmute" : "Mute"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </motion.button>
        )}
      </div>

      {/* Main card */}
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:
            "linear-gradient(165deg, hsl(350 60% 12%), hsl(270 40% 10%), hsl(240 25% 8%))",
          border: "1px solid hsl(0 0% 100% / 0.08)",
        }}
      >
        {/* Hero video */}
        <div className="relative h-56 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={cnyHero}
            className="h-full w-full object-cover"
          >
            <source src={cnyVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(350,60%,12%)]" />

          {/* Floating particles overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background:
                    i % 2 === 0 ? "hsl(45 95% 65%)" : "hsl(0 70% 60%)",
                  left: `${12 + i * 11}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative px-8 pb-8 pt-2">
          {/* CNY Badge */}
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{
              borderColor: "hsl(45 95% 65% / 0.3)",
              background: "hsl(45 95% 65% / 0.08)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles
              className="h-3.5 w-3.5"
              style={{ color: "hsl(45 95% 65%)" }}
            />
            <span
              className="text-xs font-medium tracking-wide"
              style={{ color: "hsl(45 95% 65%)" }}
            >
              新年快乐 · Year of the Horse
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-2 font-serif text-3xl font-bold leading-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Lunar New Year{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(45 95% 65%), hsl(30 90% 55%))",
              }}
            >
              Launch Special
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.65)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Celebrate the Year of the Horse with our grand launch. Unlock
            exclusive cosmic insights and start your celestial journey with a
            special Lunar New Year offer.
          </motion.p>

          {/* Promo code */}
          <motion.div
            className="mb-6 flex items-center gap-3 rounded-xl p-4"
            style={{
              background: "hsl(0 0% 100% / 0.05)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className="flex-1">
              <p
                className="text-[10px] font-medium uppercase tracking-widest"
                style={{ color: "hsl(0 0% 100% / 0.4)" }}
              >
                Your Launch Code
              </p>
              <p
                className="font-mono text-xl font-bold tracking-[0.2em]"
                style={{ color: "hsl(45 95% 65%)" }}
              >
                {PROMO_CODE}
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all"
              style={{
                background: copied
                  ? "hsl(160 55% 42% / 0.2)"
                  : "hsl(0 0% 100% / 0.08)",
                color: copied
                  ? "hsl(160 55% 65%)"
                  : "hsl(0 0% 100% / 0.6)",
                border: `1px solid ${
                  copied
                    ? "hsl(160 55% 42% / 0.3)"
                    : "hsl(0 0% 100% / 0.1)"
                }`,
              }}
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="flex-1 rounded-xl border-0 font-medium text-white"
              style={{
                background:
                  "linear-gradient(135deg, hsl(0 65% 45%), hsl(350 60% 40%), hsl(270 50% 40%))",
              }}
            >
              <Link to="/dashboard">
                Claim Your Reading
                <Sparkles className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="flex-1 rounded-xl text-white/50 hover:bg-white/5 hover:text-white/80"
            >
              <Link to="/">Maybe Later</Link>
            </Button>
          </motion.div>

          {/* Fine print */}
          <motion.p
            className="mt-4 text-center text-[10px]"
            style={{ color: "hsl(0 0% 100% / 0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Valid through the Lantern Festival · Feb 28, 2026
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default CNYPromo;
