import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingModule } from './BookingModule';

const images = [
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop"
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={images[currentIndex]} 
              alt="Luxury Transportation"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Layered Overlays for Depth and Readability - Always dark to protect white text */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-hero-radial z-10" />
        <div className="hero-overlay" />
      </div>

      {/* Content - Using flex-grow and padding to ensure it stays below navbar and centered in remaining space */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 md:pt-44 lg:pt-52 pb-20 w-full flex-grow flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center space-y-4 mb-8"
        >
          <span className="text-gold text-[9px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-shadow-sm whitespace-nowrap">
            Private Executive Transportation
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-white mb-8 leading-[1.1] tracking-tight shadow-black/50 [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]"
        >
          New York's Premier <br />
          <span className="italic text-white/90">Executive Chauffeur</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/80 max-w-3xl mb-12 font-light tracking-wide leading-relaxed text-shadow-sm"
        >
          Reliable, Professional, and Always On-Time. Experience the Gold Standard of NYC Transportation for over 20 Years.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full flex justify-center"
        >
          <BookingModule />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};
