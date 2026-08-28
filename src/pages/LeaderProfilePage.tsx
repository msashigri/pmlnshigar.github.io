import React from 'react';
import { 
  User, Award, GraduationCap, Download, CheckCircle2, 
  Quote, HeartHandshake, Sparkles, Volume2, ShieldCheck 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';
import { LEADER_INFO } from '../data/mockData';
import { APP_IMAGES } from '../assets/images';

export const LeaderProfilePage: React.FC = () => {
  const { addToast } = useApp();

  const handleDownloadLeaderPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(0, 102, 51); // PMLN Green
      doc.rect(0, 0, 210, 35, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text("MUHAMMAD TAHIR UNAHAR SHIGRI", 105, 18, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(245, 158, 11);
      doc.text("PRESIDENT, PAKISTAN MUSLIM LEAGUE NAWAZ (PMLN) - DISTRICT SHIGAR", 105, 26, { align: 'center' });

      // Body Section
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text("BIOGRAPHY & POLITICAL DOSSIER", 14, 45);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const bioLines = doc.splitTextToSize(LEADER_INFO.biography, 180);
      doc.text(bioLines, 14, 53);

      let currentY = 53 + bioLines.length * 6;

      // Vision & Mission
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 102, 51);
      doc.text("VISION FOR DISTRICT SHIGAR", 14, currentY + 10);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      const visionLines = doc.splitTextToSize(LEADER_INFO.vision, 180);
      doc.text(visionLines, 14, currentY + 18);

      currentY += 25 + visionLines.length * 5;

      // Education
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 102, 51);
      doc.text("EDUCATIONAL BACKGROUND", 14, currentY);

      currentY += 8;
      LEADER_INFO.education.forEach((edu) => {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        doc.text(`• ${edu}`, 18, currentY);
        currentY += 6;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Official Profile Document • PMLN Shigar Secretariat", 105, 285, { align: 'center' });

      doc.save(`Leader-Profile-Muhammad-Tahir-Unahar-Shigri.pdf`);
      addToast("Leader Profile PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      addToast("Failed to generate PDF dossier", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 transition-colors">
      
      {/* HERO LEADER CARD */}
      <div className="bg-gradient-to-br from-[#006633] via-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-emerald-700">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-200 rounded-2xl blur opacity-40"></div>
              <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl w-64 h-80 sm:w-80 sm:h-96">
                <img
                  src={APP_IMAGES.tahirShigri174}
                  alt={LEADER_INFO.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3.5 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-widest">
              <User className="w-3.5 h-3.5 text-emerald-300" />
              <span>Leader Profile</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {LEADER_INFO.name}
            </h1>

            <div className="text-emerald-300 font-extrabold text-lg sm:text-xl">
              {LEADER_INFO.title}
            </div>

            <p className="text-emerald-100 text-sm leading-relaxed">
              {LEADER_INFO.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadLeaderPDF}
                className="px-6 py-3 rounded-xl font-bold text-xs bg-white hover:bg-emerald-100 text-emerald-950 shadow-lg flex items-center space-x-2 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-900" />
                <span>Download Profile PDF Dossier</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* BIOGRAPHY & PHILOSOPHY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="w-6 h-6 text-emerald-600" />
              <span>Biography & Leadership Journey</span>
            </h2>

            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-3">
              {LEADER_INFO.biography}
            </div>
          </div>

          {/* Educational Background */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
              <span>Education & Qualifications</span>
            </h2>

            <ul className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {LEADER_INFO.education.map((edu, idx) => (
                <li key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting Quaid Mian Muhammad Nawaz Sharif */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Political Legacy Milestone</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Hosting Quaid Mian Muhammad Nawaz Sharif at Shigar
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Muhammad Tahir Unahar Shigri personally hosted PMLN Quaid Mian Muhammad Nawaz Sharif during his landmark visit to District Shigar. This historic visit strengthened central support for Gilgit-Baltistan and delivered key development grants for Shigar Valley.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-1">
              <img
                src={APP_IMAGES.nawazSharifVisit1}
                alt="Nawaz Sharif Shigar Visit 1"
                className="w-full h-28 object-cover rounded-xl border border-slate-700"
                referrerPolicy="no-referrer"
              />
              <img
                src={APP_IMAGES.nawazSharifVisit2}
                alt="Nawaz Sharif Shigar Visit 2"
                className="w-full h-28 object-cover rounded-xl border border-slate-700"
                referrerPolicy="no-referrer"
              />
              <img
                src={APP_IMAGES.nawazSharifVisit3}
                alt="Nawaz Sharif Shigar Visit 3"
                className="w-full h-28 object-cover rounded-xl border border-slate-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Sidebar: Vision & Philosophy Quotes */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-[#006633] to-emerald-900 text-white p-6 rounded-2xl shadow-xl space-y-3">
            <Quote className="w-8 h-8 text-emerald-300 opacity-80" />
            <h3 className="font-extrabold text-base text-white">Leadership Philosophy</h3>
            <p className="text-xs text-emerald-100 italic leading-relaxed">
              "{LEADER_INFO.philosophy}"
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Vision for Shigar</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {LEADER_INFO.vision}
            </p>
          </div>

          {/* Key Speeches */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>Key Speeches & Transcripts</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <div className="font-bold text-white">Shigar Workers Convention 2026</div>
                <div className="text-[10px] text-slate-400">Main Secretariat • July 12, 2026</div>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <div className="font-bold text-white">Address on Mountain Ecotourism</div>
                <div className="text-[10px] text-slate-400">Shigar Fort • May 20, 2026</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
