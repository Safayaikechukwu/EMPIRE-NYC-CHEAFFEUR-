import React from 'react';
import { motion } from 'motion/react';
import { Clock, Shield, Star, Plane, Briefcase, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    description: 'We track traffic and flight patterns in real-time. Our chauffeurs arrive 15 minutes early, every time.'
  },
  {
    icon: Shield,
    title: 'Professional Chauffeurs',
    description: 'Our chauffeurs are background-checked, drug-tested, and trained in executive etiquette and defensive driving.'
  },
  {
    icon: CheckCircle2,
    title: 'Flat-Rate Pricing',
    description: 'No hidden fees or surge pricing. Know your exact rate before you book, including tolls and gratuity.'
  },
  {
    icon: Star,
    title: 'Clean Luxury Vehicles',
    description: 'Our fleet is meticulously maintained and sanitized before every trip. Experience the height of comfort.'
  },
  {
    icon: Plane,
    title: 'Real-Time Flight Monitoring',
    description: 'We monitor your flight status automatically. If your flight is early or delayed, we adjust accordingly.'
  },
  {
    icon: Briefcase,
    title: 'Corporate Billing Available',
    description: 'Streamline your business travel with our corporate account solutions and monthly billing options.'
  }
];

export const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden border-y border-border-primary">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-left">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              The Empire Standard
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Why Choose Empire Chauffeur?</h2>
            <div className="w-24 h-px bg-gold" />
          </div>
          
          <div className="flex items-center space-x-4">
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

      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex space-x-6 px-6 md:px-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="gold-card w-[300px] sm:w-[350px] md:w-[400px] p-8 md:p-10 rounded-sm shrink-0 group snap-center"
            >
              <div className="w-14 h-14 rounded-full bg-text-primary/5 flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-bg-primary transition-all border border-border-primary">
                <reason.icon size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-text-primary mb-4">{reason.title}</h3>
              <p className="text-text-secondary text-sm font-light leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
