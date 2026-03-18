import { Product } from './types';

export const RINGS_DATA: Product[] = [
  // --- RINGS ---
  {
    id: 1001,
    title: "Classic Round Solitaire",
    category: 'rings',
    price: "Contact for Quote",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070",
    metal: "18k White Gold",
    estimated_weight: 3.5,
    head_style: 'Solitaire',
    shank_style: 'Straight',
    primary_stone_shape: "Round",
    primary_stone_count: 1,
    primary_stone_length: 6.5, // 6.5mm = ~1.00ct
    is_active: true
  },
  {
    id: 1002,
    title: "Oval Halo Pavé",
    category: 'rings',
    price: "Contact for Quote",
    img: "https://images.unsplash.com/photo-1589674781757-3a045c644949?q=80&w=2070",
    metal: "18k Yellow Gold",
    estimated_weight: 4.2,
    head_style: 'Halo',
    shank_style: 'Pavé',
    primary_stone_shape: "Oval",
    primary_stone_count: 1,
    primary_stone_length: 8.0,
    primary_stone_width: 6.0,
    secondary_stone_shape: "Round",
    secondary_stone_count: 20,
    secondary_stone_length: 1.5,
    is_active: true
  },

  // --- EARRINGS ---
  {
    id: 2001,
    title: "Brilliant Studs",
    category: 'earrings',
    price: "1200",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
    metal: "14k White Gold",
    estimated_weight: 1.8,
    earring_style: 'Studs',
    closure: 'Pin',
    primary_stone_shape: "Round",
    primary_stone_count: 2,
    primary_stone_length: 5.0,
    is_active: true
  },
  {
    id: 2002,
    title: "Luxury Diamond Hoops",
    category: 'earrings',
    price: "2800",
    img: "https://images.unsplash.com/photo-1633819260205-c2c83b3b94c8?q=80&w=800",
    metal: "18k White Gold",
    estimated_weight: 8.5,
    earring_style: 'Hoops',
    earring_diameter: 25,
    primary_stone_shape: "Round",
    primary_stone_count: 40,
    primary_stone_length: 1.8,
    is_active: true
  },

  // --- BRACELETS ---
  {
    id: 3001,
    title: "Essential Tennis Bracelet",
    category: 'bracelets',
    price: "4500",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
    metal: "18k White Gold",
    estimated_weight: 12.5,
    bracelet_style: 'Tennis',
    is_repeatable: true,
    primary_stone_shape: "Round",
    primary_stone_count: 55,
    primary_stone_length: 2.5,
    is_active: true
  },
  {
    id: 3002,
    title: "Modern Gold Bangle",
    category: 'bracelets',
    price: "1900",
    img: "https://images.unsplash.com/photo-1630030538465-35ac30bc35ee?q=80&w=800",
    metal: "18k Yellow Gold",
    estimated_weight: 15.0,
    bracelet_style: 'Bangle',
    inner_diameter: 60,
    primary_stone_shape: "Emerald",
    primary_stone_count: 1,
    primary_stone_length: 7.0,
    primary_stone_width: 5.0,
    is_active: true
  },

  // --- PENDANTS ---
  {
    id: 4001,
    title: "Pear Drop Pendant",
    category: 'pendants',
    price: "950",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    metal: "18k Rose Gold",
    estimated_weight: 2.5,
    head_style: 'Solitaire',
    primary_stone_shape: "Pear",
    primary_stone_count: 1,
    primary_stone_length: 9.0,
    primary_stone_width: 6.0,
    is_active: true
  }
];