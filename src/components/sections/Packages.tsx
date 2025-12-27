import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const packages = [
  {
    name: "Starter",
    price: "$250 – $350",
    description: "For businesses getting started with proper tracking",
    features: [
      "Basic tracking audit",
      "Google Analytics 4 setup",
      "Conversion tracking configuration",
      "Documentation & handoff",
    ],
  },
  {
    name: "Growth",
    price: "$750 – $1,200",
    description: "For growing teams ready to unify their data",
    features: [
      "Full tracking audit & fixes",
      "Multi-platform integration",
      "Custom dashboard setup",
      "Automated reporting",
      "30-day support",
    ],
    featured: true,
  },
  {
    name: "Performance",
    price: "$2,000 – $4,000",
    description: "For established businesses scaling their operations",
    features: [
      "Enterprise tracking architecture",
      "Data warehouse setup",
      "Advanced attribution modeling",
      "Workflow automation",
      "Custom integrations",
      "Ongoing support & optimization",
    ],
  },
  {
    name: "Website Build",
    price: "Starting at $600",
    description: "Fast, conversion-optimized websites",
    features: [
      "Modern, responsive design",
      "Built-in tracking setup",
      "SEO optimization",
      "Mobile performance",
      "CMS integration (if needed)",
    ],
  },
];

export function Packages() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Packages
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Clear pricing. No surprises. Pick what fits your needs.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${gridVisible ? "visible" : ""}`}
        >
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative glass-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                pkg.featured
                  ? "border-foreground/50 shadow-lg"
                  : ""
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {pkg.name}
                </CardTitle>
                <p className="text-2xl font-semibold mt-2">{pkg.price}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {pkg.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.featured ? "default" : "outline"}
                  className="w-full mt-6"
                  onClick={scrollToContact}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
