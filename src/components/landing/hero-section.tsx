import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 mt-28">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-balance tracking-tight">
            <span className="font-medium text-foreground">Fast.</span>
            <span className="font-light text-muted-foreground"> Reliable.</span>
            <br />
            <span className="font-medium text-cyan-900">Delivered.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-2xl mx-auto text-pretty font-light leading-relaxed">
            Premium courier services with real-time tracking and global reach.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground text-lg px-10 py-4 rounded-full border border-border hover:border-accent/30 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-border/50">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light text-foreground mb-2">50K+</div>
              <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">Daily Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light text-foreground mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light text-foreground mb-2">150+</div>
              <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
