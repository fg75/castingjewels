"use client";
import React from 'react';
import { Download, Printer, Flame } from 'lucide-react';

export const Hero = () => {
  return (
    <header className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white pt-20">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1584302174850-83ed86bc1121?q=80&w=2070" 
          className="w-full h-full object-cover" 
          alt="Jewelry Background" 
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h2 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          Professional 3D Jewelry Standards
        </h2>
        <h1 className="text-4xl md:text-7xl font-light uppercase tracking-[0.15em] mb-6 leading-[1.1]">
          Created by <span className="italic font-serif">Jewellers</span> <br /> 
          for <span className="text-[#d4af37]">Masters</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest max-w-2xl mx-auto mb-12 leading-relaxed">
          High-precision STL models optimized for modern manufacturing. 
          Tested for shrinkage, setting, and flawless casting.
        </p>

        {/* BOXES IN HEADER */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all">
            <Download className="text-[#d4af37] mb-3 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Instant Download</span>
            <span className="text-[8px] text-gray-500 mt-2 uppercase tracking-tighter leading-tight">Access files immediately after purchase</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all">
            <Printer className="text-[#d4af37] mb-3 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Ready to Print</span>
            <span className="text-[8px] text-gray-500 mt-2 uppercase tracking-tighter leading-tight">Optimized for LCD/DLP Resin printers</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all">
            <Flame className="text-[#d4af37] mb-3 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Ready to Cast</span>
            <span className="text-[8px] text-gray-500 mt-2 uppercase tracking-tighter leading-tight">Tested shrinkage & sprue parameters</span>
          </div>
        </div>
      </div>
    </header>
  );
};
