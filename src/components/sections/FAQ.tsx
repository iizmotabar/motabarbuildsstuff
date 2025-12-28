import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const faqs = [
  {
    question: "How long does a typical analytics setup take?",
    answer:
      "Most standard setups take 1-2 weeks. This includes initial audit, implementation, testing, and documentation. More complex projects with multiple platforms or custom integrations may take 3-4 weeks.",
  },
  {
    question: "Do you work with existing analytics setups or only new implementations?",
    answer:
      "Both! I frequently audit and optimize existing setups. Often there's significant value in fixing tracking issues and enhancing current implementations rather than starting from scratch.",
  },
  {
    question: "What's the difference between GA4 and server-side tracking?",
    answer:
      "GA4 is Google's analytics platform that collects data. Server-side tracking sends data from your server instead of the browser, improving data accuracy, privacy compliance, and bypassing ad blockers. They work together for best results.",
  },
  {
    question: "Can you help with privacy compliance (GDPR, CCPA)?",
    answer:
      "Absolutely. Every setup I implement includes proper consent management, data retention policies, and documentation. I ensure your tracking respects user privacy while still providing valuable insights.",
  },
  {
    question: "Do you provide ongoing support after the initial setup?",
    answer:
      "Yes, I offer maintenance packages for ongoing support, monitoring, and optimization. I also provide documentation and training so your team can handle day-to-day tasks independently.",
  },
  {
    question: "What if I'm not sure what I need?",
    answer:
      "No problem! We can start with a discovery call to understand your business goals and current setup. From there, I'll recommend the most impactful solutions for your specific situation.",
  },
];

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Common questions about analytics implementation, process, and what to expect.
          </p>
        </div>

        <div
          ref={ref}
          className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl border border-[hsl(var(--glass-border))] px-6 data-[state=open]:bg-surface/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
