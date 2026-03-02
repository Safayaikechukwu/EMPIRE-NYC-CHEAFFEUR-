/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { Services } from './pages/Services';
import { Locations } from './pages/Locations';
import { BeyondAirport } from './pages/BeyondAirport';
import { ServiceAreas } from './pages/ServiceAreas';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/services" element={<Services />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/beyond-airport" element={<BeyondAirport />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
      </Routes>
    </Router>
  );
}

