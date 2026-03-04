import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Star, 
  Phone, 
  Mail, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Award,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Chauffeur {
  id: number;
  name: string;
  status: string;
  rating: number;
  trips: number;
  phone: string;
  image: string;
}

export const AdminChauffeurs: React.FC = () => {
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/chauffeurs')
      .then(res => res.json())
      .then(data => {
        setChauffeurs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Chauffeur Management</h1>
          <p className="text-white/30 text-sm mt-2 font-light tracking-wide">Manage driver profiles, performance, and assignments.</p>
        </div>
        <button className="px-8 py-4 bg-gold text-bg-primary rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-gold/90 transition-all shadow-xl shadow-gold/10 flex items-center">
          <Plus size={16} className="mr-3" />
          Add Chauffeur
        </button>
      </div>

      {/* Chauffeur Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-sm h-[450px] animate-pulse" />
          ))
        ) : chauffeurs.map((chauffeur) => (
          <div key={chauffeur.id} className="bg-[#0A0A0A] border border-white/5 rounded-sm overflow-hidden group hover:border-gold/30 transition-all duration-500 flex flex-col relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/10 transition-all duration-500" />
            
            <div className="relative h-48 bg-gradient-to-br from-gold/10 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative">
                  <img 
                    src={chauffeur.image} 
                    alt={chauffeur.name} 
                    className="w-32 h-32 rounded-sm object-cover border-4 border-[#0A0A0A] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#0A0A0A]" />
                </div>
              </div>
              <div className="absolute top-6 right-6">
                <button className="p-2 text-white/10 hover:text-gold transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="p-10 text-center flex-grow flex flex-col relative z-10">
              <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">{chauffeur.name}</h3>
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="flex items-center text-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1.5 text-sm font-bold">{chauffeur.rating}</span>
                </div>
                <span className="text-white/10">•</span>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">{chauffeur.trips} Trips Completed</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <a href={`tel:${chauffeur.phone}`} className="flex flex-col items-center p-6 bg-white/5 rounded-sm hover:bg-gold group/btn transition-all duration-500">
                  <Phone size={20} className="text-white/20 group-hover/btn:text-bg-primary mb-3 transition-colors" />
                  <span className="text-[9px] text-white/20 group-hover/btn:text-bg-primary uppercase tracking-widest font-bold transition-colors">Call</span>
                </a>
                <button className="flex flex-col items-center p-6 bg-white/5 rounded-sm hover:bg-gold group/btn transition-all duration-500">
                  <Calendar size={20} className="text-white/20 group-hover/btn:text-bg-primary mb-3 transition-colors" />
                  <span className="text-[9px] text-white/20 group-hover/btn:text-bg-primary uppercase tracking-widest font-bold transition-colors">Schedule</span>
                </button>
              </div>

              <div className="space-y-5 text-left border-t border-white/5 pt-8 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Status</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px]">On Duty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Current Assignment</span>
                  <span className="text-white text-xs font-medium">#BK-8291 (JFK Transfer)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Performance</span>
                  <div className="flex items-center text-emerald-400">
                    <TrendingUp size={14} className="mr-2" />
                    <span className="font-bold text-[10px] uppercase tracking-widest">+4% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
