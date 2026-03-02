import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Clock, MapPin, Globe, Building2, Landmark, Navigation, Compass } from 'lucide-react';
import { Layout } from '../components/Layout';

export const BeyondAirport: React.FC = () => {
  const ROUTES = [
    {
      title: 'NYC to The Hamptons',
      distance: '95 - 120 Miles',
      time: '2 - 3 Hours',
      desc: 'Experience the ultimate summer getaway with our premium transfers to East Hampton, Southampton, and Montauk.',
      image: 'https://images.unsplash.com/photo-1534430480872-3498386e7a56?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'NYC to Philadelphia',
      distance: '95 Miles',
      time: '1.5 - 2 Hours',
      desc: 'Seamless executive travel between New York City and Philadelphia for business meetings and corporate events.',
      image: 'https://images.unsplash.com/photo-1569330112436-248b395c653e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'NYC to Boston',
      distance: '215 Miles',
      time: '3.5 - 4.5 Hours',
      desc: 'Comfortable, long-distance chauffeured service for regional travel needs between the Northeast hubs.',
      image: 'https://images.unsplash.com/photo-1501979376754-2ff867a4f659?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'NYC to Washington D.C.',
      distance: '225 Miles',
      time: '4 - 5 Hours',
      desc: 'Direct, door-to-door executive transportation to the nation\'s capital with premium amenities.',
      image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=2070&auto=format&fit=crop'
    }
  ];

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
              Interstate & Long Distance
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8"
            >
              Beyond the <span className="italic text-gold">Airport</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-text-secondary text-lg font-light leading-relaxed"
            >
              Our services extend far beyond the city limits. Experience the same level of luxury and professionalism on long-distance journeys across the Northeast corridor.
            </motion.p>
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            {ROUTES.map((route, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group gold-card overflow-hidden rounded-sm flex flex-col"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 flex space-x-4">
                    <div className="bg-gold/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                      <span className="text-[10px] uppercase tracking-widest text-bg-primary font-bold">{route.distance}</span>
                    </div>
                    <div className="bg-bg-primary/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{route.time}</span>
                    </div>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-serif text-text-primary mb-6">{route.title}</h3>
                  <p className="text-text-secondary text-base font-light leading-relaxed mb-10 flex-grow">
                    {route.desc}
                  </p>
                  <button className="primary-button w-full">
                    <span>Book Long Distance</span>
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Long Distance Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Amenities',
                icon: <Compass size={32} />,
                desc: 'Complimentary Wi-Fi, refreshments, and climate control to ensure maximum comfort on long journeys.'
              },
              {
                title: 'Fixed Long-Distance Rates',
                icon: <Shield size={32} />,
                desc: 'Transparent pricing with no hidden fees for interstate travel. Know your cost before you book.'
              },
              {
                title: 'Expert Chauffeurs',
                icon: <Navigation size={32} />,
                desc: 'Our chauffeurs are experienced in long-distance driving and familiar with all major Northeast routes.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-charcoal rounded-sm border border-border-primary text-center group">
                <div className="text-gold mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                <h3 className="text-2xl font-serif text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
