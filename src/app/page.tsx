'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HomeSearch } from '@/components/HomeSearch';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { HomeFilter } from '@/components/HomeFilter';
import { LoadMore } from '@/components/LoadMore';
import { RINGS_DATA } from '@/lib/data';
import { Product } from '@/lib/types';
import { Diamond, X } from 'lucide-react';

const INITIAL_LIMIT = 8;

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchClick = () => {
    setIsFilterOpen(true);
  };

  const allProducts = useMemo(() => {
    return RINGS_DATA.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
    );
  }, [searchTerm]);

  const visibleProducts = useMemo(() => {
    return allProducts.slice(0, visibleCount);
  }, [allProducts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HomeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={handleSearchClick} />
      
      <main className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Diamond size={16} className="text-[#d4af37]" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Featured Collection</h3>
          </div>
          <h2 className="text-2xl font-light uppercase tracking-widest text-gray-900">Catalogue Highlights</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing {visibleProducts.length} of {allProducts.length} curated designs
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 py-10">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={(p) => setSelectedProduct(p)} />
          ))}
        </div>

        {allProducts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No models found for "{searchTerm}"</p>
          </div>
        )}

        <LoadMore 
          onLoadMore={handleLoadMore}
          hasMore={visibleCount < allProducts.length}
        />
      </main>

      {/* DRAWER for HomeFilter */}
      <div className={`fixed inset-0 z-[100] transition-all ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xs font-black uppercase tracking-[0.3em]">Search</h2>
              <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <HomeFilter initialSearchTerm={searchTerm} />
            </div>
          </div>
        </aside>
      </div>

      <Footer />
      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
