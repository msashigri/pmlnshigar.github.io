import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Users, ShieldAlert, Check, Home, UserCheck, ArrowLeft, FileText, Lock, KeyRound, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VolunteerPage: React.FC = () => {
  const { registerVolunteer, setCurrentPage } = useApp();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('Shigar Town');
  const [preferredRole, setPreferredRole] = useState('Field Coordinator');
  const [availability, setAvailability] = useState('Weekends & Evenings');
  const [rawUsername, setRawUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{
    fullName: string;
    mobile: string;
    preferredRole: string;
    village: string;
    availability: string;
    username: string;
  } | null>(null);

  const roles = [
    'Field Coordinator',
    'Social Media Campaigner',
    'Event & Rally Management',
    'Polling Station Helper',
    'Youth Wing Mobilizer',
    'Women Wing Coordinator'
  ];

  const fullUsername = rawUsername.trim()
    ? (rawUsername.trim().includes('@') ? rawUsername.trim() : `${rawUsername.trim().toLowerCase()}@pmlnmediacellshigar.online`)
    : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && mobile) {
      const generatedUser = fullUsername || `${fullName.trim().toLowerCase().replace(/\s+/g, '')}@pmlnmediacellshigar.online`;
      const generatedPass = password || 'pmln123';

      registerVolunteer({
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        email: email.trim() || `${fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        village: village.trim() || 'Shigar Town',
        preferredRole,
        availability,
        username: generatedUser,
        password: generatedPass
      });

      setLastSubmission({
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        preferredRole,
        village: village.trim() || 'Shigar Town',
        availability,
        username: generatedUser
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setMobile('');
    setEmail('');
    setVillage('Shigar Town');
    setPreferredRole('Field Coordinator');
    setAvailability('Weekends & Evenings');
    setRawUsername('');
    setPassword('');
    setIsSubmitted(false);
    setLastSubmission(null);
  };

  // SUCCESS / THANK YOU VIEW
  if (isSubmitted && lastSubmission) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 sm:p-10 text-center space-y-6">
          
          {/* Success Icon Badge */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 border-4 border-emerald-500/30 flex items-center justify-center text-[#006633] dark:text-emerald-400 shadow-lg">
            <HeartHandshake className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Check className="w-3.5 h-3.5" />
              <span>Application Submitted Successfully</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Thank You for Volunteering!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Your dedication to serving District Shigar is deeply appreciated. You can now access the Volunteer & Member Portal with your official credentials.
            </p>
          </div>

          {/* Submission Details */}
          <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Status:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Enrolled in Volunteer Roster</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Volunteer Name</span>
                <strong className="font-semibold">{lastSubmission.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                <strong className="font-semibold">{lastSubmission.mobile}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Role</span>
                <strong className="font-semibold text-emerald-800 dark:text-emerald-300">{lastSubmission.preferredRole}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Portal Login ID</span>
                <strong className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{lastSubmission.username}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Availability</span>
                <strong className="font-semibold">{lastSubmission.availability}</strong>
              </div>
            </div>
          </div>

          {/* Leadership Message */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 text-left flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              "Volunteers are the backbone of PMLN Shigar. Your passion for social service, youth development, and democratic participation will inspire positive change across all valleys of Shigar."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('member-portal')}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <KeyRound className="w-4 h-4" />
              <span>Login to Volunteer Portal</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>

            <button
              onClick={handleResetForm}
              className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Another</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

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

          {/* Volunteer Portal Credentials Section */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-900/60 space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-[#006633] dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <KeyRound className="w-4 h-4" />
                <span>Volunteer Portal Account Setup</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Create your username and password to log in to the Volunteer & Member Portal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Choose Username <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    required
                    value={rawUsername}
                    onChange={(e) => setRawUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                    placeholder="e.g. yourname"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-l-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                  <span className="bg-emerald-800 text-white font-mono text-[10px] sm:text-xs px-2.5 py-2.5 rounded-r-xl border border-emerald-800 font-bold whitespace-nowrap select-none">
                    @pmlnmediacellshigar.online
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-xl transition-all uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Submit Volunteer Application</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
