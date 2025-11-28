import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-purple.png";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-70"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-ethereal animate-glow-pulse" />
      </div>

      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="group">
            <img 
              src={logo} 
              alt="Feng Shui Angels" 
              className="h-16 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
            />
          </Link>
          <nav className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="text-foreground/80 hover:text-foreground hover:bg-white/10"
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl animate-fade-in">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cosmic-gold/30 bg-cosmic-deep/50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-cosmic-gold" />
              <span className="text-sm font-medium text-cosmic-gold">
                Unlock Your Cosmic Potential
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl">
              Discover Your Most{" "}
              <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                Auspicious Days
              </span>
            </h1>

            {/* Subheading */}
            <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl">
              Align with the cosmos and unlock personalized insights to guide
              your journey. Every moment holds infinite possibility.
            </p>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-cosmic-purple/20 px-8 py-6 text-lg font-medium text-foreground backdrop-blur-md transition-all hover:bg-cosmic-purple/30 hover:shadow-glow border border-cosmic-purple/50"
            >
              <Link to="/dashboard">
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Explore</span>
          <div className="h-12 w-6 rounded-full border-2 border-cosmic-gold/30 p-1">
            <div className="h-2 w-2 mx-auto rounded-full bg-cosmic-gold animate-glow-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
