import { ArrowUpRight, TrendingUp, BarChart3, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const caseStudies = [
  {
    title: "Fixing Broken Tracking & Unlocking Lead Growth",
    client: "Premium Photography Studio",
    description: "Audited entire tracking setup, repaired GA4 conversion capture, synced campaign IDs across platforms, and established clean attribution rules inside HubSpot — backed by a centralized BigQuery data warehouse.",
    metrics: [
      { label: "Decision Time", value: "-80%", icon: TrendingUp },
      { label: "Attribution", value: "Unified", icon: Target },
      { label: "Report Cadence", value: "Weekly", icon: BarChart3 },
    ],
    tags: ["GA4", "Meta Ads", "HubSpot", "BigQuery"],
  },
  {
    title: "Single Source of Truth for Marketing Data",
    client: "Growth-Focused B2B Company",
    description: "Centralized all marketing and CRM data inside BigQuery, created standardized models, and built repeatable logic for channel attribution and lead quality tracking with Looker dashboards.",
    metrics: [
      { label: "Reporting Time", value: "-80%", icon: TrendingUp },
      { label: "Data Sources", value: "5+", icon: Target },
      { label: "Team Alignment", value: "Weekly", icon: BarChart3 },
    ],
    tags: ["BigQuery", "dbt", "Looker Studio", "ETL"],
  },
  {
    title: "SEO Keywords to Measurable Revenue",
    client: "SaaS Product",
    description: "Connected Google Search Console and GA4 data inside their warehouse, mapped session stitching to user interactions, and modeled conversions back to Search Console queries.",
    metrics: [
      { label: "Trial Signups", value: "+25%", icon: TrendingUp },
      { label: "Keyword Mapping", value: "Complete", icon: Target },
      { label: "Content Strategy", value: "Data-Led", icon: BarChart3 },
    ],
    tags: ["GA4", "Search Console", "BigQuery", "SEO"],
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
