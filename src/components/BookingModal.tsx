import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, MapPin, Phone, Mail, Briefcase, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-charcoal border border-white/10 rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif text-white">Request a <span className="italic text-gold">Chauffeur</span></h2>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Submit for review to call</p>
              </div>
              <button 
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-gold" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Request Submitted</h3>
                  <p className="text-white/60 text-sm max-w-xs mx-auto">
                    Your request has been sent for review. A concierge will contact you shortly to finalize your booking.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">First Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John"
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Last Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Type */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Event Type</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <select 
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                        >
                          <option value="" className="bg-charcoal">Select Event Type</option>
                          <option value="corporate" className="bg-charcoal">Corporate Travel</option>
                          <option value="wedding" className="bg-charcoal">Wedding</option>
                          <option value="airport" className="bg-charcoal">Airport Transfer</option>
                          <option value="night-out" className="bg-charcoal">Night on the Town</option>
                          <option value="other" className="bg-charcoal">Other</option>
                        </select>
                      </div>
                    </div>
                    {/* Emails */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Requested */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Date Requested</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="date" 
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    {/* Pick up Time */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pick up Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="time" 
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Number of Hours */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Number of Hours</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="number" 
                          min="1"
                          placeholder="Minimum 2 hours"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    {/* Approximate Passengers */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Passengers</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="number" 
                          min="1"
                          placeholder="Number of guests"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="tel" 
                          placeholder="(305) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    {/* Pick up City */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pick up City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. Manhattan, NYC"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-300 mt-4"
                  >
                    Submit for Review to Call
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
