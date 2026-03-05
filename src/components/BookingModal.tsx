import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, MapPin, Phone, Mail, Briefcase, Send } from 'lucide-react';
import { AddressInput } from './AddressInput';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pickupCity, setPickupCity] = useState('');
  const [dropoffCity, setDropoffCity] = useState('');

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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-5xl glass-panel rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-charcoal/40 p-6 md:px-10 border-b border-border-primary flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-3xl font-serif text-text-primary">Request Your <span className="italic text-gold">Private Chauffeur</span></h2>
                <p className="text-text-secondary/40 text-[9px] md:text-[10px] uppercase tracking-widest mt-1">Submit for review to call</p>
              </div>
              <button 
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-gold" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-text-primary mb-2">Request Submitted</h3>
                  <p className="text-text-secondary text-sm max-w-xs mx-auto">
                    Your request has been sent for review. A concierge will contact you shortly to finalize your booking.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* First Name */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">First Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John"
                        className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 px-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Last Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Doe"
                        className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 px-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    {/* Event Type */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Event Type</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <select 
                          required
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                        >
                          <option value="" className="bg-charcoal">Select Event</option>
                          <option value="corporate" className="bg-charcoal">Corporate</option>
                          <option value="wedding" className="bg-charcoal">Wedding</option>
                          <option value="airport" className="bg-charcoal">Airport</option>
                          <option value="other" className="bg-charcoal">Other</option>
                        </select>
                      </div>
                    </div>
                    {/* Emails */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <input 
                          required
                          type="tel" 
                          placeholder="(305) 000-0000"
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    {/* Approximate Passengers */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Passengers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <input 
                          required
                          type="number" 
                          min="1"
                          placeholder="Guests"
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    {/* Date Requested */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Date Requested</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <input 
                          required
                          type="date" 
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    {/* Pick up Time */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Pick up Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <input 
                          required
                          type="time" 
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Number of Hours */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-bold">Number of Hours</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />
                        <input 
                          required
                          type="number" 
                          min="1"
                          placeholder="Hours"
                          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    {/* Pick up City */}
                    <div className="lg:col-span-1">
                      <AddressInput
                        required
                        label="Pick up City"
                        placeholder="e.g. Manhattan, NYC"
                        value={pickupCity}
                        onChange={setPickupCity}
                        icon={<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />}
                        className="space-y-1.5"
                      />
                    </div>
                    {/* Drop off City */}
                    <div className="lg:col-span-2">
                      <AddressInput
                        required
                        label="Drop off City / Destination"
                        placeholder="e.g. JFK Airport, Queens"
                        value={dropoffCity}
                        onChange={setDropoffCity}
                        icon={<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={14} />}
                        className="space-y-1.5"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button 
                      type="submit"
                      className="primary-button w-full md:max-w-md h-12"
                    >
                      Submit for Review to Call
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
