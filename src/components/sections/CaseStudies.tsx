import { useState } from "react";
import { ArrowUpRight, TrendingUp, BarChart3, Target, X, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const caseStudies = [
  {
    title: "Fixing Broken Tracking & Unlocking Lead Growth",
    client: "Premium Photography Studio",
    headline: "From fragmented tracking to confident marketing decisions",
    description: "Audited entire tracking setup, repaired GA4 conversion capture, synced campaign IDs across platforms, and established clean attribution rules inside HubSpot — backed by a centralized BigQuery data warehouse.",
    background: "The studio had a steady flow of leads but struggled to understand which ads actually converted into revenue. Their tracking stack was stitched across pixels, funnels, and forms — making weekly decisions feel like guesswork.",
    problem: "They were spending more, but learning less. Campaigns looked profitable inside Meta Ads, yet GA4 told a different story, and attribution inside HubSpot was unreliable.",
    whatIBuilt: [
      "A clean GA4 setup mapping real business conversions to marketing touchpoints",
      "Meta + GA4 + HubSpot attribution stitched using campaign IDs and client identifiers",
      "Automated nightly pipelines pulling paid + CRM data into BigQuery",
      "A performance dashboard that highlights which campaigns actually generate profitable bookings",
    ],
    outcome: "The team regained trust in their data and confidently reallocated budget toward genuinely high-performing campaigns. What previously took hours of spreadsheet stitching became a 10-minute dashboard review.",
    emotionalShift: "They stopped arguing over numbers and started acting on them. The feeling of \"we think this campaign works\" became \"we know — and here's how to scale it.\"",
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
    headline: "From spreadsheets everywhere to data you can finally trust",
    description: "Centralized all marketing and CRM data inside BigQuery, created standardized models, and built repeatable logic for channel attribution and lead quality tracking with Looker dashboards.",
    background: "The marketing team relied on multiple tools — Meta Ads, Google Ads, GA4, Search Console, HubSpot — but every report required downloading CSVs, merging spreadsheets, and debating why numbers didn't match.",
    problem: "Leadership needed answers to simple questions: which channel drives actual sales, where do high-intent leads come from, and what should we scale next quarter? Instead, each answer required half a day of manual work.",
    whatIBuilt: [
      "ETL pipelines for TikTok, LinkedIn, Meta, HubSpot, and GA4 into BigQuery",
      "Reusable dbt models transforming raw data into campaign-level insights",
      "A cross-channel attribution layer visible in Looker Studio",
      "Automated Slack alerts that signal ingestion failures before reports break",
    ],
    outcome: "Reporting time dropped by 80 percent, weekly cross-functional alignment improved, and campaigns could be compared apples-to-apples for the first time.",
    emotionalShift: "The team moved from reactive to proactive. Instead of collecting data, they now interpret it — and spend their energy on strategy instead of spreadsheets.",
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
    headline: "Turning SEO traffic into measurable revenue",
    description: "Connected Google Search Console and GA4 data inside their warehouse, mapped session stitching to user interactions, and modeled conversions back to Search Console queries.",
    background: "They invested years in content and SEO, yet stakeholders questioned its true revenue impact. GA4 showed conversions, Search Console showed keywords, but the two lived in different worlds.",
    problem: "They needed visibility into which branded and non-branded keywords triggered pages that later converted in GA4 — not just clicks or impressions, but business outcomes.",
    whatIBuilt: [
      "Keyword-to-conversion mapping using GA4 session identifiers",
      "A daily pipeline combining GSC + GA4 + CRM data in BigQuery",
      "Landing page performance models tied back to signed-up customers",
      "A page-level dashboard that surfaces conversion-driving keywords",
    ],
    outcome: "The SEO team discovered non-branded keywords outperforming previously prioritized branded terms — guiding a complete shift in content strategy. Within 90 days, the top re-optimized pages drove a 25 percent increase in trial signups.",
    emotionalShift: "Instead of defending SEO spend, they proved it — with numbers that stood up in leadership meetings.",
    metrics: [
      { label: "Trial Signups", value: "+25%", icon: TrendingUp },
      { label: "Keyword Mapping", value: "Complete", icon: Target },
      { label: "Content Strategy", value: "Data-Led", icon: BarChart3 },
    ],
    tags: ["GA4", "Search Console", "BigQuery", "SEO"],
  },
];

type CaseStudy = typeof caseStudies[0];

function CaseStudyModal({ study, open, onClose }: { study: CaseStudy | null; open: boolean; onClose: () => void }) {
  if (!study) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto glass-strong border-[hsl(var(--glass-border))]">
        <DialogHeader>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {study.client}
          </p>
          <DialogTitle className="text-xl font-bold text-gradient">
            {study.headline}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center glass-subtle rounded-lg px-3 py-3 text-center"
              >
                <metric.icon className="h-4 w-4 text-primary mb-1" />
                <span className="text-lg font-semibold text-gradient">{metric.value}</span>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Background */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Background</h4>
            <p className="text-sm text-muted-foreground">{study.background}</p>
          </div>

          {/* Problem */}
          <div>
            <h4 className="text-sm font-semibold mb-2">The Challenge</h4>
            <p className="text-sm text-muted-foreground">{study.problem}</p>
          </div>

          {/* What I Built */}
          <div>
            <h4 className="text-sm font-semibold mb-2">What I Built</h4>
            <ul className="space-y-2">
              {study.whatIBuilt.map((item, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="glass-subtle rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Outcome</h4>
            <p className="text-sm text-muted-foreground">{study.outcome}</p>
          </div>

          {/* Emotional Shift */}
          <div className="border-l-2 border-primary/50 pl-4">
            <p className="text-sm italic text-muted-foreground">"{study.emotionalShift}"</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
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
      </DialogContent>
    </Dialog>
  );
}

export function CaseStudies() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

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
              onClick={() => setSelectedStudy(study)}
              className="group glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 border border-[hsl(var(--glass-border))] cursor-pointer"
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

      <CaseStudyModal
        study={selectedStudy}
        open={!!selectedStudy}
        onClose={() => setSelectedStudy(null)}
      />
    </section>
  );
}
