import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function WhyThisMatters() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: flowRef, isVisible: flowVisible } = useScrollAnimation();

  return (
    <section id="why-this-matters" data-track="section-why-this-matters" className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={headerRef}
            className={`animate-on-scroll ${headerVisible ? "visible" : ""}`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Why This Matters
            </h2>
            
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              When tracking and reporting are accurate, you stop wasting money 
              and double down on what works.
            </p>
          </div>

          <div
            ref={flowRef}
            className={`mt-12 flex flex-wrap items-center justify-center gap-4 text-lg font-medium stagger-children ${flowVisible ? "visible" : ""}`}
          >
            <span className="px-4 py-2 rounded-lg glass-subtle hover:scale-105 transition-transform cursor-default">
              Clean Data
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <span className="px-4 py-2 rounded-lg glass-subtle hover:scale-105 transition-transform cursor-default">
              Smarter Decisions
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <span className="px-4 py-2 rounded-lg glass-subtle hover:scale-105 transition-transform cursor-default">
              Lower Costs
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <span className="px-4 py-2 rounded-lg glass-subtle hover:scale-105 transition-transform cursor-default">
              Higher ROI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
