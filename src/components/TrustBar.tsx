import React from 'react';
import { motion } from 'motion/react';
import { TRUST_FEATURES } from '../constants';

export const TrustBar = () => {
  // Duplicate the features to create a seamless loop
  const duplicatedFeatures = [...TRUST_FEATURES, ...TRUST_FEATURES, ...TRUST_FEATURES, ...TRUST_FEATURES];

  return (
    <div className="bg-charcoal border-y border-border-primary py-6 overflow-hidden relative">
      {/* Gradient Mask for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal via-charcoal/80 to-transparent z-10" />
      
      <div className="flex">
        <motion.div 
          className="flex items-center space-x-12 md:space-x-24 px-6"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 shrink-0 group">
              <div className="p-2.5 rounded-full bg-text-primary/5 group-hover:bg-gold/10 transition-colors border border-border-primary">
                <feature.icon size={16} className="text-gold" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-text-secondary font-medium whitespace-nowrap">
                {feature.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
