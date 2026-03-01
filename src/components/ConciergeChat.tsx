import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Phone, MessageCircle } from 'lucide-react';

interface ConciergeChatProps {
  onQuoteClick: () => void;
}

export const ConciergeChat: React.FC<ConciergeChatProps> = ({ onQuoteClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/13053219622', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-serif font-bold">E</span>
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold">Live Concierge</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/40">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-64 p-4 overflow-y-auto space-y-4 bg-black/20">
              <div className="flex flex-col space-y-1">
                <div className="bg-white/5 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[85%]">
                  <p className="text-xs text-white/80 leading-relaxed">
                    Welcome to Empire Chauffeur NYC. How may I assist with your executive transportation needs today?
                  </p>
                </div>
                <span className="text-[9px] text-white/20 ml-1">Concierge • Just now</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors">
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center space-x-3">
                <a href="tel:+13053219622" className="flex items-center space-x-1 text-[10px] text-white/40 hover:text-gold transition-colors">
                  <Phone size={12} />
                  <span>Call</span>
                </a>
                <div className="w-px h-3 bg-white/10" />
                <button 
                  onClick={handleWhatsApp}
                  className="flex items-center space-x-1 text-[10px] text-white/40 hover:text-emerald-500 transition-colors"
                >
                  <MessageCircle size={12} />
                  <span>WhatsApp</span>
                </button>
                <div className="w-px h-3 bg-white/10" />
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onQuoteClick();
                  }}
                  className="text-[10px] text-white/40 hover:text-gold transition-colors"
                >
                  Submit for Review
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full gold-gradient shadow-xl flex items-center justify-center text-black hover:scale-110 transition-transform duration-300 group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-black flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
          </span>
        )}
      </button>
    </div>
  );
};
