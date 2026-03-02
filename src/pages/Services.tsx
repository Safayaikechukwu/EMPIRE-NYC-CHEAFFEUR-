import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plane, Briefcase, Users, Shield, Clock, Star, MapPin, Globe } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SERVICES, AIRPORTS } from '../constants';

export const Services: React.FC = () => {
  return (
    <Layout>
      <div className="pt-32 pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
            >
              Excellence in Motion
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8"
            >
              Our Premium <span className="italic text-gold">Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-text-secondary text-lg font-light leading-relaxed"
            >
              From executive airport transfers to bespoke corporate solutions, Empire Chauffeur NYC provides a comprehensive range of luxury transportation services tailored to your needs.
            </motion.p>
          </div>

          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-sm gold-card flex flex-col h-full"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="absolute top-6 left-6 bg-gold/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                    <span className="text-[10px] uppercase tracking-widest text-bg-primary font-bold">Premium Service</span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-serif text-text-primary mb-6">{service.title}</h3>
                  <p className="text-text-secondary text-base font-light leading-relaxed mb-10 flex-grow">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    {[
                      { icon: <Shield size={16} />, text: 'Fully Insured' },
                      { icon: <Clock size={16} />, text: '24/7 Availability' },
                      { icon: <Star size={16} />, text: 'Professional Chauffeurs' },
                      { icon: <CheckCircle2 size={16} />, text: 'Fixed Rates' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3 text-text-primary/70">
                        <div className="text-gold">{item.icon}</div>
                        <span className="text-[11px] uppercase tracking-widest font-bold">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <button className="primary-button w-full">
                    <span>Inquire About {service.title}</span>
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Airport Transfers Detail */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  Airport Transfers
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Serving All Major Hubs</h2>
                <p className="text-text-secondary text-lg font-light leading-relaxed">
                  Reliable, fixed-rate transfers with real-time flight monitoring and professional meet-and-greet service.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {AIRPORTS.map((airport, index) => (
                <div key={index} className="gold-card p-10 rounded-sm group relative overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold/20 group-hover:bg-gold transition-colors duration-500" />
                  <div className="w-12 h-12 rounded-full bg-text-primary/5 flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <Plane size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-text-primary mb-2">{airport.name}</h3>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-6">{airport.fullName}</p>
                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-8 flex-grow">
                    {airport.description}
                  </p>
                  <button className="primary-button w-full mt-auto">
                    <span>Book Transfer</span>
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Corporate Accounts',
                icon: <Briefcase size={32} />,
                desc: 'Dedicated support, monthly billing, and priority booking for executive teams.',
                features: ['Volume Pricing', 'Travel Manager Dashboard', 'Detailed Reporting']
              },
              {
                title: 'Special Occasions',
                icon: <Star size={32} />,
                desc: 'Make your wedding, gala, or anniversary unforgettable with our premium fleet.',
                features: ['Bespoke Itineraries', 'Red Carpet Service', 'Champagne Refreshments']
              },
              {
                title: 'Point-to-Point',
                icon: <MapPin size={32} />,
                desc: 'Efficient and luxurious transportation for your daily meetings and errands.',
                features: ['Fixed City Rates', 'Real-Time Traffic Monitoring', 'Wait & Return Options']
              }
            ].map((service, i) => (
              <div key={i} className="p-10 bg-charcoal rounded-sm border border-border-primary hover:border-gold/30 transition-all group">
                <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
                <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed mb-8">{service.desc}</p>
                <div className="space-y-3 mb-10">
                  {service.features.map((f, j) => (
                    <div key={j} className="flex items-center space-x-2 text-[10px] text-white/70 uppercase tracking-widest font-bold">
                      <CheckCircle2 size={12} className="text-gold" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="secondary-button w-full !text-white !border-white/20 hover:!bg-white/10">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CheckCircle2 = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
