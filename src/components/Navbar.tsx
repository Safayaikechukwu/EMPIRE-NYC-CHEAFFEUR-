import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle, Sun, Moon } from 'lucide-react';
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
    { name: 'Home', href: '/' },
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

  const scrolledTextColor = 'text-text-primary';
  const scrolledSecondaryTextColor = 'text-text-secondary';
  const scrolledHoverColor = 'hover:text-gold';

  const isHomePage = location.pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 w-full transition-all duration-500 ease-in-out z-[1000] ${
        isScrolled 
          ? 'bg-bg-primary/95 backdrop-blur-xl py-2.5 border-b border-border-primary shadow-lg' 
          : isHomePage
            ? 'bg-black/20 backdrop-blur-sm py-4 md:py-6 border-b border-white/5'
            : 'bg-bg-primary py-4 md:py-6 border-b border-border-primary'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col group shrink-0">
          <span className={`text-sm sm:text-base md:text-lg font-serif font-bold tracking-widest transition-colors ${
            isScrolled || !isHomePage ? scrolledTextColor : 'text-white'
          }`}>
            EMPIRE <span className="text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">CHAUFFEUR</span>
          </span>
          <span className={`text-[6px] sm:text-[7px] md:text-[8px] uppercase tracking-[0.4em] -mt-1 font-medium transition-colors ${
            isScrolled || !isHomePage ? scrolledSecondaryTextColor : 'text-white/60'
          }`}>
            New York City
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 ml-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                to={link.href}
                className={`text-[9px] xl:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-2 font-semibold flex items-center ${
                  isScrolled || !isHomePage ? scrolledTextColor + ' ' + scrolledHoverColor : 'text-white/90 hover:text-gold'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
              
              {link.subLinks && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform group-hover:translate-y-0 translate-y-2 z-[1002]">
                  <div className="bg-bg-primary/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 min-w-[280px] rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
                    <div className="flex flex-col space-y-5">
                      {link.subLinks.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.href}
                          className="text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-gold transition-all font-bold flex items-center group/item"
                        >
                          <span className="w-0 group-hover/item:w-4 h-px bg-gold mr-0 group-hover/item:mr-3 transition-all duration-300" />
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

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <a 
            href="https://wa.me/13053219622"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 transition-all duration-300 group ${
              isScrolled || !isHomePage ? 'text-text-secondary hover:text-emerald-500' : 'text-white hover:text-emerald-500'
            }`}
          >
            <MessageCircle size={14} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] xl:text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>
          <a 
            href="tel:+13053219622" 
            className={`flex items-center space-x-2 transition-all duration-300 group ${
              isScrolled || !isHomePage ? 'text-text-secondary hover:text-gold' : 'text-white hover:text-gold'
            }`}
          >
            <Phone size={12} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] xl:text-[11px] font-bold tracking-widest whitespace-nowrap">(305) 321-9622</span>
          </a>
          <button 
            onClick={onBookClick}
            className="primary-button py-2 px-4 xl:px-6 text-[8px] xl:text-[9px] tracking-[0.2em] whitespace-nowrap shadow-md hover:shadow-gold/20"
          >
            Book Now
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors rounded-full hover:bg-text-primary/5 ${
              isScrolled || !isHomePage ? scrolledSecondaryTextColor + ' hover:text-gold' : 'text-white/60 hover:text-gold'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button 
            className={`p-2 rounded-full transition-colors ${
              isScrolled || !isHomePage ? scrolledTextColor : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-bg-primary z-[1001] lg:hidden flex flex-col"
            >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-primary">
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
            <div className="flex-grow flex flex-col justify-center items-center space-y-6 p-6 py-12 overflow-y-auto">
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
            <div className="p-6 pb-10 border-t border-border-primary space-y-6 bg-charcoal/80 backdrop-blur-xl">
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
                className="primary-button w-full py-4 text-[11px] tracking-[0.2em]"
              >
                Submit for Review to Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
