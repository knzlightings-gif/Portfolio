"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo, contactContent } from "@/data/content";
import { Mail, MessageCircle, Globe, Loader2, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (!db) {
        throw new Error("Service unavailable. Please try WhatsApp or Email.");
      }
      // Save message to Firestore "messages" collection
      await addDoc(collection(db, "messages"), {
        name: data.name || "",
        company: data.company || "",
        email: data.email || "",
        phone: data.phone || "",
        projectType: data.projectType || "",
        budget: data.budget || "",
        message: data.message || "",
        read: false,
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again or contact via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
      
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-brand-text mb-6 leading-tight"
            >
              {contactContent.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-brand-text-muted mb-12"
            >
              {contactContent.subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Email */}
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-card border border-brand-border flex items-center justify-center group-hover:scale-110 group-hover:border-brand-cyan transition-all duration-300">
                  <Mail className="w-5 h-5 text-brand-text group-hover:text-brand-cyan transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-brand-text-muted mb-1">{contactContent.emailLabel}</p>
                  <a href={`mailto:${personalInfo.contact.email}`} className="text-lg font-medium text-brand-text hover:text-brand-cyan transition-colors">
                    {personalInfo.contact.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-card border border-brand-border flex items-center justify-center group-hover:scale-110 group-hover:border-brand-cyan transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-brand-text group-hover:text-brand-cyan transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-brand-text-muted mb-1">{contactContent.phoneLabel}</p>
                  <a href={`https://wa.me/${personalInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-brand-text hover:text-brand-cyan transition-colors">
                    {personalInfo.contact.whatsapp}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-card border border-brand-border flex items-center justify-center group-hover:scale-110 group-hover:border-brand-cyan transition-all duration-300">
                  <Globe className="w-5 h-5 text-brand-text group-hover:text-brand-cyan transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-brand-text-muted mb-1">{contactContent.linkedinLabel}</p>
                  <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-brand-text hover:text-brand-cyan transition-colors">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-7/12"
          >
            <div className="p-8 md:p-10 rounded-3xl bg-brand-card border border-brand-border shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center h-full">
                  <div className="w-20 h-20 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-text mb-4">Message Sent Successfully!</h3>
                  <p className="text-brand-text-muted">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-text-muted mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-brand-text-muted mb-2">Business / Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Acme Corp"
                        className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-text-muted mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brand-text-muted mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 234 567 890"
                        className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-brand-text-muted mb-2">Project Type</label>
                      <input
                        type="text"
                        id="projectType"
                        name="projectType"
                        placeholder="ERP"
                        className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-brand-text-muted mb-2">Budget Range (Optional)</label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        placeholder="Select budget"
                        className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-text-muted mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your business and what you need..."
                      className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-xl btn-brand-gradient text-lg font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      contactContent.formButtonText
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
