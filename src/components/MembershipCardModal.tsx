import React from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle, QrCode } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

export const MembershipCardModal: React.FC = () => {
  const { selectedMemberForCard, setSelectedMemberForCard, addToast } = useApp();

  if (!selectedMemberForCard) return null;

  const mem = selectedMemberForCard;

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [100, 65] });
      
      // Card Background Green
      doc.setFillColor(0, 102, 51); // PMLN Green
      doc.rect(0, 0, 100, 65, 'F');

      // Top Gold Bar
      doc.setFillColor(245, 158, 11);
      doc.rect(0, 0, 100, 3, 'F');

      // Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text("PAKISTAN MUSLIM LEAGUE NAWAZ", 50, 8, { align: 'center' });
      
      doc.setFontSize(8);
      doc.setTextColor(245, 158, 11);
      doc.text("DISTRICT SHIGAR CHAPTER • OFFICIAL MEMBERSHIP CARD", 50, 12, { align: 'center' });

      // White inner panel
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(4, 15, 92, 45, 2, 2, 'F');

      // Member Details
      doc.setTextColor(0, 102, 51);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(mem.fullName.toUpperCase(), 8, 23);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(`Membership No: ${mem.membershipNo}`, 8, 28);
      doc.text(`CNIC: ${mem.cnic}`, 8, 33);
      doc.text(`Father/Husband Name: ${mem.fatherName}`, 8, 38);
      doc.text(`Village/UC: ${mem.village}, ${mem.tehsil}`, 8, 43);
      doc.text(`Mobile: ${mem.mobile}`, 8, 48);
      doc.text(`Issue Date: ${mem.joinedDate}`, 8, 53);

      // Signature / Stamp line
      doc.setFontSize(6);
      doc.setTextColor(0, 102, 51);
      doc.setFont('helvetica', 'bold');
      doc.text("MUHAMMAD TAHIR UNAHAR SHIGRI", 70, 52, { align: 'center' });
      doc.setFontSize(5);
      doc.setTextColor(100, 100, 100);
      doc.text("President, PMLN Shigar", 70, 55, { align: 'center' });

      doc.save(`PMLN-Shigar-Card-${mem.membershipNo}.pdf`);
      addToast("Membership Card PDF generated and downloaded!");
    } catch (err) {
      console.error(err);
      addToast("Failed to generate PDF, trying browser print view", "error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative animate-in fade-in zoom-in-95">
        
        <button
          onClick={() => setSelectedMemberForCard(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-100 dark:bg-emerald-950 text-[#006633] dark:text-emerald-400 font-bold text-xs px-3 py-1 rounded-full mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Digital ID Generated</span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            PMLN Shigar Membership Card
          </h2>
        </div>

        {/* Printable Card Element */}
        <div id="printable-membership-card" className="bg-[#006633] rounded-2xl p-0.5 shadow-2xl overflow-hidden border-2 border-emerald-400 text-white relative">
          
          {/* Header */}
          <div className="bg-[#004d26] px-4 py-3 border-b border-emerald-400/40 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-amber-400 p-0.5 border border-amber-300 overflow-hidden shrink-0 shadow-md">
                <img
                  src={APP_IMAGES.pmlnLogo}
                  alt="PMLN Shigar Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="font-extrabold text-xs tracking-tight text-white">PAKISTAN MUSLIM LEAGUE NAWAZ</div>
                <div className="text-[9px] text-emerald-200 font-bold">DISTRICT SHIGAR CHAPTER</div>
              </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-300 shrink-0" />
          </div>

          {/* Body */}
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 space-y-3">
            <div className="flex items-center space-x-4">
              
              {/* Photo */}
              <div className="w-20 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-emerald-600 overflow-hidden shrink-0 flex items-center justify-center">
                {mem.photoUrl ? (
                  <img src={mem.photoUrl} alt={mem.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="text-center p-2 text-slate-400 text-[10px]">Photo Verified</div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1 text-xs">
                <div className="font-extrabold text-sm text-[#006633] dark:text-emerald-400 uppercase leading-tight">
                  {mem.fullName}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-400">Card #:</span> <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">{mem.membershipNo}</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-400">CNIC:</span> {mem.cnic}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-400">Father:</span> {mem.fatherName}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-400">Village:</span> {mem.village}, Tehsil {mem.tehsil}
                </div>
              </div>

            </div>

            {/* Footer Seal & QR */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px]">
              <div>
                <div className="font-bold text-[#006633] dark:text-emerald-400">Muhammad Tahir Unahar Shigri</div>
                <div className="text-slate-400 text-[9px]">President, PMLN Shigar</div>
              </div>

              <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded border border-slate-300 dark:border-slate-700">
                <QrCode className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                <span className="text-[8px] font-mono text-slate-500">VERIFIED</span>
              </div>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <Download className="w-4 h-4 text-emerald-200" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center space-x-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Card</span>
          </button>
        </div>

      </div>
    </div>
  );
};
