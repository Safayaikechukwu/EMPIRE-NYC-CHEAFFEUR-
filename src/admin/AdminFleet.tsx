import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Car, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  Wrench,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Vehicle {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  status: string;
  image: string;
}

export const AdminFleet: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Executive Sedan', 'Business Sedan', 'Luxury SUV', 'Executive Sprinter', 'Specialty'];

  const filteredVehicles = activeCategory === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-emerald-400 bg-emerald-400/10';
      case 'Reserved': return 'text-amber-400 bg-amber-400/10';
      case 'Maintenance': return 'text-red-400 bg-red-400/10';
      case 'Sold Out': return 'text-white/40 bg-white/5';
      default: return 'text-white/40 bg-white/5';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Fleet Management</h1>
          <p className="text-white/30 text-sm mt-2 font-light tracking-wide">Manage vehicle inventory, status, and maintenance schedules.</p>
        </div>
        <button className="px-8 py-4 bg-gold text-bg-primary rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-gold/90 transition-all shadow-xl shadow-gold/10 flex items-center">
          <Plus size={16} className="mr-3" />
          Add Vehicle
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-[#0A0A0A] border border-white/5 p-2 rounded-sm overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                activeCategory === cat ? "bg-gold text-bg-primary" : "text-white/30 hover:text-white hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-sm h-[450px] animate-pulse" />
          ))
        ) : filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-[#0A0A0A] border border-white/5 rounded-sm overflow-hidden group hover:border-gold/30 transition-all duration-500 flex flex-col relative">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
              <div className="absolute top-6 right-6">
                <span className={cn("px-4 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur-xl border border-white/10 shadow-2xl", getStatusColor(vehicle.status))}>
                  {vehicle.status}
                </span>
              </div>
            </div>
            <div className="p-10 flex-grow flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">{vehicle.name}</h3>
                  <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold">{vehicle.category}</p>
                </div>
                <button className="p-2 text-white/10 hover:text-gold transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 my-8 py-8 border-y border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors duration-500">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-1">Capacity</p>
                    <p className="text-sm font-bold text-white">{vehicle.passengers} Pax</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors duration-500">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-1">Luggage</p>
                    <p className="text-sm font-bold text-white">{vehicle.luggage} Bags</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Last Inspected: 2d ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2.5 bg-white/5 text-white/20 rounded-sm hover:text-gold hover:bg-white/10 transition-all">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2.5 bg-white/5 text-white/20 rounded-sm hover:text-red-400 hover:bg-white/10 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
