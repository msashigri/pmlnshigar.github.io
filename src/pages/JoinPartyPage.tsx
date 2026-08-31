import React, { useState } from 'react';
import { Flag, User, ShieldCheck, CheckCircle2, HeartHandshake, Home, FileText, Check, Lock, Eye, EyeOff, KeyRound, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MemberRecord } from '../types';

export const JoinPartyPage: React.FC = () => {
  const { registerMember, setCurrentPage } = useApp();

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

  // Portal Credentials
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<MemberRecord | null>(null);

  const villagesList = [
    'Shigar Town', 'Gulabpur', 'Marapi', 'Alchuri', 
    'Hashupi', 'Tissar', 'Chutron', 'Basha', 'Arandu'
  ];

  // Helper to format clean portal username
  const cleanUsername = (input: string, fallbackName: string) => {
    let raw = input.trim().toLowerCase();
    if (!raw) {
      raw = fallbackName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!raw) raw = 'member' + Math.floor(1000 + Math.random() * 9000);
    }
    // If user already typed domain, strip it to avoid duplication
    if (raw.endsWith('@pmlnmediacellshigar.online')) {
      raw = raw.replace('@pmlnmediacellshigar.online', '');
    }
    raw = raw.replace(/[^a-z0-9._-]/g, '');
    return `${raw}@pmlnmediacellshigar.online`;
  };

  const previewUsername = cleanUsername(usernameInput, fullName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && fatherName && cnic && mobile) {
      const fullPortalUsername = cleanUsername(usernameInput, fullName);
      const portalPassword = password.trim() || 'Member@2026';

      const newMem = registerMember({
        fullName: fullName.trim(),
        fatherName: fatherName.trim(),
        cnic: cnic.trim(),
        gender,
        dob,
        mobile: mobile.trim(),
        email: email.trim() || `${fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        username: fullPortalUsername,
        password: portalPassword,
        village,
        tehsil,
        district: 'Shigar',
        occupation: occupation.trim() || 'Local Resident',
        photoUrl: photoUrl.trim() || ''
      });

      setSubmittedData(newMem);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setFatherName('');
    setCnic('');
    setGender('Male');
    setDob('1998-05-15');
    setMobile('');
    setEmail('');
    setUsernameInput('');
    setPassword('');
    setVillage('Shigar Town');
    setOccupation('');
    setPhotoUrl('');
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // SUCCESS / THANK YOU VIEW
  if (isSubmitted && submittedData) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 sm:p-10 text-center space-y-6">
          
          {/* Success Icon Badge */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 border-4 border-emerald-500/30 flex items-center justify-center text-[#006633] dark:text-emerald-400 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Check className="w-3.5 h-3.5" />
              <span>Application Submitted Successfully</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Thank You for Joining PMLN Shigar!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Your membership application has been officially received and registered in the District Secretariat database.
            </p>
          </div>

          {/* Submission Receipt Summary */}
          <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Reference ID:</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                {submittedData.membershipNo}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Member Name</span>
                <strong className="font-semibold">{submittedData.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">CNIC</span>
                <strong className="font-semibold">{submittedData.cnic}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Father's Name</span>
                <strong className="font-semibold">{submittedData.fatherName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Union Council / Village</span>
                <strong className="font-semibold">{submittedData.village}, {submittedData.district}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Mobile</span>
                <strong className="font-semibold">{submittedData.mobile}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Portal Username ID</span>
                <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{submittedData.username || 'Assigned automatically'}</strong>
              </div>
            </div>
          </div>

          {/* Member Portal Access Callout */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-left space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Your Member Portal is Ready!</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              You can now log in with your official ID <code className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">{submittedData.username}</code> to customize your profile photo, print your digital membership card, submit articles/posts for admin approval, and communicate directly with the Social Media Team Head.
            </p>
          </div>

          {/* Leadership Message */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 text-left flex items-start space-x-3">
            <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Message from Muhammad Tahir Unahar Shigri:</strong> "Welcome to our party family. Together we will work with sincerity and dedication for the prosperity, education, and development of our beloved District Shigar."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('member-portal')}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Login to Member Portal</span>
            </button>

            <button
              onClick={handleResetForm}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Another Form</span>
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center space-x-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

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
          Fill out the official registration form to become a registered PMLN member in District Shigar and get instant portal access.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 font-extrabold text-base text-emerald-800 dark:text-emerald-400 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>1. Personal Details</span>
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Personal Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Occupation / Profession</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Student, Teacher, Engineer, Entrepreneur"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>
          </div>

          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 pt-4 font-extrabold text-base text-emerald-800 dark:text-emerald-400 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5" />
            <span>2. District Location & Profile Photo</span>
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
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Profile Photo Image URL (Optional)</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Paste image link or upload later in your Member Portal"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
            />
          </div>

          {/* PORTAL CREDENTIALS SECTION */}
          <div className="border-t-2 border-dashed border-emerald-500/30 pt-6 space-y-4">
            <div className="flex items-center space-x-2 font-extrabold text-base text-emerald-800 dark:text-emerald-400">
              <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>3. Member Portal Login Credentials</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Choose your desired username and password. You will use these credentials to log in to your Member Portal to print cards, submit news/posts, and message party leadership.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Username with @pmlnmediacellshigar.online */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Choose Username <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-xl shadow-sm overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 bg-slate-50 dark:bg-slate-800">
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="e.g. aliraza"
                    className="flex-1 bg-transparent px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none font-semibold"
                  />
                  <span className="inline-flex items-center px-3 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 border-l border-slate-300 dark:border-slate-700">
                    @pmlnmediacellshigar.online
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Your Full Login ID: <span className="font-bold text-emerald-600 dark:text-emerald-400">{previewUsername}</span>
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Create Portal Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Keep your password secure to manage your digital card and submitted posts.
                </p>
              </div>

            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black text-sm bg-[#006633] hover:bg-[#004d26] text-white shadow-xl transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span>Submit Membership Application</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
