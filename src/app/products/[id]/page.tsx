"use client";
import React from 'react';
import { RINGS_DATA } from '@/lib/data';
import { getTotalProductCT } from '@/lib/utils/product-safety';
import { 
  Diamond, Weight, Ruler, ChevronLeft, 
  ArrowRight, Box, CheckCircle2, Info 
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { id } = useParams();
  
  // 1. Recupero Prodotto (Safe Check)
  const product = RINGS_DATA.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Model Not Found</p>
        <Link href="/" className="text-[#d4af37] border-b border-[#d4af37] text-[10px] font-black uppercase">Return to Archive</Link>
      </div>
    );
  }

  // 2. Calcolo Carati Totali tramite Engine
  const totalCT = getTotalProductCT(product);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigazione Superiore */}
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- COLONNA SINISTRA: IMMAGINE --- */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 overflow-hidden border border-gray-100">
              <img 
                src={product.img || 'https://via.placeholder.com/800'} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Disclaimer Tecnico */}
            <div className="p-6 bg-gray-50 flex gap-4">
              <Info size={20} className="text-[#d4af37] shrink-0" />
              <p className="text-[10px] leading-relaxed text-gray-500 uppercase tracking-wider">
                This is a high-precision CAD model. All dimensions are optimized for 
                3D printing and casting. Stone weights are calculated based on 
                standard density parameters.
              </p>
            </div>
          </div>

          {/* --- COLONNA DESTRA: SPECIFICHE --- */}
          <div className="flex flex-col">
            <div className="mb-10">
              <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.5em] mb-2 block italic">
                Ref. ID: {product.id}
              </span>
              <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tighter text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="h-1 w-20 bg-black" />
            </div>

            {/* Griglia Specifiche Tecniche */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 border-t border-gray-100 pt-10 mb-12">
              
              {/* Peso Metallo */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Weight size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Est. Metal Weight</span>
                </div>
                <p className="text-lg font-bold text-gray-900 uppercase">{product.estimated_weight}g <span className="text-[10px] text-gray-400 font-medium">(18K)</span></p>
              </div>

              {/* Carati Totali */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Diamond size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Total Carat Weight</span>
                </div>
                <p className="text-lg font-bold text-gray-900 uppercase">~{totalCT} CT</p>
              </div>

              {/* Pietra Principale */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Ruler size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Main Stone</span>
                </div>
                <p className="text-sm font-bold text-gray-900 uppercase">
                  {product.primary_stone_count}x {product.primary_stone_shape} 
                  <span className="block text-[10px] text-gray-500 font-medium">
                    {product.primary_stone_length} {product.primary_stone_width ? `x ${product.primary_stone_width}` : ''} mm
                  </span>
                </p>
              </div>

              {/* DATI DINAMICI (Condizionali per Categoria) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Box size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Engineering Specs</span>
                </div>
                
                {/* Mostra diametro se presente (Bracciali/Orecchini) */}
                {(product.earring_diameter || product.inner_diameter) && (
                  <p className="text-sm font-bold text-gray-900 uppercase">
                    Ø {product.earring_diameter || product.inner_diameter} mm
                  </p>
                )}
                
                {/* Mostra Stile se presente (Anelli) */}
                {product.head_style && (
                  <p className="text-sm font-bold text-gray-900 uppercase">
                    {product.head_style} Head
                  </p>
                )}

                {/* Se non ha nessuno dei precedenti */}
                {!product.head_style && !product.earring_diameter && !product.inner_diameter && (
                  <p className="text-sm font-bold text-gray-900 uppercase">Custom Precision</p>
                )}
              </div>
            </div>

            {/* Checklist di Qualità Tecnica */}
            <div className="space-y-4 mb-12">
               {['Precision stone seats', 'Optimized wall thickness', 'Ready for high-res 3D print'].map((check, idx) => (
                 <div key={idx} className="flex items-center gap-3">
                   <CheckCircle2 size={14} className="text-[#d4af37]" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{check}</span>
                 </div>
               ))}
            </div>

            {/* CTA: Azioni */}
            <div className="flex flex-col gap-4">
              <button className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#d4af37] transition-all">
                Download Technical Package <ArrowRight size={16} />
              </button>
              <button className="w-full border border-gray-200 text-gray-900 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gray-50 transition-all">
                Request Custom Modification
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}