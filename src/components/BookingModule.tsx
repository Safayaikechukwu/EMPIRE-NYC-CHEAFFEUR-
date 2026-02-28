import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Plane, Car, ArrowRight } from 'lucide-react';

export const BookingModule = () => {
  const [activeTab, setActiveTab] = useState('one-way');

  const tabs = [
    { id: 'one-way', label: 'One Way' },
    { id: 'round-trip', label: 'Round Trip' },
    { id: 'hourly', label: 'Hourly' }
  ];

  return (
    <div className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/10 p-1 rounded-sm shadow-2xl shadow-black/50">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'text-white border-b-2 border-gold' 
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Pickup Location</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              type="text" 
              placeholder="Enter address or airport"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Drop-off Location</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input 
              type="text" 
              placeholder="Enter destination"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Date</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Time</label>
            <div className="relative">
              <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
              <input 
                type="time" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-widest text-white/50 font-semibold block">Vehicle Type</label>
          <div className="relative">
            <Car size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <select className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors appearance-none">
              <option value="sedan">Executive Sedan</option>
              <option value="suv">Luxury SUV</option>
              <option value="sprinter">Premium Sprinter</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-2 flex items-end">
          <button className="w-full gold-gradient text-black font-bold py-3.5 text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center space-x-2 group">
            <span>View Rates</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="px-6 pb-4 flex justify-center">
        <button className="text-[10px] uppercase tracking-widest text-white/40 hover:text-gold transition-colors">
          Speak to a Concierge
        </button>
      </div>
    </div>
  );
};
