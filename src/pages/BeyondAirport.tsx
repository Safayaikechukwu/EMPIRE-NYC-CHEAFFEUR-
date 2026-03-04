import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Clock, MapPin, Globe, Building2, Landmark, Navigation, Compass, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';

export const BeyondAirport: React.FC = () => {
  const { openBookingModal } = useBooking();
  const ROUTES = [
    {
      title: 'NYC to The Hamptons',
      distance: '95 - 120 Miles',
      time: '2 - 3 Hours',
      desc: 'Experience the ultimate summer getaway with our premium transfers to East Hampton, Southampton, and Montauk.',
      image: 'https://www.travelnewyorknow.com/wp-content/uploads/2022/02/Sunset-over-the-Hamptons.jpg.webp'
    },
    {
      title: 'NYC to Philadelphia',
      distance: '95 Miles',
      time: '1.5 - 2 Hours',
      desc: 'Seamless executive travel between New York City and Philadelphia for business meetings and corporate events.',
      image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltb9c89b7dd79e9322/67cb2a484f90666d9c8fcb6d/iStock-1410710980-Header_Desktop.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080'
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
      <SEO 
        title="Long Distance & Regional Travel | Empire Chauffeur NYC"
        description="Bespoke city-to-city transfers and long-distance chauffeur services. Travel across the Northeast corridor in absolute comfort and safety."
      />
      <div className="pt-40 pb-24 bg-bg-primary">
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
                  <button 
                    onClick={openBookingModal}
                    className="primary-button w-full"
                  >
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
                <h3 className="text-2xl font-serif text-text-primary mb-4">{feature.title}</h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          {/* Regional Expertise */}
          <div className="mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-gold/30" />
                <img 
                  src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop" 
                  alt="Northeast Corridor"
                  className="rounded-sm shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -right-10 bg-bg-primary/90 backdrop-blur-md p-8 border border-border-primary text-center z-20">
                  <span className="text-3xl font-serif text-gold block mb-1">500+</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">Regional Hubs Served</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  Regional Expertise
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-8">The Northeast Corridor, <br /><span className="italic">Redefined.</span></h2>
                <p className="text-text-secondary text-lg font-light leading-relaxed mb-10">
                  Our regional service is designed for those who value time and privacy above all else. Avoid the congestion of airports and the unpredictability of regional rail.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Fixed Long-Distance Pricing', desc: 'No surcharges or hidden fees for out-of-state travel.' },
                    { title: 'Door-to-Door Precision', desc: 'Direct transfers from your residence to your final destination.' },
                    { title: 'Chauffeur Continuity', desc: 'The same professional chauffeur for your entire journey.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <CheckCircle2 size={20} className="text-gold shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-serif text-text-primary mb-1">{item.title}</h4>
                        <p className="text-text-secondary text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
