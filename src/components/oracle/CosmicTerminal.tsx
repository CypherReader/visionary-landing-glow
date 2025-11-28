import { useState, useEffect } from "react";
import { Sparkles, Compass, Calendar, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CosmicTerminalProps {
  onCast: (question: string, mode: "divination" | "selection") => void;
}

const CosmicTerminal = ({ onCast }: CosmicTerminalProps) => {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<"divination" | "selection">("divination");
  const [isFocusing, setIsFocusing] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);

  useEffect(() => {
    if (isFocusing) {
      const interval = setInterval(() => {
        setBreathPhase((p) => (p + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isFocusing]);

  const handleCast = () => {
    if (!question.trim()) return;
    setIsFocusing(true);
    
    // Brief focus moment before casting
    setTimeout(() => {
      setIsFocusing(false);
      onCast(question, mode);
    }, 2000);
  };

  const breathText = ["Breathe in...", "Hold...", "Breathe out...", "Focus your intent..."];

  return (
    <div className="animate-fade-in">
      {/* Mode Selection */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as "divination" | "selection")} className="mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto bg-white/5 border border-white/10">
          <TabsTrigger 
            value="divination" 
            className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
          >
            <Compass className="w-4 h-4 mr-2" />
            Divination
          </TabsTrigger>
          <TabsTrigger 
            value="selection"
            className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Selection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="divination" className="mt-6">
          <p className="text-center text-muted-foreground text-sm mb-4">
            Ask about outcomes, decisions, or hidden influences. The oracle reveals the cosmic forces at play.
          </p>
        </TabsContent>

        <TabsContent value="selection" className="mt-6">
          <p className="text-center text-muted-foreground text-sm mb-4">
            Find the optimal time and direction for your goals. The oracle guides you to favorable moments.
          </p>
        </TabsContent>
      </Tabs>

      {/* Terminal Interface */}
      <div className="relative max-w-2xl mx-auto">
        {/* Terminal glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-cosmic-purple/30 to-amber-500/30 rounded-3xl blur-xl opacity-50" />
        
        <div className="relative rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-muted-foreground font-mono">cosmic_terminal v3.0</span>
            </div>
          </div>

          {/* Input area */}
          <div className="p-6">
            <div className="mb-4">
              <span className="text-emerald-400 font-mono text-sm">oracle@qimen:~$ </span>
              <span className="text-muted-foreground font-mono text-sm">enter_inquiry</span>
            </div>

            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={mode === "divination" 
                ? "What is the outcome of this business negotiation?"
                : "When is the best time to sign the contract?"
              }
              className="min-h-[120px] bg-transparent border-white/10 text-foreground placeholder:text-muted-foreground/50 font-mono resize-none focus:border-emerald-500/50"
              disabled={isFocusing}
            />

            {/* Focusing animation */}
            {isFocusing && (
              <div className="mt-6 text-center animate-fade-in">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className={`absolute inset-0 rounded-full border-2 border-emerald-500/50 transition-all duration-1000 ${breathPhase < 2 ? "scale-100" : "scale-75"}`} />
                  <div className={`absolute inset-2 rounded-full border border-cosmic-gold/50 transition-all duration-1000 ${breathPhase < 2 ? "scale-75" : "scale-100"}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
                  </div>
                </div>
                <p className="text-emerald-400 font-serif animate-pulse">{breathText[breathPhase]}</p>
              </div>
            )}

            {/* Cast button */}
            {!isFocusing && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleCast}
                  disabled={!question.trim()}
                  className="px-8 py-6 bg-gradient-to-r from-emerald-500 via-cosmic-purple to-amber-500 text-white font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Cast Chart
                </Button>
              </div>
            )}
          </div>

          {/* Decorative scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-scan" />
          </div>
        </div>
      </div>

      {/* Example questions */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground mb-3">Example questions:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Will this investment succeed?",
            "Is now a good time to negotiate?",
            "What hidden influences affect my decision?"
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => setQuestion(q)}
              className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CosmicTerminal;
