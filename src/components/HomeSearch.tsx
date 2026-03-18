"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, X, ChevronLeft, RotateCcw } from 'lucide-react';
import { RingsFilter } from './RingsFilter';
import { BraceletsFilter } from './BraceletsFilter';
import { EarringsFilter } from './EarringsFilter';
import { PendantsFilter } from './PendantsFilter';

interface HomeSearchProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  initialCategory: string | null;
  onFilterChange: (filters: any) => void;
}

export const HomeSearch: React.FC<HomeSearchProps> = ({ 
  isDrawerOpen, 
  onClose, 
  initialCategory,
  onFilterChange 
}) => {
  return (
    <SearchDrawer 
      isOpen={isDrawerOpen} 
      onClose={onClose} 
      initialCategory={initialCategory}
      onFilterChange={onFilterChange}
    />
  );
};

const SearchDrawer = ({ 
  isOpen, 
  onClose, 
  initialCategory,
  onFilterChange 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  initialCategory: string | null,
  onFilterChange: (filters: any) => void
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  // Sincronizza la categoria quando il drawer viene aperto dall'esterno (es. cliccando su "Rings" in Hero)
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const handleReset = () => {
    // Reset dei filtri nello stato globale della Home
    onFilterChange({
      head_style: "",
      shank_style: [],
      primary_shape: "",
      primary_stone_length: 0,
      primary_stone_width: 0,
      min_weight: 0,
      max_weight: 50,
      min_ct: 0,
      max_ct: 10
    }); 
    setSelectedCategory(null);
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Overlay con blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Pannello Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header del Drawer - Dark Luxury Style */}
        <div className="p-6 border-b flex justify-between items-center bg-[#0a0a0a] text-white">
          {selectedCategory ? (
            <button 
              onClick={() => setSelectedCategory(null)} 
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#d4af37] hover:opacity-80 transition-all"
            >
              <ChevronLeft size={16} /> Back to Categories
            </button>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#d4af37]">
              Technical Filters
            </span>
          )}
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReset}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              title="Reset Filters"
            >
              <RotateCcw size={18} className="text-gray-400 group-hover:text-white" />
            </button>
            <button 
              onClick={onClose} 
              className="hover:rotate-90 transition-transform duration-300 p-1"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Corpo del Drawer */}
        <div className="flex-1 overflow-y-auto p-8 text-black">
          {!selectedCategory ? (
            /* SELEZIONE CATEGORIA (Step 1) */
            <div className="space-y-4">
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold italic">
                  Step 1: Select Category
                </p>
                <div className="h-[1px] w-8 bg-[#d4af37] mt-2"></div>
              </div>
              
              {['Rings', 'Bracelets', 'Earrings', 'Pendants'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat.toLowerCase())} 
                  className="w-full text-left py-6 border-b border-gray-100 flex justify-between items-center group hover:pl-2 transition-all"
                >
                  <span className="text-xl uppercase tracking-widest font-light group-hover:font-medium transition-all group-hover:text-[#d4af37]">
                    {cat}
                  </span>
                  <ChevronRight size={18} className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            /* FILTRI TECNICI SPECIFICI (Step 2) */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-2">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-[#d4af37]">
                  {selectedCategory} Configuration
                </h4>
              </div>
              
              <div className="min-h-[300px]">
                {/* Switcher dei filtri per categoria */}
                {selectedCategory === 'rings' && (
                  <RingsFilter onFilterChange={onFilterChange} />
                )}
                {selectedCategory === 'bracelets' && (
                  <BraceletsFilter onFilterChange={onFilterChange} />
                )}
                {selectedCategory === 'earrings' && (
                  <EarringsFilter onFilterChange={onFilterChange} />
                )}
                {selectedCategory === 'pendants' && (
                  <PendantsFilter onFilterChange={onFilterChange} />
                )}
              </div>

              {/* Tasto di Chiusura e Conferma */}
              <button 
                onClick={onClose}
                className="w-full bg-[#1a1a1a] text-white p-6 mt-12 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl active:scale-[0.98]"
              >
                Apply Technical Specs
              </button>
              
              <p className="text-center mt-6 text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                *The catalog updates in background
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};