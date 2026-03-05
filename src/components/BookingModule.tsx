import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, MapPin, Phone, Mail, Briefcase, Send } from 'lucide-react';
import { AddressInput } from './AddressInput';

import { useBooking } from '../context/BookingContext';

export const BookingModule = () => {
  const { openBookingModal } = useBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pickupCity, setPickupCity] = useState('');
  const [dropoffCity, setDropoffCity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      customer_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      customer_email: formData.get('email'),
      customer_phone: formData.get('phone'),
      pickup_location: pickupCity,
      dropoff_location: dropoffCity,
      pickup_time: `${formData.get('date')} ${formData.get('time')}`,
      vehicle_id: 's-class', // Default for now
      total_price: Number(formData.get('hours')) * 150 // Mock price calculation
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-bg-primary/60 backdrop-blur-xl border border-gold/30 p-12 rounded-sm text-center"
      >
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="text-gold" size={28} />
        </div>
        <h3 className="text-2xl font-serif text-text-primary mb-2">Request Received</h3>
        <p className="text-text-secondary text-sm max-w-sm mx-auto">
          Thank you. Your request has been submitted for review. A concierge will call you shortly to finalize your arrangements.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-5xl">
      {/* Desktop View: Keep the streamlined form but make it cleaner */}
      <div className="hidden lg:block glass-panel p-8 rounded-sm shadow-2xl shadow-black/50">
        <div className="mb-8 text-left">
          <h3 className="text-2xl font-serif text-text-primary">Request Your <span className="italic text-gold">Private Chauffeur</span></h3>
          <p className="text-text-secondary/40 text-[10px] uppercase tracking-widest mt-1">Submit for review to call</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-row items-end gap-6">
          <div className="grid grid-cols-5 gap-6 flex-grow">
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-semibold block">Pickup</label>
              <AddressInput
                required
                placeholder="e.g. Manhattan"
                value={pickupCity}
                onChange={setPickupCity}
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-semibold block">Destination</label>
              <AddressInput
                required
                placeholder="e.g. JFK Airport"
                value={dropoffCity}
                onChange={setDropoffCity}
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-semibold block">Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                <input required name="date" type="date" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" />
              </div>
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-semibold block">Time</label>
              <div className="relative">
                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                <input required name="time" type="time" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary" />
              </div>
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-semibold block">Phone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                <input required name="phone" type="tel" placeholder="Phone" className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-text-secondary/40 text-text-primary" />
              </div>
            </div>
          </div>
          <button className="primary-button group h-[52px] px-10">
            <span>Submit</span>
            <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {/* Mobile View: Two Button Approach */}
      <div className="lg:hidden flex flex-col gap-4">
        <div className="glass-panel p-8 rounded-sm text-center">
          <h3 className="text-2xl font-serif text-text-primary mb-2">Ready to <span className="italic text-gold">Ride?</span></h3>
          <p className="text-text-secondary text-sm font-light mb-8">Choose your preferred way to connect with our dispatch team.</p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={openBookingModal}
              className="primary-button w-full h-14 justify-center text-sm"
            >
              <Calendar size={18} className="mr-3" />
              <span>Book Online Now</span>
            </button>
            
            <a 
              href="tel:+13053219622"
              className="secondary-button w-full h-14 justify-center text-sm border-gold/30 text-gold"
            >
              <Phone size={18} className="mr-3" />
              <span>Request Call Back</span>
            </a>
          </div>
          
          <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-text-secondary/50 font-bold">
            24/7 Dispatch Available
          </p>
        </div>
      </div>
    </div>
  );
};
