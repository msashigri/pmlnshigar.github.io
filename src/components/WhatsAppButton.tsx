import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/923459876543?text=Assalam-o-Alaikum%20PMLN%20Shigar%20Secretariat";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group border-2 border-white/80"
      title="Contact PMLN Shigar Secretariat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
        WhatsApp Helpline
      </span>
    </a>
  );
};
