import React, { useState } from 'react';
import { Search, Tag, Eye, Calendar, X, Share2, Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsItem } from '../types';

export const NewsPage: React.FC = () => {
  const { newsList, selectedNews, setSelectedNews } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Press Releases', 'Events', 'Development Projects', 'Political Activities', 'Announcements'];

  const filteredNews = newsList.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] to-emerald-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5 text-emerald-300" />
            <span>PMLN Information Cell</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">News & Official Updates</h1>
          <p className="text-emerald-100 text-sm">Stay informed with press releases, political activities, and development announcements in Shigar.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news & tags..."
            className="w-full bg-slate-900/80 border border-emerald-700 text-xs text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#006633] text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* NEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-emerald-900/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-md uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1 font-semibold text-[#006633] dark:text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{item.views}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((t, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-xs font-bold text-[#006633] dark:text-emerald-400 group-hover:underline">Read &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No news items found matching your filters.
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative animate-in fade-in zoom-in-95">
            
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              
              <div className="space-y-2">
                <span className="bg-emerald-100 dark:bg-emerald-950 text-[#006633] dark:text-emerald-400 font-bold text-xs px-3 py-1 rounded-full uppercase">
                  {selectedNews.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {selectedNews.title}
                </h1>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span>By {selectedNews.author}</span>
                  <span>•</span>
                  <span>{selectedNews.date}</span>
                </div>
              </div>

              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src={selectedNews.imageUrl}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <div className="flex flex-wrap gap-1">
                    {selectedNews.tags.map((t, i) => (
                      <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("News link copied to clipboard!");
                  }}
                  className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
