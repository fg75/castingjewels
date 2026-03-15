"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { PendantsFilter } from '@/components/PendantsFilter';
import { RINGS_DATA } from '@/lib/data'; 
import { Product } from '@/lib/types';
import { Search, SlidersHorizontal, X, RotateCcw, ChevronRight } from 'lucide-react';

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
  
  // STATO AGGIORNATO: Include tutte le proprietà delle pietre
  const [advancedFilters, setAdvancedFilters] = useState({
    head_style: "",
    primary_stone_shape: "",
    primary_stone_count: 0,
    secondary_stone_shape: "",
    secondary_stone_count: 0,
    min_weight: 0,
    max_weight: 50
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      if (product.category !== 'pendants') return false;
      
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.id.toString().includes(searchTerm);
      
      const matchesStyle = !advancedFilters.head_style || product.head_style === advancedFilters.head_style;
      
      const matchesPrimaryShape = !advancedFilters.primary_stone_shape || 
                                   product.primary_stone_shape === advancedFilters.primary_stone_shape;

      const matchesPrimaryCount = !advancedFilters.primary_stone_count || 
                                   product.primary_stone_count === advancedFilters.primary_stone_count;

      const matchesSecondaryShape = !advancedFilters.secondary_stone_shape || 
                                     product.secondary_stone_shape === advancedFilters.secondary_stone_shape;
      
      const matchesWeight = product.estimated_weight >= advancedFilters.min_weight && 
                            product.estimated_weight <= advancedFilters.max_weight;

      return matchesSearch && matchesStyle && matchesPrimaryShape && matchesPrimaryCount && 
             matchesSecondaryShape && matchesWeight;
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
      max_weight: 50
    });
    setSearchTerm("");
  };

  const handleFilterChange = (newFilters: any) => {
    setAdvancedFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative h-[35vh] flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000" className="w-full h-full object-cover" alt="Pendants" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Fine Necklaces</span>
          <h1 className="text-white text-4xl md:text-6xl font-light uppercase tracking-[0.3em]">Pendants</h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="sticky top-20 z-40 bg-white pt-10 pb-6">
          <div className="flex flex-row flex-nowrap gap-3 h-14">
            <div className="relative flex-grow min-w-0 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37]" size={18} />
              <input 
                type="text" value={searchTerm} placeholder="Search pendants..."
                className="w-full h-full pl-14 pr-4 bg-gray-50 border border-gray-100 outline-none focus:border-[#d4af37] text-[11px] uppercase tracking-widest transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="flex-none flex items-center justify-center gap-3 px-6 md:px-10 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase hover:bg-[#d4af37] transition-all shadow-xl">
              <SlidersHorizontal size={16} /> <span className="hidden md:inline">Filters</span>
            </button>
          </div>

          {/* DISPLAY FILTRI ATTIVI */}
          {(searchTerm || advancedFilters.head_style || advancedFilters.primary_stone_shape || advancedFilters.secondary_stone_shape) && (
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] mr-2">Active:</span>
              {searchTerm && <FilterBadge label={`Search: ${searchTerm}`} onClear={() => setSearchTerm("")} />}
              {advancedFilters.head_style && <FilterBadge label={advancedFilters.head_style} onClear={() => handleFilterChange({head_style: ""})} />}
              {advancedFilters.primary_stone_shape && <FilterBadge label={`Primary: ${advancedFilters.primary_stone_shape}`} onClear={() => handleFilterChange({primary_stone_shape: ""})} />}
              {advancedFilters.secondary_stone_shape && <FilterBadge label={`Secondary: ${advancedFilters.secondary_stone_shape}`} onClear={() => handleFilterChange({secondary_stone_shape: ""})} />}
              <button onClick={resetAll} className="flex items-center gap-1 ml-4 text-[9px] font-bold uppercase text-gray-400 hover:text-black transition-colors">
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 mb-12 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Catalogue</span> <ChevronRight size={10} /> <span className="text-black">Pendants</span>
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest">{filteredProducts.length} Models</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-24">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={(p) => setSelectedProduct(p)} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center border border-dashed border-gray-200">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">No matching pendants found</p>
          </div>
        )}
      </main>

      <Footer />

      {/* DRAWER FILTRI */}
      {isFilterOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-sm font-black uppercase tracking-[0.3em]">Refine Pendants</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <PendantsFilter onFilterChange={handleFilterChange} />
              </div>
              <div className="pt-8 border-t border-gray-100">
                <button onClick={() => setIsFilterOpen(false)} className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all">
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}