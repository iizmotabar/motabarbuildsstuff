import { useState, useEffect } from "react";
import { ArrowRight, Mail, Calendar, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SpinningGradientButton } from "@/components/ui/spinning-gradient-button";
import { CollectibleOrb } from "@/components/CollectibleOrb";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Form validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

// Cookie expiry: 30 days
const COOKIE_EXPIRY_DAYS = 30;

// Helper to set cookie
const setCookie = (name: string, value: string, days: number = COOKIE_EXPIRY_DAYS) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

// Helper to get cookie value
const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ? decodeURIComponent(cookieValue) : "";
  }
  return "";
};

// Helper to extract GA client ID from _ga cookie
const getGAClientId = (): string => {
  const gaCookie = getCookie("_ga");
  if (gaCookie) {
    const parts = gaCookie.split(".");
    if (parts.length >= 4) {
      return `${parts[2]}.${parts[3]}`;
    }
  }
  return "";
};

// Tracking param keys
const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid", "msclkid"] as const;

// Helper to get tracking params from URL and cookies, and persist URL params to cookies
const getTrackingParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  // For each tracking key, check URL first, then cookie
  TRACKING_KEYS.forEach((key) => {
    const urlValue = params.get(key);
    if (urlValue) {
      // Found in URL - save to cookie for persistence
      setCookie(key, urlValue);
      result[key] = urlValue;
    } else {
      // Not in URL - check cookie
      result[key] = getCookie(key);
    }
  });

  // Client ID from GA cookie (read-only)
  result.client_id = getGAClientId();

  return result;
};

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [trackingData, setTrackingData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    gclid: "",
    fbclid: "",
    msclkid: "",
    client_id: "",
  });

  useEffect(() => {
    setTrackingData(getTrackingParams() as typeof trackingData);
  }, []);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: { ...formData, ...trackingData },
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-track="section-contact" className="py-16 md:py-20 bg-surface relative">
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
                data-track="contact-cta-calendly"
              >
                <Calendar className="h-4 w-4 group-hover:rotate-12 transition-transform text-purple-400" />
                Book on Calendly
              </SpinningGradientButton>
              <Button size="lg" variant="outline" className="h-12 px-8 hover:scale-105 transition-transform glass-card glow-border group" asChild>
                <a href="https://www.linkedin.com/in/iizmotabar" target="_blank" rel="noopener noreferrer" data-track="contact-cta-linkedin">
                  <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>

            <form onSubmit={handleSubmit} data-track="contact-form" className="glass-strong p-8 space-y-6 glow-border">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Batman, Elon, or your actual name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  data-track="contact-form-name"
                  className={`h-12 transition-all focus:scale-[1.01] glass-subtle border-0 focus:ring-2 focus:ring-purple-500/20 ${errors.name ? "ring-2 ring-destructive/50" : ""}`}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.real@email.com (no catfish please)"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  data-track="contact-form-email"
                  className={`h-12 transition-all focus:scale-[1.01] glass-subtle border-0 focus:ring-2 focus:ring-purple-500/20 ${errors.email ? "ring-2 ring-destructive/50" : ""}`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me your tracking woes... or just say hi, I don't bite 🦈"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  rows={5}
                  data-track="contact-form-message"
                  className={`transition-all focus:scale-[1.01] glass-subtle border-0 focus:ring-2 focus:ring-purple-500/20 ${errors.message ? "ring-2 ring-destructive/50" : ""}`}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <SpinningGradientButton
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
                data-track="contact-form-submit"
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
                data-track="contact-email-link"
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
