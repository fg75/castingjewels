"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Download, 
  Printer, 
  PenTool, 
  Menu, 
  X, 
  ShoppingBag, 
  User,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>(['Rings']);

  const navLinks = [
    { name: 'Rings', href: '#' },
    { name: 'Earrings', href: '#' },
    { name: 'Bracelets', href: '#' },
    { name: 'Necklaces', href: '#' },
    { name: 'Pendants', href: '#' },
  ];

  const categories = [
    {
      name: 'Rings',
      attributes: ['Solitaire', 'Halo', 'Vintage', 'Wedding Bands', 'Three-Stone']
    },
    {
      name: 'Stone Shapes',
      attributes: ['Round', 'Oval', 'Emerald', 'Pear', 'Princess', 'Marquise']
    },
    {
      name: 'Metal Type',
      attributes: ['14K Gold', '18K Gold', 'Platinum', 'Rose Gold']
    }
  ];

  // Dati finti per i prodotti
  const products = [
    { id: 5041, category: "Rings", title: "Solitaire Engagement Mounting", price: "39.00", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop" },
    { id: 5042, category: "Earrings", title: "Diamond Stud Bases", price: "29.00", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop" },
    { id: 5043, category: "Necklaces", title: "Classic Halo Pendant", price: "45.00", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500&auto=format&fit=crop" },
    { id: 5044, category: "Rings", title: "Vintage Floral Band", price: "55.00", img: "https://images.unsplash.com/photo-1603561591411-071c4f753934?q=80&w=500&auto=format&fit=crop" },
    { id: 5045, category: "Bracelets", title: "Modern Tennis Bracelet", price: "89.00", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop" },
    { id: 5046, category: "Rings", title: "Double Halo Statement", price: "49.00", img: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=500&auto=format&fit=crop" },
    { id: 5047, category: "Pendants", title: "Art Deco Geometric", price: "35.00", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce33e?q=80&w=500&auto=format&fit=crop" },
    { id: 5048, category: "Rings", title: "Eternity Shared Prong", price: "42.00", img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=500&auto=format&fit=crop" },
  ];

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans">
      {/* --- NAVBAR PRINCIPALE --- */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <button className="lg:hidden p-2 text-[#1a1a1a]" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="text-xl font-light tracking-[0.3em] uppercase cursor-pointer text-[#1a1a1a]">
            Casting <span className="text-[#d4af37] font-bold">Jewels</span>
          </div>
          
          {/* I link PC ora hanno text-[#1a1a1a] forzato per non sparire */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-[11px] text-[#1a1a1a] font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-[#d4af37] transition text-[#1a1a1a]"><User size={20} strokeWidth={1.5} /></button>
            <button className="p-2 hover:text-[#d4af37] transition relative text-[#1a1a1a]">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#d4af37] rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- MENU MOBILE OVERLAY (Questo era sparito!) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-6 lg:hidden animate-in fade-in duration-300">
          <button className="self-end p-2 text-[#1a1a1a]" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={30} />
          </button>
          <ul className="mt-12 space-y-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-2xl text-[#1a1a1a] font-light uppercase tracking-widest block border-b border-gray-100 pb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex flex-col items-center justify-start text-center px-4 pt-24 md:pt-40 pb-64 overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop" 
            alt="Jewelry"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]"></div>
        </div>
        
        <div className="max-w-4xl z-20 mb-12 relative"> 
          <h1 className="text-[#f8f9fa] text-4xl md:text-7xl font-light tracking-tight mb-8 uppercase leading-tight px-2 drop-shadow-lg">
            Masterfully Crafted <br className="hidden md:block" />
            <span className="text-[#d4af37] font-semibold tracking-wide">STL Jewelry Models</span>
          </h1>
          <p className="text-[#f8f9fa]/90 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed italic px-4 mb-10 drop-shadow">
            "Precision-engineered for perfection. Access an exclusive library of professional-grade mountings, 
            meticulously designed for modern jewelers, retailers, and CAD specialists worldwide."
          </p>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#d4af37] text-[#1a1a1a] font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-[#f8f9fa] transition-all duration-300 shadow-2xl">
            Explore the Catalog
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-12 left-0 w-full px-4 z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center justify-center gap-4 py-5 px-6 border border-[#f8f9fa]/20 bg-black/40 backdrop-blur-md rounded-sm">
              <Download className="text-[#d4af37]" size={20} />
              <span className="text-[#f8f9fa] uppercase tracking-widest text-[10px]">Instant Download</span>
            </div>
            <div className="flex items-center justify-center gap-4 py-5 px-6 border border-[#f8f9fa]/20 bg-black/40 backdrop-blur-md rounded-sm">
              <Printer className="text-[#d4af37]" size={20} />
              <span className="text-[#f8f9fa] uppercase tracking-widest text-[10px]">Ready to Print</span>
            </div>
            <div className="flex items-center justify-center gap-4 py-5 px-6 border border-[#f8f9fa]/20 bg-black/40 backdrop-blur-md rounded-sm">
              <PenTool className="text-[#d4af37]" size={20} />
              <span className="text-[#f8f9fa] uppercase tracking-widest text-[10px]">Created by Jewelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DI RICERCA */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 text-[#1a1a1a]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search models..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded focus:border-[#d4af37] outline-none transition text-sm" 
              />
            </div>
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-[#f8f9fa] rounded text-[11px] font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all"
            >
              <Filter size={14} className="text-[#d4af37]" />
              <span>Search By</span>
            </button>
          </div>
        </div>
      </div>

      {/* DRAWER FILTRI */}
      {isFilterDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[100]" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-[320px] bg-white z-[101] shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Search Categories</h2>
              <button onClick={() => setIsFilterDrawerOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {categories.map((cat) => (
                <div key={cat.name} className="border-b border-gray-50 pb-2">
                  <button 
                    onClick={() => toggleCategory(cat.name)}
                    className="w-full flex justify-between items-center py-2 text-xs font-bold uppercase hover:text-[#d4af37]"
                  >
                    {cat.name}
                    {openCategories.includes(cat.name) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openCategories.includes(cat.name) && (
                    <div className="mt-2 ml-2 space-y-2">
                      {cat.attributes.map(attr => (
                        <label key={attr} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-3.5 h-3.5 accent-[#d4af37]" />
                          <span className="text-[11px] text-gray-500 group-hover:text-[#1a1a1a] transition-colors">{attr}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- MAIN SECTION: GRIGLIA PRODOTTI --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em] mb-2">Exclusive Collection</h2>
            <p className="text-2xl font-light uppercase tracking-widest">Premium STL Models</p>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">8 Models Found</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product, index) => (
  <div 
    key={product.id} 
    className="group cursor-pointer reveal-item" 
    style={{ 
      animationDelay: `${index * 0.1}s`, 
      opacity: 0 
    }}
  >
    {/* Immagine con zoom fluido e overlay */}
    <div className="relative aspect-[4/5] bg-white border border-gray-100 overflow-hidden mb-6 transition-all duration-1000 group-hover:border-[#d4af37]/50 shadow-sm">
      <img 
        src={product.img} 
        alt={product.title} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      <div className="absolute top-3 right-3">
        <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShoppingBag size={14} className="text-[#1a1a1a]" />
        </div>
      </div>
    </div>
    
    {/* Testi con spaziatura lusso */}
    <div className="text-center space-y-1">
      <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.4em] block mb-2">
        {product.category}
      </span>
      <h3 className="text-sm font-light tracking-widest text-[#1a1a1a] uppercase group-hover:text-[#d4af37] transition-colors duration-300 leading-snug">
        {product.title}
      </h3>
      <p className="text-[11px] text-gray-400 font-serif italic tracking-wide">
        Ref. {product.id} — €{product.price}
      </p>
    </div>
  </div>
))}
        </div>

        {/* Pulsante Carica Altri */}
        <div className="mt-20 flex justify-center">
            <button className="px-12 py-4 border border-gray-200 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
                Load More Models
            </button>
        </div>
      </main>

      {/* FOOTER SEMPLICE */}
      <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="text-lg font-light tracking-[0.3em] uppercase mb-4">
                Casting <span className="text-[#d4af37] font-bold">Jewels</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">© 2024 High Quality Jewelry STL Library</p>
          </div>
      </footer>

    </div>
  );
}