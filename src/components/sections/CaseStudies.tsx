import { ArrowUpRight, TrendingUp, BarChart3, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const caseStudies = [
  {
    title: "E-Commerce Analytics Overhaul",
    client: "Fashion Retail Brand",
    description: "Complete tracking infrastructure rebuild with enhanced e-commerce tracking, custom dimensions, and marketing attribution.",
    metrics: [
      { label: "Revenue Attribution", value: "+340%", icon: TrendingUp },
      { label: "Data Accuracy", value: "99.2%", icon: Target },
      { label: "ROAS Improvement", value: "+85%", icon: BarChart3 },
    ],
    tags: ["GA4", "GTM", "Server-Side", "E-commerce"],
  },
  {
    title: "SaaS Conversion Tracking",
    client: "B2B Software Company",
    description: "Implemented full-funnel tracking from first touch to subscription, enabling precise CAC calculations and LTV predictions.",
    metrics: [
      { label: "Lead Quality Score", value: "+127%", icon: TrendingUp },
      { label: "Attribution Windows", value: "90-day", icon: Target },
      { label: "CAC Reduction", value: "-35%", icon: BarChart3 },
    ],
    tags: ["GA4", "HubSpot", "Custom Events", "API"],
  },
  {
    title: "Multi-Brand Analytics Hub",
    client: "Media & Publishing Group",
    description: "Unified analytics across 5 brands with cross-domain tracking, centralized reporting, and custom dashboards.",
    metrics: [
      { label: "Reporting Time", value: "-80%", icon: TrendingUp },
      { label: "Data Sources", value: "12+", icon: Target },
      { label: "Insights Speed", value: "Real-time", icon: BarChart3 },
    ],
    tags: ["BigQuery", "Looker Studio", "Cross-Domain", "ETL"],
  },
];

export function CaseStudies() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="case-studies" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real projects. See how strategic analytics implementation 
            drives measurable business outcomes.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? "visible" : ""}`}
        >
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 border border-[hsl(var(--glass-border))]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {study.client}
                  </p>
                  <h3 className="text-lg font-semibold group-hover:text-gradient transition-colors">
                    {study.title}
                  </h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                {study.description}
              </p>

              <div className="space-y-3 mb-6">
                {study.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between glass-subtle rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <metric.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {metric.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gradient">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full glass-subtle text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
