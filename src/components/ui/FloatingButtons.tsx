"use client";

import { Mail, Phone, MessageCircle, Globe, ArrowUp } from "lucide-react";
import { personalInfo } from "@/data/content";
import { useState, useEffect } from "react";

const buttons = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    href: "",
    gradient: "from-brand-cyan to-brand-purple",
    glow: "var(--theme-primary-glow, rgba(0,112,243,0.45))",
  },
  {
    id: "call",
    icon: Phone,
    label: "Call Me",
    href: "",
    gradient: "from-brand-purple to-brand-cyan",
    glow: "var(--theme-secondary-glow, rgba(0,153,255,0.45))",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email Me",
    href: "",
    gradient: "from-brand-cyan to-brand-purple",
    glow: "var(--theme-primary-glow, rgba(0,112,243,0.45))",
  },
  {
    id: "linkedin",
    icon: Globe,
    label: "LinkedIn",
    href: "",
    gradient: "from-brand-purple to-brand-cyan",
    glow: "var(--theme-secondary-glow, rgba(0,153,255,0.45))",
  },
];

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const b = buttons;
    b[0].href = `https://wa.me/${personalInfo.contact.whatsapp.replace(/[^0-9]/g, "")}`;
    b[1].href = `tel:${personalInfo.contact.whatsapp}`;
    b[2].href = `mailto:${personalInfo.contact.email}`;
    b[3].href = personalInfo.contact.linkedin;

    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pr-0">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <a
            key={btn.id}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={btn.label}
            className="group flex items-center justify-end overflow-hidden rounded-l-full transition-all duration-400 ease-in-out"
            style={{
              width: "52px",
              transition: "width 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
              boxShadow: `0 4px 20px ${btn.glow}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.width = "160px";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 30px ${btn.glow}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.width = "52px";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${btn.glow}`;
            }}
          >
            <div className={`flex items-center gap-3 bg-gradient-to-r ${btn.gradient} px-3 py-3.5 w-full`}>
              {/* Label — hidden when collapsed */}
              <span className="flex-1 text-sm font-bold text-white/90 whitespace-nowrap overflow-hidden text-right pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                {btn.label}
              </span>
              {/* Icon */}
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
          </a>
        );
      })}

      {/* Scroll to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="ml-auto flex items-center justify-center w-[52px] h-[52px] rounded-l-full bg-gradient-to-r from-brand-cyan to-brand-purple shadow-[0_4px_20px_var(--theme-primary-glow,rgba(0,112,243,0.4))] hover:scale-110 transition-transform duration-300"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
