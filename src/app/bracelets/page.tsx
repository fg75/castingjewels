"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { BraceletsFilter } from '@/components/BraceletsFilter';
import { HomeFilter } from '@/components/HomeFilter';
import { RINGS_DATA } from '@/lib/data'; 
import { Product } from '@/lib/types';
import { X, RotateCcw, ChevronRight, LayoutGrid, CircleDashed, Link, BoxSelect } from 'lucide-react';

const BRACELET_TABS = [
  { id: 'tennis', label: 'Tennis', icon: <CircleDashed size={14} /> },
  { id: 'bangle', label: 'Bangle', icon: <LayoutGrid size={14} /> },
  { id: 'chain', label: 'Chain', icon: <Link size={14} /> },
  { id: 'cuff', label: 'Cuff', icon: <BoxSelect size={14} /> },
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

export default function BraceletsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [advancedFilters, setAdvancedFilters] = useState<any>({
    min_ct: 0,
    max_ct: 20,
    min_weight: 0,
    max_weight: 100,
    sub_category: null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      if (product.category !== 'bracelets') return false;
      
      const totalCarats = calculateTotalCT(product);
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.id.toString().includes(searchTerm);
      if (!matchesSearch) return false;

      if (advancedFilters.sub_category && product.bracelet_style !== advancedFilters.sub_category) return false;

      if (advancedFilters.closure && product.closure !== advancedFilters.closure) return false;
      if (advancedFilters.bracelet_length && product.bracelet_length !== Number(advancedFilters.bracelet_length)) return false;

      const minCt = advancedFilters.min_ct ?? 0;
      const maxCt = advancedFilters.max_ct ?? 20;
      if (totalCarats < minCt || totalCarats > maxCt) return false;
      
      const minW = advancedFilters.min_weight ?? 0;
      const maxW = advancedFilters.max_weight ?? 100;
      if (product.estimated_weight < minW || product.estimated_weight > maxW) return false;

      return true;
    });
  }, [searchTerm, advancedFilters]);

  const resetAll = () => {
    setAdvancedFilters({
      min_ct: 0,
      max_ct: 20,
      min_weight: 0,
      max_weight: 100,
      sub_category: null
    });
    setSearchTerm("");
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[30vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Bracelets Collection" 
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Precision Engineering</span>
          <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-[0.3em]">Bracelets</h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div 
          className={`bg-white/95 backdrop-blur-md sticky z-40 py-4 border-b border-gray-100 transition-all duration-500 ease-in-out top-16 shadow-none`}>
          <HomeFilter 
            tabs={BRACELET_TABS}
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
            <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] mr-2">Filters:</span>
            {searchTerm && <FilterBadge label={`Search: ${searchTerm}`} onClear={() => setSearchTerm("")} />}
            {advancedFilters.sub_category && <FilterBadge label={advancedFilters.sub_category} onClear={() => setAdvancedFilters(prev => ({...prev, sub_category: null}))} />}
            <button onClick={resetAll} className="flex items-center gap-1 ml-4 text-[9px] font-bold uppercase text-gray-400 hover:text-black transition-colors">
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        )}

        <div className="mt-8 mb-12 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Catalogue</span> <ChevronRight size={10} /> <span className="text-black">Bracelets</span>
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest">{filteredProducts.length} Models Found</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-24">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center border border-dashed border-gray-200 bg-gray-50/30">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">No bracelets matching your technical specs</p>
          </div>
        )}
      </main>

      <div className={`fixed inset-0 z-[100] transition-all ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-sm font-black uppercase tracking-[0.3em]">Advanced Specs</h2>
              <button onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <BraceletsFilter onFilterChange={(f) => setAdvancedFilters(prev => ({...prev, ...f}))} />
            </div>
            <div className="pt-8 border-t border-gray-100">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all"
              >
                Apply Specs
              </button>
            </div>
          </div>
        </aside>
      </div>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}