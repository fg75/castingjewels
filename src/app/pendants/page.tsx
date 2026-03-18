"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { PendantsFilter } from '@/components/PendantsFilter';
import { HomeFilter } from '@/components/HomeFilter';
import { RINGS_DATA } from '@/lib/data'; 
import { Product } from '@/lib/types';
import { X, RotateCcw, ChevronRight, Circle, Aperture, Layers, Sparkles } from 'lucide-react';

const PENDANT_TABS = [
  { id: 'solitaire', label: 'Solitaire', icon: <Circle size={14} /> },
  { id: 'halo', label: 'Halo Design', icon: <Aperture size={14} /> },
  { id: 'trilogy', label: 'Trilogy', icon: <Layers size={14} /> },
  { id: 'fashion', label: 'Fashion', icon: <Sparkles size={14} /> },
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

export default function PendantsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [advancedFilters, setAdvancedFilters] = useState({
    head_style: "",
    primary_stone_shape: "",
    primary_stone_count: 0,
    secondary_stone_shape: "",
    secondary_stone_count: 0,
    min_weight: 0,
    max_weight: 50,
    min_ct: 0,
    max_ct: 20,
    sub_category: null as string | null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      if (product.category !== 'pendants') return false;
      
      const totalCarats = calculateTotalCT(product);
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.id.toString().includes(searchTerm);
      if (!matchesSearch) return false;

      if (advancedFilters.sub_category && product.head_style !== advancedFilters.sub_category) return false;

      const matchesStyle = !advancedFilters.head_style || product.head_style === advancedFilters.head_style;
      const matchesPrimaryShape = !advancedFilters.primary_stone_shape || product.primary_stone_shape === advancedFilters.primary_stone_shape;
      
      const matchesCarats = totalCarats >= (advancedFilters.min_ct || 0) && 
                            totalCarats <= (advancedFilters.max_ct || 20);

      const matchesWeight = product.estimated_weight >= advancedFilters.min_weight && 
                            product.estimated_weight <= advancedFilters.max_weight;

      return matchesStyle && matchesPrimaryShape && matchesCarats && matchesWeight;
    });
  }, [searchTerm, advancedFilters]);

  const resetAll = () => {
    setAdvancedFilters({
      head_style: "",
      primary_stone_shape: "",
      primary_stone_count: 0,
      secondary_stone_shape: "",
      secondary_stone_count: 0,
      min_weight: 0,
      max_weight: 50,
      min_ct: 0,
      max_ct: 20,
      sub_category: null
    });
    setSearchTerm("");
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[30vh] flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000" className="w-full h-full object-cover" alt="Pendants" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Ethereal Elegance</span>
          <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-[0.3em]">Pendants</h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div 
          className={`bg-white/95 backdrop-blur-md sticky z-40 py-4 border-b border-gray-100 transition-all duration-500 ease-in-out top-16 shadow-none`}>
          <HomeFilter 
            tabs={PENDANT_TABS}
            activeTab={advancedFilters.sub_category}
            onTabChange={(id) => setAdvancedFilters(prev => ({...prev, sub_category: id}))}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOpenAdvanced={() => setIsFilterOpen(true)}
            onReset={resetAll}
          />
        </div>

        {(searchTerm || advancedFilters.sub_category) && (
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] mr-2">Refining by:</span>
            {searchTerm && <FilterBadge label={`Keyword: ${searchTerm}`} onClear={() => setSearchTerm("")} />}
            {advancedFilters.sub_category && <FilterBadge label={advancedFilters.sub_category} onClear={() => setAdvancedFilters(prev => ({...prev, sub_category: null}))} />}
            <button onClick={resetAll} className="flex items-center gap-1 ml-4 text-[9px] font-bold uppercase text-gray-400 hover:text-black transition-colors">
              <RotateCcw size={12} /> Reset All
            </button>
          </div>
        )}

        <div className="mt-8 mb-12 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Catalogue</span> <ChevronRight size={10} /> <span className="text-black">Pendants</span>
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
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">No pendants match these specifications</p>
          </div>
        )}
      </main>

      <div className={`fixed inset-0 z-[100] transition-all ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-sm font-black uppercase tracking-[0.3em]">Advanced Refinement</h2>
              <button onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
            </div>
            <div className="flex-grow overflow-y-auto pr-2">
              <PendantsFilter onFilterChange={(f) => setAdvancedFilters(prev => ({...prev, ...f}))} />
            </div>
            <div className="pt-8 border-t border-gray-100">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all"
              >
                Apply Technical Specs
              </button>
            </div>
          </div>
        </aside>
      </div>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}