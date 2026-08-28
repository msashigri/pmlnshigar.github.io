import React from 'react';
import { Phone, Mail, MapPin, Shield, Sun, Moon, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Ticker: React.FC = () => {
  const { isDarkMode, toggleDarkMode, isAdmin, setIsAdmin, setIsSearchOpen, setCurrentPage } = useApp();

  return (
    <div className="bg-[#004d26] text-white text-xs py-1.5 border-b border-emerald-700/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Ticker Message */}
        <div className="flex items-center space-x-2 overflow-hidden w-full sm:w-auto">
          <span className="bg-white text-[#006633] font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase shrink-0 font-serif-editorial">
            OFFICIAL BULLETIN
          </span>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-emerald-100 font-medium">
            ★ Official Portal of PMLN District Shigar | President: Muhammad Tahir Unahar Shigri | Online Membership Drive Active ★
          </div>
        </div>

        {/* Right: Quick Tools */}
        <div className="flex items-center space-x-4 shrink-0 text-emerald-100">
          <a href="tel:+925812450123" className="hidden lg:flex items-center space-x-1 hover:text-white transition-colors">
            <Phone className="w-3 h-3 text-emerald-300" />
            <span>+92 5812 450123</span>
          </a>
          <span className="hidden lg:inline text-emerald-700">|</span>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-emerald-300" />
            <span>Shigar, GB</span>
          </div>
          <span className="text-emerald-700">|</span>

          {/* Search Trigger */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center space-x-1 hover:text-white transition-colors"
            title="Search Website (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <span className="text-emerald-700">|</span>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-1 rounded hover:bg-emerald-800 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-emerald-200" /> : <Moon className="w-3.5 h-3.5 text-emerald-200" />}
          </button>

          <span className="text-emerald-700">|</span>

          {/* Admin Toggle */}
          <button 
            onClick={() => {
              if (isAdmin) {
                setIsAdmin(false);
                setCurrentPage('home');
              } else {
                setCurrentPage('admin');
              }
            }}
            className="flex items-center space-x-1 text-emerald-200 font-semibold hover:text-white hover:underline"
          >
            <Shield className="w-3 h-3" />
            <span>{isAdmin ? 'Exit Admin' : 'Admin Portal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
