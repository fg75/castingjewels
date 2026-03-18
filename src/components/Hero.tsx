"use client";
import React from 'react';
import { Download, Printer, Flame } from 'lucide-react';

export const Hero = () => {
  return (
    // min-h-[95vh] assicura che l'hero occupi quasi tutto lo schermo
    <header className="relative min-h-[95vh] flex flex-col items-center bg-[#0a0a0a] text-white pt-32 pb-16">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1584302174850-83ed86bc1121?q=80&w=2070" 
          className="w-full h-full object-cover" 
          alt="Jewelry Background" 
        />
        {/* Sfumatura verso il nero per raccordarsi con la sezione successiva */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
      </div>

      {/* TEXT CONTENT: Titoli principali */}
      <div className="relative z-10 text-center px-4 max-w-5xl mb-20">
        <h2 className="text-[#d4af37] text-[12px] md:text-[13px] font-black uppercase tracking-[0.4em] mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
          Professional 3D Jewelry design
        </h2>
        <h1 className="text-3xl md:text-7xl font-light uppercase tracking-[0.12em] mb-6 leading-[1.2] md:leading-[1.1]">
          Created by <span className="italic font-serif">Jewellers</span> <br /> 
          for <span className="text-[#d4af37]">Masters</span>
        </h1>
        <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-[0.15em] max-w-2xl mx-auto leading-relaxed px-4">
          High-precision CAD models optimized for modern manufacturing. <br className="hidden md:block" />
          Tested for stone setting and flawless casting.
        </p>
      </div>

      {/* BOXES & TECHNICAL PROMISE: Insieme verso il basso */}
      <div className="relative z-10 w-full max-w-4xl px-4 mt-auto">
        {/* I 3 BOX */}
        <div className="flex flex-row gap-2 md:gap-4 justify-center items-stretch w-full overflow-hidden mb-12">
          
          {/* Box 1 */}
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all min-h-[110px] md:min-h-[160px] justify-center text-center">
            <Download className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest text-white leading-none">Instant Download</span>
            <span className="hidden sm:block text-[9px] text-gray-500 mt-3 uppercase tracking-tighter leading-tight px-1">Access files immediately</span>
          </div>
          
          {/* Box 2 */}
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all min-h-[110px] md:min-h-[160px] justify-center text-center">
            <Printer className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest text-white leading-none">Ready to Print</span>
            <span className="hidden sm:block text-[9px] text-gray-500 mt-3 uppercase tracking-tighter leading-tight px-1">Optimized for LCD/DLP</span>
          </div>
          
          {/* Box 3 */}
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all min-h-[110px] md:min-h-[160px] justify-center text-center">
            <Flame className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest text-white leading-none">Ready to Cast</span>
            <span className="hidden sm:block text-[9px] text-gray-500 mt-3 uppercase tracking-tighter leading-tight px-1">Tested Parameters</span>
          </div>
        </div>

        {/* NUOVA SEZIONE INTEGRATA SOTTO I BOX */}
        <div className="text-center pb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p className="text-white text-[11px] md:text-[14px] font-light uppercase tracking-[0.4em] mb-2">
            Precision Search for <span className="italic font-serif">Modern Masters</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[#d4af37]/30" />
            <p className="text-[#d4af37] text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em]">
              Filtered by stone shape, carat count, and technical dimensions
            </p>
            <div className="h-[1px] w-8 bg-[#d4af37]/30" />
          </div>
        </div>
      </div>
    </header>
  );
};