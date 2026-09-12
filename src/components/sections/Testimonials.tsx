"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/content";
import { Quote, Star, Loader2, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setRating(5);
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-bg relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-brand-text mb-6 tracking-tight"
          >
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Clients Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-text-muted max-w-2xl mx-auto"
          >
            Real feedback from businesses I&apos;ve collaborated with to build digital solutions.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Side - Submit Review Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-5/12"
          >
            <div className="sticky top-24 p-8 md:p-10 rounded-3xl bg-brand-card border border-brand-border shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-brand-text mb-2 relative z-10">Share Your Experience</h3>
              <p className="text-brand-text-muted mb-8 relative z-10">Your feedback helps me improve and helps others make informed decisions.</p>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-[400px]">
                  <div className="w-20 h-20 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-text mb-4">Review Submitted!</h3>
                  <p className="text-brand-text-muted">Thank you for your valuable feedback.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-brand-text-muted">Your Name</label>
                    <input required name="name" type="text" className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-brand-text-muted">Role & Company</label>
                    <input required name="role" type="text" className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all" placeholder="CEO, Acme Corp" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-brand-text-muted">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`w-8 h-8 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-brand-text-muted">Your Review</label>
                    <textarea required name="review" rows={4} className="w-full px-5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none" placeholder="How was your experience working with me?"></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl btn-brand-gradient text-lg font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Side - Testimonials Grid */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="group relative p-8 rounded-3xl bg-brand-card border border-brand-border transition-all duration-500 hover:-translate-y-2 h-full flex flex-col card-glow-border"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brand-cyan/40 transition-colors duration-500 pointer-events-none" />
                  
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-stone-300 group-hover:text-brand-cyan/30 transition-colors duration-500" />
                  
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="mb-8 relative z-10">
                    <p className="text-brand-text leading-relaxed text-lg italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center overflow-hidden group-hover:border-brand-cyan transition-colors duration-300">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text group-hover:text-brand-cyan transition-colors">{testimonial.name}</h4>
                      <p className="text-sm text-brand-text-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
