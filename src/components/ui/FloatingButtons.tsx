"use client";

import { Mail, Phone, MessageCircle, Globe, ArrowUp } from "lucide-react";
import { personalInfo as defaultPersonalInfo } from "@/data/content";
import { useState, useEffect } from "react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);

  useEffect(() => {
    fetch("/api/personal-info")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setPersonalInfo((prev) => ({
            ...prev,
            ...data,
            contact: {
              email: data.contact?.email ?? data.email ?? prev.contact?.email ?? "",
              whatsapp: data.contact?.whatsapp ?? data.whatsapp ?? prev.contact?.whatsapp ?? "",
              linkedin: data.contact?.linkedin ?? data.linkedin ?? prev.contact?.linkedin ?? "",
            },
          }));
        }
      })
      .catch(() => {});

    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rawWhatsapp = personalInfo?.contact?.whatsapp || defaultPersonalInfo.contact.whatsapp;
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");
  const emailVal = personalInfo?.contact?.email || defaultPersonalInfo.contact.email;
  const linkedinUrl = personalInfo?.contact?.linkedin || defaultPersonalInfo.contact.linkedin;

  const buttons = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${cleanWhatsapp}`,
      gradient: "from-brand-cyan to-brand-purple",
      glow: "var(--theme-primary-glow, rgba(0,112,243,0.45))",
    },
    {
      id: "call",
      icon: Phone,
      label: "Call Me",
      href: `tel:${rawWhatsapp}`,
      gradient: "from-brand-purple to-brand-cyan",
      glow: "var(--theme-secondary-glow, rgba(0,153,255,0.45))",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email Me",
      href: `mailto:${emailVal}`,
      gradient: "from-brand-cyan to-brand-purple",
      glow: "var(--theme-primary-glow, rgba(0,112,243,0.45))",
    },
    {
      id: "linkedin",
      icon: Globe,
      label: "LinkedIn",
      href: linkedinUrl,
      gradient: "from-brand-purple to-brand-cyan",
      glow: "var(--theme-secondary-glow, rgba(0,153,255,0.45))",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 items-end select-none">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <a
            key={btn.id}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={btn.label}
            className="group flex items-center justify-end w-12 hover:w-40 transition-all duration-300 ease-out rounded-l-full overflow-hidden shadow-lg hover:shadow-2xl"
            style={{
              boxShadow: `0 4px 18px ${btn.glow}`,
            }}
          >
            <div className={`flex items-center gap-2.5 bg-gradient-to-r ${btn.gradient} px-2.5 py-3 w-full h-full justify-end`}>
              {/* Label — hidden when collapsed */}
              <span className="text-xs font-bold text-white whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75 pointer-events-none">
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
          className="flex items-center justify-center w-12 h-12 rounded-l-full bg-gradient-to-r from-brand-cyan to-brand-purple shadow-[0_4px_18px_var(--theme-primary-glow,rgba(0,112,243,0.4))] hover:scale-110 transition-transform duration-300"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
}
