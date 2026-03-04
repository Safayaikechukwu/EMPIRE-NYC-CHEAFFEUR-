import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CalendarDays, 
  Car, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const data = [
  { name: 'Mon', revenue: 4200, bookings: 12 },
  { name: 'Tue', revenue: 3800, bookings: 10 },
  { name: 'Wed', revenue: 5100, bookings: 15 },
  { name: 'Thu', revenue: 4800, bookings: 14 },
  { name: 'Fri', revenue: 6200, bookings: 18 },
  { name: 'Sat', revenue: 7500, bookings: 22 },
  { name: 'Sun', revenue: 5800, bookings: 16 },
];

const vehicleData = [
  { name: 'Sedans', value: 45, color: '#D4AF37' },
  { name: 'SUVs', value: 30, color: '#B8860B' },
  { name: 'Sprinters', value: 15, color: '#8B6508' },
  { name: 'Specialty', value: 10, color: '#5C4305' },
];

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const statCards = [
    { 
      name: 'Total Revenue', 
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`, 
      change: '+12.5%', 
      trend: 'up', 
      icon: DollarSign,
      color: 'text-emerald-400'
    },
    { 
      name: 'Active Bookings', 
      value: stats?.activeBookings || '0', 
      change: '+8.2%', 
      trend: 'up', 
      icon: CalendarDays,
      color: 'text-[#D4AF37]'
    },
    { 
      name: 'Fleet Utilization', 
      value: '84%', 
      change: '-2.4%', 
      trend: 'down', 
      icon: Car,
      color: 'text-blue-400'
    },
    { 
      name: 'Customer Satisfaction', 
      value: '4.9/5', 
      change: '+0.1', 
      trend: 'up', 
      icon: StarIcon,
      color: 'text-amber-400'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Dashboard Overview</h1>
          <p className="text-white/40 text-sm mt-1">Real-time operational metrics for Empire Chauffeur NYC.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-xs font-bold hover:bg-[#B8860B] transition-all shadow-lg shadow-[#D4AF37]/20">
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-[#111111] border border-white/5 p-6 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl bg-white/5 group-hover:bg-[#D4AF37]/10 transition-all", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center text-[10px] font-bold px-2 py-1 rounded-full",
                stat.trend === 'up' ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">{stat.name}</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif font-bold text-white">Revenue Performance</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Distribution */}
        <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Fleet Distribution</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Active</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {vehicleData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-white/60">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity / Active Bookings */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-white">Active Operations</h3>
          <button className="text-[#D4AF37] text-xs font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                <th className="px-8 py-4 border-b border-white/5">Booking ID</th>
                <th className="px-8 py-4 border-b border-white/5">Customer</th>
                <th className="px-8 py-4 border-b border-white/5">Vehicle</th>
                <th className="px-8 py-4 border-b border-white/5">Status</th>
                <th className="px-8 py-4 border-b border-white/5">Pickup</th>
                <th className="px-8 py-4 border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: '#BK-8291', customer: 'Alexander Pierce', vehicle: 'Mercedes S-Class', status: 'In Progress', time: '10:30 AM', color: 'text-blue-400 bg-blue-400/10' },
                { id: '#BK-8292', customer: 'Sarah Jenkins', vehicle: 'Cadillac Escalade', status: 'En Route', time: '11:15 AM', color: 'text-amber-400 bg-amber-400/10' },
                { id: '#BK-8293', customer: 'Michael Chen', vehicle: 'BMW 7 Series', status: 'Confirmed', time: '12:00 PM', color: 'text-emerald-400 bg-emerald-400/10' },
                { id: '#BK-8294', customer: 'Elena Rodriguez', vehicle: 'Tesla Model Y', status: 'Pending', time: '01:30 PM', color: 'text-white/40 bg-white/5' },
              ].map((booking, i) => (
                <tr key={i} className="hover:bg-white/2 transition-colors group">
                  <td className="px-8 py-5 border-b border-white/5 font-mono text-xs text-white/80">{booking.id}</td>
                  <td className="px-8 py-5 border-b border-white/5 font-bold text-white">{booking.customer}</td>
                  <td className="px-8 py-5 border-b border-white/5 text-white/60">{booking.vehicle}</td>
                  <td className="px-8 py-5 border-b border-white/5">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", booking.color)}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 border-b border-white/5 text-white/60">{booking.time}</td>
                  <td className="px-8 py-5 border-b border-white/5 text-right">
                    <button className="p-2 text-white/20 hover:text-[#D4AF37] transition-colors">
                      <ArrowUpRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StarIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
