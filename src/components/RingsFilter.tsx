"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Diamond, Layers, Hammer, Settings2 } from 'lucide-react';

export const RingsFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [openSection, setOpenSection] = useState<string | null>('style');
  const [primaryShape, setPrimaryShape] = useState("");
  const [secondaryShape, setSecondaryShape] = useState("");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const shapes = [
    "Round", "Oval", "Emerald", "Pear", "Marquise", "Princess", 
    "Radiant", "Cushion", "Heart", "Asscher", "Baguette", "Trillion"
  ];

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[9px] uppercase font-bold text-gray-400 mb-1 block tracking-tighter italic">{children}</label>
  );

  const handleNumberInput = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : Math.max(0, num);
  };

  return (
    <div className="flex flex-col gap-1">
      
      {/* SECTION: DESIGN STYLE */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('style')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><Settings2 size={14} className="text-[#d4af37]"/> Design Style</span>
          {openSection === 'style' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'style' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Head Style</Label>
              <select 
                onChange={(e) => onFilterChange({ head_style: e.target.value })}
                className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white cursor-pointer"
              >
                <option value="">All Styles</option>
                {["Solitaire", "Trilogy", "Halo", "Pavé", "Cluster", "Two Stones"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Shank Style</Label>
              <select 
                onChange={(e) => onFilterChange({ shank_style: e.target.value })}
                className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white cursor-pointer"
              >
                <option value="">All Shanks</option>
                {["Pavé", "Signet", "Wedding Band", "Eternity", "Decorated Band"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: PRIMARY STONE */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('primary')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><Diamond size={14} className="text-[#d4af37]"/> Primary Stone</span>
          {openSection === 'primary' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'primary' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Shape</Label>
                <select 
                  onChange={(e) => {
                    setPrimaryShape(e.target.value);
                    onFilterChange({ primary_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="">Any</option>
                  {shapes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Stone Number</Label>
                <input 
                  type="number" min="0" step="1" placeholder="1" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onInput={(e) => {
                    const val = handleNumberInput(e.currentTarget.value);
                    e.currentTarget.value = val.toString();
                    onFilterChange({ primary_stone_count: val });
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{primaryShape === "Round" ? "Diameter (mm)" : "Dimensions (mm)"}</Label>
              <div className="flex gap-2">
                <input 
                  type="number" min="0" step="0.1" placeholder="L" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onInput={(e) => {
                    const val = handleNumberInput(e.currentTarget.value);
                    e.currentTarget.value = val.toString();
                    onFilterChange({ primary_stone_length: val });
                  }}
                />
                {primaryShape !== "Round" && primaryShape !== "" && (
                  <input 
                    type="number" min="0" step="0.1" placeholder="W" 
                    className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                    onInput={(e) => {
                      const val = handleNumberInput(e.currentTarget.value);
                      e.currentTarget.value = val.toString();
                      onFilterChange({ primary_stone_width: val });
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: SECONDARY STONES */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('secondary')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><Layers size={14} className="text-[#d4af37]"/> Secondary Stones</span>
          {openSection === 'secondary' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'secondary' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Shape</Label>
                <select 
                  onChange={(e) => {
                    setSecondaryShape(e.target.value);
                    onFilterChange({ secondary_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="">None</option>
                  {shapes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Stone Number</Label>
                <input 
                  type="number" min="0" step="1" placeholder="0" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onInput={(e) => {
                    const val = handleNumberInput(e.currentTarget.value);
                    e.currentTarget.value = val.toString();
                    onFilterChange({ secondary_stone_count: val });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: METAL WEIGHT */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('weight')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><Hammer size={14} className="text-[#d4af37]"/> Estimated Metal Weight</span>
          {openSection === 'weight' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'weight' && (
          <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Min (gr)</Label>
                <input 
                  type="number" min="0" step="0.5" placeholder="0.0" 
                  onInput={(e) => {
                    const val = handleNumberInput(e.currentTarget.value);
                    e.currentTarget.value = val.toString();
                    onFilterChange({ min_weight: val });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                />
              </div>
              <div className="space-y-1">
                <Label>Max (gr)</Label>
                <input 
                  type="number" min="0" step="0.5" placeholder="50.0" 
                  onInput={(e) => {
                    const val = handleNumberInput(e.currentTarget.value);
                    e.currentTarget.value = val.toString();
                    onFilterChange({ max_weight: val });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};