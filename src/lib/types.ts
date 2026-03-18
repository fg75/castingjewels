// @/components/filters/types.ts
import * as CONST from './constants';

export type ProductCategory = typeof CONST.PRODUCT_CATEGORIES[number]['id'];
export type StoneShape = typeof CONST.STONE_SHAPES[number];
export type MetalType = typeof CONST.METAL_TYPES[number]['id'];

export interface Product {
  id: number;
  title: string;
  category: ProductCategory;
  price: string;
  img: string;
  metal: MetalType;
  estimated_weight: number; 
  is_active: boolean;
  description?: string;

  // Stili
  bracelet_style?: typeof CONST.BRACELET_STYLES[number];
  earring_style?: typeof CONST.EARRING_STYLES[number];
  head_style?: typeof CONST.RING_STYLES[number] | typeof CONST.PENDANT_STYLES[number];
  pave_shape?: typeof CONST.PAVE_SHAPES[number];
  shank_style?: typeof CONST.SHANK_STYLES[number];
  closure?: typeof CONST.CLOSURE_TYPES[number];

  // Specifiche Tecniche [cite: 2, 5, 12, 21, 28]
  bracelet_length?: number;
  inner_diameter?: number;
  earring_diameter?: number;
  finger_size_mm?: number;
  is_repeatable?: boolean;
  
  // Range di Peso e Carati (Richiesti dal documento) [cite: 3, 11, 29]
  min_weight?: number;
  max_weight?: number;
  min_total_ct?: number;
  max_total_ct?: number;

  // Logica Pietre (Universale) [cite: 42-44]
  primary_stone_shape?: StoneShape | 'None';
  primary_stone_count?: number;
  primary_stone_length?: number;
  primary_stone_width?: number;
  primary_stone_ct?: number;
  primary_stone_min_ct?: number;
  primary_stone_max_ct?: number;

  secondary_stone_shape?: StoneShape | 'None';
  secondary_stone_count?: number;
  secondary_stone_length?: number;
  secondary_stone_width?: number;
  secondary_stone_ct?: number;
  secondary_stone_min_ct?: number;
  secondary_stone_max_ct?: number;

  shank_stone_shape?: StoneShape | 'None';
  shank_stone_count?: number;
  shank_stone_length?: number;
  shank_stone_width?: number;
  shank_stone_ct?: number;
  shank_stone_min_ct?: number;
  shank_stone_max_ct?: number;
}