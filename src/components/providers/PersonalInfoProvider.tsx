"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { personalInfo as defaultPersonalInfo } from "@/data/content";

export type PersonalInfoType = typeof defaultPersonalInfo & {
  logoUrl?: string;
  logoSize?: number;
  contact?: {
    email?: string;
    whatsapp?: string;
    linkedin?: string;
  };
  nameColor?: string;
  taglineColor?: string;
  taglineAccentColor?: string;
  descriptionColor?: string;
  roleDescriptorColor?: string;
  availabilityColor?: string;
};

interface PersonalInfoContextValue {
  personalInfo: PersonalInfoType;
  updatePersonalInfo: (data: Partial<PersonalInfoType>) => void;
  refreshPersonalInfo: () => Promise<void>;
}

const PersonalInfoContext = createContext<PersonalInfoContextValue>({
  personalInfo: defaultPersonalInfo,
  updatePersonalInfo: () => {},
  refreshPersonalInfo: async () => {},
});

export function PersonalInfoProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("app_personal_info");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object" && parsed.name) {
            return { ...defaultPersonalInfo, ...parsed };
          }
        }
      } catch (err) {
        console.error("Failed to read cached personal-info:", err);
      }
    }
    return defaultPersonalInfo;
  });

  const fetchPersonalInfo = useCallback(async () => {
    try {
      const res = await fetch("/api/personal-info", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === "object" && data.name) {
          setPersonalInfo((prev) => {
            const merged = {
              ...prev,
              ...data,
              contact: {
                email: data.contact?.email ?? data.email ?? prev.contact?.email ?? defaultPersonalInfo.contact.email,
                whatsapp: data.contact?.whatsapp ?? data.whatsapp ?? prev.contact?.whatsapp ?? defaultPersonalInfo.contact.whatsapp,
                linkedin: data.contact?.linkedin ?? data.linkedin ?? prev.contact?.linkedin ?? defaultPersonalInfo.contact.linkedin,
              },
            };
            try {
              localStorage.setItem("app_personal_info", JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch personal info:", err);
    }
  }, []);

  useEffect(() => {
    // Single shared fetch on initial mount
    fetchPersonalInfo();
  }, [fetchPersonalInfo]);

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfoType>) => {
    setPersonalInfo((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem("app_personal_info", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  return (
    <PersonalInfoContext.Provider
      value={{
        personalInfo,
        updatePersonalInfo,
        refreshPersonalInfo: fetchPersonalInfo,
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
}

export function usePersonalInfo() {
  const context = useContext(PersonalInfoContext);
  if (!context) {
    return {
      personalInfo: defaultPersonalInfo,
      updatePersonalInfo: () => {},
      refreshPersonalInfo: async () => {},
    };
  }
  return context;
}
