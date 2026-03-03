import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BookingModal } from './BookingModal';
import { TawkChat } from './TawkChat';
import { useBooking } from '../context/BookingContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isBookingModalOpen, openBookingModal, closeBookingModal } = useBooking();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-gold selection:text-bg-primary">
      <Navbar onBookClick={openBookingModal} />
      <TawkChat />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
      
      <main className={`relative ${isHomePage ? '' : 'pt-20 md:pt-24 lg:pt-28'}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};
