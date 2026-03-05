import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' ? window.scrollY > 50 : false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { 
      name: 'Services', 
      href: '/services',
      subLinks: [
        { name: 'Airport Transfers', href: '/services/airport-transfers' },
        { name: 'Executive Car Service', href: '/services/executive-car-service' },
        { name: 'Hourly Chauffeur', href: '/services/hourly-chauffeur' },
        { name: 'City-to-City', href: '/services/city-to-city' },
        { name: 'Beyond Airport', href: '/beyond-airport' },
        { name: 'Service Areas', href: '/service-areas' }
      ]
    },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Locations', href: '/locations' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header 
      className="fixed top-0 left-0 w-full z-[1000] pointer-events-none px-4 pt-4 md:pt-6"
    >
      <motion.nav 
        initial={false}
        animate={{
          width: isScrolled ? 'auto' : '100%',
          maxWidth: isScrolled ? '1000px' : '1280px',
          paddingLeft: isScrolled ? '24px' : '32px',
          paddingRight: isScrolled ? '12px' : '32px',
          backgroundColor: isScrolled ? 'var(--bg-primary)' : isHomePage ? 'rgba(0,0,0,0.2)' : 'var(--bg-primary)',
          backdropFilter: 'blur(16px)',
          borderRadius: isScrolled ? '9999px' : '4px',
          boxShadow: isScrolled ? '0 20px 50px rgba(0,0,0,0.3)' : '0 0 0 rgba(0,0,0,0)',
          borderWidth: '1px',
          borderColor: isScrolled || !isHomePage ? 'var(--border-primary)' : 'rgba(255,255,255,0.1)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="mx-auto flex items-center justify-between pointer-events-auto h-14 md:h-16"
      >
        {/* Logo */}
        <Link to="/" className="flex flex-col group shrink-0">
          <span className={`text-xs sm:text-sm md:text-base font-serif font-bold tracking-widest transition-colors ${
            isScrolled || !isHomePage ? 'text-text-primary' : 'text-white'
          }`}>
            EMPIRE <span className="text-gold">CHAUFFEUR</span>
          </span>
          <span className={`text-[5px] sm:text-[6px] md:text-[7px] uppercase tracking-[0.4em] -mt-0.5 font-medium transition-colors ${
            isScrolled || !isHomePage ? 'text-text-secondary' : 'text-white/60'
          }`}>
            New York City
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                to={link.href}
                className={`text-[9px] xl:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-2 font-bold flex items-center ${
                  isScrolled || !isHomePage ? 'text-text-primary hover:text-gold' : 'text-white/90 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
              
              {link.subLinks && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform group-hover:translate-y-0 translate-y-2 z-[1002]">
                  <div className="bg-bg-primary/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 min-w-[240px] rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
                    <div className="flex flex-col space-y-4">
                      {link.subLinks.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.href}
                          className="text-[9px] uppercase tracking-[0.2em] text-text-secondary hover:text-gold transition-all font-bold flex items-center group/item"
                        >
                          <span className="w-0 group-hover/item:w-3 h-px bg-gold mr-0 group-hover/item:mr-2 transition-all duration-300" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Actions - Grouped */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className={`flex items-center bg-black/5 rounded-full p-1 border border-border-primary/50 ${
            isScrolled || !isHomePage ? 'bg-text-primary/5' : 'bg-white/5'
          }`}>
            <a 
              href="https://wa.me/13053219622"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-emerald-500/10 rounded-full transition-colors group"
              title="WhatsApp"
            >
              <MessageCircle size={14} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="tel:+13053219622" 
              className="p-2 hover:bg-gold/10 rounded-full transition-colors group"
              title="Call Us"
            >
              <Phone size={14} className="text-gold group-hover:scale-110 transition-transform" />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-text-primary/10 rounded-full transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} className="text-gold" /> : <Moon size={14} className="text-gold" />}
            </button>
          </div>
          
          <button 
            onClick={onBookClick}
            className="primary-button py-2.5 px-6 text-[9px] tracking-[0.2em] whitespace-nowrap !bg-gold !text-white hover:!bg-white hover:!text-black transition-all duration-300 rounded-full h-10 flex items-center justify-center"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors rounded-full ${
              isScrolled || !isHomePage ? 'text-text-primary' : 'text-white'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className={`p-2 rounded-full transition-colors ${
              isScrolled || !isHomePage ? 'text-text-primary' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

    {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[9999] lg:hidden flex flex-col shadow-2xl"
            style={{ 
              backgroundColor: 'var(--bg-primary)',
              opacity: 1,
              visibility: 'visible'
            }}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-primary shrink-0 bg-bg-primary">
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold tracking-widest text-text-primary">
                  EMPIRE <span className="text-gold">CHAUFFEUR</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary -mt-1">New York City</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-text-secondary hover:text-gold transition-colors rounded-full border border-border-primary"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-text-primary p-2 hover:text-gold transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={28} />
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Links - Reduced size */}
            <div className="flex-grow flex flex-col justify-center items-center space-y-6 p-6 py-12 overflow-y-auto bg-bg-primary">
              {navLinks.map((link, i) => (
                <div key={link.name} className="w-full text-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      to={link.href}
                      className="text-2xl sm:text-3xl font-serif text-text-primary hover:text-gold transition-colors py-2 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                  
                  {link.subLinks && (
                    <div className="flex flex-col space-y-3 mt-3 mb-6">
                      {link.subLinks.map((sub, j) => (
                        <motion.div
                          key={sub.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 + j * 0.03 }}
                        >
                          <Link
                            to={sub.href}
                            className="text-xs uppercase tracking-[0.3em] text-text-secondary hover:text-gold transition-colors py-1.5 block font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Footer / CTAs */}
            <div className="p-6 pb-10 border-t border-border-primary space-y-6 bg-charcoal/80 backdrop-blur-xl shrink-0">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="tel:+13053219622" 
                  className="flex flex-col items-center justify-center py-4 px-2 border border-border-primary rounded-sm hover:bg-text-primary/5 transition-all group"
                >
                  <Phone size={18} className="text-gold mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] uppercase tracking-widest text-text-secondary">Call Us</span>
                  <span className="text-[11px] font-bold text-text-primary mt-1">(305) 321-9622</span>
                </a>
                <a 
                  href="https://wa.me/13053219622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-2 border border-border-primary rounded-sm hover:bg-text-primary/5 transition-all group"
                >
                  <MessageCircle size={18} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] uppercase tracking-widest text-text-secondary">WhatsApp</span>
                  <span className="text-[11px] font-bold text-text-primary mt-1">Chat Now</span>
                </a>
              </div>
              
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-5 bg-gold text-white text-[11px] uppercase tracking-[0.3em] font-bold rounded-full shadow-lg shadow-gold/20 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Book Your Chauffeur</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
