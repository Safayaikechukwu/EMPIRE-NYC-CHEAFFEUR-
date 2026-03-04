import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Clock
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
    { name: 'Fleet', href: '/admin/fleet', icon: Car },
    { name: 'Chauffeurs', href: '/admin/chauffeurs', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Simple logout logic
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex font-sans">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/5 transition-transform duration-300 lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full lg:w-20"
      )}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            <Link to="/admin" className={cn("flex flex-col transition-opacity", !isSidebarOpen && "lg:opacity-0")}>
              <span className="text-lg font-serif font-bold tracking-widest text-white">
                EMPIRE <span className="text-[#D4AF37]">ADMIN</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/50 -mt-1 font-bold">
                Control Center
              </span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group",
                    isActive 
                      ? "bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/20" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={20} className={cn(isActive ? "text-black" : "text-white/40 group-hover:text-[#D4AF37]")} />
                  <span className={cn("text-sm tracking-wide", !isSidebarOpen && "lg:hidden")}>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all group"
            >
              <LogOut size={20} />
              <span className={cn("text-sm font-medium", !isSidebarOpen && "lg:hidden")}>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#111111]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block text-white/40 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search bookings, vehicles..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-[#D4AF37]/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-[#111111]" />
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Admin User</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-black font-bold text-xs">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-grow overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
