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
import { 
  AIRPORT_TRANSFERS_DATA, 
  EXECUTIVE_CAR_DATA, 
  HOURLY_CHAUFFEUR_DATA, 
  CITY_TO_CITY_DATA 
} from './servicesData';

export default function App() {
  return (
    <HelmetProvider>
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
      </Routes>
      </Router>
      </BookingProvider>
    </HelmetProvider>
  );
}

