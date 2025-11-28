import { useState } from "react";
import { UserPlus, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PartnerInputFormProps {
  onSubmit: (data: {
    name: string;
    birthDate: string;
    birthTime?: string;
    birthLocation?: string;
  }) => void;
}

const PartnerInputForm = ({ onSubmit }: PartnerInputFormProps) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;
    
    onSubmit({
      name,
      birthDate,
      birthTime: birthTime || undefined,
      birthLocation: birthLocation || undefined,
    });
  };

  const isValid = name && birthDate;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated glow border */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500 via-cosmic-purple to-cyan-500 rounded-3xl opacity-0 blur transition-opacity duration-500 ${isHovered ? "opacity-50" : ""}`} />
      
      <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:border-white/20">
        {/* The Void visual */}
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-cosmic-gold/50 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cosmic-deep opacity-50" />
          <div className={`absolute inset-0 bg-cosmic-purple/20 transition-opacity duration-500 ${isHovered ? "opacity-100 animate-pulse" : "opacity-0"}`} />
          <UserPlus className={`w-8 h-8 text-muted-foreground transition-all duration-500 ${isHovered ? "text-cosmic-gold scale-110" : ""}`} />
        </div>
        
        <h3 className="text-xl font-serif text-foreground mb-2 text-center">Add Partner</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">Enter their cosmic coordinates</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-muted-foreground flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Their name"
              className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-cosmic-gold/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Birth Date
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-white/5 border-white/10 text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthTime" className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Birth Time <span className="text-xs">(optional)</span>
            </Label>
            <Input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="bg-white/5 border-white/10 text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthLocation" className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Birth Location <span className="text-xs">(optional)</span>
            </Label>
            <Input
              id="birthLocation"
              type="text"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              placeholder="City, Country"
              className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 via-cosmic-purple to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            Calculate Resonance
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PartnerInputForm;
