import Navbar from "@/components/layout/Navbar";
import Process from "@/components/sections/Process";
import WhyMe from "@/components/sections/WhyMe";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata = {
  title: "Process & Engineering Standards | Software Architecture",
  description: "Learn about our development methodology, quality assurance, system performance standards, and execution lifecycle.",
};

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <Process />
        <WhyMe />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
