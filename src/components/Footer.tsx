import { ThemeToggle } from "@/components/ThemeToggle";
import { Linkedin, Mail, Github, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">
                <span className="text-gradient">motabar</span>
                <span className="text-muted-foreground">.builds.stuff</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Cloud & Analytics Engineer helping businesses understand what's working and scale with accurate data.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {["Services", "Tech Stack", "Packages", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group w-fit"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/iizmotabar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-border/50 flex items-center justify-center hover:border-blue-500/50 hover:scale-110 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
              </a>
              <a
                href="mailto:motabar.javaid@gmail.com"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-border/50 flex items-center justify-center hover:border-purple-500/50 hover:scale-110 transition-all"
              >
                <Mail className="w-4 h-4 text-purple-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-border/50 flex items-center justify-center hover:border-cyan-500/50 hover:scale-110 transition-all"
              >
                <Github className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
            <a
              href="mailto:motabar.javaid@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              motabar.javaid@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} motabar.builds.stuff. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to top ↑
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
