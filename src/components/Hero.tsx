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
      </div>

      {/* TEXT CONTENT: Posizionato in alto con margine dedicato */}
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

      {/* BOXES: Spinti verso il basso con mt-auto */}
      <div className="relative z-10 w-full max-w-4xl px-4 mt-auto">
        <div className="flex flex-row gap-2 md:gap-4 justify-center items-stretch w-full overflow-hidden">
          
          {/* Box 1 */}
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all min-h-[110px] md:min-h-[160px] justify-center">
            <Download className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest text-white text-center leading-none">Instant Download</span>
            <span className="hidden sm:block text-[9px] text-gray-500 mt-3 uppercase tracking-tighter leading-tight text-center px-1">Access files immediately</span>
          </div>
          
          {/* Box 2 */}
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all min-h-[110px] md:min-h-[160px] justify-center">
            <Printer className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest text-white text-center leading-none">Ready to Print</span>
            <span className="hidden sm:block text-[9px] text-gray-500 mt-3 uppercase tracking-tighter leading-tight text-center px-1">Optimized for LCD/DLP</span>
          </div>
          
          {/* Box 3 */}
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-2 md:p-6 flex flex-col items-center group hover:border-[#d4af37] transition-all min-h-[110px] md:min-h-[160px] justify-center">
            <Flame className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest text-white text-center leading-none">Ready to Cast</span>
            <span className="hidden sm:block text-[9px] text-gray-500 mt-3 uppercase tracking-tighter leading-tight text-center px-1">Tested Parameters</span>
          </div>

        </div>
      </div>
    </header>
  );
};