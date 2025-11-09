import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-cosmic-purple/30 bg-gradient-to-br from-cosmic-deep via-background to-cosmic-deep p-12 md:p-20">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-ethereal animate-glow-pulse" />
          
          {/* Content */}
          <div className="relative z-10 text-center animate-fade-in">
            <h2 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-6xl">
              Your Cosmic Journey{" "}
              <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                Begins Now
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Join thousands who have discovered the power of living in harmony
              with celestial rhythms. Transform uncertainty into clarity.
            </p>
            <Button
              size="lg"
              className="group rounded-full bg-cosmic-purple px-10 py-6 text-lg font-medium text-primary-foreground shadow-glow transition-all hover:bg-cosmic-glow hover:shadow-ambient"
            >
              Get Your Reading
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cosmic-purple/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-cosmic-blue/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
