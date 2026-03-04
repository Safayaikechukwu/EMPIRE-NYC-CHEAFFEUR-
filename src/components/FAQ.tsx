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
    <section className="py-24 bg-bg-primary overflow-hidden border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Call to Action */}
          <div className="lg:col-span-5 space-y-8">
            <div>
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
                Frequently Asked <br />
                <span className="italic text-gold">Questions</span>
              </motion.h2>
              <div className="w-24 h-px bg-gold" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-charcoal border border-border-primary rounded-sm"
            >
              <HelpCircle size={32} className="text-gold mb-6" />
              <h3 className="text-xl font-serif text-text-primary mb-4">Still have questions?</h3>
              <p className="text-text-secondary text-sm font-light mb-8 leading-relaxed">
                Our 24/7 dispatch team is ready to assist you with any specific requirements, complex itineraries, or corporate account inquiries.
              </p>
              <div className="space-y-4">
                <a href="tel:+13053219622" className="flex items-center space-x-4 group p-4 border border-border-primary rounded-sm hover:border-gold/50 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Call 24/7</p>
                    <p className="text-base font-serif text-text-primary">(305) 321-9622</p>
                  </div>
                </a>
                <a href="mailto:hello@empirechauffeurnyc.com" className="flex items-center space-x-4 group p-4 border border-border-primary rounded-sm hover:border-gold/50 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Email Dispatch</p>
                    <p className="text-base font-serif text-text-primary">hello@empirechauffeurnyc.com</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {FAQ_DATA.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
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
          </div>
        </div>
      </div>
    </section>
  );
};
