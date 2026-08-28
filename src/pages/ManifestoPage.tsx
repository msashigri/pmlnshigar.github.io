import React from 'react';
import { BookOpen, CheckCircle2, GraduationCap, HeartPulse, Layers, Briefcase, Mountain, Sprout, Download } from 'lucide-react';
import { MANIFESTO_PILLARS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const ManifestoPage: React.FC = () => {
  const { addToast } = useApp();

  const handleDownloadManifesto = () => {
    addToast("PMLN Shigar Official Policy Manifesto PDF downloaded!");
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return GraduationCap;
      case 'HeartPulse': return HeartPulse;
      case 'Road': return Layers;
      case 'Briefcase': return Briefcase;
      case 'Mountain': return Mountain;
      case 'Sprout': return Sprout;
      default: return BookOpen;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>Official Policy Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Party Manifesto</h1>
          <p className="text-emerald-100 text-sm">
            Our 6 core pillars for transforming District Shigar into a thriving, self-reliant mountain region.
          </p>
        </div>

        <button
          onClick={handleDownloadManifesto}
          className="px-6 py-3.5 rounded-xl font-bold text-xs bg-white text-emerald-950 hover:bg-emerald-100 shadow-lg shrink-0 flex items-center space-x-2 transition-all"
        >
          <Download className="w-4 h-4 text-emerald-900" />
          <span>Download Manifesto PDF</span>
        </button>
      </div>

      {/* MANIFESTO PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MANIFESTO_PILLARS.map((pillar) => {
          const IconComp = getIcon(pillar.iconName);
          return (
            <div
              key={pillar.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#006633] text-white flex items-center justify-center shadow-lg">
                  <IconComp className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-black text-xl text-slate-900 dark:text-white leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {pillar.summary}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    Key Commitments:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {pillar.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
