
"use client";
import { useState } from "react";
import { Gem, Diamond, Weight, Settings } from 'lucide-react';
import * as CONST from '@/components/filters/constants';

// Definizione del tipo Product (semplificata per il contesto)
interface Product {
  [key: string]: any;
  primary_stone_shape?: string;
  primary_stone_count?: number;
  primary_stone_ct?: number;
  primary_stone_length?: number;
  primary_stone_width?: number;

  secondary_stone_shape?: string;
  secondary_stone_count?: number;
  secondary_stone_ct?: number;
  secondary_stone_length?: number;
  secondary_stone_width?: number;


  shank_stone_shape?: string;
  shank_stone_count?: number;
  shank_stone_ct?: number;
  shank_stone_length?: number;
  shank_stone_width?: number;


  metal?: string;
  min_weight?: number;
  max_weight?: number;
  min_total_ct?: number;
  max_total_ct?: number;
}


export default function ProductEntry() {
    const [product, setProduct] = useState<Product>({});

    const handleUpdate = (key: keyof Product, value: any) => {
        setProduct(prev => ({ ...prev, [key]: value }));
    };

    // Funzione placeholder per il salvataggio
    const handleSave = () => {
        console.log("Salvataggio del prodotto:", product);
        // Qui andrebbe la logica per inviare i dati al backend
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
          <div className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-bold">Inserimento Prodotto</h1>
              <button 
                onClick={handleSave}
                className="bg-[#d4af37] text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">
                Salva Prodotto
              </button>
            </header>
    
            <div className="space-y-12">
              {/* Sezione Pietra Primaria */}
              <section>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Gem size={18} className="text-[#d4af37]" /> Pietra Primaria
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Forma</label>
                    <select className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-[#d4af37] transition-colors"
                      onChange={(e) => handleUpdate('primary_stone_shape', e.target.value)}>
                      {CONST.STONE_SHAPES.map(s => <option key={s.id} value={s.id} className="text-black">{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Quantità</label>
                    <input type="number" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white"
                      onChange={(e) => handleUpdate('primary_stone_count', parseInt(e.target.value))}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Caratura (CT)</label>
                    <input type="number" step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white"
                      onChange={(e) => handleUpdate('primary_stone_ct', parseFloat(e.target.value))}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Dimensioni (mm)</label>
                    <div className="flex gap-4">
                      <input type="number" placeholder="Lung." step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('primary_stone_length', parseFloat(e.target.value))}/>
                      <input type="number" placeholder="Larg." step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('primary_stone_width', parseFloat(e.target.value))}/>
                    </div>
                  </div>
                </div>
              </section>
    
              {/* Sezione Pietra Secondaria */}
              <section>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Diamond size={18} className="text-[#d4af37]" /> Pietra Secondaria
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Forma</label>
                    <select className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-[#d4af37] transition-colors"
                      onChange={(e) => handleUpdate('secondary_stone_shape', e.target.value)}>
                      {CONST.STONE_SHAPES.map(s => <option key={s.id} value={s.id} className="text-black">{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Quantità</label>
                    <input type="number" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white"
                      onChange={(e) => handleUpdate('secondary_stone_count', parseInt(e.target.value))}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Caratura (CT)</label>
                    <input type="number" step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white"
                      onChange={(e) => handleUpdate('secondary_stone_ct', parseFloat(e.target.value))}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Dimensioni (mm)</label>
                    <div className="flex gap-4">
                      <input type="number" placeholder="Lung." step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('secondary_stone_length', parseFloat(e.target.value))}/>
                      <input type="number" placeholder="Larg." step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('secondary_stone_width', parseFloat(e.target.value))}/>
                    </div>
                  </div>
                </div>
              </section>
    
              {/* Sezione Gambo */}
              <section>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Settings size={18} className="text-[#d4af37]" /> Gambo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Forma</label>
                    <select className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-[#d4af37] transition-colors"
                      onChange={(e) => handleUpdate('shank_stone_shape', e.target.value)}>
                      {CONST.STONE_SHAPES.map(s => <option key={s.id} value={s.id} className="text-black">{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Quantità</label>
                    <input type="number" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white"
                      onChange={(e) => handleUpdate('shank_stone_count', parseInt(e.target.value))}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Caratura (CT)</label>
                    <input type="number" step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white"
                      onChange={(e) => handleUpdate('shank_stone_ct', parseFloat(e.target.value))}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Dimensioni (mm)</label>
                    <div className="flex gap-4">
                      <input type="number" placeholder="Lung." step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('shank_stone_length', parseFloat(e.target.value))}/>
                      <input type="number" placeholder="Larg." step="0.01" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('shank_stone_width', parseFloat(e.target.value))}/>
                    </div>
                  </div>
                </div>
              </section>
    
              {/* Sezione Metallo e Totali */}
              <section>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Weight size={18} className="text-[#d4af37]" /> Specifiche Metallo e Totali
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Lega Metallo</label>
                    <select className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-[#d4af37] transition-colors"
                      onChange={(e) => handleUpdate('metal', e.target.value)}>
                      {CONST.METAL_TYPES.map(m => <option key={m.id} value={m.id} className="text-black">{m.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Peso Metallo (gr)</label>
                    <div className="flex gap-4">
                      <input type="number" placeholder="Min" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('min_weight', parseFloat(e.target.value))}/>
                      <input type="number" placeholder="Max" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('max_weight', parseFloat(e.target.value))}/>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Caratura Totale (CT)</label>
                    <div className="flex gap-4">
                      <input type="number" placeholder="Min" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('min_total_ct', parseFloat(e.target.value))}/>
                      <input type="number" placeholder="Max" className="w-full bg-transparent border-b-2 border-gray-700 py-2 text-sm font-bold outline-none focus:border-white" 
                        onChange={(e) => handleUpdate('max_total_ct', parseFloat(e.target.value))}/>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }

