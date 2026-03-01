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
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'z-[100]' : 'z-50'
      } ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-lg py-3 border-b border-white/10 shadow-2xl shadow-black/50' 
          : 'bg-transparent py-5 md:py-8 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col group shrink-0">
          <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-white transition-colors group-hover:text-gold">
            EMPIRE <span className="text-gold group-hover:text-white">CHAUFFEUR</span>
          </span>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/60 -mt-1">
            New York City
          </span>
        </a>

        {/* Desktop Links - Improved spacing from logo */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-12 ml-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] xl:text-[11px] uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-all duration-300 relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Actions - Improved legibility */}
        <div className="hidden lg:flex items-center space-x-6">
          <a 
            href="https://wa.me/13053219622"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-emerald-500 transition-all duration-300"
            title="WhatsApp Us"
          >
            <MessageCircle size={16} className="text-emerald-500" />
            <span className="text-[11px] font-medium uppercase tracking-wider">WhatsApp</span>
          </a>
          <a 
            href="tel:+13053219622" 
            className="flex items-center space-x-3 text-white hover:text-gold transition-all duration-300"
          >
            <Phone size={14} className="text-gold" />
            <span className="text-[12px] font-semibold tracking-wider">(305) 321-9622</span>
          </a>
          <button 
            onClick={onBookClick}
            className="primary-button py-2.5 px-6"
          >
            Submit for Review to Call
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[100] lg:hidden flex flex-col"
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
            
            {/* Mobile Menu Links */}
            <div className="flex-grow flex flex-col justify-center items-center space-y-6 p-6 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  key={link.name} 
                  href={link.href}
                  className="text-3xl font-serif text-white hover:text-gold transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Footer / CTAs */}
            <div className="p-8 border-t border-white/10 space-y-4 bg-charcoal/50 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="tel:+13053219622" 
                  className="flex flex-col items-center justify-center p-4 border border-white/10 rounded-sm hover:bg-white/5 transition-all group"
                >
                  <Phone size={20} className="text-gold mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase tracking-widest text-white/60">Call Us</span>
                  <span className="text-xs font-bold text-white mt-1">(305) 321-9622</span>
                </a>
                <a 
                  href="https://wa.me/13053219622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 border border-white/10 rounded-sm hover:bg-white/5 transition-all group"
                >
                  <MessageCircle size={20} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase tracking-widest text-white/60">WhatsApp</span>
                  <span className="text-xs font-bold text-white mt-1">Chat Now</span>
                </a>
              </div>
              
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="primary-button w-full"
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
