/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
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
  Globe
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ConciergeChat } from './components/ConciergeChat';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServiceArea } from './components/ServiceArea';
import { Testimonials } from './components/Testimonials';
import { UseCases } from './components/UseCases';
import { Safety } from './components/Safety';
import { BookingModal } from './components/BookingModal';
import { SERVICES, AIRPORTS, VEHICLES } from './constants';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="min-h-screen bg-black selection:bg-gold selection:text-black">
      <Navbar onBookClick={() => setIsBookingModalOpen(true)} />
      <ConciergeChat onQuoteClick={() => setIsBookingModalOpen(true)} />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      
      <main>
        <Hero />
        <TrustBar />
        <Testimonials />

        {/* Section: Our Services */}
        <section id="services" className="py-24 bg-charcoal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                Excellence in Motion
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Our Premium Services</h2>
              <div className="w-24 h-px bg-gold mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10 }}
                  className="group relative h-[400px] overflow-hidden rounded-sm cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                    <h3 className="text-2xl font-serif text-white mb-3">{service.title}</h3>
                    <p className="text-white/60 text-sm max-w-sm mb-6 font-light leading-relaxed">
                      {service.description}
                    </p>
                    <button 
                      onClick={() => setIsBookingModalOpen(true)}
                      className="flex items-center space-x-2 text-gold text-xs uppercase tracking-widest font-bold group-hover:translate-x-2 transition-transform"
                    >
                      <span>Request a Call</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Airport Coverage */}
        <section className="py-24 bg-charcoal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  Airport Coverage
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white">Serving All Major NYC Hubs</h2>
              </div>
              <p className="text-white/40 text-sm max-w-sm font-light leading-relaxed">
                Reliable, fixed-rate transfers with real-time flight monitoring and professional meet-and-greet service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {AIRPORTS.map((airport, index) => (
                <div key={index} className="glass-panel p-10 rounded-sm hover:border-gold/30 transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-black transition-all">
                    <Plane size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">{airport.name}</h3>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-6">{airport.fullName}</p>
                  <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                    {airport.description}
                  </p>
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="inline-flex items-center space-x-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
                  >
                    <span>Request a Call</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <UseCases onBookClick={() => setIsBookingModalOpen(true)} />
        <ServiceArea />
        <Safety />
        <WhyChooseUs />

        {/* Section: Why Empire (Original, now redundant but kept for specific standards button) */}
        <section id="about" className="py-24 bg-black overflow-hidden">
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-md p-8 border border-white/10 text-center">
                  <span className="text-4xl font-serif text-gold block mb-1">20+</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Years of Excellence</span>
                </div>
              </div>

              <div>
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  The Empire Standard
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Professional Chauffeurs. <br /><span className="italic">Not Drivers.</span></h2>
                
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
                        <h4 className="text-lg font-serif text-white mb-1">{item.title}</h4>
                        <p className="text-white/40 text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-12 bg-white text-black px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-all duration-300">
                  Our Chauffeur Standards
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Fleet */}
        <section id="fleet" className="py-24 bg-charcoal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                The Fleet
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Immaculate Luxury Vehicles</h2>
              <div className="w-24 h-px bg-gold mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VEHICLES.map((vehicle) => (
                <div key={vehicle.id} className="group flex flex-col">
                  <div className="relative h-64 overflow-hidden rounded-sm mb-6">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-white/80">{vehicle.category}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">{vehicle.name}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1.5 text-white/40">
                      <Users size={14} />
                      <span className="text-xs">{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-white/40">
                      <Briefcase size={14} />
                      <span className="text-xs">{vehicle.luggage} Luggage</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-6 flex-grow">
                    {vehicle.description}
                  </p>
                  <button className="w-full border border-white/10 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                    View Vehicle Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Corporate */}
        <section id="corporate" className="py-24 bg-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                  Corporate Accounts
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Seamless Mobility for <br />Your Executive Team</h2>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
                  Empire Chauffeur NYC provides dedicated support and priority booking for corporate clients. Simplify your travel management with our comprehensive billing solutions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {[
                    'Monthly Billing',
                    'Dedicated Support Line',
                    'Priority Booking',
                    'Volume Pricing',
                    'Travel Manager Dashboard',
                    'Detailed Reporting'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-sm text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className="gold-gradient text-black px-10 py-4 text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all">
                  Open Corporate Account
                </button>
              </div>

              <div className="glass-panel p-12 rounded-sm">
                <h3 className="text-2xl font-serif text-white mb-8 text-center">Inquire About Corporate Rates</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">First Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">Last Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">Company Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">Company Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                  <button className="w-full border border-gold text-gold py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-black transition-all">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Final CTA */}
        <section className="py-32 bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2070&auto=format&fit=crop" 
              alt="NYC Night"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-10">Reserve Your Private <br /><span className="italic">Chauffeur Today</span></h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white text-black px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-all duration-300 w-full md:w-auto"
              >
                Submit for Review to Call
              </button>
              <a href="tel:+13053219622" className="flex items-center justify-center space-x-3 border border-white/20 px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-all w-full md:w-auto">
                <Phone size={18} className="text-gold" />
                <span>Call (305) 321-9622</span>
              </a>
              <a href="https://wa.me/13053219622" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 border border-emerald-500/30 bg-emerald-500/5 px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-emerald-500/10 transition-all w-full md:w-auto">
                <MessageCircle size={18} className="text-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-widest text-white">
                  EMPIRE <span className="text-gold">CHAUFFEUR</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 -mt-1">
                  New York City
                </span>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                NYC's premier executive transportation firm. Providing discreet, reliable, and professional chauffeur services for over 20 years.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">Trust & Authority</h4>
              <ul className="space-y-4">
                {['About Empire Chauffeur', 'Safety & Licensing', 'Chauffeur Standards', 'Corporate Solutions', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-light">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">Airports</h4>
              <ul className="space-y-4">
                {['JFK International', 'LaGuardia Airport', 'Newark Liberty', 'Teterboro (Private)', 'Westchester County', 'MacArthur Airport'].map((airport) => (
                  <li key={airport}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-light">{airport}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">Contact Us</h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-gold mt-1 shrink-0" />
                  <span className="text-white/40 text-sm font-light leading-relaxed">
                    750 Lexington Ave, <br />New York, NY 10022
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-gold shrink-0" />
                  <a href="tel:+13053219622" className="text-white/40 hover:text-white transition-colors text-sm font-light">(305) 321-9622</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-gold shrink-0" />
                  <a href="mailto:hello@empirechauffeurnyc.com" className="text-white/40 hover:text-white transition-colors text-sm font-light">hello@empirechauffeurnyc.com</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Globe size={18} className="text-gold shrink-0" />
                  <a href="https://www.empirechauffeurnyc.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm font-light">empirechauffeurnyc.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[10px] uppercase tracking-widest">
              © 2025 Empire Chauffeur NYC. All Rights Reserved. TLC License #B02567.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest">Terms of Service</a>
              <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

