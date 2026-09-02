import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { addContactMessage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [village, setVillage] = useState('Shigar Town');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      addContactMessage({
        name,
        email,
        phone,
        subject: subject || 'General Constituent Inquiry',
        message,
        village
      });

      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
          <Phone className="w-3.5 h-3.5 text-emerald-300" />
          <span>District Secretariat</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Contact PMLN Shigar</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Our office doors in Shigar Main Bazaar are open to every constituent. Reach out for development queries, public grievances, or party membership assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* CONTACT FORM */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 font-extrabold text-base text-emerald-800 dark:text-emerald-400">
            Send a Message to Party Secretariat
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohammad Abbas"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 341 XXXXXXX"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Village / Union Council</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Basha, Gulabpur"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Water Pipeline / School Inquiry"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your details or grievance here..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-black text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-xl transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <Send className="w-4 h-4 text-emerald-200" />
              <span>Submit Message to Secretariat</span>
            </button>
          </form>
        </div>

        {/* OFFICE ADDRESS & WHATSAPP */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl border border-slate-800">
            <h3 className="font-extrabold text-lg text-emerald-400">PMLN District Secretariat Shigar</h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Office Address</div>
                  <p>Main Secretariat, Central Bazaar Shigar Town, District Shigar, Gilgit-Baltistan, Pakistan</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Telephone Helpline</div>
                  <p>+92 0000 000000 / +92 000 0000000</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Official Email</div>
                  <p>info@pmlnmediacellshigar.online / secretariat@pmlnmediacellshigar.online</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Public Meeting Hours</div>
                  <p>Monday - Saturday: 09:00 AM - 05:00 PM</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <a
              href="https://wa.me/923459876543"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Direct WhatsApp to Secretariat</span>
            </a>
          </div>

          {/* SIMULATED GOOGLE MAP */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl h-56 border border-slate-200 dark:border-slate-700 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
            <MapPin className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-bounce mb-2" />
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">PMLN Shigar Secretariat</div>
            <div className="text-xs text-slate-500">Main Bazaar, Shigar Town (35.4243° N, 75.7328° E)</div>
          </div>

        </div>

      </div>

    </div>
  );
};
