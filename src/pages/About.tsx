import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Clock, Star, CheckCircle2, Award, Building2, Globe, Plane } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';

export const About: React.FC = () => {
  const { openBookingModal } = useBooking();

  return (
    <Layout>
      <SEO 
        title="About Us | Empire Chauffeur NYC"
        description="Learn about the Empire Legacy. Over 20 years of excellence in NYC executive transportation, built on discretion, reliability, and bespoke service."
        breadcrumbItems={[
          { name: "Home", item: "https://www.empirechauffeurnyc.com/" },
          { name: "About", item: "https://www.empirechauffeurnyc.com/about" }
        ]}
      />
      <div className="pt-24 pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                The Empire Legacy
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-8">
                Two Decades of <br /><span className="italic text-gold">NYC Excellence.</span>
              </h1>
              <p className="text-text-secondary text-lg font-light leading-relaxed mb-10">
                Founded in the heart of Manhattan, Empire Chauffeur NYC was born from a simple vision: to redefine executive transportation through unwavering reliability, absolute discretion, and the highest standards of professionalism.
              </p>
              <div className="flex flex-wrap gap-12">
                <div>
                  <span className="text-4xl font-serif text-gold block mb-1">20+</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">Years Experience</span>
                </div>
                <div>
                  <span className="text-4xl font-serif text-gold block mb-1">50k+</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">Trips Completed</span>
                </div>
                <div>
                  <span className="text-4xl font-serif text-gold block mb-1">99.9%</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">On-Time Rate</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-gold/30" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-gold/30" />
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop" 
                alt="Executive Chauffeur"
                className="rounded-sm shadow-2xl relative z-10 w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Our Foundation</span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">The Empire Standard</h2>
              <div className="w-24 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Absolute Discretion',
                  icon: <Shield size={32} />,
                  desc: 'We understand the value of privacy. Our chauffeurs are trained to provide a secure and confidential environment for our high-profile clients.'
                },
                {
                  title: 'Unwavering Reliability',
                  icon: <Clock size={32} />,
                  desc: 'In a city that never sleeps, timing is everything. We utilize real-time monitoring to ensure we are always 15 minutes early.'
                },
                {
                  title: 'Bespoke Service',
                  icon: <Award size={32} />,
                  desc: 'Every client is unique. From specific vehicle amenities to complex multi-stop itineraries, we tailor every journey to your exact requirements.'
                }
              ].map((value, i) => (
                <div key={i} className="p-10 gold-card rounded-sm group">
                  <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                  <h3 className="text-2xl font-serif text-text-primary mb-4">{value.title}</h3>
                  <p className="text-text-secondary text-sm font-light leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chauffeur Standards */}
          <div className="p-12 md:p-20 bg-charcoal rounded-sm border border-border-primary relative overflow-hidden mb-32">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">The Chauffeur</span>
                <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-8">Professionals. <br /><span className="italic">Not Drivers.</span></h2>
                <p className="text-text-secondary text-lg font-light leading-relaxed mb-10">
                  Our chauffeurs are the face of Empire Chauffeur NYC. They undergo a rigorous selection process and continuous training to maintain our elite standards.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Executive Etiquette', desc: 'Trained in the nuances of high-level corporate and diplomatic service.' },
                    { title: 'Defensive Driving', desc: 'Certified in advanced safety and defensive driving techniques.' },
                    { title: 'Local Expertise', desc: 'Unmatched knowledge of NYC traffic patterns and regional routes.' }
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
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Professional Chauffeur"
                  className="rounded-sm shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 bg-gold p-8 rounded-sm shadow-xl">
                  <span className="text-bg-primary text-4xl font-serif block mb-1">Elite</span>
                  <span className="text-bg-primary/80 text-[10px] uppercase tracking-widest font-bold">Chauffeur Training</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Associations & Partnerships */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Our Network</span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Local Associations</h2>
              <p className="max-w-2xl mx-auto text-text-secondary font-light">We are proud members of the leading industry associations in New York and beyond.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'NLA', fullName: 'National Limousine Association' },
                { name: 'LANY', fullName: 'Limousine Association of New York' },
                { name: 'NYC & Co', fullName: 'NYC Tourism + Conventions' },
                { name: 'TLC', fullName: 'NYC Taxi & Limousine Commission' }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-charcoal border border-border-primary rounded-sm flex flex-col items-center justify-center text-center group hover:border-gold/30 transition-all">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <Building2 size={32} />
                  </div>
                  <h4 className="text-xl font-serif text-text-primary mb-1">{item.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">{item.fullName}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Reach */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop" alt="NYC" className="rounded-sm h-64 w-full object-cover" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1501979376754-2ff867a4f659?q=80&w=2070&auto=format&fit=crop" alt="Boston" className="rounded-sm h-48 w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://images.unsplash.com/photo-1569330112436-248b395c653e?q=80&w=2070&auto=format&fit=crop" alt="Philly" className="rounded-sm h-48 w-full object-cover" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=2070&auto=format&fit=crop" alt="DC" className="rounded-sm h-64 w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Regional Network</span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-8">NYC Roots. <br /><span className="italic">Northeast Reach.</span></h2>
              <p className="text-text-secondary text-lg font-light leading-relaxed mb-10">
                While our heart is in New York City, our network spans the entire Northeast corridor. We provide seamless transfers between all major hubs, ensuring the Empire Standard follows you wherever you go.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Building2 size={20} />, text: 'Corporate Hubs' },
                  { icon: <Globe size={20} />, text: 'Interstate Travel' },
                  { icon: <Plane size={20} />, text: 'Private Aviation' },
                  { icon: <Users size={20} />, text: 'Group Logistics' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-text-primary/70">
                    <div className="text-gold">{item.icon}</div>
                    <span className="text-xs uppercase tracking-widest font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
