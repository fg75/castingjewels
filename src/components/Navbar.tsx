"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Rings', href: '/rings' },
    { name: 'Earrings', href: '/earrings' },
    { name: 'Pendants', href: '/pendants' },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-gray-100 h-20">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-8">
        
        {/* LOGO */}
        <Link href="/" className="text-lg md:text-xl font-light tracking-[0.3em] uppercase">
          Casting <span className="text-[#d4af37] font-bold">Jewels</span>
        </Link>
        
        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 hover:text-[#d4af37] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-4 md:gap-6 text-gray-900">
          <div className="hidden md:flex items-center gap-5">
            <User size={18} className="cursor-pointer hover:text-[#d4af37]" />
            <ShoppingBag size={18} className="cursor-pointer hover:text-[#d4af37]" />
          </div>
          
          {/* Tasto Hamburger Mobile */}
          <button 
            className="lg:hidden p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div className={`
        fixed inset-0 top-20 bg-white z-[90] transition-transform duration-300 lg:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col p-8 gap-8 border-t border-gray-50">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-light uppercase tracking-[0.3em] border-b border-gray-50 pb-4"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-8 pt-4">
            <div className="flex items-center gap-2 uppercase text-[10px] font-bold tracking-widest">
              <User size={20} /> Account
            </div>
            <div className="flex items-center gap-2 uppercase text-[10px] font-bold tracking-widest">
              <ShoppingBag size={20} /> Cart
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};