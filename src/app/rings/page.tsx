'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RingsFilter } from '@/components/RingsFilter'; 
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { LoadMore } from '@/components/LoadMore'; // Import LoadMore
import { RINGS_DATA } from '@/lib/data';
import { Product } from '@/lib/types';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

const INITIAL_LIMIT = 10;

const FilterBadge = ({ label, onClear }: { label: string, onClear: () => void }) => (
  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 border border-gray-200 animate-in fade-in zoom-in duration-200">
    <span className="text-[10px] font-bold uppercase tracking-tight text-gray-700">{label}</span>
    <button onClick={onClear} className="hover:text-red-500 transition-colors">
      <X size={12} />
    </button>
  </div>
);

function RingsPageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || "";

  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  
  const [advancedFilters, setAdvancedFilters] = useState({
    head_style: "",
    shank_style: "",
    primary_shape: "",
    primary_stone_length: 0,
    primary_stone_width: 0,
    min_weight: 0,
    max_weight: 50
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const allProducts = useMemo(() => {
    return RINGS_DATA.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.id.toString().includes(searchTerm);
      const matchesHead = !advancedFilters.head_style || product.head_style === advancedFilters.head_style;
      const matchesShank = !advancedFilters.shank_style || product.shank_style === advancedFilters.shank_style;
      const matchesShape = !advancedFilters.primary_shape || product.primary_stone_shape === advancedFilters.primary_shape;
      const matchesLength = !advancedFilters.primary_stone_length || product.primary_stone_length === Number(advancedFilters.primary_stone_length);
      const matchesWidth = !advancedFilters.primary_stone_width || product.primary_stone_width === Number(advancedFilters.primary_stone_width);
      const matchesWeight = product.estimated_weight >= advancedFilters.min_weight && 
                            product.estimated_weight <= advancedFilters.max_weight;

      return matchesSearch && matchesHead && matchesShank && matchesShape && matchesWeight && matchesLength && matchesWidth;
    });
  }, [searchTerm, advancedFilters]);

  const visibleProducts = useMemo(() => {
    return allProducts.slice(0, visibleCount);
  }, [allProducts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      advancedFilters.head_style !== "" ||
      advancedFilters.shank_style !== "" ||
      advancedFilters.primary_shape !== "" ||
      Number(advancedFilters.primary_stone_length) > 0 ||
      Number(advancedFilters.primary_stone_width) > 0 ||
      advancedFilters.min_weight > 0 ||
      advancedFilters.max_weight < 50 ||
      searchTerm !== ""
    );
  }, [advancedFilters, searchTerm]);

  const resetAll = () => {
    setAdvancedFilters({
      head_style: "",
      shank_style: "",
      primary_shape: "",
      primary_stone_length: 0,
      primary_stone_width: 0,
      min_weight: 0,
      max_weight: 50
    });
    setSearchTerm("");
    setVisibleCount(INITIAL_LIMIT);
  };

  const removeFilter = (key: string) => {
    if (key === 'searchTerm') {
      setSearchTerm("");
    } else if (key === 'stone_size') {
      setAdvancedFilters(prev => ({ ...prev, primary_stone_length: 0, primary_stone_width: 0 }));
    } else {
      setAdvancedFilters(prev => ({ 
        ...prev, 
        [key]: key.includes('weight') ? (key === 'min_weight' ? 0 : 50) : "" 
      }));
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative h-[30vh] flex items-center justify-center bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-[0.4em]">Rings Collection</h1>
          <div className="w-10 h-[1px] bg-[#d4af37] mx-auto mt-4"></div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        
        <div className="sticky top-20 z-40 bg-white pt-8 pb-4">
          <div className="flex flex-row flex-nowrap gap-2 h-14">
            <div className="relative flex-grow min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                value={searchTerm}
                placeholder="Search by ID or Name..."
                className="w-full h-full pl-12 pr-4 bg-gray-50 border border-gray-100 outline-none focus:border-[#d4af37] text-[10px] md:text-xs uppercase tracking-widest transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex-none flex items-center justify-center gap-2 px-4 md:px-8 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all"
            >
              <SlidersHorizontal size={16} /> 
              <span className="hidden md:inline">Advanced Search</span>
              <span className="md:hidden">Filters</span>
            </button>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mr-2">Active:</span>
              
              {searchTerm && <FilterBadge label={`Search: ${searchTerm}`} onClear={() => removeFilter('searchTerm')} />}
              {advancedFilters.head_style && <FilterBadge label={advancedFilters.head_style} onClear={() => removeFilter('head_style')} />}
              {advancedFilters.shank_style && <FilterBadge label={advancedFilters.shank_style} onClear={() => removeFilter('shank_style')} />}
              {advancedFilters.primary_shape && <FilterBadge label={advancedFilters.primary_shape} onClear={() => removeFilter('primary_shape')} />}
              
              {Number(advancedFilters.primary_stone_length) > 0 && (
                <FilterBadge 
                  label={
                    advancedFilters.primary_shape === "Round" 
                      ? `Size: ${advancedFilters.primary_stone_length}mm` 
                      : `Size: ${advancedFilters.primary_stone_length}${Number(advancedFilters.primary_stone_width) > 0 ? 'x' + advancedFilters.primary_stone_width : ''}mm`
                  } 
                  onClear={() => removeFilter('stone_size')} 
                />
              )}

              {(advancedFilters.min_weight > 0 || advancedFilters.max_weight < 50) && (
                <FilterBadge label={`${advancedFilters.min_weight}g - ${advancedFilters.max_weight}g`} onClear={() => setAdvancedFilters(prev => ({...prev, min_weight: 0, max_weight: 50}))} />
              )}
              
              <button onClick={resetAll} className="flex items-center gap-1 ml-2 text-[9px] font-bold uppercase text-[#d4af37] hover:text-black transition-colors">
                <RotateCcw size={12} /> Clear All
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 mb-10 flex justify-between items-end border-b border-gray-100 pb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">Live Catalog</h2>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing {visibleProducts.length} of {allProducts.length} Results</span>
        </div>

        <div className="grid grid-cols-2 gap-8 pb-10">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={(p) => setSelectedProduct(p)} />
          ))}
        </div>
        
        <LoadMore 
          onLoadMore={handleLoadMore}
          hasMore={visibleCount < allProducts.length}
        />

      </main>

      <div className={`fixed inset-0 z-[100] transition-all ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xs font-black uppercase tracking-[0.3em]">Advanced Search</h2>
              <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <RingsFilter onFilterChange={(newFilters) => setAdvancedFilters(prev => ({...prev, ...newFilters}))} />
            </div>
            <div className="p-6 border-t grid grid-cols-2 gap-4">
              <button onClick={resetAll} className="py-4 text-[10px] font-bold uppercase tracking-widest border border-gray-200">Reset</button>
              <button onClick={() => setIsFilterOpen(false)} className="py-4 text-[10px] font-bold uppercase tracking-widest bg-[#1a1a1a] text-white hover:bg-[#d4af37]">Apply</button>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
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
