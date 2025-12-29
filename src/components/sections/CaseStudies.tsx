import { useState } from "react";
import { ArrowUpRight, TrendingUp, BarChart3, Target, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
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
  {
    title: "Proactive Insight Delivery With Slack Alerts",
    client: "Marketing Team",
    headline: "From reactive firefighting to proactive insight delivery",
    description: "Set up a monitoring layer for ingestion and modeling jobs with Slack alerts that notify the team if something breaks — before reports are due.",
    background: "Every time a tracking issue occurred — a pixel broke, a form changed, an API updated — the team only realized after weekly reporting. That meant late corrections, lost history, and uncomfortable conversations with executives.",
    problem: "They lacked visibility into data health and were always reacting to failures instead of preventing them.",
    whatIBuilt: [
      "Automated health checks against ingestion pipelines",
      "Validation scripts for changes in GA4 event structures",
      "Slack alerts with detailed incident messages and suggested fixes",
      "Status dashboards for pipeline reliability over time",
    ],
    outcome: "Silent breakages disappeared, and decision-makers regained trust in weekly reports. The company now resolves issues in hours instead of days.",
    emotionalShift: "Instead of anxiety around reporting day, the team has calm confidence — knowing issues surface immediately, not after leadership asks questions.",
    metrics: [
      { label: "Issue Resolution", value: "Hours", icon: TrendingUp },
      { label: "Data Trust", value: "Restored", icon: Target },
      { label: "Silent Failures", value: "0", icon: BarChart3 },
    ],
    tags: ["Slack", "Monitoring", "Automation", "Alerts"],
  },
  {
    title: "HubSpot + BigQuery Sales Attribution",
    client: "Growing SaaS Platform",
    headline: "Enriching HubSpot contacts with accurate attribution to improve sales prioritization",
    description: "Synced HubSpot contacts into BigQuery, enriched each record with campaign metadata and source information, and pushed enriched fields back into HubSpot using reverse ETL.",
    background: "HubSpot tracked early engagement but attribution signals were weak. Paid, organic, and cold leads all appeared identical in the CRM — confusing prioritization.",
    problem: "Sales needed attribution enriched with marketing context to prioritize revenue-driving conversations.",
    whatIBuilt: [
      "HubSpot to BigQuery sync using Fivetran",
      "Attribution enrichment with Google Ads, Meta Ads, and GSC data",
      "Reverse ETL to push enriched fields back into HubSpot",
      "Lead scoring based on source quality and intent signals",
    ],
    outcome: "Sales reps instantly saw which leads came from high-intent paid search vs low-priority organic, improving closing efficiency and revenue prioritization.",
    emotionalShift: "Sales stopped wasting time on low-quality leads and focused energy on prospects most likely to convert.",
    metrics: [
      { label: "Lead Clarity", value: "100%", icon: TrendingUp },
      { label: "Prioritization", value: "Automated", icon: Target },
      { label: "Sales Efficiency", value: "Improved", icon: BarChart3 },
    ],
    tags: ["HubSpot", "BigQuery", "Reverse ETL", "Attribution"],
  },
  {
    title: "End-to-End Marketing ETL Pipelines",
    client: "Enterprise Marketing Team",
    headline: "Scaling marketing analytics through automated ETL pipelines and data modeling in BigQuery",
    description: "Built comprehensive ETL pipelines connecting all marketing platforms to a centralized BigQuery warehouse with normalized metrics across channels.",
    background: "Marketing data lived in silos across Meta, Google, LinkedIn, and TikTok with no way to compare performance across channels.",
    problem: "Leadership couldn't answer basic questions about which channels delivered the highest returning customer value.",
    whatIBuilt: [
      "Multi-platform ETL pipelines with daily refreshes",
      "Normalized cost and conversion metrics across all channels",
      "Customer value attribution models",
      "Executive dashboards with cross-channel comparisons",
    ],
    outcome: "For the first time, leadership could compare campaign performance across platforms using normalized metrics — enabling a 15 percent budget increase toward channels with highest returning customer value.",
    emotionalShift: "Budget conversations shifted from opinion-based debates to data-driven decisions.",
    metrics: [
      { label: "Budget Optimization", value: "+15%", icon: TrendingUp },
      { label: "Channels Unified", value: "4+", icon: Target },
      { label: "Reporting", value: "Automated", icon: BarChart3 },
    ],
    tags: ["ETL", "BigQuery", "Multi-Channel", "Attribution"],
  },
  {
    title: "Cold Outreach Workflow Automation",
    client: "Sales Team",
    headline: "Automating cold outreach insights to avoid wasted pipeline and improve follow-up efficiency",
    description: "Built automated workflows using EmailBison and Slack webhooks to track cold outreach performance and surface actionable insights.",
    background: "Sales was sending cold emails but had no visibility into what was working or why prospects weren't responding.",
    problem: "Follow-up timing was arbitrary, messaging wasn't being refined, and pipeline was being wasted on unresponsive leads.",
    whatIBuilt: [
      "EmailBison integration for outreach tracking",
      "Slack webhooks for real-time response notifications",
      "Objection categorization and tracking",
      "Follow-up sequence optimization based on engagement data",
    ],
    outcome: "Sales refined messaging based on structured objections and saw improved conversion in follow-up sequences.",
    emotionalShift: "Cold outreach became a data-informed process rather than a numbers game.",
    metrics: [
      { label: "Follow-up Rate", value: "Improved", icon: TrendingUp },
      { label: "Objection Tracking", value: "Automated", icon: Target },
      { label: "Messaging", value: "Refined", icon: BarChart3 },
    ],
    tags: ["EmailBison", "Slack", "Automation", "Sales"],
  },
  {
    title: "Mixpanel Event Data Extraction",
    client: "Product Analytics Team",
    headline: "Scraping Mixpanel event streams when APIs weren't available — without breaking data availability",
    description: "Built authenticated Chrome automation to extract Mixpanel event data when standard APIs weren't available, enabling advanced product analytics.",
    background: "The team needed access to detailed Mixpanel event streams for churn prediction and funnel analysis, but their plan didn't include API access.",
    problem: "Without upgrading their Mixpanel plan, they had no way to get event data into their warehouse for advanced analysis.",
    whatIBuilt: [
      "Authenticated Chrome automation for data extraction",
      "Reliable scheduling without breaking Mixpanel sessions",
      "Data transformation and loading into BigQuery",
      "Churn prediction and funnel bottleneck dashboards",
    ],
    outcome: "The team gained reliable access to Mixpanel event streams without upgrading, enabling churn predictions and funnel bottleneck analysis.",
    emotionalShift: "Product decisions became data-informed without requiring expensive tool upgrades.",
    metrics: [
      { label: "Data Access", value: "Unlocked", icon: TrendingUp },
      { label: "Cost Savings", value: "Significant", icon: Target },
      { label: "Analysis", value: "Enabled", icon: BarChart3 },
    ],
    tags: ["Mixpanel", "Automation", "BigQuery", "Product Analytics"],
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
  const [showAll, setShowAll] = useState(false);

  const displayedStudies = showAll ? caseStudies : caseStudies.slice(0, 3);

  return (
    <section id="case-studies" data-track="section-case-studies" className="py-16 md:py-20 relative">
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
          {displayedStudies.map((study, index) => (
            <div
              key={index}
              onClick={() => setSelectedStudy(study)}
              data-track={`case-study-card-${index + 1}`}
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

        {/* Show More/Less Button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="glass-subtle border-[hsl(var(--glass-border))] hover:bg-primary/10"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                View All {caseStudies.length} Case Studies <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
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
