import { Quote, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  {
    quote: "Motabar transformed our analytics setup. We finally have accurate data we can trust for our marketing decisions.",
    author: "Sarah K.",
    role: "Marketing Director",
    company: "E-commerce Brand",
  },
  {
    quote: "The server-side tracking implementation was seamless. Our conversion tracking is now 40% more accurate.",
    author: "James M.",
    role: "Head of Growth",
    company: "SaaS Startup",
  },
  {
    quote: "Professional, fast, and extremely knowledgeable. Highly recommend for any GTM or analytics work.",
    author: "Emily R.",
    role: "Founder",
    company: "Digital Agency",
  },
];

export function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            What Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real results from real businesses
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children ${gridVisible ? "visible" : ""}`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 relative hover:scale-[1.02] transition-transform"
            >
              <Quote className="h-8 w-8 text-primary/30 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-border pt-4">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
