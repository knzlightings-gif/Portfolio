import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata = {
  title: "Contact & Consultation | Start a Project",
  description: "Get in touch for custom software development, enterprise solutions, technical consultations, or project inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
