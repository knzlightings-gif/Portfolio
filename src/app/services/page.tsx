import Navbar from "@/components/layout/Navbar";
import WhatIDo from "@/components/sections/WhatIDo";
import BusinessProblems from "@/components/sections/BusinessProblems";
import Solutions from "@/components/sections/Solutions";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata = {
  title: "Services & Solutions | Enterprise Software Development",
  description: "Explore custom software, ERP systems, financial tools, and high-performance cloud solutions tailored for business efficiency.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <WhatIDo />
        <BusinessProblems />
        <Solutions />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
