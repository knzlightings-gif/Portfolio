"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonials as defaultTestimonials } from "@/data/content";
import { Quote, Star, Loader2, CheckCircle2, MessageSquarePlus, Sparkles } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating?: number;
  image?: string;
};

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(defaultTestimonials);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch live reviews from Firestore API
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading reviews:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const role = (formData.get("role") as string)?.trim() || "Client";
    const review = (formData.get("review") as string)?.trim();

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, review, rating }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        // Instantly prepend the new review to the live marquee list
        setItems((prev) => [json.data, ...prev]);
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
        setRating(5);
        setTimeout(() => {
          setIsSuccess(false);
          setShowForm(false);
        }, 4000);
      } else {
        alert(json.error || "Failed to post review. Please try again.");
      }
    } catch {
      alert("Error submitting review. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Duplicate items for seamless continuous infinite ticker
  const duplicatedTestimonials = items.length > 0 ? [...items, ...items, ...items] : [];

  return (
    <section id="testimonials" className="py-24 bg-brand-bg relative overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/25 text-brand-purple text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            Social Proof & Client Endorsements
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-text mb-4 tracking-tight"
          >
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Clients Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-brand-text-muted max-w-2xl mx-auto"
          >
            Real feedback from business owners and teams who transformed their operations with custom software.
          </motion.p>
        </div>

        {/* Compact Review Submission Box on TOP */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-3xl bg-brand-card/90 backdrop-blur-md border border-brand-border shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shrink-0">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-text">Share Your Experience</h3>
                  <p className="text-xs text-brand-text-muted">Your feedback helps improve our software solutions.</p>
                </div>
              </div>

              {!showForm && !isSuccess && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 rounded-xl bg-brand-text text-brand-bg hover:bg-brand-cyan transition-all text-xs font-bold shrink-0 self-start sm:self-auto shadow-sm"
                >
                  Write a Review
                </button>
              )}
            </div>

            {isSuccess ? (
              <div className="flex items-center justify-center gap-3 py-6 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Thank you! Your review has been submitted and is now live!
                </p>
              </div>
            ) : showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10 pt-2 border-t border-brand-border/60">
                {/* 2-column input row for compact height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-text-muted block mb-1">Your Name</label>
                    <input 
                      required 
                      name="name" 
                      type="text" 
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all" 
                      placeholder="e.g. John Doe" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-brand-text-muted block mb-1">Role & Company</label>
                    <input 
                      required 
                      name="role" 
                      type="text" 
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all" 
                      placeholder="e.g. CEO, Logistics Ltd" 
                    />
                  </div>
                </div>

                {/* Rating selection */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold text-brand-text-muted">Your Rating:</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = hoverRating ? star <= hoverRating : star <= rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star className={`w-5 h-5 ${active ? "fill-amber-400 text-amber-400" : "text-stone-300 dark:text-stone-700"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-xs font-semibold text-brand-text-muted block mb-1">Review</label>
                  <textarea 
                    required 
                    name="review" 
                    rows={2} 
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none" 
                    placeholder="How was your experience working with me?"
                  ></textarea>
                </div>

                <div className="flex gap-3 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-text-muted hover:text-brand-text transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-xs font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm hover:brightness-110"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Post Review"
                    )}
                  </button>
                </div>
              </form>
            ) : null}
          </motion.div>
        </div>

      </div>

      {/* Infinite Animated Marquee Slider with Pause-On-Hover and Zoom */}
      <div className="relative w-full overflow-hidden py-6 marquee-container">
        
        {/* Left & Right Smooth Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-brand-bg via-brand-bg/80 to-transparent z-20" />

        {/* Animated Marquee Container */}
        <div className="marquee-track flex gap-6">
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[340px] md:w-[420px] p-8 rounded-3xl bg-brand-card/95 backdrop-blur-md border border-brand-border/90 shadow-md relative group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-cyan hover:z-30 shrink-0 flex flex-col justify-between select-none cursor-pointer"
            >
              {/* Top Accent Gradient Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />
              
              {/* Subtle Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-border/60 group-hover:text-brand-cyan/40 group-hover:scale-110 transition-all duration-300 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-brand-text leading-relaxed text-[15px] italic mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-brand-border/40">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple p-0.5 shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full bg-brand-card rounded-full flex items-center justify-center text-sm font-bold text-brand-text">
                    {testimonial.name.charAt(0) === "[" ? "👤" : testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-text group-hover:text-brand-cyan transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-brand-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
