import React, { useState } from 'react';
import { Layers, GraduationCap, HeartPulse, Sparkles, Mountain, X, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DevelopmentProject } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projectsList, selectedProject, setSelectedProject } = useApp();
  const [activeStatus, setActiveStatus] = useState<string>('All');

  const statuses = ['All', 'Ongoing', 'Completed', 'Planned'];

  const filteredProjects = projectsList.filter(item => 
    activeStatus === 'All' || item.status === activeStatus
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 text-emerald-300" />
          <span>Shigar Progress Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Development Projects</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Tracking federal and provincial development schemes delivered across District Shigar under Muhammad Tahir Unahar Shigri's vision.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex items-center space-x-2">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setActiveStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeStatus === st
                ? 'bg-[#006633] text-white shadow'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {st} Projects
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-52 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#006633] text-white font-bold text-[10px] px-2.5 py-1 rounded-md uppercase shadow">
                  {proj.category}
                </span>
                <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow">
                  {proj.status} ({proj.progress}%)
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  📍 {proj.location}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-3">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#006633] to-emerald-400 h-full rounded-full" 
                  style={{ width: `${proj.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Budget: {proj.budget}</span>
                <span className="text-[#006633] dark:text-emerald-400 group-hover:underline">View Full Details &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <span className="bg-emerald-100 dark:bg-emerald-950 text-[#006633] dark:text-emerald-400 font-bold text-xs px-3 py-1 rounded-full uppercase">
                {selectedProject.category} • {selectedProject.status}
              </span>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedProject.title}
              </h2>

              <div className="h-56 rounded-2xl overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProject.details}
              </p>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300">
                <div>Location: {selectedProject.location}</div>
                <div>Budget: {selectedProject.budget}</div>
                <div>Status: {selectedProject.status} ({selectedProject.progress}%)</div>
                <div>Target Year: {selectedProject.completionYear}</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
