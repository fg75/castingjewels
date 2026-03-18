"use client";
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { RingsFilter } from '@/components/RingsFilter';
import { HomeFilter } from '@/components/HomeFilter';
import { RINGS_DATA } from '@/lib/data';
import { Product } from '@/lib/types';
import { X, RotateCcw, ChevronRight, Shield, Swords, Sun, Star } from 'lucide-react';

const RING_TABS = [
  { id: 'solitaire', label: 'Solitaire', icon: <Shield size={14} /> },
  { id: 'pave', label: 'Pave', icon: <Swords size={14} /> },
  { id: 'halo', label: 'Halo', icon: <Sun size={14} /> },
  { id: 'signet', label: 'Signet', icon: <Star size={14} /> },
];

const calculateTotalCT = (p: any) => {
  const calc = (shape: string | undefined, count: number = 0, L: number = 0, W: number = 0) => {
    if (!shape || !count || !L || L === 0) return 0;
    if (shape === "Round") return Math.pow(L, 3) * 0.0061 * count;
    const width = W > 0 ? W : L * 0.8;
    return (L * width * L * 0.004) * count;
  };
  return calc(p.primary_stone_shape, p.primary_stone_count, p.primary_stone_length, p.primary_stone_width) +
         calc(p.secondary_stone_shape, p.secondary_stone_count, p.secondary_stone_length, p.secondary_stone_width);
};

const FilterBadge = ({ label, onClear }: { label: string, onClear: () => void }) => (
  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 border border-gray-100 animate-in fade-in zoom-in duration-200">
    <span className="text-[9px] font-black uppercase tracking-tighter text-gray-600">{label}</span>
    <button onClick={onClear} className="hover:text-red-500 transition-colors">
      <X size={10} />
    </button>
  </div>
);

function RingsPageContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [advancedFilters, setAdvancedFilters] = useState({
    head_style: "",
    shank_style: [] as string[],
    primary_stone_shape: "",
    min_weight: 0,
    max_weight: 50,
    min_ct: 0,
    max_ct: 10,
    sub_category: null as string | null
  });

  const filteredProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      if (product.category !== 'rings') return false;

      const totalCarats = calculateTotalCT(product);
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.id.toString().includes(searchTerm);
      if (!matchesSearch) return false;

      if (advancedFilters.sub_category && product.head_style !== advancedFilters.sub_category) return false;

      const matchesStyle = !advancedFilters.head_style || product.head_style === advancedFilters.head_style;
      const matchesShank = advancedFilters.shank_style.length === 0 || advancedFilters.shank_style.includes(product.shank_style || '');
      const matchesPrimaryShape = !advancedFilters.primary_stone_shape || product.primary_stone_shape === advancedFilters.primary_stone_shape;

      const matchesCarats = totalCarats >= (advancedFilters.min_ct || 0) &&
                            totalCarats <= (advancedFilters.max_ct || 10);

      const matchesWeight = product.estimated_weight >= advancedFilters.min_weight &&
                            product.estimated_weight <= advancedFilters.max_weight;

      return matchesStyle && matchesShank && matchesPrimaryShape && matchesCarats && matchesWeight;
    });
  }, [searchTerm, advancedFilters]);

  const resetAll = () => {
    setAdvancedFilters({
      head_style: "",
      shank_style: [],
      primary_stone_shape: "",
      min_weight: 0,
      max_weight: 50,
      min_ct: 0,
      max_ct: 10,
      sub_category: null
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[30vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1598501718331-503e4d413c1c?q=80&w=2940" className="w-full h-full object-cover" alt="Rings" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Timeless Unions</span>
          <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-[0.3em]">Rings</h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="bg-white sticky z-40 py-4 border-b border-gray-100 top-16">
          <HomeFilter
            tabs={RING_TABS}
            activeTab={advancedFilters.sub_category}
            onTabChange={(id: string | null) => setAdvancedFilters(prev => ({...prev, sub_category: id}))}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOpenAdvanced={() => setIsFilterOpen(true)}
            onReset={resetAll}
          />
        </div>

        {(searchTerm || advancedFilters.sub_category || advancedFilters.shank_style.length > 0 || advancedFilters.head_style) && (
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] mr-2">Refining by:</span>
            {searchTerm && <FilterBadge label={`Keyword: ${searchTerm}`} onClear={() => setSearchTerm("")} />}
            {advancedFilters.sub_category && <FilterBadge label={advancedFilters.sub_category} onClear={() => setAdvancedFilters(prev => ({...prev, sub_category: null}))} />}
            {advancedFilters.head_style && <FilterBadge label={advancedFilters.head_style} onClear={() => setAdvancedFilters(prev => ({...prev, head_style: ""}))} />}
            {advancedFilters.shank_style.map(s => <FilterBadge key={s} label={s} onClear={() => setAdvancedFilters(prev => ({...prev, shank_style: prev.shank_style.filter(i => i !== s)}))} />)}
            <button onClick={resetAll} className="flex items-center gap-1 ml-4 text-[9px] font-bold uppercase text-gray-400 hover:text-black transition-colors">
              <RotateCcw size={12} /> Reset All
            </button>
          </div>
        )}

        <div className="mt-8 mb-12 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Catalogue</span> <ChevronRight size={10} /> <span className="text-black">Rings</span>
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest">{filteredProducts.length} Models Found</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-24">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={(p) => setSelectedProduct(p)} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center border border-dashed border-gray-200 bg-gray-50/30">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">No models match these specifications</p>
          </div>
        )}
      </main>

      <div className={`fixed inset-0 z-[100] transition-all ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex-shrink-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-black uppercase tracking-[0.3em]">Advanced Refinement</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto px-6">
              <RingsFilter onFilterChange={(f) => setAdvancedFilters(prev => ({...prev, ...f}))} />
            </div>
            <div className="p-6 border-t grid grid-cols-2 gap-4">
              <button onClick={resetAll} className="py-4 text-[10px] font-bold uppercase tracking-widest border border-gray-200">Reset</button>
              <button onClick={() => setIsFilterOpen(false)} className="py-4 text-[10px] font-bold uppercase tracking-widest bg-[#1a1a1a] text-white hover:bg-[#d4af37]">Apply Filters</button>
            </div>
          </div>
        </aside>
      </div>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

export default function RingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RingsPageContent />
    </Suspense>
  );
}
