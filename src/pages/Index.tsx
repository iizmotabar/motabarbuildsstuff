import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { HowIWork } from "@/components/sections/HowIWork";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { FloatingElements } from "@/components/FloatingElements";
import { GradientOrbs } from "@/components/GradientOrbs";
import { GridPattern } from "@/components/GridPattern";
import { Gamification } from "@/components/Gamification";
import { initScrollTracking, initSectionVisibilityTracking } from "@/lib/gtm";

const Index = () => {
  useEffect(() => {
    const cleanupScroll = initScrollTracking();
    const cleanupSections = initSectionVisibilityTracking();
    
    return () => {
      cleanupScroll();
      cleanupSections();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <GridPattern />
      <GradientOrbs />
      <FloatingElements />
      <Gamification />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <section id="hero" data-section-name="Hero">
            <Hero />
          </section>
          <section id="credibility" data-section-name="Credibility">
            <Credibility />
          </section>
          <section id="what-i-do" data-section-name="What I Do">
            <WhatIDo />
          </section>
          <section id="case-studies" data-section-name="Case Studies">
            <CaseStudies />
          </section>
          <section id="services" data-section-name="Services">
            <Services />
          </section>
          <section id="how-i-work" data-section-name="How I Work">
            <HowIWork />
          </section>
          <section id="why-this-matters" data-section-name="Why This Matters">
            <WhyThisMatters />
          </section>
          <section id="packages" data-section-name="Packages">
            <Packages />
          </section>
          <section id="tech-stack" data-section-name="Tech Stack">
            <TechStack />
          </section>
          <section id="testimonials" data-section-name="Testimonials">
            <Testimonials />
          </section>
          <section id="faq" data-section-name="FAQ">
            <FAQ />
          </section>
          <section id="contact" data-section-name="Contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
