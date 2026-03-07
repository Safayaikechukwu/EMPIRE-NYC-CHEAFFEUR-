import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Car, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Clock,
  FileText
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
    { name: 'Fleet', href: '/admin/fleet', icon: Car },
    { name: 'Chauffeurs', href: '/admin/chauffeurs', icon: Users },
    { name: 'Blog', href: '/admin/blogs', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-gold/30">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0A0A] border-r border-white/5 transition-all duration-500 ease-in-out lg:relative lg:translate-x-0 shadow-2xl shadow-black",
        !isSidebarOpen && "-translate-x-full lg:w-24"
      )}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-8 flex items-center justify-between">
            <Link to="/admin" className={cn("flex flex-col transition-all duration-500", !isSidebarOpen && "lg:opacity-0 lg:scale-0")}>
              <span className="text-xl font-serif font-bold tracking-[0.2em] text-white">
                EMPIRE <span className="text-gold">ADMIN</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 mt-1 font-bold">
                Executive Control
              </span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white/30 hover:text-gold transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-6 space-y-2 mt-8">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-4 px-5 py-4 rounded-sm transition-all duration-300 group relative overflow-hidden",
                    isActive 
                      ? "bg-gold text-bg-primary font-bold shadow-xl shadow-gold/10" 
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={20} className={cn(isActive ? "text-bg-primary" : "text-white/20 group-hover:text-gold transition-colors")} />
                  <span className={cn("text-sm tracking-widest uppercase font-bold transition-all duration-500", !isSidebarOpen && "lg:opacity-0 lg:translate-x-10")}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-6 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-5 py-4 text-white/30 hover:text-red-400 hover:bg-red-400/5 rounded-sm transition-all group"
            >
              <LogOut size={20} />
              <span className={cn("text-xs uppercase tracking-widest font-bold", !isSidebarOpen && "lg:hidden")}>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 bg-[#050505]">
        {/* Top Header */}
        <header className="h-20 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block text-white/20 hover:text-gold transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search operations..." 
                className="bg-white/5 border border-white/10 rounded-sm py-2.5 pl-12 pr-6 text-xs focus:outline-none focus:border-gold/50 w-80 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <button className="relative text-white/20 hover:text-gold transition-colors">
                <Bell size={22} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-gold rounded-full border-2 border-[#0A0A0A]" />
              </button>
            </div>
            
            <div className="h-8 w-px bg-white/5" />

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white tracking-wider uppercase">{user?.username || 'ADMINISTRATOR'}</p>
                <p className="text-[9px] text-gold uppercase tracking-[0.3em] font-bold">Empire Chauffeur NYC</p>
              </div>
              <div className="w-10 h-10 rounded-sm bg-gold flex items-center justify-center text-bg-primary font-bold text-sm shadow-lg shadow-gold/10 uppercase">
                {user?.username?.substring(0, 2) || 'AD'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 flex-grow overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
