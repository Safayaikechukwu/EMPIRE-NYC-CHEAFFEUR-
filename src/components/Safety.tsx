import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, CarFront, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const standards = [
  {
    icon: UserCheck,
    title: 'Vetted Chauffeurs',
    description: 'Every chauffeur undergoes rigorous background checks, drug testing, and annual medical exams.'
  },
  {
    icon: ShieldCheck,
    title: 'Full Insurance',
    description: 'We carry $5M in commercial liability insurance, exceeding all state and city requirements.'
  },
  {
    icon: CarFront,
    title: 'TLC Licensed',
    description: 'Fully licensed by the NYC Taxi and Limousine Commission (License #B02567).'
  },
  {
    icon: FileText,
    title: 'Safety Protocols',
    description: 'Strict adherence to all safety regulations, including regular vehicle inspections and maintenance.'
  }
];

export const Safety = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Duplicate standards for infinite effect
  const infiniteStandards = [...standards, ...standards, ...standards];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      
      if (direction === 'left') {
        if (scrollLeft <= 0) {
          scrollRef.current.scrollLeft = scrollWidth / 3;
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollLeft = scrollWidth / 3 - clientWidth;
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  // Initialize scroll position to the middle set
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, []);

  return (
    <section id="safety" className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Trust & Security
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Safety & Licensing</h2>
          <div className="w-24 h-px bg-gold" />
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
          >
            {infiniteStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % standards.length) * 0.1 }}
                viewport={{ once: true }}
                className="gold-card p-8 min-w-[280px] sm:min-w-[320px] md:w-[calc(25%-1.5rem)] snap-center shrink-0"
              >
                <standard.icon size={32} className="text-gold mb-6" />
                <h3 className="text-xl font-serif text-text-primary mb-3">{standard.title}</h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed">
                  {standard.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons Below */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
