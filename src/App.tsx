/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BookingProvider } from './context/BookingContext';
import { ScrollToTop } from './components/ScrollToTop';
import { SEO } from './components/SEO';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { Services } from './pages/Services';
import { Locations } from './pages/Locations';
import { BeyondAirport } from './pages/BeyondAirport';
import { ServiceAreas } from './pages/ServiceAreas';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminBookings } from './admin/AdminBookings';
import { AdminFleet } from './admin/AdminFleet';
import { AdminChauffeurs } from './admin/AdminChauffeurs';
import { AdminBlogs } from './admin/AdminBlogs';
import { AdminLogin } from './admin/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  AIRPORT_TRANSFERS_DATA, 
  EXECUTIVE_CAR_DATA, 
  HOURLY_CHAUFFEUR_DATA, 
  CITY_TO_CITY_DATA 
} from './servicesData';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <ScrollToTop />
          <SEO />
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/airport-transfers" element={<ServiceDetail {...AIRPORT_TRANSFERS_DATA} />} />
          <Route path="/services/executive-car-service" element={<ServiceDetail {...EXECUTIVE_CAR_DATA} />} />
          <Route path="/services/hourly-chauffeur" element={<ServiceDetail {...HOURLY_CHAUFFEUR_DATA} />} />
          <Route path="/services/city-to-city" element={<ServiceDetail {...CITY_TO_CITY_DATA} />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/beyond-airport" element={<BeyondAirport />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Admin Routes */}
          <Route path="/ADMIN" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/fleet" element={<ProtectedRoute><AdminLayout><AdminFleet /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/chauffeurs" element={<ProtectedRoute><AdminLayout><AdminChauffeurs /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><AdminLayout><AdminBlogs /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><div className="p-8 text-white/40 uppercase tracking-widest font-bold">Settings Coming Soon</div></AdminLayout></ProtectedRoute>} />
        </Routes>
        </Router>
        </BookingProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

