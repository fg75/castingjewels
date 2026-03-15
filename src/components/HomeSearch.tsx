"use client";
import React, { useState } from 'react';
import { Search, ChevronRight, SlidersHorizontal, X, ChevronLeft, Diamond, Disc, CircleDot, Anchor } from 'lucide-react';
import { RingsFilter } from './RingsFilter';
import { BraceletsFilter } from './BraceletsFilter';
import { EarringsFilter } from './EarringsFilter';
import { PendantsFilter } from './PendantsFilter';

export const HomeSearch = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section className="relative bg-[#0a0a0a] pt-24 pb-32 overflow-hidden border-t border-white/5">
      {/* Glow d'atmosfera */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* 1. INTESTAZIONE PRINCIPALE */}
        <div className="text-center mb-12">
          <h3 className="text-white text-2xl md:text-4xl font-light uppercase tracking-[0.3em] leading-tight mb-6">
            PRECISION SEARCH FOR <span className="italic font-serif text-[#d4af37]">MODERN MASTERS</span>
          </h3>
          
          {/* SCRITTA SPOSTATA IN ALTO E RESA ORO */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#d4af37] text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] leading-relaxed max-w-2xl">
              Filtered by stone shape, carat count, and technical dimensions
            </p>
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-[0.3em] opacity-80">
              Engineered for high-end manufacturing
            </p>
          </div>
        </div>

        {/* 2. PANNELLO DI RICERCA */}
        <div className="relative max-w-3xl mx-auto mb-20">
          <div className="absolute -inset-[1px] bg-[#d4af37]/30 blur-[2px]" />
          <div className="relative flex flex-col md:flex-row bg-black border border-white/10 p-2 gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text"
                placeholder="SEARCH BY MODEL ID, STYLE OR METAL..."
                className="w-full h-16 bg-transparent pl-16 pr-6 text-[11px] uppercase tracking-[0.25em] text-white outline-none placeholder:text-gray-700"
              />
            </div>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="h-16 px-12 bg-[#d4af37] text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#d4af37]/10"
            >
              ADVANCED FILTERS <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* 3. NAVIGAZIONE CATEGORIE (ICONE MINIMALI) */}
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 border-t border-white/5 pt-16">
          <CategoryItem 
            icon={<Diamond size={22} />} 
            label="Rings" 
            onClick={() => { setIsDrawerOpen(true); setActiveCategory('rings'); }} 
          />
          <CategoryItem 
            icon={<CircleDot size={22} />} 
            label="Bracelets" 
            onClick={() => { setIsDrawerOpen(true); setActiveCategory('bracelets'); }} 
          />
          <CategoryItem 
            icon={<Disc size={22} />} 
            label="Earrings" 
            onClick={() => { setIsDrawerOpen(true); setActiveCategory('earrings'); }} 
          />
          <CategoryItem 
            icon={<Anchor size={22} />} 
            label="Pendants" 
            onClick={() => { setIsDrawerOpen(true); setActiveCategory('pendants'); }} 
          />
        </div>
      </div>

      <SearchDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => { setIsDrawerOpen(false); setActiveCategory(null); }} 
        initialCategory={activeCategory}
      />
    </section>
  );
};

// Sotto-componente Icone
const CategoryItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button onClick={onClick} className="group flex flex-col items-center gap-4">
    <div className="text-gray-600 group-hover:text-[#d4af37] group-hover:scale-125 transition-all duration-500 ease-out">
      {icon}
    </div>
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="h-[1.5px] w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500" />
    </div>
  </button>
);

// Drawer (Logica mantenuta)
const SearchDrawer = ({ isOpen, onClose, initialCategory }: { isOpen: boolean, onClose: () => void, initialCategory: string | null }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-6 border-b flex justify-between items-center bg-[#0a0a0a] text-white">
          {selectedCategory ? (
            <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#d4af37]">
              <ChevronLeft size={16} /> Back to Selection
            </button>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#d4af37]">Technical Filters</span>
          )}
          <button onClick={onClose} className="hover:rotate-90 transition-all"><X size={22} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {!selectedCategory ? (
            <div className="space-y-6">
              {['Rings', 'Bracelets', 'Earrings', 'Pendants'].map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat.toLowerCase())} className="w-full text-left py-6 border-b border-gray-100 flex justify-between items-center group hover:bg-gray-50 px-2 transition-all">
                  <span className="text-xl uppercase tracking-widest font-light group-hover:font-bold transition-all">{cat}</span>
                  <ChevronRight size={18} className="text-[#d4af37]" />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              {selectedCategory === 'rings' && <RingsFilter onFilterChange={() => {}} />}
              {selectedCategory === 'bracelets' && <BraceletsFilter onFilterChange={() => {}} />}
              {selectedCategory === 'earrings' && <EarringsFilter onFilterChange={() => {}} />}
              {selectedCategory === 'pendants' && <PendantsFilter onFilterChange={() => {}} />}
              <button className="w-full bg-black text-white p-6 mt-12 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all">
                Execute Research
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};