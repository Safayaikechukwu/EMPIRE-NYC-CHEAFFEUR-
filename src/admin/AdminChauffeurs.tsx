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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Chauffeur Management</h1>
          <p className="text-white/40 text-sm mt-1">Manage driver profiles, performance, and assignments.</p>
        </div>
        <button className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg text-xs font-bold hover:bg-[#B8860B] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center">
          <Plus size={16} className="mr-2" />
          Add Chauffeur
        </button>
      </div>

      {/* Chauffeur Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-white/5 rounded-2xl h-[450px] animate-pulse" />
          ))
        ) : chauffeurs.map((chauffeur) => (
          <div key={chauffeur.id} className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/30 transition-all flex flex-col">
            <div className="relative h-48 bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative">
                  <img 
                    src={chauffeur.image} 
                    alt={chauffeur.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#111111] shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#111111]" />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 text-white/20 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 text-center flex-grow flex flex-col">
              <h3 className="text-2xl font-serif font-bold text-white mb-1">{chauffeur.name}</h3>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="flex items-center text-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1 text-sm font-bold">{chauffeur.rating}</span>
                </div>
                <span className="text-white/20">•</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{chauffeur.trips} Trips Completed</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <a href={`tel:${chauffeur.phone}`} className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group/btn">
                  <Phone size={18} className="text-white/40 group-hover/btn:text-[#D4AF37] mb-2" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Call</span>
                </a>
                <button className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group/btn">
                  <Calendar size={18} className="text-white/40 group-hover/btn:text-[#D4AF37] mb-2" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Schedule</span>
                </button>
              </div>

              <div className="space-y-4 text-left border-t border-white/5 pt-6 mt-auto">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Status</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">On Duty</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Current Assignment</span>
                  <span className="text-white font-medium">#BK-8291 (JFK Transfer)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Performance</span>
                  <div className="flex items-center text-emerald-400">
                    <TrendingUp size={12} className="mr-1" />
                    <span className="font-bold">+4% this month</span>
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
