import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ArrowRight, ShieldCheck, Heart, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import { APP_IMAGES } from '../assets/images';

export const Footer: React.FC = () => {
  const { setCurrentPage, addToast, newsList } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      addToast("Subscribed to PMLN Shigar Newsletter updates!");
      setNewsletterEmail('');
    }
  };

  const navTo = (p: Page) => {
    setCurrentPage(p);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-4 border-[#006633] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Leader */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-amber-400 border border-amber-300 overflow-hidden shrink-0 shadow-lg">
                <img
                  src={APP_IMAGES.pmlnLogo}
                  alt="PMLN Shigar Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="font-extrabold text-xl text-white tracking-tight">
                  PMLN <span className="text-emerald-400">SHIGAR</span>
                </div>
                <div className="text-xs text-emerald-400 font-medium">Pakistan Muslim League Nawaz</div>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Official Chapter for District Shigar, Gilgit-Baltistan. Working under the leadership of <strong className="text-white">Muhammad Tahir Unahar Shigri</strong> for infrastructure, education, healthcare, and youth prosperity.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
                <Flag className="w-3.5 h-3.5 text-white" />
                <span>Shigar Ki Progress, PMLN Ki Standard</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-l-4 border-emerald-500 pl-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navTo('home')} className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Home & Vision</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('leader')} className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Muhammad Tahir Unahar Shigri</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>History & Leadership</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('projects')} className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Development Work in Shigar</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('manifesto')} className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Party Manifesto</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('member-portal')} className="hover:text-emerald-300 font-bold text-amber-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  <span>Member & Volunteer Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('join')} className="hover:text-white font-bold text-emerald-400 transition-colors flex items-center space-x-2">
                  <ArrowRight className="w-3 h-3 text-white" />
                  <span>Online Membership Form</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Latest News Snippets */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-l-4 border-emerald-500 pl-2">
              Recent News
            </h3>
            <div className="space-y-3">
              {newsList.slice(0, 2).map((item) => (
                <div key={item.id} onClick={() => navTo('news')} className="cursor-pointer group">
                  <div className="text-xs text-emerald-400 font-semibold mb-0.5">{item.date}</div>
                  <h4 className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-l-4 border-emerald-500 pl-2">
              District Secretariat
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>PMLN District Secretariat, Main Bazaar Shigar Town, District Shigar, Gilgit-Baltistan, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+92 0000 000000 / +92 000 0000000</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@pmlnmediacellshigar.online</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletter} className="mt-5">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subscribe to Party Updates
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-l-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#006633] hover:bg-[#004d26] text-white px-3 py-2 rounded-r-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">PMLN SHIGAR</strong>. All rights reserved. Authorized by Pakistan Muslim League Nawaz.
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => navTo('about')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => navTo('about')} className="hover:text-slate-300 transition-colors">Terms of Membership</button>
            <span>•</span>
            <button 
              onClick={() => navTo('admin')} 
              className="text-slate-600 hover:text-emerald-400 transition-colors inline-flex items-center space-x-1"
              title="Secretariat Portal Gateway"
            >
              <span>Secretariat</span>
            </button>
            <span>•</span>
            <span className="text-slate-400 flex items-center space-x-1">
              <span>Developed for Shigar</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline ml-1" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
