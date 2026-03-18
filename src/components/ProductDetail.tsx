"use client";
import React, { useState } from 'react';
import { 
  Download, 
  ChevronRight, 
  Ruler, 
  Weight, 
  Layers, 
  CheckCircle2, 
  ArrowLeft,
  Box
} from 'lucide-react';

export const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: "RG-2026-X1",
    name: "Trinity Arch Diamond Ring",
    price: 45.00,
    category: "Rings",
    description: "High-precision CAD model optimized for 3-axis and 5-axis milling. Features a tapered shank with pre-cut seats for 1.5mm diamonds.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070",
      "https://images.unsplash.com/photo-1598560912005-59a1d5567b11?q=80&w=2070",
      "https://images.unsplash.com/photo-1573408374415-f4e73c7671ee?q=80&w=2070"
    ],
    specs: {
      metalWeight: "4.2g (18K Gold)",
      stoneSize: "1.50mm (x12)",
      totalCarat: "0.18ctw",
      ringSize: "54 (Resizable)",
      fileFormat: "STL, OBJ, 3DM"
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb / Back */}
        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* 1. GALLERY */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 overflow-hidden border border-gray-100 relative group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
                CAD Preview
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square border transition-all ${selectedImage === idx ? 'border-[#d4af37]' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. INFORMAZIONI TECNICHE */}
          <div className="flex flex-col">
            <div className="mb-8 border-b border-gray-100 pb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-bold mb-2 block">
                {product.category} — ID: {product.id}
              </span>
              <h1 className="text-4xl font-light uppercase tracking-tight mb-4 text-gray-900">
                {product.name}
              </h1>
              <p className="text-2xl font-serif italic text-gray-600">
                €{product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            {/* TABELLA SPECIFICHE */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-12 bg-gray-50 p-8 border border-gray-100">
              <SpecItem icon={<Weight size={16}/>} label="Est. Weight" value={product.specs.metalWeight} />
              <SpecItem icon={<Ruler size={16}/>} label="Stone Size" value={product.specs.stoneSize} />
              <SpecItem icon={<Flame size={16}/>} label="Total Carat" value={product.specs.totalCarat} />
              <SpecItem icon={<Box size={16}/>} label="Formats" value={product.specs.fileFormat} />
            </div>

            {/* AZIONI ACQUISTO */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white py-6 flex items-center justify-center gap-4 hover:bg-[#d4af37] hover:text-black transition-all group">
                <Download size={20} className="group-hover:bounce" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Purchase & Download STL</span>
              </button>
              
              <div className="flex items-center justify-center gap-6 py-4">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-green-600 font-bold">
                  <CheckCircle2 size={14} /> Print Tested
                </div>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-green-600 font-bold">
                  <CheckCircle2 size={14} /> Cast Ready
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <div className="text-[#d4af37] mt-0.5">{icon}</div>
    <div>
      <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">{label}</span>
      <span className="block text-xs font-medium text-gray-900">{value}</span>
    </div>
  </div>
);