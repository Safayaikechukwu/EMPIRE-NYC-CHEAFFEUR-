import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FAQ_DATA = [
  {
    question: "How far in advance should I book my chauffeur?",
    answer: "We recommend booking at least 24 hours in advance to guarantee your preferred vehicle. However, we often accommodate last-minute requests within 2-4 hours depending on availability in the NYC area."
  },
  {
    question: "What is your cancellation policy?",
    answer: "For standard sedan and SUV bookings, cancellations made more than 4 hours before the scheduled pickup are free of charge. For specialty vehicles and sprinters, we require 24-hour notice. Late cancellations may incur the full fare."
  },
  {
    question: "Do you provide child safety seats?",
    answer: "Yes, we provide high-quality child safety seats (infant, toddler, or booster) upon request for a small additional fee. Please specify your requirements during the booking process."
  },
  {
    question: "How do I find my chauffeur at the airport?",
    answer: "For 'Meet & Greet' service, your chauffeur will be waiting at the arrivals hall with a digital sign displaying your name. For curbside pickup, your chauffeur will contact you via SMS or call once your flight lands to coordinate the pickup location."
  },
  {
    question: "Are your rates fixed or metered?",
    answer: "Empire Chauffeur NYC provides transparent, all-inclusive fixed rates for most point-to-point and airport transfers. Hourly charters are billed at a fixed hourly rate with a minimum hour requirement depending on the vehicle class."
  },
  {
    question: "Can I request a specific chauffeur?",
    answer: "Absolutely. Many of our regular clients have preferred chauffeurs. You can request a specific driver during booking, and we will do our best to accommodate based on their schedule and availability."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
          >
            Common Inquiries
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-text-primary mb-6"
          >
            Frequently Asked <span className="italic text-gold">Questions</span>
          </motion.h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "border border-border-primary rounded-sm overflow-hidden transition-all duration-500",
                openIndex === index ? "bg-charcoal border-gold/30" : "bg-transparent hover:border-gold/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className={cn(
                  "text-lg font-serif transition-colors duration-300",
                  openIndex === index ? "text-gold" : "text-text-primary group-hover:text-gold"
                )}>
                  {item.question}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500",
                  openIndex === index ? "border-gold text-gold rotate-180" : "border-border-primary text-text-secondary"
                )}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8">
                      <div className="w-full h-px bg-border-primary mb-6 opacity-30" />
                      <p className="text-text-secondary text-base font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-charcoal border border-border-primary rounded-sm text-center"
        >
          <HelpCircle size={32} className="text-gold mx-auto mb-4" />
          <h3 className="text-xl font-serif text-text-primary mb-2">Still have questions?</h3>
          <p className="text-text-secondary text-sm font-light mb-6">Our 24/7 dispatch team is ready to assist you with any specific requirements or concerns.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+13053219622" className="text-gold text-xs uppercase tracking-widest font-bold hover:underline">
              Call (305) 321-9622
            </a>
            <span className="hidden sm:block text-white/10">|</span>
            <a href="mailto:hello@empirechauffeurnyc.com" className="text-gold text-xs uppercase tracking-widest font-bold hover:underline">
              Email Dispatch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
