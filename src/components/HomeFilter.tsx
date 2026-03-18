'use client';
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export interface FilterTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface HomeFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenAdvanced: () => void;
  activeTab: string | null;
  onTabChange: (id: string | null) => void;
  tabs: FilterTab[]; 
  onReset?: () => void; // Aggiunto per coerenza
}

export const HomeFilter = ({ 
  searchTerm, 
  onSearchChange, 
  onOpenAdvanced, 
  activeTab, 
  onTabChange, 
  tabs = [] 
}: HomeFilterProps) => {
  return (
    // Aggiungiamo bg-white solido qui per sicurezza se il componente diventa sticky
    <div className="w-full space-y-3 bg-white"> 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {tabs.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => onTabChange(activeTab === tab.id ? null : tab.id)} 
            className={`flex items-center justify-center py-2.5 gap-2 border rounded-sm transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-[#fdfaf0] text-[#d4af37] border-[#d4af37]' 
                : 'bg-white text-gray-400 border-gray-100 hover:text-black hover:border-gray-200'
            }`}
          >
            <span className={activeTab === tab.id ? 'text-[#d4af37]' : 'opacity-60'}>
              {tab.icon}
            </span>
            <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2 h-10">
        <div className="relative flex-grow group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" size={14} />
          <input 
            type="text" 
            value={searchTerm} 
            placeholder="Search ID/Name..." 
            // bg-white forzato per evitare trasparenze ereditate
            className="w-full h-full pl-9 pr-4 bg-white border border-gray-100 text-[9px] uppercase tracking-widest outline-none focus:border-[#d4af37] transition-all" 
            onChange={(e) => onSearchChange(e.target.value)} 
          />
        </div>
        <button 
          onClick={onOpenAdvanced} 
          className="flex-none flex items-center gap-2 px-5 bg-[#111] text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all active:scale-95"
        >
          <SlidersHorizontal size={14} /> 
          <span className="hidden sm:inline">Advanced Specs</span>
        </button>
      </div>
    </div>
  );
};