import React from 'react';
import { Video, Download, Play, Newspaper, FileText, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

export const MediaPage: React.FC = () => {
  const { addToast } = useApp();

  const publications = [
    { title: "PMLN Shigar Development Progress Report 2026", size: "2.4 MB", type: "PDF" },
    { title: "Muhammad Tahir Unahar Shigri Speech Transcripts", size: "1.1 MB", type: "PDF" },
    { title: "PMLN Official Constitution & Bylaws", size: "3.8 MB", type: "PDF" },
    { title: "Shigar Valley Ecotourism Master Plan", size: "4.5 MB", type: "PDF" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
          <Video className="w-3.5 h-3.5 text-emerald-300" />
          <span>Information Cell & Downloads</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Media Center & Downloads</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Official video press conferences, rally broadcasts, downloadable reports, and publications.
        </p>
      </div>

      {/* VIDEO PRESS CONFERENCES */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Video Press Conferences & Speech Clips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Muhammad Tahir Unahar Shigri Address at Main Secretariat",
              date: "July 15, 2026",
              duration: "14:20",
              imageUrl: APP_IMAGES.leaderSpeechRally
            },
            {
              title: "Press Conference on Shigar Basha Water Project Approval",
              date: "June 28, 2026",
              duration: "09:45",
              imageUrl: APP_IMAGES.shigarDevelopment
            },
            {
              title: "Youth Summit Keynote & IT Grant Announcement",
              date: "May 10, 2026",
              duration: "22:10",
              imageUrl: APP_IMAGES.heroPmlnShigar
            }
          ].map((vid, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              <div className="h-48 overflow-hidden relative bg-slate-900">
                <img src={vid.imageUrl} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#006633] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                  {vid.duration}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-[10px] font-bold text-[#006633] dark:text-emerald-400">{vid.date}</div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOWNLOADS CENTER */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <FileText className="w-6 h-6 text-emerald-600" />
          <span>Publications & PDF Downloads</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publications.map((pub, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{pub.title}</div>
                <div className="text-xs text-slate-500">{pub.type} • {pub.size}</div>
              </div>
              <button
                onClick={() => addToast(`Downloaded ${pub.title}`)}
                className="p-2.5 rounded-xl bg-[#006633] text-white hover:bg-[#004d26] shadow transition-colors flex items-center space-x-1 text-xs font-bold shrink-0"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
