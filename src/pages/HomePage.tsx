import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Users, Award, ShieldCheck, HeartPulse, GraduationCap, 
  Calendar, Newspaper, Layers, ChevronRight, CheckCircle2, 
  MapPin, Clock, Sparkles, HeartHandshake, Flag, Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEADER_INFO } from '../data/mockData';
import { APP_IMAGES } from '../assets/images';

export const HomePage: React.FC = () => {
  const { setCurrentPage, newsList, eventsList, projectsList, setSelectedNews, setSelectedEvent, setSelectedProject } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Khidmat, Tameer, Taraqqi",
      subtitle: "Building a Prosperous & Empowered District Shigar",
      description: "Under the leadership of Muhammad Tahir Unahar Shigri, PMLN Shigar is driving historic infrastructure, health, and educational development across Baltistan.",
      bgImage: APP_IMAGES.heroPmlnShigar,
      primaryCta: { label: "Join PMLN Shigar", page: "join" as const },
      secondaryCta: { label: "Leader Profile", page: "leader" as const }
    },
    {
      title: "Muhammad Tahir Unahar Shigri",
      subtitle: "Dedicated Public Leader & Visionary for Mountain Communities",
      description: "Uniting Shigar Valley through transparent governance, youth scholarships, and modern healthcare facilities within reach of every household.",
      bgImage: APP_IMAGES.tahirShigri174,
      primaryCta: { label: "Our Vision & Mission", page: "about" as const },
      secondaryCta: { label: "Read Biography", page: "leader" as const }
    },
    {
      title: "Transforming Infrastructure in Shigar",
      subtitle: "Roads, Clean Water & Modern High-Altitude Agriculture",
      description: "Delivering PKR 4.5 Billion worth of road networks, solar water schemes, and hospital upgrades across all union councils.",
      bgImage: APP_IMAGES.shigarDevelopment,
      primaryCta: { label: "View All Projects", page: "projects" as const },
      secondaryCta: { label: "Party Manifesto", page: "manifesto" as const }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Upcoming Event Countdown calculation
  const nextEvent = eventsList[0] || null;
  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 5, mins: 42, secs: 10 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, mins: (prev.mins + 59) % 60, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 pb-16 transition-colors">
      
      {/* FULL-WIDTH HERO SLIDER */}
      <div className="relative h-[85vh] min-h-[580px] max-h-[780px] bg-slate-950 overflow-hidden">
        
        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-emerald-950/30" />
          </div>
        ))}

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            
            {/* Party Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-900/80 border border-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white uppercase tracking-widest shadow-lg">
              <Flag className="w-3.5 h-3.5 text-white" />
              <span>Official Portal • District Shigar</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-emerald-300 font-bold text-lg sm:text-xl leading-snug">
              {heroSlides[currentSlide].subtitle}
            </p>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed line-clamp-3">
              {heroSlides[currentSlide].description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage(heroSlides[currentSlide].primaryCta.page)}
                className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-emerald-950 bg-white hover:bg-emerald-100 shadow-xl shadow-emerald-950/20 hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>{heroSlides[currentSlide].primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-emerald-900" />
              </button>

              <button
                onClick={() => setCurrentPage(heroSlides[currentSlide].secondaryCta.page)}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all flex items-center space-x-2"
              >
                <span>{heroSlides[currentSlide].secondaryCta.label}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>

      {/* LEADER WELCOME SPOTLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-[#006633] to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-emerald-700/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Leader Portrait Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl w-64 h-80 sm:w-72 sm:h-96">
                  <img
                    src={APP_IMAGES.tahirShigri174}
                    alt={LEADER_INFO.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 text-center">
                    <div className="font-extrabold text-sm text-white">{LEADER_INFO.name}</div>
                    <div className="text-[11px] font-bold text-emerald-300">{LEADER_INFO.title}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leader Message Text */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Leadership Message</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                "Our Sole Goal is the Dignity, Progress, and Wellbeing of Every Resident of Shigar"
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed italic border-l-4 border-white pl-4 bg-emerald-950/40 py-2 rounded-r-lg">
                "From the snow-capped Karakoram mountains of Basha to the fertile plains of Gulabpur and Shigar Town, our pledge is absolute transparency, high quality education for our youth, and infrastructure that connects our families with national growth."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100 pt-2">
                <div className="flex items-center space-x-2 bg-emerald-800/40 p-2.5 rounded-lg border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>PKR 4.5B Development Package Secured</span>
                </div>
                <div className="flex items-center space-x-2 bg-emerald-800/40 p-2.5 rounded-lg border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Merit-based Youth Employment & IT Labs</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentPage('leader')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-emerald-950 hover:bg-emerald-100 shadow transition-all flex items-center space-x-2"
                >
                  <span>Read Leader Biography</span>
                  <ArrowRight className="w-4 h-4 text-emerald-900" />
                </button>

                <button
                  onClick={() => setCurrentPage('join')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  Join Under His Leadership
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* HISTORIC MILESTONE: VISIT OF NAWAZ SHARIF AT SHIGAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Historic Political Legacy</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Visit of Quaid Mian Muhammad Nawaz Sharif at Shigar
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                A watershed moment in the history of District Shigar when PMLN Supreme Leader Mian Muhammad Nawaz Sharif visited Shigar Valley, hosted by President Muhammad Tahir Unahar Shigri, unlocking transformative development projects for Baltistan.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('gallery')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#006633] hover:bg-[#004d26] text-white shadow-md transition-all shrink-0"
            >
              <span>View Gallery Archives</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Grand Reception in Shigar Valley",
                desc: "Thousands of locals and party workers warmly welcoming Mian Muhammad Nawaz Sharif.",
                img: APP_IMAGES.nawazSharifVisit1
              },
              {
                title: "Addressing Community Assembly",
                desc: "Quaid Mian Muhammad Nawaz Sharif addressing elders alongside Tahir Unahar Shigri.",
                img: APP_IMAGES.nawazSharifVisit2
              },
              {
                title: "Historic Delegation Consultations",
                desc: "Consultations with Shigar valley leaders for road networks, hospitals, and youth grants.",
                img: APP_IMAGES.nawazSharifVisit3
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage('gallery')}
                className="group cursor-pointer bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-3 left-3 bg-[#006633] text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
                    Historic Photo
                  </div>
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANIMATED STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Verified Party Members", count: "12,450+", icon: Users, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Roads & Bridges Built", count: "32 Km", icon: Layers, color: "text-emerald-700 dark:text-emerald-300" },
            { label: "Schools & IT Labs", count: "14 Units", icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Patients Treated Free", count: "8,500+", icon: HeartPulse, color: "text-emerald-700 dark:text-emerald-300" },
            { label: "Clean Water Schemes", count: "100%", icon: Award, color: "text-emerald-600 dark:text-emerald-400" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {stat.count}
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPMENT PROJECTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest mb-1">
              Building Shigar's Future
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Development Projects
            </h2>
          </div>

          <button
            onClick={() => setCurrentPage('projects')}
            className="inline-flex items-center space-x-1 text-sm font-bold text-[#006633] dark:text-emerald-400 hover:underline"
          >
            <span>View All Projects ({projectsList.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsList.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setSelectedProject(proj);
                setCurrentPage('projects');
              }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#006633] text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
                    {proj.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow">
                    {proj.status} ({proj.progress}%)
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-gradient-to-r from-[#006633] to-emerald-400 h-full rounded-full" 
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Budget: {proj.budget}</span>
                  <span className="text-[#006633] dark:text-emerald-400 font-bold group-hover:underline">Details &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS & LIVE COUNTDOWN */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Live Event Banner */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950 text-[#006633] dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Next Major Event in Shigar</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {nextEvent?.title || "Shigar Youth Leadership & Tech Innovation Summit"}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {nextEvent?.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{nextEvent?.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{nextEvent?.time}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{nextEvent?.venue}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (nextEvent) setSelectedEvent(nextEvent);
                    setCurrentPage('events');
                  }}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-[#006633] text-white hover:bg-[#004d26] shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Register for Event</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </button>
              </div>
            </div>

            {/* Live Countdown Timer Widget */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#006633] to-emerald-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-emerald-700">
              <div className="text-center space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                  Event Countdown
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-700">
                    <div className="text-2xl sm:text-3xl font-black text-white">{timeLeft.days}</div>
                    <div className="text-[10px] text-emerald-300 uppercase font-bold mt-1">Days</div>
                  </div>
                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-700">
                    <div className="text-2xl sm:text-3xl font-black text-white">{timeLeft.hours}</div>
                    <div className="text-[10px] text-emerald-300 uppercase font-bold mt-1">Hours</div>
                  </div>
                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-700">
                    <div className="text-2xl sm:text-3xl font-black text-white">{timeLeft.mins}</div>
                    <div className="text-[10px] text-emerald-300 uppercase font-bold mt-1">Mins</div>
                  </div>
                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-700">
                    <div className="text-2xl sm:text-3xl font-black text-white">{timeLeft.secs}</div>
                    <div className="text-[10px] text-emerald-300 uppercase font-bold mt-1">Secs</div>
                  </div>
                </div>

                <p className="text-xs text-emerald-200 italic pt-2">
                  "Join thousands of party supporters at Shigar Fort Ground."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LATEST NEWS & ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest mb-1">
              Press Releases & Activity
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest News from PMLN Shigar
            </h2>
          </div>

          <button
            onClick={() => setCurrentPage('news')}
            className="inline-flex items-center space-x-1 text-sm font-bold text-[#006633] dark:text-emerald-400 hover:underline"
          >
            <span>All News Updates ({newsList.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsList.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedNews(item);
                setCurrentPage('news');
              }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
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

                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-bold text-[#006633] dark:text-emerald-400">
                    {item.date}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#006633] dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 text-xs font-bold text-[#006633] dark:text-emerald-400 group-hover:underline">
                Read Article &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN PARTY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Become an Official Member of PMLN Shigar
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Fill out the online membership form, receive your official verified digital PMLN ID card, and join Muhammad Tahir Unahar Shigri in building a prosperous Shigar.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setCurrentPage('join')}
              className="px-8 py-4 rounded-2xl font-black text-sm bg-white text-emerald-950 hover:bg-emerald-100 shadow-2xl hover:scale-105 transition-all uppercase tracking-wider flex items-center space-x-2"
            >
              <Flag className="w-5 h-5 text-[#006633]" />
              <span>Fill Online Form Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
