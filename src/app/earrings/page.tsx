"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { EarringsFilter } from '@/components/EarringsFilter';
import { HomeFilter } from '@/components/HomeFilter';
import { RINGS_DATA } from '@/lib/data'; 
import { Product } from '@/lib/types';
import { X, RotateCcw, ChevronRight, Circle, RotateCw, ArrowDown, Ellipsis } from 'lucide-react';

const EARRING_TABS = [
  { id: 'studs', label: 'Studs', icon: <Circle size={14} /> },
  { id: 'hoops', label: 'Hoops', icon: <RotateCw size={14} /> },
  { id: 'drop', label: 'Drop', icon: <ArrowDown size={14} /> },
  { id: 'huggies', label: 'Huggies', icon: <Ellipsis size={14} /> },
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

export default function EarringsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [advancedFilters, setAdvancedFilters] = useState({
    earring_style: "",
    earring_diameter: 0,
    // Pietra Primaria
    primary_stone_shape: "",
    primary_stone_count: 0,
    primary_min_ct: 0,
    primary_max_ct: 0,
    primary_stone_length: 0,
    primary_stone_width: 0,
    // Pietra Secondaria
    secondary_stone_shape: "",
    secondary_stone_count: 0,
    secondary_min_ct: 0,
    secondary_max_ct: 0,
    secondary_stone_length: 0,
    secondary_stone_width: 0,
    // Generali
    min_weight: 0,
    max_weight: 100,
    min_ct: 0,
    max_ct: 50,
    sub_category: null as string | null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      if (product.category !== 'earrings') return false;
      
      const totalCarats = calculateTotalCT(product);
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.id.toString().includes(searchTerm);
      if (!matchesSearch) return false;

      if (advancedFilters.sub_category && product.earring_style?.toLowerCase() !== advancedFilters.sub_category.toLowerCase()) return false;
      if (advancedFilters.earring_style && product.earring_style !== advancedFilters.earring_style) return false;
      if (advancedFilters.earring_diameter && product.earring_diameter !== advancedFilters.earring_diameter) return false;

      // Primary Filter Logic
      if (advancedFilters.primary_stone_shape && product.primary_stone_shape !== advancedFilters.primary_stone_shape) return false;
      if (advancedFilters.primary_stone_count && product.primary_stone_count !== advancedFilters.primary_stone_count) return false;
      if (advancedFilters.primary_stone_length && product.primary_stone_length !== advancedFilters.primary_stone_length) return false;
      if (advancedFilters.primary_stone_width && product.primary_stone_width !== advancedFilters.primary_stone_width) return false;
      if (advancedFilters.primary_max_ct > 0) {
        const pCT = product.primary_stone_ct || 0;
        if (pCT < advancedFilters.primary_min_ct || pCT > advancedFilters.primary_max_ct) return false;
      }

      // Secondary Filter Logic
      if (advancedFilters.secondary_stone_shape && product.secondary_stone_shape !== advancedFilters.secondary_stone_shape) return false;
      if (advancedFilters.secondary_stone_count && product.secondary_stone_count !== advancedFilters.secondary_stone_count) return false;
      if (advancedFilters.secondary_max_ct > 0) {
        const sCT = product.secondary_stone_ct || 0;
        if (sCT < advancedFilters.secondary_min_ct || sCT > advancedFilters.secondary_max_ct) return false;
      }

      const matchesCarats = totalCarats >= (advancedFilters.min_ct || 0) && totalCarats <= (advancedFilters.max_ct || 50);
      const matchesWeight = product.estimated_weight >= advancedFilters.min_weight && product.estimated_weight <= advancedFilters.max_weight;

      return matchesCarats && matchesWeight;
    });
  }, [searchTerm, advancedFilters]);

  const resetAll = () => {
    setAdvancedFilters({
      earring_style: "", earring_diameter: 0,
      primary_stone_shape: "", primary_stone_count: 0, primary_min_ct: 0, primary_max_ct: 0, primary_stone_length: 0, primary_stone_width: 0,
      secondary_stone_shape: "", secondary_stone_count: 0, secondary_min_ct: 0, secondary_max_ct: 0, secondary_stone_length: 0, secondary_stone_width: 0,
      min_weight: 0, max_weight: 100, min_ct: 0, max_ct: 50, sub_category: null
    });
    setSearchTerm("");
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[30vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=2000" className="w-full h-full object-cover" alt="Earrings" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Goldsmith Mastery</span>
          <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-[0.3em]">Earrings</h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-md sticky z-40 py-4 border-b border-gray-100 top-16 shadow-none">
          <HomeFilter 
            tabs={EARRING_TABS}
            activeTab={advancedFilters.sub_category}
            onTabChange={(id) => setAdvancedFilters(prev => ({...prev, sub_category: id}))}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOpenAdvanced={() => setIsFilterOpen(true)}
            onReset={resetAll}
          />
        </div>

        {/* ACTIVE FILTERS BADGES */}
        {(searchTerm || advancedFilters.sub_category || advancedFilters.earring_style || advancedFilters.primary_stone_shape || advancedFilters.primary_stone_length > 0 || advancedFilters.min_ct > 0) && (
          <div className="flex flex-wrap items-center gap-2 mt-6 animate-in fade-in duration-500">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] mr-2">Applied Specs:</span>
            
            {searchTerm && <FilterBadge label={`Search: ${searchTerm}`} onClear={() => setSearchTerm("")} />}
            {advancedFilters.sub_category && <FilterBadge label={`Cat: ${advancedFilters.sub_category}`} onClear={() => setAdvancedFilters(prev => ({...prev, sub_category: null}))} />}
            {advancedFilters.earring_style && <FilterBadge label={`Style: ${advancedFilters.earring_style}`} onClear={() => setAdvancedFilters(prev => ({...prev, earring_style: ""}))} />}
            {advancedFilters.earring_diameter > 0 && <FilterBadge label={`Diam: ${advancedFilters.earring_diameter}mm`} onClear={() => setAdvancedFilters(prev => ({...prev, earring_diameter: 0}))} />}

            {/* Primary Stone Badges */}
            {advancedFilters.primary_stone_shape && <FilterBadge label={`Primary: ${advancedFilters.primary_stone_shape}`} onClear={() => setAdvancedFilters(prev => ({...prev, primary_stone_shape: ""}))} />}
            {advancedFilters.primary_max_ct > 0 && <FilterBadge label={`P-Carats: ${advancedFilters.primary_min_ct}-${advancedFilters.primary_max_ct}`} onClear={() => setAdvancedFilters(prev => ({...prev, primary_min_ct: 0, primary_max_ct: 0}))} />}
            {advancedFilters.primary_stone_length > 0 && (
              <FilterBadge 
                label={`P-Size: ${advancedFilters.primary_stone_length}${advancedFilters.primary_stone_width > 0 ? 'x'+advancedFilters.primary_stone_width : ''}mm`} 
                onClear={() => setAdvancedFilters(prev => ({...prev, primary_stone_length: 0, primary_stone_width: 0}))} 
              />
            )}

            {/* Secondary Stone Badges */}
            {advancedFilters.secondary_stone_shape && <FilterBadge label={`Secondary: ${advancedFilters.secondary_stone_shape}`} onClear={() => setAdvancedFilters(prev => ({...prev, secondary_stone_shape: ""}))} />}
            {advancedFilters.secondary_stone_length > 0 && (
              <FilterBadge 
                label={`S-Size: ${advancedFilters.secondary_stone_length}${advancedFilters.secondary_stone_width > 0 ? 'x'+advancedFilters.secondary_stone_width : ''}mm`} 
                onClear={() => setAdvancedFilters(prev => ({...prev, secondary_stone_length: 0, secondary_stone_width: 0}))} 
              />
            )}

            <button onClick={resetAll} className="flex items-center gap-1 ml-4 text-[9px] font-bold uppercase text-red-400 hover:text-red-600 transition-colors">
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        <div className="mt-8 mb-12 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Catalogue</span> <ChevronRight size={10} /> <span className="text-black">Earrings</span>
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
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">No earrings matching your selection</p>
          </div>
        )}
      </main>

      {/* Advanced Filter Sidebar */}
      <div className={`fixed inset-0 z-[100] transition-all ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-sm font-black uppercase tracking-[0.3em]">Engineering Specs</h2>
              <button onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <EarringsFilter onFilterChange={(f) => setAdvancedFilters(prev => ({...prev, ...f}))} />
            </div>
            <div className="pt-8 border-t border-gray-100">
              <button onClick={() => setIsFilterOpen(false)} className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all">
                Apply Technical Filters
              </button>
            </div>
          </div>
        </aside>
      </div>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}