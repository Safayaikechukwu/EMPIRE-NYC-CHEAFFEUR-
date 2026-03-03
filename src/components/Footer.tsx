import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Sun, 
  Moon, 
  MapPin, 
  Phone, 
  Mail, 
  Globe 
} from 'lucide-react';
import { useTheme } from './ThemeContext';

export const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer id="contact" className="bg-bg-primary pt-24 pb-12 border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-widest text-text-primary">
                EMPIRE <span className="text-gold">CHAUFFEUR</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary -mt-1">
                New York City
              </span>
            </div>
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              NYC's premier executive transportation firm. Providing discreet, reliable, and professional chauffeur services for over 20 years.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                  <Twitter size={18} />
                </a>
              </div>
              <div className="w-px h-8 bg-border-primary mx-2" />
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-text-primary text-xs uppercase tracking-widest font-bold mb-8">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Our Fleet', href: '/fleet' },
                { name: 'Locations', href: '/locations' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">{link.name}</a>
                  ) : (
                    <Link to={link.href} className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary text-xs uppercase tracking-widest font-bold mb-8">Services</h4>
            <ul className="space-y-4">
              {[
                { name: 'Airport Transfers', href: '/services/airport-transfers' },
                { name: 'Executive Car Service', href: '/services/executive-car-service' },
                { name: 'Hourly Chauffeur', href: '/services/hourly-chauffeur' },
                { name: 'City-to-City', href: '/services/city-to-city' },
                { name: 'Beyond Airport', href: '/beyond-airport' },
                { name: 'Service Areas', href: '/service-areas' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary text-xs uppercase tracking-widest font-bold mb-8">Airports</h4>
            <ul className="space-y-4">
              {['JFK International', 'LaGuardia Airport', 'Newark Liberty', 'Teterboro (Private)', 'Westchester County', 'MacArthur Airport'].map((airport) => (
                <li key={airport}>
                  <a href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">{airport}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary text-xs uppercase tracking-widest font-bold mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <span className="text-text-secondary text-sm font-light leading-relaxed">
                  750 Lexington Ave, <br />New York, NY 10022
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold shrink-0" />
                <a href="tel:+13053219622" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">(305) 321-9622</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:hello@empirechauffeurnyc.com" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">hello@empirechauffeurnyc.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe size={18} className="text-gold shrink-0" />
                <a href="https://www.empirechauffeurnyc.com/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light">empirechauffeurnyc.com</a>
              </li>
            </ul>
            
            {/* Payment Methods */}
            <div className="mt-10 pt-10 border-t border-border-primary">
              <span className="text-[9px] uppercase tracking-[0.2em] text-text-secondary font-bold mb-4 block">Accepted Payments</span>
              <div className="flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border-primary flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-text-secondary/70 text-[10px] uppercase tracking-widest">
              © 2025 Empire Chauffeur NYC. All Rights Reserved. TLC License #B02567.
            </p>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border-primary hover:bg-text-primary/5 transition-all text-text-secondary hover:text-text-primary"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={14} className="text-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">Dark Mode</span>
                </>
              )}
            </button>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-text-secondary/70 hover:text-text-primary transition-colors text-[10px] uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-text-secondary/70 hover:text-text-primary transition-colors text-[10px] uppercase tracking-widest">Terms of Service</a>
            <a href="#" className="text-text-secondary/70 hover:text-text-primary transition-colors text-[10px] uppercase tracking-widest">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
