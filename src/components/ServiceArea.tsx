import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for Leaflet default icon issue in Vite
import 'leaflet/dist/leaflet.css';

const areas = [
  { name: 'Manhattan', coords: [40.7831, -73.9712], description: 'Financial District, Midtown, Upper East & West Side' },
  { name: 'Brooklyn', coords: [40.6782, -73.9442], description: 'Williamsburg, DUMBO, Park Slope, Brooklyn Heights' },
  { name: 'Queens', coords: [40.7282, -73.7949], description: 'Long Island City, Astoria, Forest Hills' },
  { name: 'Bronx', coords: [40.8448, -73.8648], description: 'Riverdale, Fordham, Pelham Bay' },
  { name: 'Staten Island', coords: [40.5795, -74.1502], description: 'St. George, Todt Hill, Great Kills' },
  { name: 'Jersey City', coords: [40.7178, -74.0431], description: 'Exchange Place, Newport, Downtown' },
  { name: 'Greenwich, CT', coords: [41.0262, -73.6282], description: 'Premium transfers to/from Connecticut' },
  { name: 'The Hamptons', coords: [40.8943, -72.4303], description: 'Luxury weekend getaways and events' }
];

// Custom component to handle map movement
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true });
  return null;
};

const customIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #C5A059; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(197, 160, 89, 0.8);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

export const ServiceArea = () => {
  const [activeCoords, setActiveCoords] = useState<[number, number]>([40.7128, -74.0060]);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              Coverage
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Our Service Areas</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Empire Chauffeur NYC provides comprehensive executive transportation across the entire Tri-State area. We offer seamless transfers between all major hubs and residential enclaves.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areas.map((area, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => {
                    setActiveCoords(area.coords as [number, number]);
                    setHoveredArea(area.name);
                  }}
                  onMouseLeave={() => setHoveredArea(null)}
                  className={`flex items-start space-x-3 p-3 rounded-sm transition-all duration-300 cursor-pointer border ${
                    hoveredArea === area.name 
                      ? 'bg-white/5 border-gold/30 translate-x-2' 
                      : 'bg-transparent border-transparent'
                  }`}
                >
                  <MapPin size={18} className={`${hoveredArea === area.name ? 'text-gold' : 'text-gold/50'} mt-1 shrink-0 transition-colors`} />
                  <div>
                    <h4 className="text-white font-medium text-sm">{area.name}</h4>
                    <p className="text-white/30 text-[10px] font-light leading-tight">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex items-center space-x-4 text-white/40">
              <Navigation size={16} className="text-gold" />
              <span className="text-xs uppercase tracking-widest font-medium">Real-time coverage across NY, NJ, & CT</span>
            </div>
          </div>

          <div className="relative h-[550px] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <MapContainer 
              center={[40.7128, -74.0060]} 
              zoom={10} 
              style={{ height: '100%', width: '100%', background: '#121212' }}
              zoomControl={false}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <MapController center={activeCoords} />
              
              {areas.map((area, idx) => (
                <Marker 
                  key={idx} 
                  position={area.coords as [number, number]} 
                  icon={customIcon}
                >
                  <Popup className="custom-popup">
                    <div className="p-1">
                      <h3 className="font-serif text-gold font-bold">{area.name}</h3>
                      <p className="text-xs text-charcoal">{area.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Overlays */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-charcoal/50 z-[1000]" />
            <div className="absolute top-6 left-6 z-[1000] bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Live Service Map</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-[1000] bg-black/90 backdrop-blur-xl p-6 border border-white/10">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-serif text-white mb-1">Tri-State Network</h3>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">24/7 Executive Dispatch</p>
                </div>
                <div className="text-right">
                  <span className="text-gold text-2xl font-serif">100%</span>
                  <p className="text-white/30 text-[8px] uppercase tracking-tighter">On-Time Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leaflet-container {
          filter: grayscale(0.2) contrast(1.1);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: #121212;
          color: white;
          border-radius: 2px;
          border: 1px solid rgba(197, 160, 89, 0.3);
        }
        .custom-popup .leaflet-popup-tip {
          background: #121212;
        }
        .leaflet-bar {
          border: none !important;
        }
      `}</style>
    </section>
  );
};
