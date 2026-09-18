import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link as LinkIcon,
  BarChart,
  Server,
  ShieldCheck,
  Code,
  Globe,
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { defaultServices, ServiceItem } from "@/data/servicesData";
import { featuredProjects } from "@/data/content";

export const dynamic = "force-dynamic";

const availableIcons: Record<string, any> = {
  Database,
  LayoutDashboard,
  Workflow,
  Cpu,
  Link: LinkIcon,
  BarChart,
  Server,
  ShieldCheck,
  Code,
  Globe,
};

async function getService(id: string): Promise<ServiceItem | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/services/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) return data;
    }
  } catch (err) {
    console.error("Error fetching service detail:", err);
  }

  // Fallback to local default data
  return defaultServices.find((s) => s.id === id) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | E For ERP Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    notFound();
  }

  const IconComp = availableIcons[service.icon] || Database;

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-cyan selection:text-slate-950 flex flex-col justify-between">
      <Navbar />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Ambient Orbs */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10 space-y-16">
          {/* Top Breadcrumb / Back Link */}
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-text-muted hover:text-brand-cyan transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </div>

          {/* Hero Header */}
          <div className="bg-brand-card/95 border border-brand-border/80 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full badge-brand-subtle text-xs font-bold tracking-wider uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {service.status || "Available for projects"}
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-brand-text tracking-tight leading-tight">
                  {service.title}
                </h1>

                <p className="text-lg md:text-xl font-medium text-brand-cyan/90 leading-relaxed">
                  {service.tagline || service.description}
                </p>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/40 text-brand-cyan flex items-center justify-center shadow-lg shrink-0">
                <IconComp className="w-10 h-10 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 rounded-full bg-brand-cyan" />
              <h2 className="text-2xl font-bold text-brand-text">Overview & Value</h2>
            </div>

            <div className="bg-brand-card/70 border border-brand-border/60 rounded-2xl p-8 leading-relaxed text-brand-text-muted text-base md:text-lg">
              <p className="whitespace-pre-line">
                {service.fullDescription || service.description}
              </p>
            </div>
          </div>

          {/* Key Features */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded-full bg-brand-purple" />
                <h2 className="text-2xl font-bold text-brand-text">Key Features Included</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-card border border-brand-border/80 rounded-2xl p-5 flex items-start gap-4 hover:border-brand-cyan/40 transition-all shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-text text-base">{feature}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded-full bg-brand-cyan" />
                <h2 className="text-2xl font-bold text-brand-text">What You Will Receive</h2>
              </div>

              <div className="bg-brand-card border border-brand-border/80 rounded-2xl p-8 space-y-4 shadow-sm">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-brand-text font-semibold text-base">
                    <PackageCheck className="w-5 h-5 text-brand-cyan shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-brand-cyan/20 via-brand-card to-brand-purple/20 border border-brand-cyan/40 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Ready to build this for your business?
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-brand-text max-w-xl mx-auto">
              Let's Discuss Your {service.title} Project
            </h3>

            <p className="text-brand-text-muted max-w-lg mx-auto text-base">
              Get a tailored technical plan, timeline estimation, and fixed price quote for your specific business requirements.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-slate-950 font-bold hover:bg-brand-cyan/90 transition-all shadow-lg text-base"
              >
                <MessageSquare className="w-5 h-5" />
                Get Free Consultation
              </Link>
              
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-brand-border hover:border-brand-cyan text-brand-text font-bold transition-all text-base"
              >
                View Live Demo Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
