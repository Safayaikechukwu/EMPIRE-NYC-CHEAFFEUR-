import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BookingModal } from './BookingModal';
import { TawkChat } from './TawkChat';
import { SearchOverlay } from './SearchOverlay';
import { useBooking } from '../context/BookingContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isBookingModalOpen, openBookingModal, closeBookingModal } = useBooking();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-gold selection:text-bg-primary">
      <Navbar onBookClick={openBookingModal} />
      <TawkChat />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {!isHomePage && (
        <div className="absolute top-20 md:top-24 left-0 w-full z-[900] px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate('/');
                }
              }}
              className="flex items-center space-x-2 text-text-secondary hover:text-gold transition-colors group pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center group-hover:border-gold transition-colors">
                <ChevronLeft size={16} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">Back</span>
            </button>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 text-text-secondary hover:text-gold transition-colors group pointer-events-auto"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold">Search</span>
              <div className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center group-hover:border-gold transition-colors">
                <Search size={16} />
              </div>
            </button>
          </div>
        </div>
      )}

      <main className={`relative ${isHomePage ? '' : 'pt-24 md:pt-28 lg:pt-32'}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};
