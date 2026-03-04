import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  User,
  Car,
  Mail
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Booking {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string;
  vehicle_id: string;
  vehicle_name: string;
  chauffeur_id: number;
  chauffeur_name: string;
  status: string;
  total_price: number;
  created_at: string;
}

export const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
  };

  const updateStatus = (id: number, status: string) => {
    fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(() => fetchBookings());
  };

  const sendEmail = (id: number, type: string) => {
    fetch(`/api/bookings/${id}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
    });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         b.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-emerald-400 bg-emerald-400/10';
      case 'Pending': return 'text-amber-400 bg-amber-400/10';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10';
      case 'Completed': return 'text-white/40 bg-white/5';
      case 'Cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-white/40 bg-white/5';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Booking Management</h1>
          <p className="text-white/40 text-sm mt-1">Manage, track, and update all customer reservations.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all flex items-center">
            <Download size={14} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-white/40" />
            <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Status:</span>
          </div>
          <div className="flex bg-white/5 rounded-lg p-1">
            {['All', 'Pending', 'Confirmed', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                  statusFilter === status ? "bg-[#D4AF37] text-black" : "text-white/40 hover:text-white"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                <th className="px-8 py-4 border-b border-white/5">ID</th>
                <th className="px-8 py-4 border-b border-white/5">Customer</th>
                <th className="px-8 py-4 border-b border-white/5">Route</th>
                <th className="px-8 py-4 border-b border-white/5">Vehicle / Driver</th>
                <th className="px-8 py-4 border-b border-white/5">Schedule</th>
                <th className="px-8 py-4 border-b border-white/5">Status</th>
                <th className="px-8 py-4 border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-white/20">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-xs uppercase tracking-widest font-bold">Loading Bookings...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-white/20">
                    <p className="text-xs uppercase tracking-widest font-bold">No bookings found</p>
                  </td>
                </tr>
              ) : filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-8 py-6 border-b border-white/5 font-mono text-xs text-white/40">#BK-{booking.id}</td>
                  <td className="px-8 py-6 border-b border-white/5">
                    <div className="flex flex-col">
                      <span className="font-bold text-white mb-1">{booking.customer_name}</span>
                      <span className="text-[10px] text-white/40">{booking.customer_email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-white/5">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-[11px] text-white/60">
                        <MapPin size={12} className="mr-2 text-gold" />
                        <span className="truncate max-w-[150px]">{booking.pickup_location}</span>
                      </div>
                      <div className="flex items-center text-[11px] text-white/60">
                        <ArrowRight size={12} className="mr-2 text-white/20" />
                        <span className="truncate max-w-[150px]">{booking.dropoff_location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-white/5">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-[11px] text-white/80">
                        <Car size={14} className="mr-2 text-white/20" />
                        <span>{booking.vehicle_name || 'Unassigned'}</span>
                      </div>
                      <div className="flex items-center text-[11px] text-white/40">
                        <User size={14} className="mr-2 text-white/20" />
                        <span>{booking.chauffeur_name || 'Unassigned'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-white/5">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{booking.pickup_time}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                        {booking.created_at ? format(new Date(booking.created_at), 'MMM dd, yyyy') : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-white/5">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", getStatusColor(booking.status))}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 border-b border-white/5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {booking.status === 'Confirmed' && (
                        <button 
                          onClick={() => sendEmail(booking.id, 'confirmation')}
                          className="p-2 bg-gold/10 text-gold rounded-lg hover:bg-gold hover:text-black transition-all"
                          title="Send Confirmation Email"
                        >
                          <Mail size={16} />
                        </button>
                      )}
                      {booking.status === 'Pending' && (
                        <button 
                          onClick={() => updateStatus(booking.id, 'Confirmed')}
                          className="p-2 bg-emerald-400/10 text-emerald-400 rounded-lg hover:bg-emerald-400 hover:text-black transition-all"
                          title="Confirm Booking"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button className="p-2 bg-white/5 text-white/40 rounded-lg hover:text-gold hover:bg-white/10 transition-all">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-white/5 text-white/40 rounded-lg hover:text-white hover:bg-white/10 transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-white/40">Showing <span className="text-white font-bold">{filteredBookings.length}</span> of <span className="text-white font-bold">{bookings.length}</span> bookings</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white disabled:opacity-30" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white disabled:opacity-30" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
