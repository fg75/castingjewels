"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Diamond, Layers, Hammer, Settings2, Sparkles } from 'lucide-react';

interface EarringsFilterProps {
  onFilterChange: (filters: any) => void;
}

export const EarringsFilter = ({ onFilterChange }: EarringsFilterProps) => {
  const [openSection, setOpenSection] = useState<string | null>('style');
  const [selectedStyle, setSelectedStyle] = useState(""); 
  const [primaryShape, setPrimaryShape] = useState("");
  const [secondaryShape, setSecondaryShape] = useState("");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleNumberInput = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  const shapes = [
    "Round", "Oval", "Emerald", "Pear", "Marquise", "Princess", 
    "Radiant", "Cushion", "Heart", "Asscher", "Baguette", "Trillion"
  ];

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[9px] uppercase font-bold text-gray-400 mb-1 block tracking-tighter italic">
      {children}
    </label>
  );

  return (
    <div className="flex flex-col gap-1 pb-20">
      
      {/* 1. SECTION: DESIGN & STYLE */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('style')} 
          className="w-full flex justify-between items-center py-5 text-[10px] font-black uppercase tracking-widest text-gray-900"
        >
          <span className="flex items-center gap-2">
            <Settings2 size={14} className={openSection === 'style' ? "text-[#d4af37]" : "text-gray-400"}/> 
            Earring Design
          </span>
          {openSection === 'style' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'style' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Earring Style</Label>
              <select 
                onChange={(e) => {
                  setSelectedStyle(e.target.value);
                  onFilterChange({ earring_style: e.target.value });
                }}
                className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white cursor-pointer"
              >
                <option value="">All Styles</option>
                {["Solitaire", "Studs", "Hoops", "Huggies", "Pavé", "Drop", "Halo", "Chandelier", "Ear Cuffs", "Ear Jackets", "Ear Climbers / Crawlers"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {(selectedStyle === 'Hoops' || selectedStyle === 'Huggies') && (
              <div className="space-y-2 animate-in zoom-in duration-200">
                <Label>Hoop Diameter (mm)</Label>
                <input 
                  type="number" 
                  placeholder="e.g. 20" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ earring_diameter: handleNumberInput(e.target.value) })}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. SECTION: TOTAL CARATS (RANGE) */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('carats')} 
          className="w-full flex justify-between items-center py-5 text-[10px] font-black uppercase tracking-widest text-gray-900"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className={openSection === 'carats' ? "text-[#d4af37]" : "text-gray-400"}/> 
            Total Carat Weight (Pair)
          </span>
          {openSection === 'carats' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'carats' && (
          <div className="pb-6 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <Label>Min CT</Label>
              <input 
                type="number" step="0.01" placeholder="0.00" 
                className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                onChange={(e) => onFilterChange({ min_ct: handleNumberInput(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label>Max CT</Label>
              <input 
                type="number" step="0.01" placeholder="10.00" 
                className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                onChange={(e) => onFilterChange({ max_ct: handleNumberInput(e.target.value) })}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. SECTION: PRIMARY STONE */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('primary')} 
          className="w-full flex justify-between items-center py-5 text-[10px] font-black uppercase tracking-widest text-gray-900"
        >
          <span className="flex items-center gap-2">
            <Diamond size={14} className={openSection === 'primary' ? "text-[#d4af37]" : "text-gray-400"}/> 
            Primary Stone
          </span>
          {openSection === 'primary' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'primary' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* CARAT RANGE - INIZIO RIGA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Min CT (Primary)</Label>
                <input 
                  type="number" step="0.01" placeholder="0.00" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ primary_min_ct: handleNumberInput(e.target.value) })}
                />
              </div>
              <div className="space-y-1">
                <Label>Max CT (Primary)</Label>
                <input 
                  type="number" step="0.01" placeholder="0.00" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ primary_max_ct: handleNumberInput(e.target.value) })}
                />
              </div>
            </div>

            {/* SHAPE & COUNT */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Shape</Label>
                <select 
                  onChange={(e) => {
                    setPrimaryShape(e.target.value);
                    onFilterChange({ primary_stone_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="">Any</option>
                  {shapes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Count (Pair)</Label>
                <input 
                  type="number" placeholder="2" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ primary_stone_count: handleNumberInput(e.target.value) })}
                />
              </div>
            </div>

            {/* DIMENSIONS */}
            <div className="space-y-2">
              <Label>{primaryShape === "Round" ? "Diameter (mm)" : "Dimensions (mm)"}</Label>
              <div className="flex gap-2">
                <input 
                  type="number" step="0.1" placeholder="L" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ primary_stone_length: handleNumberInput(e.target.value) })}
                />
                {(primaryShape !== "Round" && primaryShape !== "") && (
                  <input 
                    type="number" step="0.1" placeholder="W" 
                    className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                    onChange={(e) => onFilterChange({ primary_stone_width: handleNumberInput(e.target.value) })}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. SECTION: SECONDARY STONES */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('secondary')} 
          className="w-full flex justify-between items-center py-5 text-[10px] font-black uppercase tracking-widest text-gray-900"
        >
          <span className="flex items-center gap-2">
            <Layers size={14} className={openSection === 'secondary' ? "text-[#d4af37]" : "text-gray-400"}/> 
            Secondary Stones
          </span>
          {openSection === 'secondary' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'secondary' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* CARAT RANGE - INIZIO RIGA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Min CT (Secondary)</Label>
                <input 
                  type="number" step="0.01" placeholder="0.00" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ secondary_min_ct: handleNumberInput(e.target.value) })}
                />
              </div>
              <div className="space-y-1">
                <Label>Max CT (Secondary)</Label>
                <input 
                  type="number" step="0.01" placeholder="0.00" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ secondary_max_ct: handleNumberInput(e.target.value) })}
                />
              </div>
            </div>

            {/* SHAPE & COUNT */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Shape</Label>
                <select 
                  onChange={(e) => {
                    setSecondaryShape(e.target.value);
                    onFilterChange({ secondary_stone_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="">None</option>
                  {shapes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Total Count</Label>
                <input 
                  type="number" placeholder="0" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ secondary_stone_count: handleNumberInput(e.target.value) })}
                />
              </div>
            </div>

            {/* DIMENSIONS */}
            <div className="space-y-2">
              <Label>{secondaryShape === "Round" ? "Side Stone Diameter (mm)" : "Side Stone Dimensions (mm)"}</Label>
              <div className="flex gap-2">
                <input 
                  type="number" step="0.1" placeholder="L" 
                  className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ secondary_stone_length: handleNumberInput(e.target.value) })}
                />
                {(secondaryShape !== "Round" && secondaryShape !== "" && secondaryShape !== "None") && (
                  <input 
                    type="number" step="0.1" placeholder="W" 
                    className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                    onChange={(e) => onFilterChange({ secondary_stone_width: handleNumberInput(e.target.value) })}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. SECTION: METAL WEIGHT */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('weight')} 
          className="w-full flex justify-between items-center py-5 text-[10px] font-black uppercase tracking-widest text-gray-900"
        >
          <span className="flex items-center gap-2">
            <Hammer size={14} className={openSection === 'weight' ? "text-[#d4af37]" : "text-gray-400"}/> 
            Metal Weight (Pair)
          </span>
          {openSection === 'weight' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'weight' && (
          <div className="pb-6 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <Label>Min (gr)</Label>
              <input 
                type="number" step="0.1" placeholder="0.0" 
                className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                onChange={(e) => onFilterChange({ min_weight: handleNumberInput(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label>Max (gr)</Label>
              <input 
                type="number" step="0.1" placeholder="50.0" 
                className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" 
                onChange={(e) => onFilterChange({ max_weight: handleNumberInput(e.target.value) })}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};