import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trackNavClick, trackButtonClick } from "@/lib/gtm";

const navItems = [
  { label: "What I Do", href: "#what-i-do" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string, label: string, isMobile: boolean = false) => {
    setMobileMenuOpen(false);
    trackNavClick(label, isMobile ? 'mobile' : 'desktop');
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-header"
      data-track="header"
      className={`fixed top-0 left-0 right-0 z-50 glass border-b border-[hsl(var(--glass-border))] transition-all duration-300 ${
        scrolled ? "py-0" : "py-1"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-12" : "h-16"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            data-track="header-logo"
            className={`font-semibold tracking-tight transition-all duration-300 ${
              scrolled ? "text-base" : "text-lg"
            }`}
          >
            <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
              motabar
            </span>
            <span className="text-muted-foreground">.builds.stuff</span>
          </a>

          {/* Desktop Navigation */}
          <nav data-track="header-nav-desktop" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href, item.label, false)}
                data-track={`header-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-muted-foreground hover:text-foreground transition-all duration-300 ${
                  scrolled ? "text-xs" : "text-sm"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => {
                trackButtonClick('mobile-menu-toggle', mobileMenuOpen ? 'Close Menu' : 'Open Menu', 'header');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-track="header-mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav data-track="header-nav-mobile" className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href, item.label, true)}
                  data-track={`header-nav-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
