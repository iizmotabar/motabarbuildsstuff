import { Shield, Award, Clock, Users, Zap, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const credibilityItems = [
  {
    icon: Shield,
    label: "Privacy-First",
    description: "GDPR & CCPA compliant setups",
  },
  {
    icon: Award,
    label: "Certified Expert",
    description: "Google Analytics & Tag Manager",
  },
  {
    icon: Clock,
    label: "Fast Turnaround",
    description: "Most projects in 1-2 weeks",
  },
  {
    icon: Users,
    label: "Trusted Partner",
    description: "Agencies & direct clients",
  },
  {
    icon: Zap,
    label: "Modern Stack",
    description: "Latest tools & best practices",
  },
  {
    icon: TrendingUp,
    label: "Results-Driven",
    description: "Focus on ROI & growth",
  },
];

export function Credibility() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 border-y border-border bg-surface/50">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 stagger-children ${isVisible ? "visible" : ""}`}
        >
          {credibilityItems.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="h-12 w-12 mx-auto rounded-xl glass-subtle flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
