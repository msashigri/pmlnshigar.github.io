import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, X, Map, Ticket } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EventItem } from '../types';

export const EventsPage: React.FC = () => {
  const { eventsList, selectedEvent, setSelectedEvent, addToast } = useApp();
  const [registerModalEvent, setRegisterModalEvent] = useState<EventItem | null>(null);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regVillage, setRegVillage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerModalEvent && regName && regPhone) {
      addToast(`Pass generated for ${regName}! Show this at ${registerModalEvent.venue}`);
      setRegisterModalEvent(null);
      setRegName('');
      setRegPhone('');
      setRegVillage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
          <Calendar className="w-3.5 h-3.5 text-emerald-300" />
          <span>Party Gatherings & Summits</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Upcoming Events & Rallies</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Join party workers, youth forums, and constituent assemblies across District Shigar.
        </p>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsList.map((evt) => (
          <div
            key={evt.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img
                  src={evt.imageUrl}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#006633] text-white font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow">
                  {evt.date}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {evt.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{evt.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>{evt.registeredCount} Attending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => setRegisterModalEvent(evt)}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#006633] text-white hover:bg-[#004d26] shadow transition-colors flex items-center justify-center space-x-1"
              >
                <Ticket className="w-3.5 h-3.5 text-emerald-200" />
                <span>Get Pass</span>
              </button>

              <button
                onClick={() => setSelectedEvent(evt)}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors flex items-center justify-center space-x-1"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map Venue</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EVENT MAP & DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedEvent.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                {selectedEvent.description}
              </p>

              {/* Simulated Google Map View */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-64 border border-slate-200 dark:border-slate-700 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {selectedEvent.venue}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  GPS Coordinates: {selectedEvent.lat}° N, {selectedEvent.lng}° E (Shigar, GB)
                </div>
                <a
                  href={`https://maps.google.com/?q=${selectedEvent.lat},${selectedEvent.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-bold text-xs shadow hover:bg-emerald-600 transition-colors"
                >
                  Open in Google Maps App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REGISTRATION PASS MODAL */}
      {registerModalEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative">
            <button
              onClick={() => setRegisterModalEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="text-center space-y-1">
                <Ticket className="w-8 h-8 text-emerald-600 mx-auto" />
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Event Entry Pass
                </h2>
                <p className="text-xs text-slate-500">{registerModalEvent.title}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ghulam Rasul Shigri"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Village / Union Council</label>
                <input
                  type="text"
                  value={regVillage}
                  onChange={(e) => setRegVillage(e.target.value)}
                  placeholder="e.g. Gulabpur"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg transition-all"
              >
                Generate Free Entry Pass
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
