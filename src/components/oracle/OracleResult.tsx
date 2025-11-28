import { QimenReading } from "@/pages/Oracle";
import { CheckCircle, AlertTriangle, Clock, Compass, Timer, Sparkles, Target } from "lucide-react";

interface OracleResultProps {
  reading: QimenReading;
  question: string;
}

const verdictConfig = {
  Favorable: {
    icon: <CheckCircle className="w-8 h-8" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/30",
  },
  Challenging: {
    icon: <AlertTriangle className="w-8 h-8" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/30",
  },
  Wait: {
    icon: <Clock className="w-8 h-8" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/30",
  },
};

const OracleResult = ({ reading, question }: OracleResultProps) => {
  const config = verdictConfig[reading.verdict] || verdictConfig.Wait;

  return (
    <div className="space-y-6">
      {/* Main Verdict Card */}
      <div className={`relative rounded-3xl border ${config.border} ${config.bg} backdrop-blur-xl overflow-hidden`}>
        {/* Top glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 ${config.bg} rounded-full blur-3xl opacity-50`} />

        <div className="relative z-10 p-8 text-center">
          {/* Verdict Icon */}
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${config.bg} border ${config.border} mb-6 animate-pulse`}>
            <span className={config.color}>{config.icon}</span>
          </div>

          {/* Verdict */}
          <h2 className={`text-4xl font-serif ${config.color} mb-4`}>
            {reading.verdict}
          </h2>

          {/* Explanation */}
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            {reading.verdictExplanation}
          </p>

          {/* Question reminder */}
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 inline-block">
            <p className="text-xs text-muted-foreground">
              "{question}"
            </p>
          </div>
        </div>
      </div>

      {/* Tactical Advice Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Best Direction */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm text-muted-foreground">Best Direction</span>
          </div>
          <p className="text-2xl font-serif text-foreground">{reading.bestDirection}</p>
          <p className="text-xs text-muted-foreground mt-1">Approach from this direction</p>
        </div>

        {/* Best Hour */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-cosmic-gold/20 flex items-center justify-center">
              <Timer className="w-5 h-5 text-cosmic-gold" />
            </div>
            <span className="text-sm text-muted-foreground">Optimal Time</span>
          </div>
          <p className="text-2xl font-serif text-foreground">{reading.bestHour}</p>
          <p className="text-xs text-muted-foreground mt-1">Schedule actions for this window</p>
        </div>

        {/* Answer Palace */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-cosmic-purple/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-cosmic-purple" />
            </div>
            <span className="text-sm text-muted-foreground">Answer Palace</span>
          </div>
          <p className="text-2xl font-serif text-foreground">Palace {reading.answerPalaceNumber}</p>
          <p className="text-xs text-muted-foreground mt-1">Focus your attention here</p>
        </div>
      </div>

      {/* Tactical Advice */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-foreground mb-2">Strategic Guidance</h3>
            <p className="text-muted-foreground">{reading.tacticalAdvice}</p>
          </div>
        </div>
      </div>

      {/* Special Formation (if any) */}
      {reading.specialFormation && (
        <div className="rounded-2xl border border-cosmic-purple/20 bg-cosmic-purple/5 backdrop-blur-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-cosmic-purple/20 flex items-center justify-center flex-shrink-0 animate-pulse">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                Special Formation: {reading.specialFormation}
              </h3>
              <p className="text-muted-foreground">{reading.specialFormationMeaning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Deep Insight */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center">
        <blockquote className="text-lg font-serif text-foreground italic max-w-2xl mx-auto">
          "{reading.deepInsight}"
        </blockquote>
        <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
          <span className="text-xl">☯</span>
          <span className="text-sm">Oracle's Wisdom</span>
        </div>
      </div>
    </div>
  );
};

export default OracleResult;
