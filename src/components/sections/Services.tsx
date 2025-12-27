import { 
  BarChart3, 
  LineChart, 
  Clock, 
  Search, 
  Globe, 
  FileSearch, 
  Zap 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: BarChart3,
    title: "Track Your Marketing Accurately",
    problem: "Broken tracking, missing conversions, and mismatched numbers are costing you money.",
    solutions: [
      "Fix broken tracking setups",
      "Connect forms, calls, ads, and CRM",
      "Enrich leads automatically with source data",
    ],
    outcome: "Confidence in your numbers and the ability to cut wasted spend.",
  },
  {
    icon: LineChart,
    title: "Dashboards That Show What Matters",
    problem: "You're juggling multiple platforms just to understand basic performance.",
    solutions: [
      "One place to see spend, revenue, CAC, and ROAS",
      "Track campaigns, pages, keywords, and channels",
      "Real-time data with automated refreshes",
    ],
    outcome: "Faster decisions without platform hopping.",
  },
  {
    icon: Clock,
    title: "Automated Reporting Systems",
    problem: "Manual reporting wastes hours every week and delays action.",
    solutions: [
      "Automated data ingestion and daily refreshes",
      "Slack and email alerts for key changes",
      "Central historical data for trend analysis",
    ],
    outcome: "Save hours weekly and spot issues early.",
  },
  {
    icon: Search,
    title: "Measure SEO & Organic Performance",
    problem: "You can't tell if SEO efforts are actually driving revenue.",
    solutions: [
      "Track keywords, rankings, and organic conversions",
      "Compare visibility vs competitors",
      "Monitor AI overview and featured snippet impact",
    ],
    outcome: "Clarity on where SEO is paying off.",
  },
  {
    icon: Globe,
    title: "Fast, Professional Websites",
    problem: "Your current site is slow, outdated, or doesn't track properly.",
    solutions: [
      "Conversion-optimized websites and landing pages",
      "Mobile-ready and SEO-ready from day one",
      "Built-in tracking and analytics setup",
    ],
    outcome: "A site that converts and informs strategy.",
  },
  {
    icon: FileSearch,
    title: "Audit What You Have",
    problem: "You're not sure what's broken or what to fix first.",
    solutions: [
      "Check tracking accuracy across platforms",
      "Analyze site speed and mobile performance",
      "Review key setup issues and gaps",
    ],
    outcome: "Prioritized fixes and a roadmap to better insights.",
  },
  {
    icon: Zap,
    title: "Workflow Automation & AI",
    problem: "Too much manual work is slowing your team down.",
    solutions: [
      "Zapier, Make, and n8n automations",
      "Synced data and smart notifications",
      "Custom GPTs and chatbots trained on your docs",
    ],
    outcome: "Reduced manual work, enriched leads, and scalable operations.",
  },
];

export function Services() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            End-to-end solutions for tracking, analytics, and growth
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridVisible ? "visible" : ""}`}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="glass-card hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="h-10 w-10 rounded-lg glass-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {service.problem}
                </p>
                <ul className="space-y-2">
                  {service.solutions.map((solution, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-muted-foreground">·</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium">{service.outcome}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
