import { Settings, Home, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onSettingsClick: () => void;
}

const DashboardHeader = ({ onSettingsClick }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-gold to-cosmic-purple flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="font-serif text-xl text-foreground group-hover:text-cosmic-gold transition-colors">
            AngelHarmony
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span className="text-sm text-cosmic-gold font-medium">Nura Planner</span>
          <Link 
            to="/matcher" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Cosmic Matcher
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button className="bg-gradient-to-r from-cosmic-gold to-cosmic-purple text-black font-medium hover:opacity-90 transition-opacity">
            Upgrade to Sage
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
