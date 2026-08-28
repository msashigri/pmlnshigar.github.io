import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, HeartHandshake, Flag, Award, BookOpen, Layers, Newspaper, Calendar, Image as ImageIcon, Phone, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import { APP_IMAGES } from '../assets/images';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage, isAdmin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const navItems: { label: string; page: Page; icon?: any }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'About', page: 'about', icon: Award },
    { label: 'Leader Profile', page: 'leader', icon: User },
    { label: 'Projects', page: 'projects', icon: Layers },
    { label: 'Manifesto', page: 'manifesto', icon: BookOpen },
    { label: 'News & Updates', page: 'news', icon: Newspaper },
    { label: 'Events', page: 'events', icon: Calendar },
    { label: 'Gallery', page: 'gallery', icon: ImageIcon },
    { label: 'Contact', page: 'contact', icon: Phone },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Party Badge */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* PMLN Official Logo Emblem */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-emerald-600 to-amber-300 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center relative overflow-hidden shrink-0">
              <img
                src={APP_IMAGES.pmlnLogo}
                alt="PMLN Shigar Official Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif-editorial font-black text-2xl tracking-tight text-[#006633] dark:text-emerald-400">PMLN</span>
                <span className="font-serif-editorial font-black text-2xl tracking-tight text-slate-800 dark:text-white">SHIGAR</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-none">
                Gilgit-Baltistan • Secretariat
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all flex items-center space-x-1 ${
                    isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#006633] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-[#006633] dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More / Mega Menu dropdown button */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="px-3 py-2 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#006633] dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1"
              >
                <span>Engage</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-1">
                    Get Involved
                  </div>
                  <button
                    onClick={() => handleNavClick('join')}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors text-slate-800 dark:text-slate-100 font-medium text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[#006633] dark:text-emerald-400">
                      <Flag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-900 dark:text-emerald-300">Join PMLN Shigar</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Get official membership card</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('volunteer')}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors text-slate-800 dark:text-slate-100 font-medium text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[#006633] dark:text-emerald-400">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Volunteer Program</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Support field campaigns</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('donate')}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors text-slate-800 dark:text-slate-100 font-medium text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[#006633] dark:text-emerald-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Donate & Support</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Fund regional development</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('media')}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors text-slate-800 dark:text-slate-100 font-medium text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[#006633] dark:text-emerald-400">
                      <Newspaper className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Media & Downloads</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Press kits & constitution</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('donate')}
              className="px-3.5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider text-[#006633] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
            >
              Donate
            </button>

            <button
              onClick={() => handleNavClick('join')}
              className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-[#006633] hover:bg-[#004d26] shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all flex items-center space-x-1.5"
            >
              <Flag className="w-3.5 h-3.5 text-white" />
              <span>Join Party</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="px-3 py-2 rounded-lg font-bold text-xs bg-slate-900 text-emerald-400 border border-emerald-500/50 hover:bg-slate-800"
              >
                Admin
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={() => handleNavClick('join')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#006633] sm:hidden"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-colors flex items-center space-x-3 ${
                currentPage === item.page
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-[#006633] dark:text-emerald-400 font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('join')}
              className="w-full py-2.5 rounded-lg font-bold text-sm bg-[#006633] text-white text-center shadow"
            >
              Join Party
            </button>
            <button
              onClick={() => handleNavClick('volunteer')}
              className="w-full py-2.5 rounded-lg font-bold text-sm bg-emerald-800 text-white text-center shadow"
            >
              Volunteer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
