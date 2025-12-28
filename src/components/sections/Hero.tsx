import { ArrowRight, ChevronDown, Terminal, Database, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative">
      {/* Decorative tech icons */}
      <div className="absolute top-32 left-10 md:left-20 opacity-20 animate-pulse-glow">
        <Terminal className="w-8 h-8 text-blue-500" />
      </div>
      <div className="absolute top-48 right-10 md:right-24 opacity-20 animate-pulse-glow" style={{ animationDelay: "1s" }}>
        <Database className="w-10 h-10 text-purple-500" />
      </div>
      <div className="absolute bottom-32 left-20 md:left-32 opacity-15 animate-pulse-glow" style={{ animationDelay: "2s" }}>
        <Cloud className="w-12 h-12 text-cyan-500" />
      </div>
      
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in glow-border">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for new projects</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance animate-fade-in">
            Accurate Tracking, Clear Data,{" "}
            <span className="text-gradient">Better Decisions.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your go-to data guy. I help businesses fix broken tracking, build solid data pipelines, and turn messy numbers into insights you can actually use.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="h-12 px-8 text-base group bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 text-foreground shadow-lg shadow-purple-500/10" asChild>
              <a href="#contact">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base glass-card hover:bg-muted/50"
              onClick={scrollToServices}
            >
              View Services
            </Button>
          </div>

          {/* Code snippet decoration */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="inline-block code-block text-left glow-border">
              <code className="text-muted-foreground">
                <span className="text-blue-500">const</span>{" "}
                <span className="text-purple-500">analytics</span> = {"{"}
                <span className="text-green-500"> tracking</span>: <span className="text-orange-500">"fixed"</span>,
                <span className="text-green-500"> data</span>: <span className="text-orange-500">"unified"</span>,
                <span className="text-green-500"> decisions</span>: <span className="text-orange-500">"confident"</span> {"}"};
              </code>
            </div>
          </div>

          <button
            onClick={scrollToServices}
            className="mt-12 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-sm">Learn more</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
