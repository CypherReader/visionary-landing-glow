import { X, User, MapPin, Clock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const [birthDate, setBirthDate] = useState("1990-01-15");
  const [birthTime, setBirthTime] = useState("14:30");
  const [birthLocation, setBirthLocation] = useState("New York, USA");

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your cosmic chart has been recalculated based on new settings.",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl overflow-hidden animate-fade-in">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cosmic-purple/30 rounded-full blur-3xl" />
        
        <div className="relative z-10 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-foreground">Profile Calibration</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Update your birth details to ensure accurate cosmic readings. Your Bazi chart and auspicious dates will be recalculated.
          </p>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Birth Date
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-white/5 border-white/10 text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Birth Time
              </Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="bg-white/5 border-white/10 text-foreground"
              />
              <p className="text-xs text-muted-foreground">
                For most accurate readings, provide exact birth time if known.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthLocation" className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Birth Location
              </Label>
              <Input
                id="birthLocation"
                type="text"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
                placeholder="City, Country"
                className="bg-white/5 border-white/10 text-foreground"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-cosmic-gold to-cosmic-purple text-black font-medium"
            >
              <Save className="w-4 h-4 mr-2" />
              Save & Recalculate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
