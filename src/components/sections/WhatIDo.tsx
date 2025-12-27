import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = [
  "Know exactly which campaigns, channels, and keywords are driving real results",
  "Stop wasting budget on marketing that isn't working",
  "Make confident decisions backed by accurate, unified data",
  "Scale faster with automated reporting and real-time insights",
];

export function WhatIDo() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();

  return (
    <section id="what-i-do" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div
            ref={headerRef}
            className={`animate-on-scroll ${headerVisible ? "visible" : ""}`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">
              What I Do
            </h2>
            
            <p className="mt-6 text-lg text-muted-foreground text-center text-balance">
              You're spending on marketing but not sure what's working. 
              I fix tracking, unify data across platforms, and automate reporting 
              so you can stop guessing and start optimizing.
            </p>
          </div>

          <div
            ref={listRef}
            className={`mt-12 space-y-4 stagger-children ${listVisible ? "visible" : ""}`}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg glass-subtle group hover:scale-[1.02] transition-transform duration-300"
              >
                <CheckCircle className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
