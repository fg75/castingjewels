"use client";

import React, { useState, useMemo } from 'react';
import { RINGS_DATA } from '@/lib/data';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import ProductFilter from '@/components/filters/ProductFilter';
import { ProductFilterState } from "@/components/filters/useProductFilter";
import { 
  Search, SlidersHorizontal, 
  CircleDot, Gem, Watch, LayoutGrid 
} from 'lucide-react';
import { Product } from '@/components/filters/types';

const initialFilterState: ProductFilterState = {
    category: 'all',
    metal: '',
    min_weight: '',
    max_weight: '',
    min_total_ct: '',
    max_total_ct: '',
    primary: { shape: '', min_ct: '', max_ct: '' },
    secondary: { shape: '', min_ct: '', max_ct: '' },
    shank: { shape: '', min_ct: '', max_ct: '' },
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilterState>(initialFilterState);

  const tabs = [
    { id: 'rings' as const, label: 'Rings', icon: <CircleDot size={16} /> },
    { id: 'earrings' as const, label: 'Earrings', icon: <Gem size={16} /> },
    { id: 'bracelets' as const, label: 'Bracelets', icon: <Watch size={16} /> },
    { id: 'pendants' as const, label: 'Pendants', icon: <LayoutGrid size={16} /> },
  ];

  const finalProducts = useMemo(() => {
    return RINGS_DATA.filter(p => {
        const categoryMatch = filters.category === 'all' || p.category === filters.category;

        const searchMatch = searchTerm === '' ||
            (p.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        const metalMatch = !filters.metal || p.metal === filters.metal;

        const weightMatch = (!filters.min_weight || (p.estimated_weight && p.estimated_weight >= parseFloat(filters.min_weight))) &&
            (!filters.max_weight || (p.estimated_weight && p.estimated_weight <= parseFloat(filters.max_weight)));
        
        const totalCt = (p.primary_stone_ct || 0) + (p.secondary_stone_ct || 0) + (p.shank_stone_ct || 0);

        const totalCtMatch = (!filters.min_total_ct || totalCt >= parseFloat(filters.min_total_ct)) &&
                             (!filters.max_total_ct || totalCt <= parseFloat(filters.max_total_ct));

        return categoryMatch && searchMatch && metalMatch && weightMatch && totalCtMatch;
    });
  }, [filters, searchTerm]);
  
  const handleCategoryChange = (category: Product['category'] | 'all') => {
    setFilters(prev => ({ ...initialFilterState, category }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <section id="archive" className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="bg-white p-4 shadow-xl border border-gray-100 space-y-4">
          <div className="flex gap-2 h-12">
            <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#d4af37] transition-colors" size={16} />
              <input
                type="text"
                value={searchTerm}
                placeholder="SEARCH TECHNICAL ARCHIVE..."
                className="w-full h-full pl-11 pr-4 bg-gray-50 border border-gray-100 text-[10px] uppercase tracking-[0.2em] outline-none focus:border-[#d4af37] focus:bg-white transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex-none flex items-center gap-3 px-6 transition-all active:scale-95 ${isFilterOpen ? 'bg-[#d4af37] text-black' : 'bg-[#111] text-white'
                } text-[9px] font-black uppercase tracking-widest hover:opacity-90`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline italic">Advanced Specs</span>
            </button>
          </div>

          {isFilterOpen && (
            <div className="pt-6 border-t border-gray-100 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] text-center italic">Select Category</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`flex items-center justify-center py-4 gap-3 border transition-all duration-300 ${filters.category === 'all'
                        ? 'bg-[#fdfaf0] text-[#d4af37] border-[#d4af37]'
                        : 'bg-white text-gray-400 border-gray-100 hover:text-black hover:border-gray-200'
                      }`}
                  >
                    <LayoutGrid size={16} className={filters.category === 'all' ? 'text-[#d4af37]' : 'opacity-60'} />
                    <span className="text-[9px] font-black uppercase tracking-widest">All Jewelry Styles</span>
                  </button>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleCategoryChange(tab.id)}
                        className={`flex items-center justify-center py-4 gap-3 border transition-all duration-300 ${filters.category === tab.id
                            ? 'bg-[#fdfaf0] text-[#d4af37] border-[#d4af37]'
                            : 'bg-white text-gray-400 border-gray-100 hover:text-black hover:border-gray-200'
                          }`}
                      >
                        <span className={filters.category === tab.id ? 'text-[#d4af37]' : 'opacity-60'}>
                          {tab.icon}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] text-center italic">Technical Specifications</p>
                <ProductFilter
                  filters={filters}
                  onUpdate={setFilters}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        {finalProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {finalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-100 italic text-gray-400 text-sm">
            No technical models match these parameters.
          </div>
        )}
      </main>
    </div>
  );
}