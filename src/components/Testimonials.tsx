import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Robert Chen',
    role: 'Managing Director, Global Tech',
    text: 'Empire Chauffeur is the only service I trust for my executive team. Their punctuality and discretion are unmatched in New York.',
    rating: 5
  },
  {
    name: 'Sarah Jenkins',
    role: 'Luxury Travel Concierge',
    text: 'As a travel planner, I need reliability. Empire consistently delivers a 5-star experience for my most demanding clients.',
    rating: 5
  },
  {
    name: 'Michael Rossi',
    role: 'Frequent Business Traveler',
    text: 'The flat-rate pricing and real-time flight tracking make airport transfers completely stress-free. Highly recommended.',
    rating: 5
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Social Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Don't Just Take Our Word For It</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="gold-card p-10 rounded-sm relative group"
            >
              <Quote size={40} className="text-gold/10 absolute top-8 right-8 group-hover:text-gold/20 transition-colors" />
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-text-secondary text-lg font-light italic mb-8 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div>
                <h4 className="text-text-primary font-serif text-xl mb-1">{testimonial.name}</h4>
                <p className="text-gold text-[10px] uppercase tracking-widest font-bold">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="gold-card p-8 rounded-sm relative"
            >
              <Quote size={32} className="text-gold/10 absolute top-6 right-6" />
              
              <div className="flex mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-text-secondary text-base font-light italic mb-8 leading-relaxed">
                "{testimonials[activeIndex].text}"
              </p>

              <div>
                <h4 className="text-text-primary font-serif text-lg mb-1">{testimonials[activeIndex].name}</h4>
                <p className="text-gold text-[9px] uppercase tracking-widest font-bold">{testimonials[activeIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-start items-center space-x-4 mt-8">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Star size={24} className="text-[#00b67a] fill-[#00b67a]" />
              <span className="text-text-primary font-serif text-2xl font-bold tracking-tight">Trustpilot</span>
            </div>
            <div className="h-8 w-px bg-border-primary mx-2" />
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-[#00b67a] flex items-center justify-center">
                  <Star size={14} className="text-white fill-white" />
                </div>
              ))}
            </div>
            <span className="text-text-primary font-medium text-lg ml-2">4.9/5</span>
          </div>
          <p className="text-text-secondary/50 text-xs uppercase tracking-widest">Based on 1,200+ Verified Trustpilot Reviews</p>
        </div>
      </div>
    </section>
  );
};
