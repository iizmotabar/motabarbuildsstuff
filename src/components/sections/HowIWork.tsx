import { 
  FileText, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  Headphones 
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const workStyle = [
  {
    icon: FileText,
    title: "Clear scope & pricing upfront",
    description: "No hidden fees or scope creep. You'll know exactly what you're getting.",
  },
  {
    icon: Calendar,
    title: "Fixed timelines",
    description: "Every project has a clear start and end date. I respect your time.",
  },
  {
    icon: BookOpen,
    title: "Documentation included",
    description: "Detailed documentation so your team can maintain and build on the work.",
  },
  {
    icon: GraduationCap,
    title: "Training available",
    description: "Optional training sessions to get your team up to speed.",
  },
  {
    icon: Headphones,
    title: "Support options",
    description: "Ongoing support packages available for continued optimization.",
  },
];

export function HowIWork() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();

  return (
    <section id="how-i-work" className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            How I Work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A straightforward, professional process designed for clarity
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            ref={listRef}
            className={`space-y-6 stagger-children ${listVisible ? "visible" : ""}`}
          >
            {workStyle.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 glass-card group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-lg glass-subtle flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
