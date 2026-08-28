import React, { useEffect } from 'react';
import { Search, X, ArrowRight, FileText, Calendar, Layers, Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, newsList, eventsList, projectsList, setCurrentPage, setSelectedNews, setSelectedProject, setSelectedEvent } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredNews = query ? newsList.filter(n => n.title.toLowerCase().includes(query) || n.summary.toLowerCase().includes(query) || n.tags.some(t => t.toLowerCase().includes(query))) : [];
  const filteredEvents = query ? eventsList.filter(e => e.title.toLowerCase().includes(query) || e.venue.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)) : [];
  const filteredProjects = query ? projectsList.filter(p => p.title.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) : [];

  const handleSelectPage = (page: Page) => {
    setCurrentPage(page);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news, events, development projects, or pages..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-[65vh] overflow-y-auto space-y-4 text-xs">
          {!query && (
            <div>
              <div className="font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Page Jumps</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Muhammad Tahir Shigri', page: 'leader' as Page },
                  { label: 'Join Party Form', page: 'join' as Page },
                  { label: 'Development Projects', page: 'projects' as Page },
                  { label: 'Party Manifesto', page: 'manifesto' as Page },
                  { label: 'Events & Rallies', page: 'events' as Page },
                  { label: 'Donate Online', page: 'donate' as Page },
                ].map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleSelectPage(item.page)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800 text-left font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="space-y-4">
              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Projects ({filteredProjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredProjects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProject(p);
                          setCurrentPage('projects');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                      >
                        <div className="font-bold text-slate-900 dark:text-white">{p.title}</div>
                        <div className="text-slate-500 dark:text-slate-400 line-clamp-1">{p.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {filteredNews.length > 0 && (
                <div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>News ({filteredNews.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredNews.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setSelectedNews(n);
                          setCurrentPage('news');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                      >
                        <div className="font-bold text-slate-900 dark:text-white">{n.title}</div>
                        <div className="text-slate-500 dark:text-slate-400 line-clamp-1">{n.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {filteredEvents.length > 0 && (
                <div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Events ({filteredEvents.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredEvents.map(e => (
                      <div
                        key={e.id}
                        onClick={() => {
                          setSelectedEvent(e);
                          setCurrentPage('events');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                      >
                        <div className="font-bold text-slate-900 dark:text-white">{e.title}</div>
                        <div className="text-slate-500 dark:text-slate-400">{e.venue} • {e.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredNews.length === 0 && filteredEvents.length === 0 && filteredProjects.length === 0 && (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  No records found matching "{query}". Try searching for "water", "road", "school", or "rallies".
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
          <span>Tip: Press ESC to exit</span>
          <span>PMLN Shigar Search Engine</span>
        </div>
      </div>
    </div>
  );
};
