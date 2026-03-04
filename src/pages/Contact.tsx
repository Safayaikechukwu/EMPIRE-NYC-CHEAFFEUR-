import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Globe, Clock, MessageCircle, ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';

export const Contact: React.FC = () => {
  const { openBookingModal } = useBooking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry. Our dispatch team will contact you shortly.');
  };
  return (
    <Layout>
      <SEO 
        title="Contact Us | Empire Chauffeur NYC"
        description="Get in touch with our 24/7 dispatch team. Book your executive transfer, inquire about corporate accounts, or plan your special event transportation."
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
              Get in Touch
              </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8"
            >
              Contact <span className="italic text-gold">Dispatch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-text-secondary text-lg font-light leading-relaxed"
            >
              Our 24/7 dispatch team and executive concierge are ready to assist with your booking, corporate account inquiry, or special event logistics.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-serif text-text-primary mb-8">Direct Contact</h3>
                <div className="space-y-8">
                  <a href="tel:+13053219622" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-primary transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Call 24/7</p>
                      <p className="text-lg font-serif text-text-primary">(305) 321-9622</p>
                    </div>
                  </a>
                  <a href="mailto:hello@empirechauffeurnyc.com" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-primary transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Email Us</p>
                      <p className="text-lg font-serif text-text-primary">hello@empirechauffeurnyc.com</p>
                    </div>
                  </a>
                  <a href="https://wa.me/13053219622" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">WhatsApp</p>
                      <p className="text-lg font-serif text-text-primary">Connect Instantly</p>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-text-primary mb-8">Headquarters</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-serif text-text-primary mb-1">Lexington Avenue</p>
                    <p className="text-text-secondary text-sm font-light leading-relaxed">
                      750 Lexington Ave, <br />New York, NY 10022
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-text-primary mb-8">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <Instagram size={20} />, href: '#' },
                    { icon: <Linkedin size={20} />, href: '#' },
                    { icon: <Twitter size={20} />, href: '#' }
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="gold-card p-8 md:p-12 rounded-sm">
                <h3 className="text-2xl md:text-3xl font-serif text-text-primary mb-8">Send an Inquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Full Name</label>
                      <input type="text" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-4 px-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Email Address</label>
                      <input type="email" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-4 px-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Phone Number</label>
                      <input type="tel" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-4 px-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" placeholder="(555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Subject</label>
                      <select className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-4 px-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary appearance-none">
                        <option>General Inquiry</option>
                        <option>Corporate Account</option>
                        <option>Special Event</option>
                        <option>Long Distance Transfer</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Message</label>
                    <textarea rows={6} className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-4 px-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary resize-none" placeholder="How can we assist you?"></textarea>
                  </div>
                  <button className="primary-button w-full">
                    <span>Submit Inquiry</span>
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-[400px] bg-charcoal rounded-sm border border-border-primary overflow-hidden relative">
            <div className="absolute inset-0 opacity-30 grayscale">
              <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-bg-primary/90 backdrop-blur-md p-8 border border-border-primary text-center">
                <MapPin size={32} className="text-gold mx-auto mb-4" />
                <h4 className="text-xl font-serif text-text-primary mb-2">Manhattan Headquarters</h4>
                <p className="text-text-secondary text-sm font-light">750 Lexington Ave, New York, NY 10022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
