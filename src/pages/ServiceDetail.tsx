import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Clock, CheckCircle2, Star, Users, Briefcase } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  benefits: { title: string; desc: string }[];
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  features, 
  benefits 
}) => {
  const { openBookingModal } = useBooking();

  return (
    <Layout>
      <SEO 
        title={`${title} | Empire Chauffeur NYC`}
        description={description}
      />
      <div className="pt-40 pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                {subtitle}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-8">
                {title}
              </h1>
              <p className="text-text-secondary text-lg font-light leading-relaxed mb-10">
                {description}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-gold" />
                    <span className="text-sm text-text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={openBookingModal}
                className="primary-button w-full sm:w-auto"
              >
                <span>Book {title}</span>
                <ArrowRight size={14} className="ml-2" />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-gold/30" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-gold/30" />
              <img 
                src={image} 
                alt={title}
                className="rounded-sm shadow-2xl relative z-10 w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Service Process */}
          <div className="mb-32">
            <div className="bg-charcoal p-12 md:p-20 rounded-sm border border-border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">The Experience</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">How It Works</h2>
                  <p className="max-w-2xl mx-auto text-text-secondary font-light">From the moment you book until you reach your destination, we ensure every detail is handled with precision.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  {[
                    { step: '01', title: 'Seamless Booking', desc: 'Reserve via our platform or 24/7 concierge line.' },
                    { step: '02', title: 'Chauffeur Assigned', desc: 'Receive chauffeur details and vehicle info 24h prior.' },
                    { step: '03', title: 'Real-Time Updates', desc: 'Get SMS alerts when your chauffeur is en route and on-site.' },
                    { step: '04', title: 'Premium Arrival', desc: 'Experience a flawless journey in an immaculate vehicle.' }
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <span className="text-6xl font-serif text-gold/10 absolute -top-8 -left-4">{item.step}</span>
                      <h4 className="text-xl font-serif text-text-primary mb-4 relative z-10">{item.title}</h4>
                      <p className="text-text-secondary/70 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Why Choose Our {title}</h2>
              <div className="w-24 h-px bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-10 bg-charcoal rounded-sm border border-border-primary hover:border-gold/30 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-bg-primary transition-all">
                    <Star size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-text-primary mb-4">{benefit.title}</h3>
                  <p className="text-text-secondary text-sm font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fleet CTA */}
          <div className="bg-gold p-12 rounded-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-serif text-bg-primary mb-2">Ready to Experience the Difference?</h3>
              <p className="text-bg-primary/70 font-light">Choose from our immaculate fleet of luxury vehicles.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/fleet"
                className="px-8 py-4 bg-bg-primary text-gold text-xs uppercase tracking-widest font-bold hover:bg-charcoal transition-all text-center"
              >
                View Our Fleet
              </Link>
              <button 
                onClick={openBookingModal}
                className="px-8 py-4 border border-bg-primary text-bg-primary text-xs uppercase tracking-widest font-bold hover:bg-bg-primary hover:text-gold transition-all"
              >
                Contact Dispatch
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
