import { Share2, Download } from "lucide-react";
import { format } from "date-fns";
import CelestialCard from "./CelestialCard";

const DailyInsightShareCard = () => {
  const today = new Date();
  const score = 60;
  const element = "Metal";
  const dayMaster = "Earth";
  const insight =
    "Metal sharpens what Earth has built. Today, let precision — not force — be your instrument of change.";

  const handleShare = async () => {
    const text = `✦ FENG SHUI ANGELS ✦ · ${format(today, "d MMM yyyy")}\n\nEnergy Score: ${score}/100\nElement: ${element} · Day Master: ${dayMaster}\n\n"${insight}"\n\n— Your Cosmic Intelligence`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <CelestialCard highlighted className="overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[hsl(var(--cel-gold-glow)/0.06)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[hsl(var(--cel-bg-mid)/0.4)] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-cel-gold">✦</span>
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-cel-gold">
              Today's Insight Card
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-cel-text-secondary hover:text-cel-gold transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[hsl(var(--cel-glass)/0.04)]"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button className="flex items-center gap-1.5 text-xs text-cel-text-secondary hover:text-cel-gold transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[hsl(var(--cel-glass)/0.04)]">
              <Download className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </div>

        {/* The shareable "card" */}
        <div className="rounded-xl border border-[hsl(var(--cel-gold)/0.1)] bg-[hsl(var(--cel-surface)/0.6)] backdrop-blur-sm p-6 space-y-5">
          <div className="text-center space-y-1">
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-cel-gold">
              ✦ Feng Shui Angels ✦
            </p>
            <p className="text-xs text-cel-text-secondary">
              {format(today, "EEEE, d MMMM yyyy")}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-serif font-bold text-cel-gold tabular-nums">
                  {score}
                </p>
                <p className="text-[10px] text-cel-text-secondary uppercase mt-1">
                  Energy
                </p>
              </div>
              <div className="w-px h-12 bg-[hsl(var(--cel-divider)/0.1)]" />
              <div className="text-center">
                <p className="text-lg font-serif font-semibold text-cel-text-primary">
                  {element}
                </p>
                <p className="text-[10px] text-cel-text-secondary uppercase mt-1">
                  Element
                </p>
              </div>
              <div className="w-px h-12 bg-[hsl(var(--cel-divider)/0.1)]" />
              <div className="text-center">
                <p className="text-lg font-serif font-semibold text-cel-text-primary">
                  {dayMaster}
                </p>
                <p className="text-[10px] text-cel-text-secondary uppercase mt-1">
                  Day Master
                </p>
              </div>
            </div>
          </div>

          <blockquote className="text-center text-base font-serif leading-[1.6] text-cel-text-primary/85 italic px-4">
            "{insight}"
          </blockquote>
        </div>
      </div>
    </CelestialCard>
  );
};

export default DailyInsightShareCard;
