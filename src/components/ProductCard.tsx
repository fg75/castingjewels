"use client";
import React from 'react';
import { Product } from '@/lib/types';
import { Diamond, Weight, Layers, Ruler } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  return (
    <div 
      className="group cursor-pointer bg-white border border-gray-100 transition-all hover:shadow-2xl"
      onClick={() => onQuickView(product)}
    >
      {/* Immagine con Overlay */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.img} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Contenuto Informativo */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-[10px] text-[#d4af37] font-bold uppercase tracking-[0.2em] mb-1">
            {product.id}
          </p>
          <h3 className="text-xs font-medium uppercase tracking-widest text-gray-900 group-hover:text-[#d4af37] transition-colors">
            {product.title}
          </h3>
        </div>

        {/* GRIGLIA SPECIFICHE TECNICHE */}
        <div className="grid grid-cols-2 gap-y-3 pt-4 border-t border-gray-50">
          
          {/* Peso Metallo */}
          <div className="flex items-center gap-2">
            <Weight size={14} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-600 uppercase">{product.estimated_weight}g</span>
          </div>

          {/* Forma e Misura Pietra Principale */}
          {product.primary_stone_shape && (
            <div className="flex items-center gap-2">
              <Diamond size={14} className="text-gray-400" />
              <div className="flex flex-col">
                <span className="text-[9px] leading-tight font-bold text-gray-600 uppercase">
                  {product.primary_stone_shape}
                </span>
                {product.primary_stone_length && (
                  <span className="text-[8px] text-gray-400 font-medium">
                    {product.primary_stone_length}
                    {product.primary_stone_width ? `x${product.primary_stone_width}` : ''}mm
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Numero Pietre Principali */}
          {product.primary_stone_count && product.primary_stone_count > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-[14px] flex justify-center text-[10px] font-black text-gray-400">#</div>
              <span className="text-[10px] font-bold text-gray-600 uppercase">
                {product.primary_stone_count} Stone{product.primary_stone_count > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Pietre Secondarie (se presenti) */}
          {product.secondary_stone_count && product.secondary_stone_count > 0 && (
            <div className="flex items-center gap-2 col-span-2">
              <Layers size={14} className="text-[#d4af37]" />
              <span className="text-[10px] font-bold text-gray-600 uppercase">
                +{product.secondary_stone_count} {product.secondary_stone_shape || 'Side'} Stones
              </span>
            </div>
          )}
        </div>

        {/* Bottone d'azione */}
        <button className="w-full py-3 mt-2 text-[9px] font-black uppercase tracking-[0.2em] border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
          Quick View
        </button>
      </div>
    </div>
  );
};