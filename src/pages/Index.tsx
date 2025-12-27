import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { HowIWork } from "@/components/sections/HowIWork";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Credibility />
        <WhatIDo />
        <Services />
        <Packages />
        <HowIWork />
        <WhyThisMatters />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
