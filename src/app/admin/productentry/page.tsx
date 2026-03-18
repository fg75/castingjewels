"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { Upload, Save, Box, Diamond, Ruler, Anchor, FileText, MoveHorizontal } from 'lucide-react';

const METAL_DENSITIES: Record<string, number> = {
  '18k_gold': 0.0150,
  '14k_gold': 0.0130,
  'platinum': 0.0215,
  'silver_925': 0.0104,
};

const STONE_COEFFICIENTS: Record<string, number> = {
  'Round': 0.0061, 'Oval': 0.0062, 'Emerald': 0.0080, 'Princess': 0.0083, 
  'Pear': 0.0062, 'Marquise': 0.0058, 'Cushion': 0.0081, 'Radiant': 0.0081, 
  'Asscher': 0.0080, 'Heart': 0.0073, 'Baguette': 0.0085, 'Trillion': 0.0057
};

const PAVE_SHAPES = ['Round', 'Square', 'Heart', 'Star', 'Butterfly', 'Flower', 'Moon', 'Cross', 'Geometric'];

export default function ProductEntry() {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    category: 'rings',
    metal: '18k_gold',
    primary_stone_count: 1,
    is_active: true,
    primary_stone_shape: 'Round',
    secondary_stone_shape: 'None',
    shank_stone_shape: 'None',
  });

  const [volume, setVolume] = useState<number>(0);
  const [dragActive, setDragActive] = useState(false);

  // Soluzione per l'errore di Hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- LOGIC: AUTOMATIC CARAT ESTIMATION ---
  const estimateCarats = (shape: string, L: number, W: number, count: number) => {
    if (!L || !shape || shape === 'None') return 0;
    const coeff = STONE_COEFFICIENTS[shape] || 0.0061;
    const width = shape === 'Round' ? L : (W || L);
    const ct = L * width * (L * 0.6) * coeff * (count || 1);
    return Number(ct.toFixed(2));
  };

  useEffect(() => {
    const pCt = estimateCarats(formData.primary_stone_shape || '', formData.primary_stone_length || 0, formData.primary_stone_width || 0, formData.primary_stone_count || 1);
    const sCt = estimateCarats(formData.secondary_stone_shape || '', formData.secondary_stone_length || 0, formData.secondary_stone_width || 0, formData.secondary_stone_count || 0);
    const shCt = estimateCarats(formData.shank_stone_shape || '', formData.shank_stone_length || 0, formData.shank_stone_width || 0, formData.shank_stone_count || 0);

    setFormData(prev => ({ 
      ...prev, 
      primary_stone_ct: pCt, secondary_stone_ct: sCt, shank_stone_ct: shCt
    }));

    if (volume > 0) {
      const density = METAL_DENSITIES[formData.metal || '18k_gold'];
      setFormData(prev => ({ ...prev, estimated_weight: Number((volume * density).toFixed(2)) }));
    }
  }, [formData.primary_stone_shape, formData.primary_stone_length, formData.primary_stone_width, formData.primary_stone_count,
      formData.secondary_stone_shape, formData.secondary_stone_length, formData.secondary_stone_width, formData.secondary_stone_count,
      formData.shank_stone_shape, formData.shank_stone_length, formData.shank_stone_width, formData.shank_stone_count,
      formData.metal, volume]);

  if (!isMounted) return null;

  const saveSimulation = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `simulazione_${formData.title || 'prodotto'}.json`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      <header className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-sm font-black uppercase tracking-[0.4em] text-[#d4af37]">Product Creation Lab</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- LEFT COLUMN: MEDIA & IDENTIFICATION --- */}
        <div className="lg:col-span-4 space-y-8">
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setFormData({...formData, img: URL.createObjectURL(e.dataTransfer.files[0])}); setDragActive(false); }}
            className={`aspect-square border-2 border-dashed flex items-center justify-center transition-all ${dragActive ? 'border-[#d4af37] bg-[#fdfaf0]' : 'border-gray-100 bg-gray-50'}`}
          >
            {formData.img ? <img src={formData.img} className="w-full h-full object-cover" /> : <Upload className="text-gray-200" size={40} />}
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest border-b pb-2">Identification</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Product Title</label>
                <input 
                  type="text" className="w-full p-3 bg-gray-50 border-none text-[11px] uppercase tracking-wider"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1"><FileText size={10}/> Description</label>
                <textarea 
                  className="w-full p-3 bg-gray-50 border-none text-[11px] min-h-[120px]"
                  placeholder="Insert technical details or general description..."
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Price</label>
                  <input 
                    type="text" className="w-full p-3 bg-gray-50 border-none text-[11px]"
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Category</label>
                  <select 
                    className="w-full p-3 bg-gray-50 text-[10px] uppercase font-bold"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="rings">Rings</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="pendants">Pendants</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                />
                <label htmlFor="is_active" className="text-[9px] font-bold text-gray-400 uppercase">Is Active</label>
              </div>
            </div>
          </div>
        </div>

        {/* --- CENTER COLUMN: DESIGN SPECS --- */}
        <div className="lg:col-span-4 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Ruler size={14} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Design Specifications</h2>
            </div>

            {formData.category === 'rings' && (
              <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-500">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Ring Style</label>
                  <select className="w-full p-2 bg-gray-50 text-[11px]" onChange={(e) => setFormData({...formData, head_style: e.target.value as any})}>
                    <option value="">Select Style</option>
                    {['Solitaire','Trilogy','Halo','Pavé','Cluster','Two Stones','Wedding Band','Eternity','Decorated Band','Signet'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {formData.head_style === 'Pavé' && (
                  <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest">Pavé Shape</label>
                    <select className="w-full p-2 bg-[#fdfaf0] border border-[#d4af37] text-[11px]" onChange={(e) => setFormData({...formData, pave_shape: e.target.value})}>
                      <option value="">Select Shape...</option>
                      {PAVE_SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Shank Style</label>
                  <select className="w-full p-2 bg-gray-50 text-[11px]" onChange={(e) => setFormData({...formData, shank_style: e.target.value as any})}>
                    <option value="">Select Style</option>
                    {['Straight','Tapered','Reverse Tapered','Split','Cathedral','Bypass','Knife Edge','Pavé'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-1 bg-gray-50 p-3 rounded-sm border border-gray-100">
                  <label className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-1">
                    <MoveHorizontal size={10}/> Finger Size (Inner Diameter mm)
                  </label>
                  <input 
                    type="number" step="0.01" placeholder="e.g. 17.25"
                    className="w-full p-2 bg-white border border-gray-200 text-[11px]" 
                    onChange={(e) => setFormData({...formData, finger_size_mm: parseFloat(e.target.value)})} 
                  />
                  <p className="text-[8px] text-gray-400 italic mt-1 font-medium">* Use digital caliper (step 0.01)</p>
                </div>
              </div>
            )}

            {formData.category === 'earrings' && (
              <div className="grid grid-cols-1 gap-3 animate-in fade-in duration-500">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Earring Style</label>
                  <select className="w-full p-2 bg-gray-50 text-[11px]" onChange={(e) => setFormData({...formData, earring_style: e.target.value as any})}>
                    <option value="">Select Style</option>
                    {['Solitaire','Studs','Hoops','Huggies','Pavé','Drop','Halo','Chandelier','Ear Cuffs','Ear Jackets','Ear Climbers'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Anchor size={12} />
                    <label className="text-[9px] font-bold uppercase tracking-widest">Closure / Mechanism</label>
                  </div>
                  <select className="w-full p-2 bg-gray-50 text-[11px]" onChange={(e) => setFormData({...formData, closure: e.target.value as any})}>
                    <option value="">None / Integrated</option>
                    {['Pin','Hinge','Omega','Fishhook','Leverback','Lobster Claw','Spring Ring','Box Clasp','Toggle','Slide / Adjustable'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* --- RIGHT COLUMN: STONES & METAL --- */}
        <div className="lg:col-span-4 space-y-6">
          {[
            { label: 'Primary Stone', prefix: 'primary_stone' },
            { label: 'Secondary Stones', prefix: 'secondary_stone' },
            { label: 'Shank Stones', prefix: 'shank_stone' }
          ].map((section) => (
            <section key={section.prefix} className="p-4 bg-gray-50 border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Diamond size={12} />
                <h2 className="text-[10px] font-black uppercase tracking-widest">{section.label}</h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-3 space-y-1">
                  <select className="w-full p-2 bg-white text-[11px] border border-gray-100 font-bold uppercase"
                    onChange={(e) => setFormData({...formData, [`${section.prefix}_shape`]: e.target.value})}>
                    <option value="None">None (No Stone)</option>
                    {Object.keys(STONE_COEFFICIENTS).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-gray-400 uppercase">Count</label>
                  <input type="number" className="w-full p-2 bg-white text-[11px] border border-gray-100" onChange={(e) => setFormData({...formData, [`${section.prefix}_count`]: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-gray-400 uppercase">Length (mm)</label>
                  <input type="number" step="0.1" className="w-full p-2 bg-white text-[11px] border border-gray-100" onChange={(e) => setFormData({...formData, [`${section.prefix}_length`]: parseFloat(e.target.value)})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-gray-400 uppercase">Width (mm)</label>
                  <input type="number" step="0.1" className="w-full p-2 bg-white text-[11px] border border-gray-100" 
                    onChange={(e) => setFormData({...formData, [`${section.prefix}_width`]: parseFloat(e.target.value)})}
                    disabled={(formData as any)[`${section.prefix}_shape`] === 'Round' || !(formData as any)[`${section.prefix}_shape`] || (formData as any)[`${section.prefix}_shape`] === 'None'}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center border-t border-gray-200 text-[#d4af37]">
                 <span className="text-[9px] font-black uppercase italic">Est. {section.label} CT:</span>
                 <span className="text-xs font-black">{(formData as any)[`${section.prefix}_ct`] || 0.00} CT</span>
              </div>
            </section>
          ))}

          <section className="p-5 bg-black text-white space-y-4 shadow-xl rounded-sm">
             <div className="flex items-center gap-2 text-[#d4af37]">
              <Box size={14} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Metal & CAD Calculation</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-500 uppercase">Metal Type</label>
                <select 
                  className="w-full p-3 bg-gray-800 border-none text-white text-xs uppercase font-bold"
                  value={formData.metal}
                  onChange={(e) => setFormData({...formData, metal: e.target.value})}
                >
                  <option value="18k_gold">Gold 18K</option>
                  <option value="14k_gold">Gold 14K</option>
                  <option value="platinum">Platinum</option>
                  <option value="silver_925">Silver 925</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-500 uppercase">CAD Volume (mm³)</label>
                <input 
                  type="number" placeholder="INSERT MM³" 
                  className="w-full p-3 bg-gray-800 border-none text-white text-xs"
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-800">
               <span className="text-[9px] font-bold uppercase text-gray-500 italic">Total Est. Weight:</span>
               <span className="text-sm font-black text-[#d4af37] tracking-widest">{formData.estimated_weight || 0.00} GR</span>
            </div>
          </section>

          <button 
            onClick={saveSimulation}
            className="w-full bg-[#d4af37] text-black font-black uppercase text-[10px] tracking-[0.3em] py-5 hover:bg-white transition-all duration-300 flex items-center justify-center gap-4"
          >
            <Save size={16} />
            Generate Technical Simulation
          </button>
        </div>
      </div>
    </div>
  );
}