"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Hammer, Settings2, Ruler, Lock, Diamond } from 'lucide-react';

interface BraceletsFilterProps {
  onFilterChange: (filters: any) => void;
}

export const BraceletsFilter = ({ onFilterChange }: BraceletsFilterProps) => {
  const [openSection, setOpenSection] = useState<string | null>('style');
  const [fitType, setFitType] = useState<string>("");
  const [stoneShape, setStoneShape] = useState<string>("");

  const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);
  const handleNumberInput = (val: string) => isNaN(parseFloat(val)) ? 0 : parseFloat(val);

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[11px] uppercase font-bold text-gray-500 mb-2 block tracking-wider">
      {children}
    </label>
  );

  return (
    <div className="flex flex-col gap-1 pb-20">
      
      {/* SECTION: STYLE */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('style')} 
          className="w-full flex justify-between items-center py-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 hover:text-[#d4af37] transition-colors"
        >
          <span className="flex items-center gap-3"><Settings2 size={16}/> Bracelet Style</span>
          {openSection === 'style' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {openSection === 'style' && (
          <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <select 
              onChange={(e) => onFilterChange({ bracelet_style: e.target.value })}
              className="w-full border border-gray-200 p-4 text-[13px] uppercase outline-none focus:border-[#d4af37] bg-white transition-all appearance-none"
            >
              <option value="">All Styles</option>
              {["Bangle", "Cuff", "Chain", "Tennis", "Charm", "Beaded"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* SECTION: PRIMARY STONES */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('stones')} 
          className="w-full flex justify-between items-center py-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 hover:text-[#d4af37] transition-colors"
        >
          <span className="flex items-center gap-3"><Diamond size={16}/> Primary Stones</span>
          {openSection === 'stones' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {openSection === 'stones' && (
          <div className="pb-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Stone Shape</Label>
              <select 
                value={stoneShape}
                onChange={(e) => {
                  setStoneShape(e.target.value);
                  onFilterChange({ primary_stone_shape: e.target.value });
                }}
                className="w-full border border-gray-200 p-4 text-[13px] uppercase outline-none focus:border-[#d4af37] bg-white transition-all"
              >
                <option value="">Any Shape</option>
                <option value="Round">Round (Brilliant)</option>
                <optgroup label="Fancy Cuts">
                  {["Oval", "Princess", "Emerald", "Cushion", "Pear", "Marquise", "Radiant", "Asscher", "Baguette", "Tapered", "Heart"].map(shape => (
                    <option key={shape} value={shape}>{shape}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* LOGICA DIMENSIONI: Tonda = Diametro, Altro = L x W */}
            {stoneShape && (
              <div className="pt-2 animate-in fade-in zoom-in-95 duration-300">
                {stoneShape === "Round" ? (
                  <div className="space-y-2">
                    <Label>Stone Diameter (mm)</Label>
                    <input 
                      type="number" step="0.1" placeholder="e.g. 3.0" 
                      className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" 
                      onChange={(e) => onFilterChange({ primary_stone_length: handleNumberInput(e.target.value) })} 
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Length (mm)</Label>
                      <input 
                        type="number" step="0.1" placeholder="5.0" 
                        className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" 
                        onChange={(e) => onFilterChange({ primary_stone_length: handleNumberInput(e.target.value) })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Width (mm)</Label>
                      <input 
                        type="number" step="0.1" placeholder="3.5" 
                        className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" 
                        onChange={(e) => onFilterChange({ primary_stone_width: handleNumberInput(e.target.value) })} 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label>Stone Count</Label>
              <input 
                type="number" 
                placeholder="Total stones (e.g. 55)" 
                className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" 
                onChange={(e) => onFilterChange({ primary_stone_count: handleNumberInput(e.target.value) })} 
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION: TOTAL CARATS */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('carats')} 
          className="w-full flex justify-between items-center py-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 hover:text-[#d4af37] transition-colors"
        >
          <span className="flex items-center gap-3"><Diamond size={16} className="text-[#d4af37] fill-[#d4af37]/20"/> Total Carats (ct)</span>
          {openSection === 'carats' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {openSection === 'carats' && (
          <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Carats</Label>
                <input 
                  type="number" step="0.01" placeholder="0.00" 
                  className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ min_ct: handleNumberInput(e.target.value) })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Max Carats</Label>
                <input 
                  type="number" step="0.01" placeholder="10.00" 
                  className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" 
                  onChange={(e) => onFilterChange({ max_ct: handleNumberInput(e.target.value) })} 
                />
              </div>
            </div>
            <p className="mt-4 text-[9px] uppercase tracking-widest text-gray-400 font-bold italic leading-relaxed">
              *Estimated based on Round Brilliant parameters (L³ * 0.0061)
            </p>
          </div>
        )}
      </div>

      {/* SECTION: SIZING & FIT */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('sizing')} 
          className="w-full flex justify-between items-center py-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 hover:text-[#d4af37] transition-colors"
        >
          <span className="flex items-center gap-3"><Ruler size={16}/> Sizing & Fit</span>
          {openSection === 'sizing' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {openSection === 'sizing' && (
          <div className="pb-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Construction Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {['fixed', 'repeatable'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFitType(type);
                      onFilterChange({ is_repeatable: type === "repeatable" });
                    }}
                    className={`py-3 text-[10px] uppercase font-bold tracking-widest border transition-all ${fitType === type ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}
                  >
                    {type === 'fixed' ? 'Finished Length' : 'Modular Links'}
                  </button>
                ))}
              </div>
            </div>

            {fitType === 'fixed' && (
              <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in zoom-in-95 duration-300">
                <div className="space-y-2">
                  <Label>Length (cm)</Label>
                  <input type="number" placeholder="17" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" onChange={(e) => onFilterChange({ bracelet_length: handleNumberInput(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Inner Ø (mm)</Label>
                  <input type="number" placeholder="60" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" onChange={(e) => onFilterChange({ inner_diameter: handleNumberInput(e.target.value) })} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION: CLOSURE */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('closure')} 
          className="w-full flex justify-between items-center py-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 hover:text-[#d4af37] transition-colors"
        >
          <span className="flex items-center gap-3"><Lock size={16}/> Closure Type</span>
          {openSection === 'closure' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {openSection === 'closure' && (
          <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <select 
              onChange={(e) => onFilterChange({ closure: e.target.value })}
              className="w-full border border-gray-200 p-4 text-[13px] uppercase outline-none focus:border-[#d4af37] bg-white transition-all appearance-none"
            >
              <option value="">Any Closure</option>
              {["Lobster Claw", "Spring Ring", "Box Clasp", "Toggle", "Slide / Adjustable"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* SECTION: METAL WEIGHT */}
      <div className="border-b border-gray-100">
        <button 
          onClick={() => toggleSection('weight')} 
          className="w-full flex justify-between items-center py-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 hover:text-[#d4af37] transition-colors"
        >
          <span className="flex items-center gap-3"><Hammer size={16}/> Metal Weight (gr)</span>
          {openSection === 'weight' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>
        {openSection === 'weight' && (
          <div className="pb-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Min Weight</Label>
              <input type="number" step="0.1" placeholder="0.0" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" onChange={(e) => onFilterChange({ min_weight: handleNumberInput(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Max Weight</Label>
              <input type="number" step="0.1" placeholder="100.0" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:border-[#d4af37]" onChange={(e) => onFilterChange({ max_weight: handleNumberInput(e.target.value) })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};