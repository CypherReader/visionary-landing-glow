import { Share2, Quote } from "lucide-react";
import { format } from "date-fns";

const affirmations = [
  {
    text: "Metal sharpens what Earth has built. Today, let precision — not force — be your instrument of change.",
    source: "Metal Day Wisdom",
  },
  {
    text: "The dragon who waits at the mountain pass defeats the one who charges through the valley.",
    source: "Strategic Patience",
  },
  {
    text: "Your Day Master is the anchor. The elements around you are the weather. Dress for the storm, but never change who you are.",
    source: "Bazi Philosophy",
  },
];

const getDailyAffirmation = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return affirmations[dayOfYear % affirmations.length];
};

const DailyAffirmation = () => {
  const today = new Date();
  const affirmation = getDailyAffirmation();

  const handleShare = async () => {
    const text = `✦ ${affirmation.text}\n\n— ${affirmation.source} · ${format(today, "d MMM yyyy")}`;
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
    <div className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-card to-primary/5 p-6 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">
              Daily Insight
            </span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/50"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>

        <blockquote className="text-base lg:text-lg font-serif leading-relaxed text-foreground/90 italic">
          "{affirmation.text}"
        </blockquote>

        <p className="text-xs text-muted-foreground">
          — {affirmation.source} · {format(today, "d MMMM yyyy")}
        </p>
      </div>
    </div>
  );
};

export default DailyAffirmation;
