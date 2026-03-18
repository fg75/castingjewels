'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rings', href: '/rings' },
    { name: 'Earrings', href: '/earrings' },
    { name: 'Pendants', href: '/pendants' },
    { name: 'Bracelets', href: '/bracelets' },
    { name: 'Admin', href: '/admin/productentry' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[9999] transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-xl shadow-black/5' : 'bg-white'
      }`}
    >
      {/* 1. TOP BAR: Branding & Actions */}
      <div className="border-b border-gray-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6 md:px-8">
          
          {/* LOGO GROUP */}
          <Link href="/" className="group flex flex-col">
            <span className="text-lg md:text-xl font-light tracking-[0.4em] uppercase transition-all group-hover:tracking-[0.45em]">
              Casting <span className="text-[#d4af37] font-bold">Jewels</span>
            </span>
            {/* SPOSTAMENTO RICHIESTO: mt-[2px] posiziona la scritta esattamente dove desiderato */}
            <span className="text-[7px] uppercase tracking-[0.8em] text-gray-400 mt-[2px] leading-none">
              High Jewelry Design
            </span>
          </Link>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-5 text-gray-900">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors relative">
              <User size={18} strokeWidth={1.5} />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors relative group">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#d4af37] text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                0
              </span>
            </button>
            
            <button 
              className="lg:hidden p-2 ml-2 bg-gray-50 rounded-md" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY NAV: Desktop Only */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto flex justify-center h-12">
          <nav className="flex items-center h-full gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="relative h-full flex items-center group"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive ? 'text-[#d4af37]' : 'text-gray-400 group-hover:text-black'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Indicator Dot animato */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d4af37] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100 translate-y-[-4px]' : 'opacity-0 scale-0 translate-y-0 group-hover:opacity-50 group-hover:scale-100 group-hover:translate-y-[-4px]'
                  }`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MOBILE MENU: Drawer Side */}
      <div className={`
        fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-[9998] lg:hidden transition-all duration-500
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsMobileMenuOpen(false)}>
        <div 
          className={`
            absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-8 gap-1 pt-12">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6">Collections</span>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-5 border-b border-gray-50 group`}
              >
                <span className={`text-sm font-light uppercase tracking-[0.3em] transition-colors ${
                  pathname === link.href ? 'text-[#d4af37] font-medium' : 'text-gray-900 group-hover:text-[#d4af37]'
                }`}>
                  {link.name}
                </span>
                <ChevronRight size={14} className={pathname === link.href ? 'text-[#d4af37]' : 'text-gray-200'} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};