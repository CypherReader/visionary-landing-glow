import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Home, ArrowLeft, Compass, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CosmicTerminal from "@/components/oracle/CosmicTerminal";
import ChartCastingAnimation from "@/components/oracle/ChartCastingAnimation";
import QimenChart from "@/components/oracle/QimenChart";
import OracleResult from "@/components/oracle/OracleResult";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface QimenReading {
  palaces: Palace[];
  verdict: "Favorable" | "Challenging" | "Wait";
  verdictExplanation: string;
  answerPalaceNumber: number;
  tacticalAdvice: string;
  bestDirection: string;
  bestHour: string;
  specialFormation: string | null;
  specialFormationMeaning: string | null;
  deepInsight: string;
}

export interface Palace {
  position: number;
  direction: string;
  element: string;
  deity: string;
  deityMeaning: string;
  star: string;
  starMeaning: string;
  door: string;
  doorMeaning: string;
  isAnswerPalace: boolean;
  isDayPalace: boolean;
  isHourPalace: boolean;
  isVoid: boolean;
  strength: string;
}

type Phase = "inquiry" | "casting" | "strategy";

const Oracle = () => {
  const [phase, setPhase] = useState<Phase>("inquiry");
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<"divination" | "selection">("divination");
  const [reading, setReading] = useState<QimenReading | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);

  const handleCastChart = async (q: string, m: "divination" | "selection") => {
    setQuestion(q);
    setMode(m);
    setPhase("casting");

    try {
      const { data, error } = await supabase.functions.invoke("qimen-oracle", {
        body: { 
          question: q, 
          mode: m,
          timestamp: new Date().toISOString()
        },
      });

      if (error) {
        console.error("Oracle error:", error);
        toast({
          title: "Oracle Failed",
          description: error.message || "The cosmic connection was lost",
          variant: "destructive",
        });
        setPhase("inquiry");
        return;
      }

      // Allow animation to complete
      setTimeout(() => {
        setReading(data);
        setPhase("strategy");
      }, 4000);
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Connection Error",
        description: "Failed to reach the Strategic Oracle",
        variant: "destructive",
      });
      setPhase("inquiry");
    }
  };

  const handleReset = () => {
    setPhase("inquiry");
    setQuestion("");
    setReading(null);
    setSelectedPalace(null);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cosmic background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep via-black to-cosmic-deep" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }} />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-gold to-emerald-500 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-black" />
            </div>
            <span className="font-serif text-xl text-foreground group-hover:text-cosmic-gold transition-colors">
              AngelHarmony
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link 
              to="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">奇门遁甲</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
            Strategic <span className="text-emerald-400">Oracle</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Master time and space to achieve your goals through the ancient art of Qimen Dun Jia.
          </p>
        </div>

        {/* Phase Content */}
        {phase === "inquiry" && (
          <CosmicTerminal onCast={handleCastChart} />
        )}

        {phase === "casting" && (
          <ChartCastingAnimation question={question} />
        )}

        {phase === "strategy" && reading && (
          <div className="space-y-8 animate-fade-in">
            <OracleResult reading={reading} question={question} />
            
            <QimenChart 
              reading={reading} 
              selectedPalace={selectedPalace}
              onPalaceSelect={setSelectedPalace}
            />
            
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                Ask Another Question
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Oracle;
