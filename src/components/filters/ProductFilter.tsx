// @/components/filters/ProductFilter.tsx
"use client";

import React, { useState } from 'react';
import {
  ChevronDown, ChevronUp, Diamond, Layers, Hammer,
  Settings2, CircleDot, Sparkles, Check, Circle, Lock,
  Ruler, RotateCcw,
} from 'lucide-react';
import { Product } from './types';
import * as CONST from './constants';
import { FILTER_CONFIG, FilterSection, FilterField, SectionId } from './filterConfig';
import { ProductFilterState, StoneFilterState } from './useProductFilter';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Settings2, Diamond, Layers, CircleDot, Sparkles, Circle, Lock, Ruler, Hammer,
};

interface ProductFilterProps {
  filters: ProductFilterState;
  onUpdate: (filters: ProductFilterState) => void;
}

export default function ProductFilter({ filters, onUpdate }: ProductFilterProps) {
  const [openSection, setOpenSection] = useState<SectionId | null>('style');

  const updateFilter = (key: string, value: any) => {
    onUpdate({ ...filters, [key]: value });
  };

  const updateStone = (type: 'primary' | 'secondary' | 'shank', field: keyof StoneFilterState, value: any) => {
    onUpdate({
      ...filters,
      [type]: { ...filters[type], [field]: value }
    });
  };

  const sections = FILTER_CONFIG[filters.category] || FILTER_CONFIG.all;

  return (
    <aside className="w-full bg-white p-6 space-y-2 border-r border-gray-100 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-900">Filtri Tecnici</h2>
        <button 
          onClick={() => window.location.reload()}
          className="text-[9px] font-bold uppercase text-gray-400 flex items-center gap-1 hover:text-black transition-colors"
        >
          <RotateCcw size={10} /> Reset
        </button>
      </div>

      {sections.map(section => {
        const IconComp = ICON_MAP[section.icon] ?? Settings2;
        const isOpen = openSection === section.id;

        return (
          <div key={section.id} className="border-b border-gray-100 pb-2">
            <button
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className="w-full flex justify-between items-center py-4 text-[10px] font-black uppercase tracking-widest text-gray-900"
            >
              <span className="flex items-center gap-2">
                <IconComp size={14} className="text-[#d4af37]" />
                {section.label}
              </span>
              {isOpen ? <ChevronUp size={14} className="text-[#d4af37]" /> : <ChevronDown size={14} />}
            </button>

            {isOpen && (
              <div className="pb-6 space-y-5 animate-in fade-in slide-in-from-top-2">
                {section.fields.map((field, i) => (
                  <div key={i} className="space-y-3">
                    {field.type === 'stone_section' ? (
                      <StoneSection 
                        stoneKey={field.stoneKey} 
                        state={filters[field.stoneKey]} 
                        onUpdate={(f, v) => updateStone(field.stoneKey, f, v)} 
                      />
                    ) : field.type === 'number_range' ? (
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">{field.labelMin.split(' ')[0]}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="number" placeholder={field.placeholder?.[0]} 
                            className="p-2 bg-gray-50 border-none text-[11px]"
                            value={filters[field.keyMin as keyof ProductFilterState] as string}
                            onChange={(e) => updateFilter(field.keyMin, e.target.value)}
                          />
                          <input 
                            type="number" placeholder={field.placeholder?.[1]} 
                            className="p-2 bg-gray-50 border-none text-[11px]"
                            value={filters[field.keyMax as keyof ProductFilterState] as string}
                            onChange={(e) => updateFilter(field.keyMax, e.target.value)}
                          />
                        </div>
                      </div>
                    ) : field.type === 'select' ? (
                      <select 
                        className="w-full p-2 bg-gray-50 border-none text-[11px] font-medium"
                        value={filters[field.key as keyof ProductFilterState] as string}
                        onChange={(e) => updateFilter(field.key, e.target.value)}
                      >
                        {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

function StoneSection({ stoneKey, state, onUpdate }: { stoneKey: string, state: StoneFilterState, onUpdate: (f: keyof StoneFilterState, v: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-1">
        {CONST.STONE_SHAPES.map(shape => (
          <button
            key={shape}
            onClick={() => onUpdate('shape', state.shape === shape ? '' : shape)}
            className={`py-2 text-[8px] font-bold border transition-all ${
              state.shape === shape ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
            }`}
          >
            {shape.substring(0, 3).toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input 
          type="number" placeholder="Min CT" 
          className="p-2 bg-gray-50 text-[11px]"
          value={state.min_ct}
          onChange={(e) => onUpdate('min_ct', e.target.value)}
        />
        <input 
          type="number" placeholder="Max CT" 
          className="p-2 bg-gray-50 text-[11px]"
          value={state.max_ct}
          onChange={(e) => onUpdate('max_ct', e.target.value)}
        />
      </div>
    </div>
  );
}