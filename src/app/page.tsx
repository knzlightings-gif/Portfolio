import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import QuickIntro from "@/components/sections/QuickIntro";
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
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
