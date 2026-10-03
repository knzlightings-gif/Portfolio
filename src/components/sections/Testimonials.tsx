"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Loader2, CheckCircle2, MessageSquarePlus } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating?: number;
  image?: string;
  createdAt?: string;
};

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch live reviews from Firestore API
  useEffect(() => {
    fetch("/api/reviews", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading reviews:", err))
      .finally(() => setIsLoading(false));
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
  const duplicatedTestimonials = (() => {
    if (items.length === 0) return [];
    if (items.length === 1) return Array(8).fill(items[0]);
    if (items.length === 2) return [...items, ...items, ...items, ...items];
    if (items.length < 5) return [...items, ...items, ...items];
    return [...items, ...items];
  })();

  return (
    <section id="testimonials" className="pt-2 sm:pt-4 pb-10 md:pb-12 bg-transparent relative overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        {/* Modern 2-Column Header Bar: Left = Heading, Right = Review Action */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-4 border-b border-brand-border/50">
          
          {/* Left Side: Clean Compact Heading & Value Proposition */}
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight mb-1.5"
            >
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004D40] via-[#00796B] to-[#059669]">Clients Say</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-brand-text-muted leading-relaxed"
            >
              Real feedback from business owners and teams who transformed their operations with custom software.
            </motion.p>
          </div>

          {/* Right Side: Interactive Review Box / Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="w-full lg:w-auto lg:max-w-md shrink-0"
          >
            <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-card/90 backdrop-blur-md border border-brand-border shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shrink-0">
                    <MessageSquarePlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-text leading-tight">Share Your Experience</h3>
                    <p className="text-[11px] text-brand-text-muted">Your feedback helps improve our software.</p>
                  </div>
                </div>

                {!showForm && !isSuccess && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-text text-brand-bg hover:bg-brand-cyan transition-all text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {isSuccess && (
                <div className="mt-3 flex items-center justify-center gap-2 py-3 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Thank you! Your review is now live!
                  </p>
                </div>
              )}

              {showForm && (
                <form onSubmit={handleSubmit} className="space-y-3 relative z-10 pt-3 mt-3 border-t border-brand-border/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-semibold text-brand-text-muted block mb-0.5">Your Name</label>
                      <input 
                        required 
                        name="name" 
                        type="text" 
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan transition-all" 
                        placeholder="e.g. John Doe" 
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-brand-text-muted block mb-0.5">Role & Company</label>
                      <input 
                        required 
                        name="role" 
                        type="text" 
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan transition-all" 
                        placeholder="e.g. CEO, Logistics Ltd" 
                      />
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[11px] font-semibold text-brand-text-muted">Your Rating:</span>
                    <div className="flex gap-1">
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
                            <Star className={`w-4 h-4 ${active ? "fill-amber-400 text-amber-400" : "text-stone-300 dark:text-stone-700"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="text-[11px] font-semibold text-brand-text-muted block mb-0.5">Review</label>
                    <textarea 
                      required 
                      name="review" 
                      rows={2} 
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan transition-all resize-none" 
                      placeholder="How was your experience working with me?"
                    ></textarea>
                  </div>

                  <div className="flex gap-2.5 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-3 py-1.5 rounded-xl border border-brand-border text-xs font-semibold text-brand-text-muted hover:text-brand-text transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-xs font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-1.5 shadow-xs hover:brightness-110"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post Review"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Marquee or Empty State */}
      {isLoading ? (
        <div className="py-12 flex justify-center items-center text-brand-text-muted gap-2.5 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-brand-cyan" />
          <span>Loading client reviews...</span>
        </div>
      ) : items.length > 0 ? (
        <div className="relative w-full overflow-hidden py-6 marquee-container">
          {/* Left & Right Smooth Fade Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-20 md:w-48 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-20 md:w-48 bg-gradient-to-l from-brand-bg via-brand-bg/80 to-transparent z-20" />

          {/* Animated Marquee Container */}
          <div className="marquee-track flex gap-4 sm:gap-6">
            {duplicatedTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="w-[280px] xs:w-[310px] sm:w-[360px] md:w-[420px] p-5 sm:p-6 md:p-7 rounded-2xl bg-brand-card/95 backdrop-blur-md border border-brand-border/90 shadow-sm relative group transition-all duration-300 hover:scale-102 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-cyan/70 hover:z-30 shrink-0 flex flex-col justify-between select-none cursor-pointer"
              >
                {/* Top Accent Gradient Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                
                {/* Subtle Glowing Aura on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                <div>
                  {/* Tech verification header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-brand-border/50 text-[10px] font-mono text-brand-text-muted">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Client Log
                    </span>
                    {/* Rating Stars */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-brand-text leading-relaxed text-sm italic mb-5 line-clamp-3">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3.5 border-t border-brand-border/50">
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-xs font-bold text-brand-cyan shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : "👤"}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-sm text-brand-text group-hover:text-brand-cyan transition-colors truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] font-mono text-brand-text-muted truncate">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-10 px-6 rounded-2xl bg-brand-card/60 backdrop-blur-sm border border-brand-border/70 shadow-xs">
          <p className="text-sm font-semibold text-brand-text mb-1.5">No reviews published yet</p>
          <p className="text-xs text-brand-text-muted mb-4">Have you worked with us? Be the first to share your experience!</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-xs font-bold transition-all hover:scale-105 shadow-sm"
            >
              Write First Review
            </button>
          )}
        </div>
      )}

    </section>
  );
}
