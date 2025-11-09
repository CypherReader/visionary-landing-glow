import { Calendar, Moon, Sparkles, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Personal Calendar",
    description: "Receive daily insights tailored to your unique cosmic blueprint and life path.",
  },
  {
    icon: Moon,
    title: "Lunar Guidance",
    description: "Harness the power of moon phases to optimize your decisions and actions.",
  },
  {
    icon: Star,
    title: "Celestial Alignment",
    description: "Discover the perfect moments for new beginnings, important meetings, and life changes.",
  },
  {
    icon: Sparkles,
    title: "Mystical Wisdom",
    description: "Ancient knowledge meets modern insight to illuminate your path forward.",
  },
];

const Features = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center animate-fade-in">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            Navigate Time with{" "}
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              Precision
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every day holds unique energy. Learn to read the cosmic signs and
            make decisions aligned with universal rhythms.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-cosmic-purple/50 hover:shadow-ambient animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-ethereal opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cosmic-purple/20 text-cosmic-purple transition-colors group-hover:bg-cosmic-purple/30">
                  <feature.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-serif text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
