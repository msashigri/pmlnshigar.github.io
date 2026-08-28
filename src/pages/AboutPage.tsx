import React from 'react';
import { Award, ShieldCheck, Heart, Flag, CheckCircle2, History, Target, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEADER_INFO } from '../data/mockData';
import { APP_IMAGES } from '../assets/images';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 transition-colors">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
            <History className="w-3.5 h-3.5 text-emerald-300" />
            <span>Party History & Legacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About PMLN Shigar Chapter
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Pakistan Muslim League Nawaz (PMLN) has always stood as the cornerstone of infrastructure development, economic stability, and public empowerment across Pakistan and Gilgit-Baltistan.
          </p>
        </div>
      </div>

      {/* HISTORY & VISION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
            <Target className="w-4 h-4" />
            <span>Our Roots & Mission</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Championing Public Service in District Shigar
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            The Shigar Chapter of PMLN was established to represent the distinct developmental needs of the mountain communities residing across Shigar Valley, Basha, and surrounding Union Councils.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Under the guidance of <strong className="text-slate-900 dark:text-white">Muhammad Tahir Unahar Shigri</strong>, the chapter has successfully secured federal grants for major double-lane roads, solar water projects, healthcare facilities, and educational institutes.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Transparent Governance</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Youth Skill Empowerment</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-600/30">
          <img
            src={APP_IMAGES.heroPmlnShigar}
            alt="PMLN Shigar Gathering"
            className="w-full h-80 sm:h-96 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
            Guiding Principles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Core Values of PMLN Shigar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Merit & Transparency", desc: "Equal opportunity for every student and worker without political favoritism.", icon: ShieldCheck, color: "text-emerald-600" },
            { title: "Infrastructure First", desc: "All-weather roads, bridges, and solar grids as the foundation of progress.", icon: Award, color: "text-emerald-600" },
            { title: "Youth Leadership", desc: "Preparing the next generation of Baltistan leaders with IT skills and grants.", icon: Users, color: "text-emerald-600" },
            { title: "Heritage & Tourism", desc: "Protecting Shigar's 400-year historical legacy while expanding ecotourism.", icon: Flag, color: "text-emerald-600" },
          ].map((val, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
                <val.icon className={`w-5 h-5 ${val.color}`} />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{val.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORIC VISIT OF NAWAZ SHARIF SECTION */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#006633] to-emerald-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6 border border-emerald-700/50">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-200 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Landmark Political Archive</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Visit of Mian Muhammad Nawaz Sharif at Shigar
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            When PMLN Supreme Leader Quaid Mian Muhammad Nawaz Sharif visited Shigar Valley, hosted by President Muhammad Tahir Unahar Shigri, it reshaped the political landscape of District Shigar. His visit ushered in major federal investments for all-weather roads, health facilities, and local agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group">
            <img
              src={APP_IMAGES.nawazSharifVisit1}
              alt="Nawaz Sharif Visit to Shigar 1"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-slate-900/90 text-xs font-bold text-center text-white">
              Grand Reception in Shigar
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group">
            <img
              src={APP_IMAGES.nawazSharifVisit2}
              alt="Nawaz Sharif Visit to Shigar 2"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-slate-900/90 text-xs font-bold text-center text-white">
              Addressing Shigar Delegates
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group">
            <img
              src={APP_IMAGES.nawazSharifVisit3}
              alt="Nawaz Sharif Visit to Shigar 3"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-slate-900/90 text-xs font-bold text-center text-white">
              Community Elders Welcome
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATED TIMELINE */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            PMLN Shigar Chapter Timeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Key milestones in our political and developmental journey</p>
        </div>

        <div className="relative border-l-2 border-emerald-600 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
          {LEADER_INFO.politicalJourney.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white dark:border-slate-900 shadow"></div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <div className="text-xs font-black text-[#006633] dark:text-emerald-400">{item.year}</div>
                <div className="font-extrabold text-base text-slate-900 dark:text-white">{item.title}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
