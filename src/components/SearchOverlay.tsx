import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchableItems = [
    { name: 'Airport Transfers', category: 'Service', link: '/services' },
    { name: 'Corporate Travel', category: 'Service', link: '/services' },
    { name: 'Wedding Chauffeur', category: 'Service', link: '/services' },
    { name: 'Night on the Town', category: 'Service', link: '/services' },
    { name: 'Hourly Charter', category: 'Service', link: '/services' },
    { name: 'Long Distance', category: 'Service', link: '/services' },
    { name: 'Mercedes S-Class', category: 'Vehicle', link: '/fleet' },
    { name: 'Cadillac Escalade', category: 'Vehicle', link: '/fleet' },
    { name: 'Mercedes Sprinter', category: 'Vehicle', link: '/fleet' },
    { name: 'Rolls Royce Ghost', category: 'Vehicle', link: '/fleet' },
  ];

  const filteredItems = searchableItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] bg-bg-primary/95 backdrop-blur-xl flex flex-col pointer-events-auto"
        >
          <div className="max-w-4xl mx-auto w-full px-6 pt-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif text-text-primary">Search <span className="italic text-gold">Empire</span></h2>
              <button 
                onClick={() => {
                  onClose();
                  setSearchQuery('');
                }}
                className="text-text-secondary hover:text-text-primary transition-colors p-2"
              >
                <X size={32} />
              </button>
            </div>

            <div className="relative mb-12">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold" size={24} />
              <input
                autoFocus
                type="text"
                placeholder="Search services, vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-text-primary/5 border-b-2 border-gold/30 focus:border-gold py-6 pl-16 pr-6 text-2xl text-text-primary outline-none transition-colors font-light"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {searchQuery && filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    onClick={() => {
                      onClose();
                      setSearchQuery('');
                    }}
                    className="group flex items-center justify-between p-6 bg-text-primary/5 border border-border-primary hover:border-gold transition-all"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold mb-1">{item.category}</p>
                      <h4 className="text-xl font-serif text-text-primary group-hover:text-gold transition-colors">{item.name}</h4>
                    </div>
                    <ArrowRight size={20} className="text-text-secondary group-hover:text-gold group-hover:translate-x-2 transition-all" />
                  </Link>
                ))
              ) : searchQuery ? (
                <div className="col-span-full py-12 text-center">
                  <p className="text-text-secondary">No results found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="col-span-full">
                  <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-6">Popular Searches</p>
                  <div className="flex flex-wrap gap-3">
                    {['Airport', 'S-Class', 'Wedding', 'Escalade', 'Corporate'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 bg-text-primary/5 border border-border-primary rounded-full text-xs text-text-secondary hover:text-gold hover:border-gold transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
