import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata = {
  title: "About & Engineering Philosophy | Professional Background",
  description: "Read about background experience, technical expertise, engineering philosophy, and client testimonials.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <About />
        <Testimonials />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
