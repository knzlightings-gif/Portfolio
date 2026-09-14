import Navbar from "@/components/layout/Navbar";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata = {
  title: "Projects & Portfolio | Enterprise Software Showcase",
  description: "Browse high-impact software systems, web applications, and enterprise platforms engineered for scalable performance.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <Projects />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
