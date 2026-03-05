import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Shield, 
  Clock, 
  Star, 
  Plane, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  ChevronRight,
  MessageCircle,
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ServiceArea } from '../components/ServiceArea';
import { Testimonials } from '../components/Testimonials';
import { UseCases } from '../components/UseCases';
import { Safety } from '../components/Safety';
import { SERVICES, AIRPORTS, VEHICLES } from '../constants';
import { useTheme } from '../components/ThemeContext';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { FAQ } from '../components/FAQ';

import { useBooking } from '../context/BookingContext';

export const Home = () => {
  const { theme } = useTheme();
  const { openBookingModal } = useBooking();

  return (
    <Layout>
      <SEO 
        title="Empire Chauffeur NYC | Premier Executive Transportation & Limo Service"
        description="Experience the ultimate in NYC luxury transportation. Empire Chauffeur offers professional airport transfers, corporate travel, and bespoke chauffeur services across the Northeast."
      />
      <Hero />
      <TrustBar />
      <Testimonials />

      {/* Section: Our Services */}
      <section id="services" className="py-16 md:py-24 lg:py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-gold text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              Excellence in Motion
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-6">Our Premium Services</h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="group relative h-[400px] overflow-hidden rounded-sm border border-border-primary hover:border-gold/30 transition-all duration-500"
              >
                <Link to={service.link} className="absolute inset-0 z-30" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500 z-10" />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="w-12 h-px bg-gold mb-4 group-hover:w-24 transition-all duration-500" />
                  <h3 className="text-xl font-serif text-white mb-3 leading-tight">{service.title}</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {service.description}
                  </p>
                  <div className="primary-button w-full h-10 text-[9px]">
                    <span>Explore Service</span>
                    <ArrowRight size={12} className="ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Fleet */}
      <section id="fleet" className="py-16 md:py-24 lg:py-32 bg-charcoal border-y border-border-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
            <div className="text-left">
              <span className="text-gold text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                The Empire Collection
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-2">Immaculate Luxury Vehicles</h2>
              <p className="text-text-secondary text-sm font-light max-w-xl">Experience the pinnacle of automotive excellence with our meticulously maintained fleet.</p>
            </div>
            <Link to="/fleet" className="primary-button group hidden md:flex">
              <span>View Full Fleet</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Horizontal Scroll / Desktop Grid */}
          <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
              {VEHICLES.slice(0, 6).map((vehicle) => (
                <div key={vehicle.id} className="group flex flex-col gold-card p-5 sm:p-6 rounded-sm min-w-[280px] sm:min-w-[350px] md:min-w-0 snap-center h-full">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-sm mb-6">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-bg-primary/80 backdrop-blur-md px-3 py-1 border border-border-primary">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-secondary">{vehicle.category}</span>
                    </div>
                    {vehicle.status && (
                      <div className={`absolute top-4 right-4 px-3 py-1 border backdrop-blur-md ${
                        vehicle.status === 'Available' 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' 
                          : vehicle.status === 'Reserved'
                            ? 'bg-amber-500/10 border-amber-500/50 text-amber-500'
                            : 'bg-rose-500/10 border-rose-500/50 text-rose-500'
                      }`}>
                        <span className="text-[8px] uppercase tracking-widest font-bold">{vehicle.status}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-text-primary mb-2">{vehicle.name}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1.5 text-text-secondary">
                      <Users size={14} />
                      <span className="text-[10px] sm:text-xs">{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-text-secondary">
                      <Briefcase size={14} />
                      <span className="text-[10px] sm:text-xs">{vehicle.luggage} Luggage</span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-2">
                    {vehicle.description}
                  </p>
                  <Link to="/fleet" className="primary-button w-full text-center py-3">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 md:hidden">
            <Link to="/fleet" className="primary-button w-full text-center">
              <span>View Full Fleet</span>
              <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Airport Coverage */}
      <section className="py-16 md:py-24 lg:py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                Airport Coverage
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-text-primary">Serving All Major NYC Hubs</h2>
            </div>
            <Link to="/services/airport-transfers" className="primary-button group hidden md:flex">
              <span>View All Airports</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
              {AIRPORTS.map((airport, index) => (
                <div key={index} className="gold-card p-8 sm:p-10 rounded-sm group relative overflow-hidden flex flex-col h-full min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold/20 group-hover:bg-gold transition-colors duration-500" />
                  <div className="w-12 h-12 rounded-full bg-text-primary/5 flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <Plane size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-text-primary mb-2">{airport.name}</h3>
                  <p className="text-gold text-[9px] sm:text-[10px] uppercase tracking-widest font-bold mb-6">{airport.fullName}</p>
                  <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mb-8 flex-grow">
                    {airport.description}
                  </p>
                  <Link to="/services/airport-transfers" className="text-gold hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold flex items-center mt-auto">
                    Explore Details <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Mobile CTA */}
            <div className="mt-8 md:hidden">
              <Link to="/services/airport-transfers" className="primary-button w-full justify-center">
                <span>View All Airports</span>
                <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <UseCases onBookClick={openBookingModal} />
      <ServiceArea />
      <Safety />
      <WhyChooseUs />

      {/* Section: Why Empire */}
      <section id="about" className="py-24 bg-bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-gold/30" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b border-r border-gold/30" />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional Chauffeur"
                className="rounded-sm shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-bg-primary/80 backdrop-blur-md p-8 border border-border-primary text-center">
                <span className="text-4xl font-serif text-gold block mb-1">20+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">Years of Excellence</span>
              </div>
            </div>

            <div>
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                The Empire Standard
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-8">Professional Chauffeurs. <br /><span className="italic">Not Drivers.</span></h2>
              
              <div className="space-y-8">
                {[
                  { title: 'Executive Trained', desc: 'Our chauffeurs undergo rigorous training in defensive driving and executive etiquette.' },
                  { title: 'Discreet & Confidential', desc: 'Privacy is our priority. We provide a secure environment for sensitive business discussions.' },
                  { title: 'Real-Time Monitoring', desc: 'We track every flight and traffic pattern to ensure we are always 15 minutes early.' }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="mt-1">
                      <CheckCircle2 size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif text-text-primary mb-1">{item.title}</h4>
                      <p className="text-text-secondary text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/services" className="mt-12 primary-button inline-flex">
                Our Chauffeur Standards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Corporate */}
      <section id="corporate" className="py-16 md:py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-gold text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                Corporate Accounts
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-8">Seamless Mobility for <br />Your Executive Team</h2>
              <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed mb-10">
                Empire Chauffeur NYC provides dedicated support and priority booking for corporate clients. Simplify your travel management with our comprehensive billing solutions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
                {[
                  'Monthly Billing',
                  'Dedicated Support Line',
                  'Priority Booking',
                  'Volume Pricing',
                  'Travel Manager Dashboard',
                  'Detailed Reporting'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="text-xs sm:text-sm text-text-primary/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={openBookingModal}
                className="primary-button w-full sm:w-auto"
              >
                Open Corporate Account
              </button>
            </div>

            <div className="glass-panel p-6 sm:p-12 rounded-sm">
              <h3 className="text-xl sm:text-2xl font-serif text-text-primary mb-8 text-center">Inquire About Corporate Rates</h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-text-secondary font-semibold">First Name</label>
                    <input type="text" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 sm:py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-text-secondary font-semibold">Last Name</label>
                    <input type="text" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 sm:py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-text-secondary font-semibold">Company Email</label>
                  <input type="email" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 sm:py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-text-secondary font-semibold">Company Name</label>
                  <input type="text" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 sm:py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" />
                </div>
                <button className="primary-button w-full">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Section: Final CTA */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2070&auto=format&fit=crop" 
            alt="NYC Night"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white mb-10 shadow-2xl">Reserve Your Private <br /><span className="italic">Chauffeur Today</span></h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
            <button 
              onClick={openBookingModal}
              className="primary-button w-full md:w-auto min-w-[280px] !bg-gold !text-white hover:!bg-white hover:!text-black shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Book Now
            </button>
            <a href="tel:+13053219622" className="secondary-button w-full md:w-auto min-w-[280px] space-x-3 !border-white/20 !text-white hover:!bg-white/10">
              <Phone size={18} className="text-gold" />
              <span>Call (305) 321-9622</span>
            </a>
            <a href="https://wa.me/13053219622" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-emerald-500/30 bg-emerald-500/5 px-8 sm:px-12 py-4 sm:py-5 text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-emerald-500/10 transition-all w-full md:w-auto min-w-[280px] text-white">
              <MessageCircle size={18} className="text-emerald-500" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};
