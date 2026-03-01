import React from 'react';
import { motion } from 'motion/react';
import { Heart, Music, Briefcase, Camera } from 'lucide-react';

const cases = [
  {
    icon: Heart,
    title: 'Weddings & Galas',
    description: 'Arrive in elegance on your special day. We provide coordinated fleet services for bridal parties and guests.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Music,
    title: 'Night on the Town',
    description: 'Enjoy NYC\'s nightlife without the worry of parking or navigation. Your chauffeur is on standby all night.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Briefcase,
    title: 'Roadshows & Meetings',
    description: 'Maximize productivity between meetings. Our vehicles are mobile offices designed for the modern executive.',
    image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Camera,
    title: 'Production & Events',
    description: 'Logistics support for film crews, fashion shows, and high-profile event transportation management.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop'
  }
];

interface UseCasesProps {
  onBookClick: () => void;
}

export const UseCases: React.FC<UseCasesProps> = ({ onBookClick }) => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Versatility
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Beyond the Airport</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-12">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={onBookClick}
              className="group relative h-[200px] md:h-[350px] overflow-hidden rounded-sm cursor-pointer border border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />
              
              <div className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end">
                <div className="w-12 h-px bg-gold mb-4 group-hover:w-24 transition-all duration-500" />
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 backdrop-blur-md flex items-center justify-center mb-3 md:mb-6 border border-gold/30">
                  <item.icon size={16} className="text-gold md:hidden" />
                  <item.icon size={20} className="text-gold hidden md:block" />
                </div>
                <h3 className="text-sm md:text-2xl font-serif text-white mb-1 md:mb-3">{item.title}</h3>
                <p className="text-white/60 text-[10px] md:text-sm max-w-sm font-light leading-relaxed hidden sm:block">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={onBookClick}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-colors flex items-center space-x-2 group"
          >
            <span>Submit for Review to Call</span>
            <div className="w-8 h-px bg-white/20 group-hover:bg-gold transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};
