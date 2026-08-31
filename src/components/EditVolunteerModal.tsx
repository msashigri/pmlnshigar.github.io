import React, { useState, useEffect } from 'react';
import { 
  X, HeartHandshake, Key, Lock, Phone, Mail, MapPin, Briefcase, Camera, 
  Check, Eye, EyeOff, Upload, User, Copy, CheckCheck, Sparkles, RefreshCw 
} from 'lucide-react';
import { VolunteerRecord } from '../types';

interface EditVolunteerModalProps {
  volunteer: VolunteerRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<VolunteerRecord>) => void;
}

const VILLAGES_LIST = [
  'Shigar Town', 'Gulabpur', 'Marapi', 'Alchuri', 
  'Hashupi', 'Tissar', 'Chutron', 'Basha', 'Arandu', 'Doko', 'Sildi'
];

const VOLUNTEER_ROLES = [
  'Field Coordinator',
  'Social Media Campaigner',
  'Event & Rally Management',
  'Polling Station Helper',
  'Youth Wing Mobilizer',
  'Women Wing Coordinator',
  'Disaster Relief Volunteer',
  'Secretariat Helper'
];

export const EditVolunteerModal: React.FC<EditVolunteerModalProps> = ({
  volunteer,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !volunteer) return null;

  const defaultUsername = volunteer.username || `${(volunteer.fullName || 'volunteer').toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`;
  const defaultPassword = volunteer.password || 'Volunteer@2026';

  const [fullName, setFullName] = useState(volunteer.fullName || '');
  const [mobile, setMobile] = useState(volunteer.mobile || '');
  const [email, setEmail] = useState(volunteer.email || '');
  const [village, setVillage] = useState(volunteer.village || 'Shigar Town');
  const [preferredRole, setPreferredRole] = useState(volunteer.preferredRole || 'Field Coordinator');
  const [availability, setAvailability] = useState(volunteer.availability || 'Weekends & Evenings');
  const [status, setStatus] = useState<'Pending' | 'Approved'>(volunteer.status || 'Approved');
  const [photoUrl, setPhotoUrl] = useState(volunteer.photoUrl || '');
  
  // Credentials
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (volunteer) {
      setFullName(volunteer.fullName || '');
      setMobile(volunteer.mobile || '');
      setEmail(volunteer.email || '');
      setVillage(volunteer.village || 'Shigar Town');
      setPreferredRole(volunteer.preferredRole || 'Field Coordinator');
      setAvailability(volunteer.availability || 'Weekends & Evenings');
      setStatus(volunteer.status || 'Approved');
      setPhotoUrl(volunteer.photoUrl || '');
      setUsername(volunteer.username || `${(volunteer.fullName || 'volunteer').toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`);
      setPassword(volunteer.password || 'Volunteer@2026');
    }
  }, [volunteer]);

  const handleCopy = (text: string, type: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let newPass = 'VOL#';
    for (let i = 0; i < 6; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
    setShowPassword(true);
  };

  const handleResetDefaultPassword = () => {
    setPassword('Volunteer@2026');
    setShowPassword(true);
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setImageError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    let cleanUser = username.trim();
    if (cleanUser && !cleanUser.includes('@')) {
      cleanUser = `${cleanUser.toLowerCase()}@pmlnmediacellshigar.online`;
    }

    onSave(volunteer.id, {
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      village: village.trim(),
      preferredRole,
      availability: availability.trim(),
      status,
      photoUrl: photoUrl.trim(),
      username: cleanUser || defaultUsername,
      password: password.trim() || defaultPassword
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-teal-800 to-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base sm:text-lg">Edit Volunteer Profile & Credentials</h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/25 text-white font-bold">
                  VOLUNTEER
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-0.5">
                Update volunteer duties, contact details, profile photo, and portal login credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* SECTION 1: PROFILE PHOTO */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Volunteer Photo
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border-2 border-teal-500 shrink-0 shadow-inner flex items-center justify-center text-slate-400">
                {photoUrl && !imageError ? (
                  <img
                    src={photoUrl}
                    alt={fullName}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-9 h-9 text-slate-400" />
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setImageError(false);
                  }}
                  placeholder="Paste direct Image URL (https://...)"
                  className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-300 dark:border-teal-800 hover:bg-teal-100 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Local Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileUpload}
                      className="hidden"
                    />
                  </label>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('')}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-bold px-2 py-1"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: PORTAL LOGIN CREDENTIALS (USERNAME & PASSWORD - WRITTEN & EDITABLE) */}
          <div className="p-4 bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border-2 border-teal-500/40 dark:border-teal-800/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200 dark:border-teal-800/50 pb-2.5">
              <div className="flex items-center space-x-2 text-teal-900 dark:text-teal-300">
                <Key className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Volunteer Portal Login Credentials
                </h4>
              </div>
              
              {/* Quick Copy All Credentials */}
              <button
                type="button"
                onClick={() => handleCopy(`PMLN Shigar Volunteer Login Credentials:\nUsername: ${username}\nPassword: ${password}\nRole: ${preferredRole}\nPortal Login: https://pmlnmediacellshigar.online`, 'all')}
                className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-700 hover:bg-teal-600 text-white rounded-lg text-[11px] font-bold shadow-sm transition-colors self-start sm:self-auto"
              >
                {copiedType === 'all' ? <CheckCheck className="w-3.5 h-3.5 text-teal-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'all' ? 'Copied Full Credentials!' : 'Copy Login Info'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              The volunteer logs in with this Username ID and Password to submit community reports, access media resources, and communicate with the secretariat. Both fields are written below and can be edited.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Username Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Portal Login ID / Username *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(username, 'user')}
                    className="text-[10px] text-teal-700 dark:text-teal-400 font-bold hover:underline flex items-center space-x-0.5"
                  >
                    {copiedType === 'user' ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'user' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. khadim@pmlnmediacellshigar.online"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-mono font-bold text-teal-900 dark:text-teal-300 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Volunteer can log in using either this username or their registered email address.
                </p>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Portal Password *
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(password, 'pass')}
                      className="text-[10px] text-teal-700 dark:text-teal-400 font-bold hover:underline flex items-center space-x-0.5"
                    >
                      {copiedType === 'pass' ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedType === 'pass' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleGeneratePassword}
                      className="text-[10px] text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-0.5"
                      title="Generate a secure random password"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Random</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaultPassword}
                      className="text-[10px] text-slate-500 hover:underline flex items-center space-x-0.5"
                      title="Reset to Volunteer@2026"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Default</span>
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>Current Status: <strong className="text-teal-700 dark:text-teal-400 font-mono">{password ? `${password.length} characters` : 'Not set'}</strong></span>
                  <span className="font-mono text-slate-400">{showPassword ? password : '••••••••'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: VOLUNTEER PROFILE DETAILS */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Volunteer Details & Responsibilities
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Village / Union Council
                </label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {VILLAGES_LIST.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned / Preferred Role
                </label>
                <select
                  value={preferredRole}
                  onChange={(e) => setPreferredRole(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {VOLUNTEER_ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Availability
                </label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="e.g. Weekends & Evenings, Full-Time"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Volunteer Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Approved">Approved (Active Volunteer)</option>
                  <option value="Pending">Pending Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-teal-700 hover:bg-teal-800 text-white shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save Volunteer Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
