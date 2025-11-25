import React, { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onSearch: (query: string) => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, toggleMenu, isMenuOpen }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-yellow-400 text-gray-900 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Left: Menu and Branding */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMenu}
            className="p-1 hover:bg-yellow-500 rounded transition-colors text-gray-900"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <span className="font-bold text-sm tracking-wider hidden sm:block text-gray-800">MENU</span>
          
          <div className="flex items-center gap-3 ml-2 sm:ml-4">
            {/* School Logo */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center relative">
               <img 
                 src="https://i.ibb.co/SwZXppdP/logo-ceb.png" 
                 onError={(e) => {
                   // Fallback if the direct link fails, trying to be robust
                   (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/3069/3069172.png";
                 }}
                 alt="Centro Educacional Base" 
                 className="w-full h-full object-contain drop-shadow-sm" 
               />
            </div>
            
            {/* Journal Logo Image */}
            <div className="h-10 sm:h-14 flex items-center">
              <img 
                src="https://i.ibb.co/C34B0D9y/logo-jornal.png" 
                onError={(e) => {
                   // Fallback to text if image fails
                   (e.target as HTMLImageElement).style.display = 'none';
                   (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
                alt="Jornal da Base" 
                className="h-full object-contain"
              />
              {/* Fallback Text hidden by default */}
              <div className="hidden leading-none flex-col justify-center">
                 <span className="text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">Jornal da</span>
                 <h1 className="font-extrabold text-2xl sm:text-3xl tracking-tighter text-blue-600">BASE</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Search */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="BUSCAR NOTÍCIA..." 
              onChange={(e) => onSearch(e.target.value)}
              className="bg-yellow-300 text-gray-900 placeholder-gray-600 px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-yellow-500 font-medium"
            />
            <Search className="absolute right-3 top-2.5 text-gray-700" size={18} />
          </div>
          
          {/* Mobile Search Button */}
          <button 
            className="md:hidden p-2 text-gray-900 hover:bg-yellow-500 rounded-full"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            {showMobileSearch ? <X size={24} /> : <Search size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Search Input Bar */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-yellow-300 overflow-hidden"
          >
            <div className="p-4">
              <input 
                type="text" 
                placeholder="Pesquisar no Jornal da Base..." 
                onChange={(e) => onSearch(e.target.value)}
                autoFocus
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Sub-bar */}
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: "100%" }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-300" 
      />
    </header>
  );
};

export default Header;