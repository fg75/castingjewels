export interface Product {
  id: number;
  title: string;
  category: 'rings' | 'earrings' | 'pendants';
  price: string;
  img: string;
  metal: string;
  
  // CAMBIA QUI: da gold_weight a estimated_weight
  estimated_weight: number; 

  // Design Styles
  head_style?: 'Solitaire' | 'Trilogy' | 'Halo' | 'Pavé' | 'Cluster' | 'Two Stones';
  shank_style: 'Pavé' | 'Signet' | 'Wedding Band' | 'Eternity' | 'Decorated Band';

  // Primary Stone
  primary_stone_shape?: string;
  primary_stone_count?: number;
  primary_stone_length?: number; 
  primary_stone_width?: number;  

  // Secondary Stones
  secondary_stone_shape?: string;
  secondary_stone_count?: number;
  secondary_stone_length?: number;
  secondary_stone_width?: number;
  
  is_active: boolean;
}