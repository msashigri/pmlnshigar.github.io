import React, { useState } from 'react';
import { Flag, User, ShieldCheck, Upload, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JoinPartyPage: React.FC = () => {
  const { registerMember, setSelectedMemberForCard } = useApp();

  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1998-05-15');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('Shigar Town');
  const [tehsil, setTehsil] = useState('Shigar');
  const [occupation, setOccupation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const villagesList = [
    'Shigar Town', 'Gulabpur', 'Marapi', 'Alchuri', 
    'Hashupi', 'Tissar', 'Chutron', 'Basha', 'Arandu'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && fatherName && cnic && mobile) {
      const newMem = registerMember({
        fullName,
        fatherName,
        cnic,
        gender,
        dob,
        mobile,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        village,
        tehsil,
        district: 'Shigar',
        occupation: occupation || 'Local Resident',
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      });

      // Open Card Modal
      setSelectedMemberForCard(newMem);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3.5 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest mx-auto">
          <Flag className="w-3.5 h-3.5 text-emerald-300" />
          <span>Membership Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Join PMLN Shigar Chapter</h1>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
          Fill out the official registration form to become a verified PMLN member and receive your instant digital PMLN ID card.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 font-extrabold text-base text-emerald-800 dark:text-emerald-400 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Muhammad Raza Shigri"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Father's / Husband's Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="e.g. Ghulam Hassan"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                CNIC Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="71401-XXXXXXX-X"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+92 345 XXXXXXX"
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

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Student, Teacher, Entrepreneur"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>
          </div>

          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 pt-4 font-extrabold text-base text-emerald-800 dark:text-emerald-400 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5" />
            <span>District Location in Shigar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Village / Union Council</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {villagesList.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tehsil</label>
              <input
                type="text"
                disabled
                value={tehsil}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">District</label>
              <input
                type="text"
                disabled
                value="Shigar (Gilgit-Baltistan)"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Photo Image URL (Optional)</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Paste photo link or leave default"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black text-sm bg-[#006633] hover:bg-[#004d26] text-white shadow-xl transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <CheckCircle className="w-5 h-5 text-emerald-200" />
              <span>Submit Registration & Get Member Card</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
