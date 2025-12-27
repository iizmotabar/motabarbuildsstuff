import { CheckCircle } from "lucide-react";

const benefits = [
  "Know exactly which campaigns, channels, and keywords are driving real results",
  "Stop wasting budget on marketing that isn't working",
  "Make confident decisions backed by accurate, unified data",
  "Scale faster with automated reporting and real-time insights",
];

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">
            What I Do
          </h2>
          
          <p className="mt-6 text-lg text-muted-foreground text-center text-balance">
            You're spending on marketing but not sure what's working. 
            I fix tracking, unify data across platforms, and automate reporting 
            so you can stop guessing and start optimizing.
          </p>

          <div className="mt-12 space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-surface"
              >
                <CheckCircle className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
