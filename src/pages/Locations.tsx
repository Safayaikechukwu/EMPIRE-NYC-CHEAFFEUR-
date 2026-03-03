import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Globe, ArrowRight, Plane, Building2, Landmark, Navigation, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { ServiceArea } from '../components/ServiceArea';
import { useBooking } from '../context/BookingContext';

export const Locations: React.FC = () => {
  const { openBookingModal } = useBooking();
  const NYC_LOCATIONS = [
    {
      name: 'Manhattan Executive Hub',
      address: '750 Lexington Ave, New York, NY 10022',
      phone: '(305) 321-9622',
      email: 'manhattan@empirechauffeurnyc.com',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
      type: 'Corporate Headquarters'
    },
    {
      name: 'Brooklyn Service Center',
      address: '123 DUMBO St, Brooklyn, NY 11201',
      phone: '(305) 321-9622',
      email: 'brooklyn@empirechauffeurnyc.com',
      image: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2070&auto=format&fit=crop',
      type: 'Regional Dispatch'
    },
    {
      name: 'Queens Airport Logistics',
      address: 'Near JFK International Airport, Queens, NY 11430',
      phone: '(305) 321-9622',
      email: 'queens@empirechauffeurnyc.com',
      image: 'https://images.unsplash.com/photo-1517733948473-98bb1b186d21?q=80&w=2070&auto=format&fit=crop',
      type: 'Airport Operations'
    }
  ];

  return (
    <Layout>
      <SEO 
        title="NYC Service Locations | Empire Chauffeur NYC"
        description="Serving all major NYC airports and hubs. JFK, LGA, EWR, and private FBOs. Experience the Empire Standard at every major regional hub."
      />
      <div className="pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
            >
              Our Presence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8"
            >
              NYC & <span className="italic text-gold">Beyond</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-text-secondary text-lg font-light leading-relaxed"
            >
              Strategically positioned across the Tri-State area to provide seamless, on-time luxury transportation wherever your journey takes you.
            </motion.p>
          </div>

          {/* NYC Locations Grid */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                Seven Omega NYC
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Our Seven Omega Hubs</h2>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg font-light">
                Exclusive Seven Omega partner locations providing priority dispatch and premium lounge access for our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {NYC_LOCATIONS.map((loc, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group gold-card p-6 rounded-sm flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden rounded-sm mb-8">
                    <img 
                      src={loc.image} 
                      alt={loc.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-bg-primary/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{loc.type}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-serif text-text-primary mb-6">{loc.name}</h3>
                    <div className="space-y-6 mb-10">
                      <div className="flex items-start space-x-4">
                        <MapPin size={20} className="text-gold shrink-0 mt-1" />
                        <span className="text-text-secondary text-sm font-light leading-relaxed">{loc.address}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Phone size={20} className="text-gold shrink-0" />
                        <a href={`tel:${loc.phone}`} className="text-text-secondary hover:text-gold transition-colors text-sm font-light">{loc.phone}</a>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Mail size={20} className="text-gold shrink-0" />
                        <a href={`mailto:${loc.email}`} className="text-text-secondary hover:text-gold transition-colors text-sm font-light">{loc.email}</a>
                      </div>
                      <div className="pt-4 border-t border-border-primary">
                        <div className="flex items-center space-x-2 text-[10px] text-gold uppercase tracking-widest font-bold">
                          <CheckCircle2 size={12} />
                          <span>Seven Omega Lounge Access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`, '_blank')}
                    className="primary-button w-full"
                  >
                    <span>Get Directions</span>
                    <Navigation size={14} className="ml-2" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Service Area Map */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                Tri-State Coverage
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Our Service Areas</h2>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg font-light">
                We provide comprehensive coverage across New York City, Long Island, Westchester, New Jersey, and Connecticut.
              </p>
            </div>
            <ServiceArea />
          </div>

          {/* Beyond the Airport Section */}
          <div className="p-12 bg-charcoal rounded-sm border border-border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  Beyond the Airport
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-8">Long Distance & <br /><span className="italic text-gold">Interstate Travel</span></h2>
                <div className="space-y-8">
                  {[
                    { 
                      title: 'NYC to Hamptons', 
                      icon: <Landmark size={24} />, 
                      desc: 'Luxury transfers to East Hampton, Southampton, and Montauk with priority booking.' 
                    },
                    { 
                      title: 'NYC to Philadelphia', 
                      icon: <Building2 size={24} />, 
                      desc: 'Executive interstate travel for business meetings and corporate events.' 
                    },
                    { 
                      title: 'NYC to Boston', 
                      icon: <Globe size={24} />, 
                      desc: 'Comfortable, long-distance chauffeured service for regional travel needs.' 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="text-gold shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="text-lg font-serif text-text-primary mb-1">{item.title}</h4>
                        <p className="text-text-secondary text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={openBookingModal}
                  className="mt-12 primary-button"
                >
                  <span>Inquire About Long Distance</span>
                  <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1534430480872-3498386e7a56?q=80&w=2070&auto=format&fit=crop" 
                  alt="Long Distance Travel"
                  className="rounded-sm shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 bg-gold p-8 rounded-sm shadow-xl">
                  <span className="text-bg-primary text-4xl font-serif block mb-1">24/7</span>
                  <span className="text-bg-primary/80 text-[10px] uppercase tracking-widest font-bold">Interstate Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
