import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, CarFront, FileText } from 'lucide-react';

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
  return (
    <section id="safety" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Trust & Security
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Safety & Licensing</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((standard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="gold-card p-8"
            >
              <standard.icon size={32} className="text-gold mb-6" />
              <h3 className="text-xl font-serif text-white mb-3">{standard.title}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                {standard.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
