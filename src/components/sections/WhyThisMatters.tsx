import { ArrowRight } from "lucide-react";

export function WhyThisMatters() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why This Matters
          </h2>
          
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            When tracking and reporting are accurate, you stop wasting money 
            and double down on what works.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-lg font-medium">
            <span className="px-4 py-2 rounded-lg bg-surface">Clean Data</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <span className="px-4 py-2 rounded-lg bg-surface">Smarter Decisions</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <span className="px-4 py-2 rounded-lg bg-surface">Lower Costs</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <span className="px-4 py-2 rounded-lg bg-surface">Higher ROI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
