import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { HowIWork } from "@/components/sections/HowIWork";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { FloatingElements } from "@/components/FloatingElements";
import { GradientOrbs } from "@/components/GradientOrbs";
import { GridPattern } from "@/components/GridPattern";
import { Gamification } from "@/components/Gamification";

const Index = () => {
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
          <Hero />
          <Credibility />
          <WhatIDo />
          <Services />
          <HowIWork />
          <WhyThisMatters />
          <Packages />
          <TechStack />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
