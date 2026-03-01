import React from 'react';
import { motion } from 'motion/react';
import { Clock, Shield, Star, Plane, Briefcase, CheckCircle2 } from 'lucide-react';

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
  // Triple the reasons for a longer seamless loop
  const duplicatedReasons = [...reasons, ...reasons, ...reasons];

  return (
    <section className="py-24 bg-black relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            The Empire Standard
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Why Choose Empire Chauffeur?</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>
      </div>

      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

        <div className="flex">
          <motion.div
            className="flex space-x-8 px-8"
            animate={{
              x: [0, "-33.33%"],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "fit-content" }}
          >
            {duplicatedReasons.map((reason, index) => (
              <div
                key={index}
                className="gold-card w-[350px] md:w-[450px] p-10 rounded-sm shrink-0 group"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-black transition-all border border-white/10">
                  <reason.icon size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{reason.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
          Experience the difference of a professional chauffeur service
        </p>
      </div>
    </section>
  );
};
