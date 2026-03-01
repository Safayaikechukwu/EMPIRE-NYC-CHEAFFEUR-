import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, MapPin, Phone, Mail, Briefcase, Send } from 'lucide-react';

export const BookingModule = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-black/60 backdrop-blur-xl border border-gold/30 p-12 rounded-sm text-center"
      >
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="text-gold" size={28} />
        </div>
        <h3 className="text-2xl font-serif text-white mb-2">Request Received</h3>
        <p className="text-white/60 text-sm max-w-sm mx-auto">
          Thank you. Your request has been submitted for review. A concierge will call you shortly to finalize your arrangements.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-5xl bg-black/40 backdrop-blur-xl border border-white/10 p-5 sm:p-8 rounded-sm shadow-2xl shadow-black/50">
      <div className="mb-6 sm:mb-8 text-left">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-white">Request Your <span className="italic text-gold">Private Chauffeur</span></h3>
        <p className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Submit for review to call</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Row 1 */}
        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">First Name</label>
          <input 
            required
            type="text" 
            placeholder="First Name"
            className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Last Name</label>
          <input 
            required
            type="text" 
            placeholder="Last Name"
            className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Event Type</label>
          <div className="relative">
            <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <select required className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors appearance-none">
              <option value="" className="bg-charcoal">Select Event</option>
              <option value="corporate" className="bg-charcoal">Corporate</option>
              <option value="wedding" className="bg-charcoal">Wedding</option>
              <option value="airport" className="bg-charcoal">Airport</option>
              <option value="other" className="bg-charcoal">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Email Address</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="email" 
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Date Requested</label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="date" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Pick up Time</label>
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="time" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Number of Hours</label>
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="number" 
              min="1"
              placeholder="Hours"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Passengers</label>
          <div className="relative">
            <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="number" 
              min="1"
              placeholder="Guests"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="space-y-1.5 text-left sm:col-span-2">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Phone Number</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="tel" 
              placeholder="Phone Number"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left sm:col-span-2">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Pick up City</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              required
              type="text" 
              placeholder="e.g. Manhattan, NYC"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-4 mt-2">
          <button className="primary-button w-full group">
            <span>Submit for Review to Call</span>
            <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};
