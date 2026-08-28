import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Users, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VolunteerPage: React.FC = () => {
  const { registerVolunteer } = useApp();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('Shigar Town');
  const [preferredRole, setPreferredRole] = useState('Field Coordinator');
  const [availability, setAvailability] = useState('Weekends & Evenings');

  const roles = [
    'Field Coordinator',
    'Social Media Campaigner',
    'Event & Rally Management',
    'Polling Station Helper',
    'Youth Wing Mobilizer',
    'Women Wing Coordinator'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && mobile) {
      registerVolunteer({
        fullName,
        mobile,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        village,
        preferredRole,
        availability
      });
      setFullName('');
      setMobile('');
      setEmail('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3.5 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest mx-auto">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
          <span>Volunteering Drive</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Become a PMLN Volunteer</h1>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
          Serve your community alongside Muhammad Tahir Unahar Shigri during rallies, voter drives, and social welfare projects in Shigar.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Khadim Hussain"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+92 355 XXXXXXX"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Volunteer Role</label>
              <select
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Village / Union Council</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Shigar Town"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Availability</label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="e.g. Weekends, Evenings, Full-Time"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-black text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-xl transition-all uppercase tracking-wider"
            >
              Submit Volunteer Application
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
