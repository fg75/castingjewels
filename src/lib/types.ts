export interface Product {
  id: number;
  title: string;
  category: 'rings' | 'earrings' | 'pendants' | 'bracelets';
  price: string;
  img: string;
  metal: string;
  estimated_weight: number; 
  is_active: boolean;

  // --- ATTRIBUTI BRACELETS ---
  bracelet_style?: 'Bangle' | 'Cuff' | 'Chain' | 'Tennis' | 'Charm' | 'Beaded' | 'Link';
  bracelet_length?: number; // In cm (per Fixed Length)
  inner_diameter?: number;  // In mm (per Bangles)
  is_repeatable?: boolean;  // True = Maglie ripetibili (Modular), False = Lunghezza fissa
  
  // --- ATTRIBUTI EARRINGS ---
  earring_style?: 
    | 'Solitaire' | 'Studs' | 'Hoops' | 'Huggies' | 'Pavé' | 'Drop' 
    | 'Halo' | 'Chandelier' | 'Ear Cuffs' | 'Ear Jackets' | 'Ear Climbers / Crawlers';
  earring_diameter?: number;

  // --- CLOSURE (Comune a Earrings e Bracelets) ---
  closure?: 
    | 'Pin' | 'Hinge' | 'Omega' | 'Fishhook' | 'Leverback' 
    | 'Lobster Claw' | 'Spring Ring' | 'Box Clasp' | 'Toggle' | 'Slide / Adjustable';

  // --- ATTRIBUTI RINGS & PENDANTS ---
  head_style?: 
    | 'Solitaire' | 'Trilogy' | 'Halo' | 'Pavé' | 'Cluster' | 'Two Stones' 
    | 'Medallion' | 'Cross' | 'Heart' | 'Geometric' | 'Symbol' | 'Locket';
  shank_style?: 'Pavé' | 'Signet' | 'Wedding Band' | 'Eternity' | 'Decorated Band';

  // --- STONES ---
  // Lasciamo string per evitare conflitti di doppia dichiarazione, 
  // ma gestiamo le forme (Round, Oval, Emerald, etc.) nel filtro.
  primary_stone_shape?: string; 
  primary_stone_count?: number;
  primary_stone_length?: number; // Diametro se Round, Lunghezza se Fancy
  primary_stone_width?: number;  // Usato solo per Fancy Shapes (Emerald, Baguette, etc.)

  secondary_stone_shape?: string;
  secondary_stone_count?: number;
  secondary_stone_length?: number;
  secondary_stone_width?: number;
}