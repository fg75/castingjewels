// @/components/filters/constants.ts

export const PRODUCT_CATEGORIES = [
    { id: 'rings', label: 'Anelli' },
    { id: 'earrings', label: 'Orecchini' },
    { id: 'pendants', label: 'Pendenti' },
    { id: 'bracelets', label: 'Bracciali' }
  ] as const;
  
  export const STONE_SHAPES = [
    'Round', 'Oval', 'Emerald', 'Princess', 'Pear', 'Marquise', 
    'Cushion', 'Radiant', 'Asscher', 'Heart', 'Baguette', 'Trillion'
  ] as const;
  
  export const EARRING_STYLES = [
    'Solitaire', 'Studs', 'Hoops', 'Huggies', 'Pavé', 'Drop', 
    'Halo', 'Chandelier', 'Ear Cuffs', 'Ear Jackets', 'Ear Climbers / Crawlers'
  ] as const;
  
  export const BRACELET_STYLES = [
    'Bangle', 'Cuff', 'Chain', 'Tennis', 'Charm', 'Beaded'
  ] as const;
  
  export const PENDANT_STYLES = [
    'Solitaire', 'Halo', 'Medallion', 'Cross', 'Heart', 'Geometric', 'Symbol', 'Locket'
  ] as const;
  
  export const RING_STYLES = [
    'Solitaire', 'Trilogy', 'Halo', 'Pavé', 'Cluster', 'Two Stones', 
    'Wedding Band', 'Eternity', 'Decorated Band', 'Signet'
  ] as const;
  
  export const SHANK_STYLES = [
    'Straight', 'Tapered', 'Reverse Tapered', 'Split', 'Cathedral', 'Bypass', 'Knife Edge', 'Pavé'
  ] as const;
  
  export const CLOSURE_TYPES = [
    'Pin', 'Hinge', 'Omega', 'Fishhook', 'Leverback', 
    'Lobster Claw', 'Spring Ring', 'Box Clasp', 'Toggle', 'Slide / Adjustable'
  ] as const;
  
  export const METAL_TYPES = [
    { id: '18k_gold', label: 'Oro 18K', density: 0.0150 },
    { id: '14k_gold', label: 'Oro 14K', density: 0.0130 },
    { id: 'platinum', label: 'Platino', density: 0.0215 },
    { id: 'silver_925', label: 'Argento 925', density: 0.0104 }
  ] as const;
  
  export const STONE_COEFFICIENTS: Record<string, number> = {
    'Round': 0.0061, 'Oval': 0.0062, 'Emerald': 0.0080, 'Princess': 0.0083, 
    'Pear': 0.0062, 'Marquise': 0.0058, 'Cushion': 0.0081, 'Radiant': 0.0081, 
    'Asscher': 0.0080, 'Heart': 0.0073, 'Baguette': 0.0085, 'Trillion': 0.0057
  };
  
  export const PAVE_SHAPES = ['Round', 'Square', 'Heart', 'Star', 'Butterfly', 'Flower', 'Moon', 'Cross', 'Geometric'] as const;