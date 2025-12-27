import { ThemeToggle } from "@/components/ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">motabar.builds.stuff</span>
            <span className="text-muted-foreground">·</span>
            <a
              href="mailto:motabar.javaid@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              motabar.javaid@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
