import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CheckCircle2, ArrowRight, Globe, Navigation, Building2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { ServiceArea } from '../components/ServiceArea';
import { useBooking } from '../context/BookingContext';

export const ServiceAreas: React.FC = () => {
  const { openBookingModal } = useBooking();
  const REGIONS = [
    {
      name: 'New York City',
      areas: ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
      desc: 'Comprehensive coverage across all five boroughs with local dispatchers.'
    },
    {
      name: 'Long Island',
      areas: ['Nassau County', 'Suffolk County', 'The Hamptons', 'Montauk'],
      desc: 'Luxury transfers to the island\'s most prestigious destinations.'
    },
    {
      name: 'Westchester & Upstate',
      areas: ['White Plains', 'Yonkers', 'Scarsdale', 'Greenwich (CT Boundary)'],
      desc: 'Reliable service for the northern suburbs and business hubs.'
    },
    {
      name: 'New Jersey',
      areas: ['Jersey City', 'Hoboken', 'Newark', 'Princeton', 'Atlantic City'],
      desc: 'Seamless interstate travel across the Hudson and beyond.'
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Service Areas & Coverage | Empire Chauffeur NYC"
        description="View our extensive service coverage across New York, New Jersey, Connecticut, and the entire Northeast corridor."
      />
      <div className="pt-24 pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
            >
              Coverage Map
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8"
            >
              Our Service <span className="italic text-gold">Areas</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-text-secondary text-lg font-light leading-relaxed"
            >
              Empire Chauffeur NYC provides extensive coverage across the entire Tri-State area. From the heart of Manhattan to the furthest reaches of Long Island, we are there.
            </motion.p>
          </div>

          {/* Map Component */}
          <div className="mb-32">
            <ServiceArea />
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {REGIONS.map((region, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="gold-card p-10 rounded-sm group"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-3xl font-serif text-text-primary">{region.name}</h3>
                </div>
                <p className="text-text-secondary text-base font-light leading-relaxed mb-8">
                  {region.desc}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {region.areas.map((area, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[11px] text-text-primary/70 uppercase tracking-widest font-bold">
                      <CheckCircle2 size={14} className="text-gold" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-charcoal p-12 rounded-sm border border-border-primary text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1467226319440-6d2b8c00fc77?q=80&w=2070&auto=format&fit=crop" 
                alt="NYC Skyline"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-8">Don't See Your Location?</h2>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg font-light mb-12">
                We often accommodate requests outside our standard service areas for long-distance and special event bookings. Contact our dispatch team to discuss your requirements.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={openBookingModal}
                  className="primary-button w-full sm:w-auto"
                >
                  <span>Inquire About Custom Route</span>
                  <ArrowRight size={14} className="ml-2" />
                </button>
                <a href="tel:+13053219622" className="secondary-button w-full sm:w-auto">
                  Call (305) 321-9622
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
