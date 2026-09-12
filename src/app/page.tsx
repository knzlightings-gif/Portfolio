import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import QuickIntro from "@/components/sections/QuickIntro";
import WhatIDo from "@/components/sections/WhatIDo";
import Projects from "@/components/sections/Projects";
import BusinessProblems from "@/components/sections/BusinessProblems";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";
import WhyMe from "@/components/sections/WhyMe";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <QuickIntro />
        <WhatIDo />
        <Projects />
        <BusinessProblems />
        <Solutions />
        <Process />
        <WhyMe />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
