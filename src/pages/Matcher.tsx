import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-purple.png";
import { Button } from "@/components/ui/button";
import PartnerInputForm from "@/components/matcher/PartnerInputForm";
import ResonanceVisualizer from "@/components/matcher/ResonanceVisualizer";
import MatchResultCard from "@/components/matcher/MatchResultCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface MatchResult {
  resonanceScore: number;
  connectionType: string;
  connectionDescription: string;
  elementalAlchemy: {
    userAElement: string;
    userBElement: string;
    alchemyDescription: string;
  };
  theGift: string;
  theLesson: string;
  theFriction: string;
  harmonyAreas: string[];
  growthAreas: string[];
}

interface UserData {
  name: string;
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
}

type Phase = "invitation" | "conjunction" | "revelation";

const Matcher = () => {
  const [phase, setPhase] = useState<Phase>("invitation");
  const [userA] = useState<UserData>({
    name: "You",
    birthDate: "1990-01-15",
    birthTime: "14:30",
    birthLocation: "New York, USA",
  });
  const [userB, setUserB] = useState<UserData | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePartnerSubmit = async (partnerData: UserData) => {
    setUserB(partnerData);
    setPhase("conjunction");
    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke("cosmic-match", {
        body: { userA, userB: partnerData },
      });

      if (error) {
        console.error("Match error:", error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Could not complete cosmic analysis",
          variant: "destructive",
        });
        setPhase("invitation");
        setIsAnalyzing(false);
        return;
      }

      // Simulate animation time before showing results
      setTimeout(() => {
        setMatchResult(data);
        setIsAnalyzing(false);
        setTimeout(() => setPhase("revelation"), 1500);
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Connection Error",
        description: "Failed to connect to cosmic servers",
        variant: "destructive",
      });
      setPhase("invitation");
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setPhase("invitation");
    setUserB(null);
    setMatchResult(null);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cosmic background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple/10 via-transparent to-cosmic-blue/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cosmic-purple/10 rounded-full blur-[150px] opacity-30" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="Feng Shui Angels" 
              className="h-14 w-auto object-contain group-hover:scale-105 transition-transform"
            />
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
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
            Cosmic <span className="text-cosmic-gold">Matcher</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover the cosmic purpose of your connection through ancient Bazi wisdom and Western synastry.
          </p>
        </div>

        {/* Phase Content */}
        {phase === "invitation" && (
          <div className="grid lg:grid-cols-2 gap-8 items-center animate-fade-in">
            {/* User A - The Seeker */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-transparent rounded-3xl blur-xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-blue flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-cosmic-purple/50 animate-pulse" />
                  <span className="text-4xl font-serif relative z-10">✦</span>
                </div>
                <h3 className="text-xl font-serif text-foreground mb-2">{userA.name}</h3>
                <p className="text-sm text-muted-foreground">The Seeker</p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Birth: {userA.birthDate}</p>
                  <p>{userA.birthLocation}</p>
                </div>
              </div>
            </div>

            {/* User B - The Void / Partner Input */}
            <PartnerInputForm onSubmit={handlePartnerSubmit} />
          </div>
        )}

        {phase === "conjunction" && (
          <ResonanceVisualizer 
            userA={userA} 
            userB={userB!} 
            isAnalyzing={isAnalyzing}
            matchResult={matchResult}
          />
        )}

        {phase === "revelation" && matchResult && (
          <MatchResultCard 
            userA={userA}
            userB={userB!}
            result={matchResult} 
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default Matcher;
