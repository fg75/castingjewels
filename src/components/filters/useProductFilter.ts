// @/components/filters/useProductFilter.ts
import { useState, useMemo } from 'react';
import { Product, ProductCategory, StoneShape } from './types';

export interface StoneFilterState {
  shape: StoneShape | 'None' | '';
  min_ct: string;
  max_ct: string;
  count: string;
}

export interface ProductFilterState {
  category: ProductCategory | 'all';
  search: string;
  metal: string;
  head_style: string;
  earring_style: string;
  bracelet_style: string;
  shank_style: string[];
  closure: string;
  is_repeatable: string; // 'true' | 'false' | ''
  // Range di peso e caratura totale
  min_weight: string;
  max_weight: string;
  min_total_ct: string;
  max_total_ct: string;
  // Filtri Pietre
  primary: StoneFilterState;
  secondary: StoneFilterState;
  shank: StoneFilterState;
}

const initialStoneState: StoneFilterState = { shape: '', min_ct: '', max_ct: '', count: '' };

export const useProductFilter = (products: Product[]) => {
  const [filters, setFilters] = useState<ProductFilterState>({
    category: 'all',
    search: '',
    metal: '',
    head_style: '',
    earring_style: '',
    bracelet_style: '',
    shank_style: [],
    closure: '',
    is_repeatable: '',
    min_weight: '',
    max_weight: '',
    min_total_ct: '',
    max_total_ct: '',
    primary: { ...initialStoneState },
    secondary: { ...initialStoneState },
    shank: { ...initialStoneState },
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Categoria
      if (filters.category !== 'all' && p.category !== filters.category) return false;

      // 2. Metallo e Stili
      if (filters.metal && p.metal !== filters.metal) return false;
      if (filters.head_style && p.head_style !== filters.head_style) return false;
      if (filters.earring_style && p.earring_style !== filters.earring_style) return false;
      if (filters.bracelet_style && p.bracelet_style !== filters.bracelet_style) return false;
      if (filters.closure && p.closure !== filters.closure) return false;
      if (filters.shank_style.length > 0 && (!p.shank_style || !filters.shank_style.includes(p.shank_style))) return false;
      
      // 3. Logica Ripetibilità (Bracciali)
      if (filters.is_repeatable !== '') {
        const boolVal = filters.is_repeatable === 'true';
        if (p.is_repeatable !== boolVal) return false;
      }

      // 4. Range Peso (gr)
      const pMinW = p.min_weight ?? p.estimated_weight ?? 0;
      const pMaxW = p.max_weight ?? p.estimated_weight ?? 0;
      if (filters.min_weight && pMaxW < parseFloat(filters.min_weight)) return false;
      if (filters.max_weight && pMinW > parseFloat(filters.max_weight)) return false;

      // 5. Range Caratura Totale
      if (filters.min_total_ct && (p.max_total_ct ?? 0) < parseFloat(filters.min_total_ct)) return false;
      if (filters.max_total_ct && (p.min_total_ct ?? 0) > parseFloat(filters.max_total_ct)) return false;

      // 6. Logica Pietre (Primary, Secondary, Shank)
      const stoneTypes: ('primary' | 'secondary' | 'shank')[] = ['primary', 'secondary', 'shank'];
      for (const type of stoneTypes) {
        const f = filters[type];
        const pShape = p[`${type}_stone_shape` as keyof Product];
        const pMinCt = p[`${type}_stone_min_ct` as keyof Product] as number ?? p[`${type}_stone_ct` as keyof Product] as number ?? 0;
        const pMaxCt = p[`${type}_stone_max_ct` as keyof Product] as number ?? p[`${type}_stone_ct` as keyof Product] as number ?? 0;

        if (f.shape && pShape !== f.shape) return false;
        if (f.min_ct && pMaxCt < parseFloat(f.min_ct)) return false;
        if (f.max_ct && pMinCt > parseFloat(f.max_ct)) return false;
      }

      return true;
    });
  }, [products, filters]);

  return { filters, setFilters, filteredProducts };
};