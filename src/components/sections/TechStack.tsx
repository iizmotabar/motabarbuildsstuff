import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { 
  Database, 
  BarChart3, 
  Code2, 
  Cloud, 
  Workflow,
  Layers,
  Zap,
  Globe
} from "lucide-react";

const techCategories = [
  {
    title: "Cloud & Data Warehousing",
    icon: Cloud,
    tools: ["Google Cloud Platform", "BigQuery", "Snowflake", "AWS", "Redshift", "Azure"],
  },
  {
    title: "Analytics & Tracking",
    icon: BarChart3,
    tools: ["Google Analytics 4", "Google Tag Manager", "Segment", "Mixpanel", "Amplitude", "Hotjar"],
  },
  {
    title: "Data Engineering",
    icon: Database,
    tools: ["dbt", "Airflow", "Fivetran", "Stitch", "Python", "SQL"],
  },
  {
    title: "Visualization & BI",
    icon: Layers,
    tools: ["Looker Studio", "Tableau", "Power BI", "Metabase", "Superset"],
  },
  {
    title: "Automation & Integration",
    icon: Workflow,
    tools: ["Zapier", "Make", "n8n", "Retool", "APIs", "Webhooks"],
  },
  {
    title: "Development",
    icon: Code2,
    tools: ["JavaScript", "TypeScript", "React", "Node.js", "Git", "REST APIs"],
  },
];

export function TechStack() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="tech-stack" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Code2 className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Tools & Technologies</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Battle-tested tools I use to build scalable data infrastructure and analytics solutions
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridVisible ? "visible" : ""}`}
        >
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="glass-strong p-6 rounded-2xl glow-border group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-full glass-subtle hover:bg-muted/50 transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating code elements */}
        <div className="mt-16 flex justify-center">
          <div className="code-block text-left max-w-2xl glow-border">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-xs text-muted-foreground ml-2">pipeline.py</span>
            </div>
            <code className="text-sm text-muted-foreground block">
              <span className="text-purple-500">from</span> data_pipeline <span className="text-purple-500">import</span> extract, transform, load{"\n"}
              <span className="text-purple-500">from</span> analytics <span className="text-purple-500">import</span> track_conversions{"\n\n"}
              <span className="text-blue-500">def</span> <span className="text-green-500">build_insights</span>(raw_data):{"\n"}
              {"    "}cleaned = transform(raw_data){"\n"}
              {"    "}enriched = track_conversions(cleaned){"\n"}
              {"    "}<span className="text-purple-500">return</span> load(enriched, destination=<span className="text-orange-500">"bigquery"</span>)
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
