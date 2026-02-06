import { Share2, Download } from "lucide-react";
import { format } from "date-fns";

const DailyInsightShareCard = () => {
  const today = new Date();
  const score = 60;
  const element = "Metal";
  const dayMaster = "Earth";
  const insight =
    "Metal sharpens what Earth has built. Today, let precision — not force — be your instrument of change.";

  const handleShare = async () => {
    const text = `✦ Celestial Command Center · ${format(today, "d MMM yyyy")}\n\nEnergy Score: ${score}/100\nElement: ${element} · Day Master: ${dayMaster}\n\n"${insight}"\n\n— Your Cosmic Intelligence`;
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
    <div className="relative rounded-2xl border border-secondary/20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-card to-secondary/10" />
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">✦</span>
            <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground/60">
              Today's Insight Card
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/50"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/50">
              <Download className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </div>

        {/* The shareable "card" */}
        <div className="rounded-xl border border-secondary/15 bg-card/60 backdrop-blur-sm p-6 space-y-5">
          <div className="text-center space-y-1">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-secondary">
              Celestial Command Center
            </p>
            <p className="text-xs text-muted-foreground">
              {format(today, "EEEE, d MMMM yyyy")}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-serif font-bold text-secondary tabular-nums">
                  {score}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase mt-1">
                  Energy
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-lg font-serif font-semibold text-foreground">
                  {element}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase mt-1">
                  Element
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-lg font-serif font-semibold text-foreground">
                  {dayMaster}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase mt-1">
                  Day Master
                </p>
              </div>
            </div>
          </div>

          <blockquote className="text-center text-base font-serif leading-relaxed text-foreground/85 italic px-4">
            "{insight}"
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default DailyInsightShareCard;
