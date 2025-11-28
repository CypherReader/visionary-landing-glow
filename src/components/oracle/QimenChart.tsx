import { Palace, QimenReading } from "@/pages/Oracle";
import { Star, DoorOpen, Eye, Shield, Flame, Droplet, Wind, Mountain, Sparkles } from "lucide-react";

interface QimenChartProps {
  reading: QimenReading;
  selectedPalace: Palace | null;
  onPalaceSelect: (palace: Palace | null) => void;
}

const elementColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  Water: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-blue-500/30" },
  Fire: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", glow: "shadow-red-500/30" },
  Wood: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/30" },
  Metal: { bg: "bg-slate-300/10", border: "border-slate-300/30", text: "text-slate-300", glow: "shadow-slate-300/30" },
  Earth: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/30" },
};

const elementIcons: Record<string, React.ReactNode> = {
  Water: <Droplet className="w-4 h-4" />,
  Fire: <Flame className="w-4 h-4" />,
  Wood: <Wind className="w-4 h-4" />,
  Metal: <Sparkles className="w-4 h-4" />,
  Earth: <Mountain className="w-4 h-4" />,
};

const doorIcons: Record<string, string> = {
  Open: "🚪",
  Rest: "🛏️",
  Life: "🌱",
  Harm: "⚔️",
  Delusion: "🌫️",
  View: "👁️",
  Death: "💀",
  Fear: "⚡",
};

// Luo Shu arrangement: SE(4), S(9), SW(2) / E(3), Center(5), W(7) / NE(8), N(1), NW(6)
const gridPositions = [
  { row: 0, col: 0, pos: 4 }, // SE
  { row: 0, col: 1, pos: 9 }, // S
  { row: 0, col: 2, pos: 2 }, // SW
  { row: 1, col: 0, pos: 3 }, // E
  { row: 1, col: 1, pos: 5 }, // Center
  { row: 1, col: 2, pos: 7 }, // W
  { row: 2, col: 0, pos: 8 }, // NE
  { row: 2, col: 1, pos: 1 }, // N
  { row: 2, col: 2, pos: 6 }, // NW
];

const QimenChart = ({ reading, selectedPalace, onPalaceSelect }: QimenChartProps) => {
  const getPalaceByPosition = (pos: number) => {
    return reading.palaces.find(p => p.position === pos) || reading.palaces[0];
  };

  return (
    <div className="space-y-6">
      {/* Chart Grid */}
      <div className="relative max-w-xl mx-auto">
        {/* Compass directions */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">SOUTH</div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">NORTH</div>
        <div className="absolute top-1/2 -left-10 -translate-y-1/2 text-xs text-muted-foreground">EAST</div>
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 text-xs text-muted-foreground">WEST</div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10">
          {gridPositions.map(({ pos }, i) => {
            const palace = getPalaceByPosition(pos);
            const colors = elementColors[palace.element] || elementColors.Earth;
            const isSelected = selectedPalace?.position === palace.position;
            const isAnswer = palace.isAnswerPalace;

            return (
              <button
                key={i}
                onClick={() => onPalaceSelect(isSelected ? null : palace)}
                className={`relative p-3 rounded-xl border transition-all duration-300 ${colors.bg} ${colors.border} ${
                  isSelected ? `ring-2 ring-cosmic-gold shadow-lg ${colors.glow}` : ""
                } ${isAnswer ? "ring-2 ring-emerald-500/50" : ""} hover:scale-105`}
              >
                {/* Answer palace indicator */}
                {isAnswer && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                    <Eye className="w-3 h-3 text-black" />
                  </div>
                )}

                {/* Day/Hour palace indicator */}
                {palace.isDayPalace && (
                  <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-cosmic-gold flex items-center justify-center text-xs text-black font-bold">
                    D
                  </div>
                )}
                {palace.isHourPalace && (
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-cosmic-purple flex items-center justify-center text-xs text-white font-bold">
                    H
                  </div>
                )}

                {/* Void indicator */}
                {palace.isVoid && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">VOID</span>
                  </div>
                )}

                <div className="space-y-1">
                  {/* Direction & Position */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${colors.text}`}>{palace.direction}</span>
                    <span className="text-xs text-muted-foreground">#{palace.position}</span>
                  </div>

                  {/* Element */}
                  <div className={`flex items-center gap-1 ${colors.text}`}>
                    {elementIcons[palace.element]}
                    <span className="text-xs">{palace.element}</span>
                  </div>

                  {/* Door */}
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{doorIcons[palace.door] || "🚪"}</span>
                    <span className="text-xs text-foreground">{palace.door}</span>
                  </div>

                  {/* Star */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-cosmic-gold" />
                    <span className="text-xs text-muted-foreground truncate">{palace.star}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Palace Detail Panel */}
      {selectedPalace && (
        <div className="animate-fade-in max-w-xl mx-auto">
          <div className={`rounded-2xl border ${elementColors[selectedPalace.element]?.border || "border-white/10"} ${elementColors[selectedPalace.element]?.bg || "bg-white/5"} backdrop-blur-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif text-foreground">
                Palace {selectedPalace.position} - {selectedPalace.direction}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm ${elementColors[selectedPalace.element]?.text || "text-foreground"} ${elementColors[selectedPalace.element]?.bg || "bg-white/10"}`}>
                {selectedPalace.element}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Deity */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cosmic-purple" />
                  <span className="text-sm text-muted-foreground">Deity</span>
                </div>
                <p className="text-foreground font-medium">{selectedPalace.deity}</p>
                <p className="text-xs text-muted-foreground">{selectedPalace.deityMeaning}</p>
              </div>

              {/* Star */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-cosmic-gold" />
                  <span className="text-sm text-muted-foreground">Star</span>
                </div>
                <p className="text-foreground font-medium">{selectedPalace.star}</p>
                <p className="text-xs text-muted-foreground">{selectedPalace.starMeaning}</p>
              </div>

              {/* Door */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DoorOpen className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-muted-foreground">Door</span>
                </div>
                <p className="text-foreground font-medium">{selectedPalace.door} Door</p>
                <p className="text-xs text-muted-foreground">{selectedPalace.doorMeaning}</p>
              </div>

              {/* Strength */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-muted-foreground">Strength</span>
                </div>
                <p className={`font-medium capitalize ${
                  selectedPalace.strength === "strong" ? "text-emerald-400" :
                  selectedPalace.strength === "weak" ? "text-red-400" : "text-foreground"
                }`}>
                  {selectedPalace.strength}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
            <Eye className="w-2 h-2 text-black" />
          </div>
          <span>Answer Palace</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-cosmic-gold flex items-center justify-center text-black font-bold text-[8px]">D</div>
          <span>Day Palace</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-cosmic-purple flex items-center justify-center text-white font-bold text-[8px]">H</div>
          <span>Hour Palace</span>
        </div>
      </div>
    </div>
  );
};

export default QimenChart;
