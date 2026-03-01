import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Corporate', href: '#corporate' },
    { name: 'About', href: '#about' },
    { name: 'Safety', href: '#safety' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'z-[1001] bg-black' : 'z-[1000]'
      } ${
        !isMobileMenuOpen && isScrolled 
          ? 'bg-black/95 backdrop-blur-xl py-2.5 border-b border-white/10 shadow-2xl shadow-black/50' 
          : !isMobileMenuOpen ? 'bg-transparent py-4 md:py-6 border-b border-transparent' : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col group shrink-0">
          <span className="text-sm sm:text-base md:text-lg font-serif font-bold tracking-widest text-white transition-colors group-hover:text-gold">
            EMPIRE <span className="text-gold group-hover:text-white">CHAUFFEUR</span>
          </span>
          <span className="text-[6px] sm:text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/60 -mt-1">
            New York City
          </span>
        </a>

        {/* Desktop Links - More compact spacing */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 ml-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[9px] xl:text-[10px] uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-all duration-300 relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Actions - More compact */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <a 
            href="https://wa.me/13053219622"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-emerald-500 transition-all duration-300 group"
          >
            <MessageCircle size={14} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] xl:text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
          </a>
          <a 
            href="tel:+13053219622" 
            className="flex items-center space-x-2 text-white hover:text-gold transition-all duration-300 group"
          >
            <Phone size={12} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] xl:text-[11px] font-semibold tracking-wider whitespace-nowrap">(305) 321-9622</span>
          </a>
          <button 
            onClick={onBookClick}
            className="primary-button py-2 px-4 xl:px-5 text-[8px] xl:text-[9px] tracking-[0.15em] whitespace-nowrap"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center space-x-1 sm:space-x-3">
          <a href="https://wa.me/13053219622" target="_blank" rel="noopener noreferrer" className="text-emerald-500 p-2 hover:bg-white/5 rounded-full transition-colors">
            <MessageCircle size={20} />
          </a>
          <a href="tel:+13053219622" className="text-gold p-2 hover:bg-white/5 rounded-full transition-colors">
            <Phone size={20} />
          </a>
          <button 
            className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-black z-[1001] lg:hidden flex flex-col"
            >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold tracking-widest text-white">
                  EMPIRE <span className="text-gold">CHAUFFEUR</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 -mt-1">New York City</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white p-2 hover:text-gold transition-colors"
                aria-label="Close Menu"
              >
                <X size={28} />
              </button>
            </div>
            
            {/* Mobile Menu Links - Reduced size */}
            <div className="flex-grow flex flex-col justify-center items-center space-y-6 p-6 py-10 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  key={link.name} 
                  href={link.href}
                  className="text-xl sm:text-2xl font-serif text-white hover:text-gold transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Footer / CTAs */}
            <div className="p-6 pb-10 border-t border-white/10 space-y-6 bg-charcoal/80 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="tel:+13053219622" 
                  className="flex flex-col items-center justify-center py-4 px-2 border border-white/10 rounded-sm hover:bg-white/5 transition-all group"
                >
                  <Phone size={18} className="text-gold mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] uppercase tracking-widest text-white/40">Call Us</span>
                  <span className="text-[11px] font-bold text-white mt-1">(305) 321-9622</span>
                </a>
                <a 
                  href="https://wa.me/13053219622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-2 border border-white/10 rounded-sm hover:bg-white/5 transition-all group"
                >
                  <MessageCircle size={18} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] uppercase tracking-widest text-white/40">WhatsApp</span>
                  <span className="text-[11px] font-bold text-white mt-1">Chat Now</span>
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
    </nav>
  );
};
