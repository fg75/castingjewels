"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Diamond, Layers, Hammer, Settings2, CircleDot, Sparkles, Check } from 'lucide-react';

export const RingsFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [openSection, setOpenSection] = useState<string | null>('style');
  const [primaryShape, setPrimaryShape] = useState("");
  const [secondaryShape, setSecondaryShape] = useState("");
  const [shankShape, setShankShape] = useState("Round");
  
  const [isShankDropdownOpen, setIsShankDropdownOpen] = useState(false);
  const [selectedShanks, setSelectedShanks] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleShankToggle = (style: string) => {
    const nextStyles = selectedShanks.includes(style)
      ? selectedShanks.filter(s => s !== style)
      : [...selectedShanks, style];
    
    setSelectedShanks(nextStyles);
    onFilterChange({ shank_style: nextStyles });
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
      
      {/* 1. SECTION: DESIGN STYLE */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('style')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><Settings2 size={14} className="text-[#d4af37]"/> Design Style</span>
          {openSection === 'style' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'style' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Ring Style</Label>
              <select 
                onChange={(e) => onFilterChange({ head_style: e.target.value })}
                className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white cursor-pointer"
              >
                <option value="">All Styles</option>
                {["Solitaire", "Trilogy", "Halo", "Pavé", "Cluster", "Two Stones", "Wedding Band", "Eternity", "Decorated Band", "Signet"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Shank Style</Label>
              <div className="relative">
                <button 
                  onClick={() => setIsShankDropdownOpen(!isShankDropdownOpen)}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase flex justify-between items-center bg-white hover:border-gray-300 transition-colors"
                >
                  <span className="truncate pr-4">
                    {selectedShanks.length === 0 ? "Select Styles" : `${selectedShanks.length} Selected`}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isShankDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isShankDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                    {["Straight", "Tapered", "Reverse Tapered", "Split", "Cathedral", "Bypass", "Knife Edge"].map((style) => (
                      <div 
                        key={style}
                        onClick={() => handleShankToggle(style)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer group border-b border-gray-50 last:border-0"
                      >
                        <span className={`text-[11px] uppercase tracking-tighter transition-colors ${selectedShanks.includes(style) ? 'font-bold text-black' : 'text-gray-500'}`}>
                          {style}
                        </span>
                        {selectedShanks.includes(style) && <Check size={12} className="text-[#d4af37]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. SECTION: PRIMARY STONE */}
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
                    onFilterChange({ primary_stone_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="">Any</option>
                  <option value="none">None (Plain Band)</option>
                  {shapes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Stone Number</Label>
                <input type="number" min="0" step="1" placeholder="1" disabled={primaryShape === "none"} className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37] disabled:bg-gray-100" onInput={(e) => onFilterChange({ primary_stone_count: handleNumberInput(e.currentTarget.value) })} />
              </div>
            </div>

            {primaryShape !== "none" && primaryShape !== "" && (
              <>
                <div className="space-y-2">
                  <Label>{primaryShape === "Round" ? "Diameter (mm)" : "Dimensions (mm)"}</Label>
                  <div className="flex gap-2">
                    <input type="number" min="0" step="0.1" placeholder="L" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ primary_stone_length: handleNumberInput(e.currentTarget.value) })} />
                    {primaryShape !== "Round" && (
                      <input type="number" min="0" step="0.1" placeholder="W" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ primary_stone_width: handleNumberInput(e.currentTarget.value) })} />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Min CT</Label><input type="number" min="0" step="0.1" placeholder="0.0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ primary_min_ct: handleNumberInput(e.currentTarget.value) })} /></div>
                  <div className="space-y-1"><Label>Max CT</Label><input type="number" min="0" step="0.1" placeholder="5.0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ primary_max_ct: handleNumberInput(e.currentTarget.value) })} /></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 3. SECTION: SECONDARY STONES */}
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
                    onFilterChange({ secondary_stone_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="">None</option>
                  {shapes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Stone Number</Label>
                <input type="number" min="0" step="1" placeholder="0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ secondary_stone_count: handleNumberInput(e.currentTarget.value) })} />
              </div>
            </div>

            {secondaryShape !== "" && (
              <>
                <div className="space-y-2">
                  <Label>{secondaryShape === "Round" ? "Diameter (mm)" : "Dimensions (mm)"}</Label>
                  <div className="flex gap-2">
                    <input type="number" min="0" step="0.1" placeholder="L" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ secondary_stone_length: handleNumberInput(e.currentTarget.value) })} />
                    {secondaryShape !== "Round" && (
                      <input type="number" min="0" step="0.1" placeholder="W" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ secondary_stone_width: handleNumberInput(e.currentTarget.value) })} />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Min CT</Label><input type="number" min="0" step="0.1" placeholder="0.0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ secondary_min_ct: handleNumberInput(e.currentTarget.value) })} /></div>
                  <div className="space-y-1"><Label>Max CT</Label><input type="number" min="0" step="0.1" placeholder="5.0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ secondary_max_ct: handleNumberInput(e.currentTarget.value) })} /></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 4. SECTION: SHANK STONE */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('shank_specs')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><CircleDot size={14} className="text-[#d4af37]"/> Shank Stone</span>
          {openSection === 'shank_specs' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'shank_specs' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Shank Shape</Label>
                <select 
                  onChange={(e) => {
                    setShankShape(e.target.value);
                    onFilterChange({ shank_stone_shape: e.target.value });
                  }}
                  className="w-full border border-gray-200 p-3 text-[11px] uppercase outline-none focus:border-[#d4af37] bg-white"
                >
                  <option value="Round">Round</option>
                  {shapes.filter(s => s !== "Round").map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Total Count</Label>
                <input type="number" min="0" step="1" placeholder="0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ shank_stone_count: handleNumberInput(e.currentTarget.value) })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{shankShape === "Round" ? "Diameter (mm)" : "Dimensions (mm)"}</Label>
              <div className="flex gap-2">
                <input type="number" min="0" step="0.1" placeholder="L" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ shank_stone_length: handleNumberInput(e.currentTarget.value) })} />
                {shankShape !== "Round" && (
                  <input type="number" min="0" step="0.1" placeholder="W" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ shank_stone_width: handleNumberInput(e.currentTarget.value) })} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Min CT</Label><input type="number" min="0" step="0.1" placeholder="0.0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ shank_min_ct: handleNumberInput(e.currentTarget.value) })} /></div>
              <div className="space-y-1"><Label>Max CT</Label><input type="number" min="0" step="0.1" placeholder="5.0" className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" onInput={(e) => onFilterChange({ shank_max_ct: handleNumberInput(e.currentTarget.value) })} /></div>
            </div>
          </div>
        )}
      </div>

      {/* 5. SECTION: TOTAL CARATS & METAL */}
      <div className="border-b border-gray-100 pb-2">
        <button onClick={() => toggleSection('weight')} className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900">
          <span className="flex items-center gap-2"><Sparkles size={14} className="text-[#d4af37]"/> Metal & Total CT</span>
          {openSection === 'weight' ? <ChevronUp size={14} className="text-[#d4af37]"/> : <ChevronDown size={14}/>}
        </button>
        
        {openSection === 'weight' && (
          <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Min gr</Label><input type="number" min="0" step="0.5" placeholder="0.0" onInput={(e) => onFilterChange({ min_weight: handleNumberInput(e.currentTarget.value) })} className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" /></div>
              <div className="space-y-1"><Label>Max gr</Label><input type="number" min="0" step="0.5" placeholder="50.0" onInput={(e) => onFilterChange({ max_weight: handleNumberInput(e.currentTarget.value) })} className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Total Min CT</Label><input type="number" min="0" step="0.1" placeholder="0.0" onInput={(e) => onFilterChange({ min_ct: handleNumberInput(e.currentTarget.value) })} className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" /></div>
              <div className="space-y-1"><Label>Total Max CT</Label><input type="number" min="0" step="0.1" placeholder="10.0" onInput={(e) => onFilterChange({ max_ct: handleNumberInput(e.currentTarget.value) })} className="w-full border border-gray-200 p-3 text-[11px] outline-none focus:border-[#d4af37]" /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};