import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance animate-fade-in">
            Accurate Tracking, Clear Data, Better Decisions.
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in" style={{ animationDelay: "0.1s" }}>
            I help businesses understand what's working in their marketing, fix tracking issues, and scale with accurate data.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <a href="#contact">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              onClick={scrollToServices}
            >
              View Services
            </Button>
          </div>

          <button
            onClick={scrollToServices}
            className="mt-20 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="text-sm">Learn more</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
