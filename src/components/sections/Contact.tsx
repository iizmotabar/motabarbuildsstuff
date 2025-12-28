import { useState } from "react";
import { ArrowRight, Mail, Calendar, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SpinningGradientButton } from "@/components/ui/spinning-gradient-button";
import { CollectibleOrb } from "@/components/CollectibleOrb";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual email sending later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface relative">
      {/* Hidden collectible orb */}
      <CollectibleOrb id="contact" className="top-20 left-[10%] hidden md:block" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-600/10 to-cyan-500/10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-12 animate-on-scroll ${headerVisible ? "visible" : ""}`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Ready to fix your tracking and grow with{" "}
              <span className="text-gradient">better data?</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Let's discuss your needs and find the right solution.
            </p>
          </div>

          <div
            ref={formRef}
            className={`animate-on-scroll-scale ${formVisible ? "visible" : ""}`}
          >
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <SpinningGradientButton
                size="lg"
                href="https://calendly.com/iizmotabar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4 group-hover:rotate-12 transition-transform text-purple-400" />
                Book on Calendly
              </SpinningGradientButton>
              <Button size="lg" variant="outline" className="h-12 px-8 hover:scale-105 transition-transform glass-card glow-border group" asChild>
                <a href="https://www.linkedin.com/in/iizmotabar" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="glass-strong p-8 space-y-6 glow-border">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="h-12 transition-all focus:scale-[1.01] glass-subtle border-0 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-12 transition-all focus:scale-[1.01] glass-subtle border-0 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="transition-all focus:scale-[1.01] glass-subtle border-0 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <SpinningGradientButton
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </SpinningGradientButton>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Or email me directly at
              </p>
              <a
                href="mailto:motabar.javaid@gmail.com"
                className="inline-flex items-center gap-2 mt-2 text-foreground hover:text-gradient transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                motabar.javaid@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
