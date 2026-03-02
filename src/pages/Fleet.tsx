import React from 'react';
import { motion } from 'motion/react';
import { Users, Briefcase, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { VEHICLES } from '../constants';

const CATEGORIES = ['All', 'Executive Sedan', 'Luxury SUV', 'Executive Sprinter', 'Specialty'];

export const Fleet: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredVehicles = activeCategory === 'All' 
    ? VEHICLES 
    : VEHICLES.filter(v => v.category === activeCategory);

  return (
    <Layout>
      <div className="pt-32 pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
            >
              The Empire Collection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8"
            >
              Our Immaculate <span className="italic text-gold">Fleet</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-text-secondary text-lg font-light leading-relaxed"
            >
              Experience the pinnacle of automotive luxury. Every vehicle in our fleet is meticulously maintained, late-model, and equipped with premium amenities.
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-gold border-gold text-bg-primary' 
                    : 'border-border-primary text-text-secondary hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group gold-card p-6 rounded-sm flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden rounded-sm mb-8">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-bg-primary/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{vehicle.category}</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-serif text-text-primary mb-4">{vehicle.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 text-text-secondary">
                      <div className="w-8 h-8 rounded-full bg-text-primary/5 flex items-center justify-center">
                        <Users size={14} className="text-gold" />
                      </div>
                      <span className="text-xs">{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center space-x-3 text-text-secondary">
                      <div className="w-8 h-8 rounded-full bg-text-primary/5 flex items-center justify-center">
                        <Briefcase size={14} className="text-gold" />
                      </div>
                      <span className="text-xs">{vehicle.luggage} Luggage</span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-8">
                    {vehicle.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {['Complimentary Wi-Fi', 'Bottled Water & Refreshments', 'Daily Newspapers', 'Climate Control'].map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[10px] text-text-primary/70 uppercase tracking-wider">
                        <CheckCircle2 size={12} className="text-gold" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="primary-button w-full">
                  <span>Book This Vehicle</span>
                  <ArrowRight size={14} className="ml-2" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Standards Section */}
          <div className="mt-32 p-12 bg-charcoal rounded-sm border border-border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  Our Standards
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Meticulously Maintained. <br /><span className="italic text-gold">Always Pristine.</span></h2>
                <div className="space-y-6">
                  {[
                    { title: 'Daily Detailing', desc: 'Every vehicle undergoes a full interior and exterior detail before every shift.' },
                    { title: 'Safety Inspections', desc: 'Weekly mechanical inspections ensure peak performance and passenger safety.' },
                    { title: 'Late Model Fleet', desc: 'We rotate our fleet every 24-36 months to ensure you always ride in the latest models.' }
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-4">
                      <Shield className="text-gold shrink-0" size={24} />
                      <div>
                        <h4 className="text-lg font-serif text-white mb-1">{item.title}</h4>
                        <p className="text-white/60 text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Vehicle Detail"
                  className="rounded-sm shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 bg-gold p-8 rounded-sm shadow-xl">
                  <span className="text-bg-primary text-4xl font-serif block mb-1">100%</span>
                  <span className="text-bg-primary/80 text-[10px] uppercase tracking-widest font-bold">Pristine Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
