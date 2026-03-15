"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { BraceletsFilter } from '@/components/BraceletsFilter';
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

export default function BraceletsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // STATO FILTRI AVANZATI
  const [advancedFilters, setAdvancedFilters] = useState({
    bracelet_style: "",
    closure: "",
    bracelet_length: 0,
    inner_diameter: 0,
    min_weight: 0,
    max_weight: 100
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      // Filtra esclusivamente per categoria bracciali
      if (product.category !== 'bracelets') return false;
      
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.id.toString().includes(searchTerm);
      
      const matchesStyle = !advancedFilters.bracelet_style || product.bracelet_style === advancedFilters.bracelet_style;
      
      const matchesClosure = !advancedFilters.closure || product.closure === advancedFilters.closure;

      const matchesLength = !advancedFilters.bracelet_length || product.bracelet_length === advancedFilters.bracelet_length;

      const matchesDiameter = !advancedFilters.inner_diameter || product.inner_diameter === advancedFilters.inner_diameter;
      
      const matchesWeight = product.estimated_weight >= advancedFilters.min_weight && 
                            product.estimated_weight <= advancedFilters.max_weight;

      return matchesSearch && matchesStyle && matchesClosure && matchesLength && matchesDiameter && matchesWeight;
    });
  }, [searchTerm, advancedFilters]);

  const resetAll = () => {
    setAdvancedFilters({
      bracelet_style: "",
      closure: "",
      bracelet_length: 0,
      inner_diameter: 0,
      min_weight: 0,
      max_weight: 100
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
      
      {/* HERO SECTION */}
      <section className="relative h-[35vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Bracelets Collection" 
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Fine Jewelry</span>
          <h1 className="text-white text-4xl md:text-6xl font-light uppercase tracking-[0.3em]">Bracelets</h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        {/* SEARCH & FILTER BAR */}
        <div className="sticky top-20 z-40 bg-white pt-10 pb-6">
          <div className="flex flex-row flex-nowrap gap-3 h-14">
            <div className="relative flex-grow min-w-0 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" size={18} />
              <input 
                type="text"
                value={searchTerm}
                placeholder="Search by ID, metal or style..."
                className="w-full h-full pl-14 pr-4 bg-gray-50 border border-gray-100 outline-none focus:border-[#d4af37] focus:bg-white text-[11px] uppercase tracking-widest transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex-none flex items-center justify-center gap-3 px-6 md:px-10 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-xl"
            >
              <SlidersHorizontal size={16} /> <span className="hidden md:inline">Filters</span>
            </button>
          </div>

          {/* ACTIVE FILTERS DISPLAY */}
          {(searchTerm || 
            advancedFilters.bracelet_style || 
            advancedFilters.closure || 
            advancedFilters.bracelet_length > 0 || 
            advancedFilters.inner_diameter > 0) && (
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] mr-2">Active:</span>
              
              {searchTerm && (
                <FilterBadge label={`Search: ${searchTerm}`} onClear={() => setSearchTerm("")} />
              )}
              
              {advancedFilters.bracelet_style && (
                <FilterBadge 
                  label={`Style: ${advancedFilters.bracelet_style}`} 
                  onClear={() => handleFilterChange({ bracelet_style: "" })} 
                />
              )}
              
              {advancedFilters.closure && (
                <FilterBadge 
                  label={`Closure: ${advancedFilters.closure}`} 
                  onClear={() => handleFilterChange({ closure: "" })} 
                />
              )}
              
              {advancedFilters.bracelet_length > 0 && (
                <FilterBadge 
                  label={`Length: ${advancedFilters.bracelet_length}cm`} 
                  onClear={() => handleFilterChange({ bracelet_length: 0 })} 
                />
              )}
              
              {advancedFilters.inner_diameter > 0 && (
                <FilterBadge 
                  label={`Inner Ø: ${advancedFilters.inner_diameter}mm`} 
                  onClear={() => handleFilterChange({ inner_diameter: 0 })} 
                />
              )}

              <button 
                onClick={resetAll} 
                className="flex items-center gap-1 ml-4 text-[9px] font-bold uppercase text-gray-400 hover:text-black transition-colors"
              >
                <RotateCcw size={12} /> Reset All
              </button>
            </div>
          )}
        </div>

        {/* RESULTS INFO */}
        <div className="mt-4 mb-12 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Catalogue</span> <ChevronRight size={10} /> <span className="text-black">Bracelets</span>
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest">{filteredProducts.length} Models</span>
        </div>

        {/* PRODUCT GRID */}
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
          <div className="py-32 text-center border border-dashed border-gray-200">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">No bracelets found for these criteria</p>
          </div>
        )}
      </main>

      <Footer />

      {/* FILTER DRAWER */}
      {isFilterOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-sm font-black uppercase tracking-[0.3em]">Refine Bracelets</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
              </div>
              <div className="flex-grow overflow-y-auto pr-2">
                <BraceletsFilter onFilterChange={handleFilterChange} />
              </div>
              <div className="pt-8 border-t border-gray-100">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all"
                >
                  Apply Filters ({filteredProducts.length})
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