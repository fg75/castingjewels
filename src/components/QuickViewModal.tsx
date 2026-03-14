"use client";
import React from 'react';
import { X, Diamond, Weight, Layers, Ruler, Hammer, Info } from 'lucide-react';
import { Product } from '@/lib/types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  if (!product) return null;

  const SpecItem = ({ icon: Icon, label, value, subValue }: any) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50/50 border border-gray-100">
      <div className="mt-1">
        <Icon size={18} className="text-[#d4af37]" />
      </div>
      <div>
        <p className="text-[9px] uppercase font-black tracking-widest text-gray-400 mb-1">{label}</p>
        <p className="text-xs font-bold uppercase text-gray-900 leading-none">{value}</p>
        {subValue && <p className="text-[10px] text-gray-500 mt-1 font-medium">{subValue}</p>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
      {/* Overlay con sfocatura */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Contenitore Modal */}
      <div className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto">
          
          {/* COLONNA SINISTRA: Immagine */}
          <div className="relative bg-gray-50 flex items-center justify-center p-8">
            <img 
              src={product.img} 
              alt={product.title} 
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>

          {/* COLONNA DESTRA: Dettagli Tecnici */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-[#d4af37]/10 text-[#d4af37] px-3 py-1">
                  ID: {product.id}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {product.metal}
                </span>
              </div>
              
              <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-gray-900 mb-8 leading-tight">
                {product.title}
              </h2>

              {/* GRIGLIA SPECIFICHE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Metallo */}
                <SpecItem 
                  icon={Hammer} 
                  label="Metal Weight" 
                  value={`${product.estimated_weight} Grams`}
                  subValue={`Alloy: ${product.metal}`}
                />

                {/* Pietra Principale */}
                {product.primary_stone_shape && (
                  <SpecItem 
                    icon={Diamond} 
                    label="Primary Stone" 
                    value={product.primary_stone_shape}
                    subValue={product.primary_stone_length ? 
                      `${product.primary_stone_length}${product.primary_stone_width ? ' x ' + product.primary_stone_width : ''} mm` 
                      : 'Standard Cut'}
                  />
                )}

                {/* Quantità Pietre */}
                <SpecItem 
                  icon={Info} 
                  label="Center Setting" 
                  value={product.head_style || "N/A"}
                  subValue={`${product.primary_stone_count || 0} Main Stone(s)`}
                />

                {/* Pietre Secondarie */}
                <SpecItem 
                  icon={Layers} 
                  label="Side Stones" 
                  value={product.secondary_stone_count && product.secondary_stone_count > 0 ? 
                    `${product.secondary_stone_count} Total` : "No Side Stones"}
                  subValue={product.secondary_stone_shape ? `${product.secondary_stone_shape} Cut` : "None"}
                />

              </div>

              {/* Dettaglio Shank */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-[9px] uppercase font-black tracking-widest text-gray-400 mb-2 italic">Band Design</p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                   {product.shank_style} Style
                </p>
              </div>
            </div>

            {/* Azioni */}
            <div className="mt-12 flex flex-col gap-4">
              <button className="w-full py-5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all">
                Download Technical Datasheet (STL)
              </button>
              <button className="w-full py-4 border border-gray-200 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">
                Add to Quote Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};