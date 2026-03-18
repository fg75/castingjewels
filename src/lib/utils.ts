// lib/utils.ts

export const calculateTotalCT = (p: any) => {
  const calc = (shape: string | undefined, count: number = 0, L: number = 0, W: number = 0) => {
    // Se non abbiamo la misura (L), non possiamo calcolare il peso. Restituiamo 0.
    if (!shape || count <= 0 || !L || L === 0) return 0;

    if (shape === "Round") {
      // Formula basata sul volume per diamanti tondi
      return Math.pow(L, 3) * 0.0061 * count;
    } else {
      // Formula per forme fancy (usando lunghezza e larghezza)
      const width = W > 0 ? W : L * 0.8;
      return (L * width * L * 0.004) * count;
    }
  };

  const total = calc(p.primary_stone_shape, p.primary_stone_count, p.primary_stone_length, p.primary_stone_width) +
                calc(p.secondary_stone_shape, p.secondary_stone_count, p.secondary_stone_length, p.secondary_stone_width);
  
  return total;
};