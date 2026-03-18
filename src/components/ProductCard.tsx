"use client";
import React from 'react';
import { Product } from '@/lib/types';
import { Diamond, Weight, Sparkles, Ruler } from 'lucide-react';
import Link from 'next/link';
// Importiamo il motore di calcolo sicuro creato negli step precedenti
import { getTotalProductCT } from '@/lib/utils/product-safety';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // --- LOGICA INDISTRUTTIBILE ---
  // Usiamo il valore calcolato dal motore centrale (gestisce Round, Fancy e manual override)
  const totalCT = getTotalProductCT(product);

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group cursor-pointer bg-white border border-gray-100 transition-all hover:shadow-2xl block"
    >
      {/* Immagine con Overlay */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.img || 'https://via.placeholder.com/400?text=No+Image'} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge Carati: appare solo se il valore è > 0 */}
        {totalCT > 0 && (
          <div className="absolute top-3 right-3 bg-black text-[#d4af37] px-2.5 py-1.5 border border-[#d4af37]/30 shadow-xl flex items-center gap-1.5">
            <Sparkles size={10} className="fill-[#d4af37]/20" />
            <p className="text-[10px] font-black tracking-tighter uppercase">
              ~{totalCT} CT
            </p>
          </div>
        )}

        {/* Badge Categoria (Sottile) */}
        <div className="absolute bottom-3 left-3">
           <span className="text-[8px] bg-white/90 backdrop-blur-sm px-2 py-0.5 font-black uppercase tracking-[0.2em] text-gray-500 border border-gray-100">
             {product.category}
           </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <p className="text-[9px] text-[#d4af37] font-black uppercase tracking-[0.2em] mb-1">
            REF: {product.id}
          </p>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 group-hover:text-[#d4af37] transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-gray-50">
          {/* Peso Oro */}
          <div className="flex items-center gap-2">
            <Weight size={12} className="text-gray-400" />
            <span className="text-[10px] font-black text-gray-700 uppercase">
              {product.estimated_weight}g
            </span>
          </div>

          {/* Dimensioni Extra (Diametro per Orecchini/Bracciali) */}
          {(product.earring_diameter || product.inner_diameter) ? (
            <div className="flex items-center gap-2">
              <Ruler size={12} className="text-gray-400" />
              <span className="text-[10px] font-black text-gray-700 uppercase">
                Ø {product.earring_diameter || product.inner_diameter}mm
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles size={12} className={totalCT > 0 ? "text-[#d4af37]" : "text-gray-200"} />
              <span className="text-[10px] font-black text-gray-900 uppercase">
                {totalCT > 0 ? `${totalCT} CT` : "--- CT"}
              </span>
            </div>
          )}

          {/* Info Pietra Principale */}
          <div className="flex items-center gap-2">
            <Diamond size={12} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-[9px] leading-tight font-black text-gray-700 uppercase truncate max-w-[60px]">
                {product.primary_stone_shape || 'Metal Only'}
              </span>
              {product.primary_stone_length && (
                <span className="text-[8px] text-gray-400 font-bold">
                  {product.primary_stone_length}mm
                </span>
              )}
            </div>
          </div>

          {/* Conteggio Pietre */}
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-black text-gray-300">#</div>
            <span className="text-[10px] font-black text-gray-700 uppercase">
              {product.primary_stone_count || 0} Pcs
            </span>
          </div>
        </div>

        <div className="w-full py-3 mt-2 text-[9px] text-center font-black uppercase tracking-[0.2em] border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
          View Technical Sheet
        </div>
      </div>
    </Link>
  );
};