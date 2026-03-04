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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Fleet Management</h1>
          <p className="text-white/40 text-sm mt-1">Manage vehicle inventory, status, and maintenance schedules.</p>
        </div>
        <button className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg text-xs font-bold hover:bg-[#B8860B] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center">
          <Plus size={16} className="mr-2" />
          Add Vehicle
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-[#111111] border border-white/5 p-4 rounded-2xl overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                activeCategory === cat ? "bg-white/10 text-white border border-white/20" : "text-white/40 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-white/5 rounded-2xl h-[400px] animate-pulse" />
          ))
        ) : filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/30 transition-all flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4">
                <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10", getStatusColor(vehicle.status))}>
                  {vehicle.status}
                </span>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{vehicle.name}</h3>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">{vehicle.category}</p>
                </div>
                <button className="p-2 text-white/20 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-6 py-6 border-y border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Capacity</p>
                    <p className="text-sm font-bold text-white">{vehicle.passengers} Pax</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Luggage</p>
                    <p className="text-sm font-bold text-white">{vehicle.luggage} Bags</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Last Inspected: 2d ago</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-white/5 text-white/40 rounded-lg hover:text-[#D4AF37] hover:bg-white/10 transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button className="p-2 bg-white/5 text-white/40 rounded-lg hover:text-red-400 hover:bg-white/10 transition-all">
                    <Trash2 size={14} />
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
