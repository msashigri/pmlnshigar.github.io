import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const { galleryList } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Rallies', 'Speeches', 'Development', 'Youth', 'Culture'];

  const filteredItems = (galleryList || []).filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const activePhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-300" />
          <span>Visual Media Archives</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Photo Gallery</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Highlights from rallies, public speeches, development work, and youth gatherings in Shigar.
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#006633] text-white shadow'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MASONRY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-md cursor-pointer border border-slate-200 dark:border-slate-800 aspect-[4/3]"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">{item.category}</span>
              <h3 className="text-white font-extrabold text-sm">{item.title}</h3>
              <p className="text-slate-300 text-xs line-clamp-1">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="max-h-[75vh] flex justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] object-contain rounded-2xl border border-slate-800 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-white space-y-1">
              <h2 className="text-lg font-bold">{activePhoto.title}</h2>
              <p className="text-xs text-slate-300">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
