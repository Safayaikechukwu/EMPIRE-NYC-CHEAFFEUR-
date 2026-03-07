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
      color: 'text-gold'
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-white/30 text-sm mt-2 font-light tracking-wide">Real-time operational intelligence for Empire Chauffeur NYC.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all">
            Export Report
          </button>
          <button className="px-6 py-3 bg-gold text-bg-primary rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-gold/90 transition-all shadow-xl shadow-gold/10">
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-sm hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-gold/10 transition-all duration-500" />
            <div className="flex items-center justify-between mb-6">
              <div className={cn("p-4 rounded-sm bg-white/5 group-hover:bg-gold/10 transition-all duration-500", stat.color)}>
                <stat.icon size={26} />
              </div>
              <div className={cn(
                "flex items-center text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                stat.trend === 'up' ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{stat.name}</p>
            <h3 className="text-3xl font-serif font-bold text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 p-10 rounded-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-serif font-bold text-white tracking-wide">Revenue Performance</h3>
            <select className="bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-gold/50 transition-all">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff10" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={15}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#ffffff10" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0A0A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
                  cursor={{ stroke: 'rgba(212, 175, 55, 0.2)', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Distribution */}
        <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-sm">
          <h3 className="text-xl font-serif font-bold text-white mb-10 tracking-wide">Fleet Distribution</h3>
          <div className="h-[280px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={2000}
                >
                  {vehicleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0A0A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-serif font-bold text-white tracking-tighter">100%</p>
              <p className="text-[9px] text-gold uppercase tracking-[0.3em] font-bold">Active</p>
            </div>
          </div>
          <div className="space-y-4 mt-10">
            {vehicleData.map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 duration-300" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-white/40 group-hover:text-white transition-colors duration-300 uppercase tracking-widest font-bold">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO & Launch Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-white tracking-wide">SEO & Launch Status</h3>
              <p className="text-white/30 text-xs mt-1">Technical readiness for Google indexing.</p>
            </div>
            <div className="px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full">
              <span className="text-gold text-[10px] uppercase tracking-widest font-bold">85% Ready</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Technical SEO Schema', status: 'Complete', desc: 'AggregateRating, LimoService, and Breadcrumbs active.', icon: CheckCircle2, color: 'text-emerald-400' },
              { label: 'Sitemap Generation', status: 'Complete', desc: 'sitemap.xml is live and contains all service routes.', icon: CheckCircle2, color: 'text-emerald-400' },
              { label: 'Robots.txt Configuration', status: 'Complete', desc: 'Search engines are permitted to crawl the site.', icon: CheckCircle2, color: 'text-emerald-400' },
              { label: 'Custom Domain Connection', status: 'Pending', desc: 'Connect empirechauffeurnyc.com to start ranking.', icon: AlertCircle, color: 'text-amber-400' },
              { label: 'Google Search Console', status: 'Action Required', desc: 'Submit sitemap to GSC for immediate indexing.', icon: AlertCircle, color: 'text-rose-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                <item.icon size={20} className={cn("shrink-0 mt-0.5", item.color)} />
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white tracking-wide">{item.label}</h4>
                    <span className={cn("text-[9px] uppercase tracking-widest font-bold", item.color)}>{item.status}</span>
                  </div>
                  <p className="text-white/30 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gold p-10 rounded-sm shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <h3 className="text-2xl font-serif font-bold text-bg-primary mb-4">Why am I not on Google yet?</h3>
            <div className="space-y-6 text-bg-primary/80 text-sm font-light leading-relaxed">
              <p>
                <strong className="text-bg-primary font-bold">1. Indexing Delay:</strong> Google takes 4-14 days to crawl new websites. We can speed this up by submitting your sitemap manually.
              </p>
              <p>
                <strong className="text-bg-primary font-bold">2. Development URL:</strong> You are currently viewing the site on a temporary preview URL. Google will only rank your <span className="underline font-medium">official domain</span>.
              </p>
              <p>
                <strong className="text-bg-primary font-bold">3. Local Map Pack:</strong> To appear in the "Map" section, you must verify your <strong className="text-bg-primary font-bold">Google Business Profile</strong>.
              </p>
              <div className="pt-6">
                <button className="w-full bg-bg-primary text-white text-[10px] uppercase tracking-[0.3em] font-bold py-4 hover:bg-white hover:text-black transition-all">
                  View Launch Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / Active Bookings */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-sm overflow-hidden">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-white tracking-wide">Active Operations</h3>
          <button className="text-gold text-[10px] uppercase tracking-widest font-bold hover:underline">View All Operations</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
                <th className="px-10 py-5 border-b border-white/5">Booking ID</th>
                <th className="px-10 py-5 border-b border-white/5">Customer</th>
                <th className="px-10 py-5 border-b border-white/5">Vehicle</th>
                <th className="px-10 py-5 border-b border-white/5">Status</th>
                <th className="px-10 py-5 border-b border-white/5">Pickup</th>
                <th className="px-10 py-5 border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: '#BK-8291', customer: 'Alexander Pierce', vehicle: 'Mercedes S-Class', status: 'In Progress', time: '10:30 AM', color: 'text-blue-400 bg-blue-400/10' },
                { id: '#BK-8292', customer: 'Sarah Jenkins', vehicle: 'Cadillac Escalade', status: 'En Route', time: '11:15 AM', color: 'text-amber-400 bg-amber-400/10' },
                { id: '#BK-8293', customer: 'Michael Chen', vehicle: 'BMW 7 Series', status: 'Confirmed', time: '12:00 PM', color: 'text-emerald-400 bg-emerald-400/10' },
                { id: '#BK-8294', customer: 'Elena Rodriguez', vehicle: 'Tesla Model Y', status: 'Pending', time: '01:30 PM', color: 'text-white/20 bg-white/5' },
              ].map((booking, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-6 border-b border-white/5 font-mono text-xs text-white/30 group-hover:text-gold transition-colors">{booking.id}</td>
                  <td className="px-10 py-6 border-b border-white/5 font-bold text-white tracking-wide">{booking.customer}</td>
                  <td className="px-10 py-6 border-b border-white/5 text-white/40">{booking.vehicle}</td>
                  <td className="px-10 py-6 border-b border-white/5">
                    <span className={cn("px-4 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.15em]", booking.color)}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 border-b border-white/5 text-white/40">{booking.time}</td>
                  <td className="px-10 py-6 border-b border-white/5 text-right">
                    <button className="p-2.5 text-white/10 hover:text-gold transition-all duration-300">
                      <ArrowUpRight size={18} />
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
