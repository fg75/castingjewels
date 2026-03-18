import { Product } from '../types';

/**
 * Calcola i carati in modo sicuro. 
 * Se i carati sono già specificati (es. bracciali tennis), usa quelli.
 * Altrimenti, usa la formula matematica basata sulle dimensioni.
 */
export const getSafeStoneCT = (
  shape?: string, 
  count?: number, 
  L?: number, 
  W?: number, 
  manualCT?: number
): number => {
  // 1. Se il valore CT è inserito manualmente, ha la priorità
  if (manualCT && manualCT > 0) return manualCT;

  // 2. Altrimenti procediamo al calcolo matematico
  const nCount = count || 0;
  const nL = L || 0;
  if (!shape || nCount === 0 || nL === 0) return 0;

  if (shape === "Round") {
    return Math.pow(nL, 3) * 0.0061 * nCount;
  }
  
  const nW = W || nL * 0.8; // Fallback: larghezza all'80% se manca
  return (nL * nW * nL * 0.004) * nCount;
};

/**
 * Restituisce il peso totale in carati di un prodotto sommando tutte le sezioni.
 */
export const getTotalProductCT = (p: Product): number => {
  const primary = getSafeStoneCT(p.primary_stone_shape, p.primary_stone_count, p.primary_stone_length, p.primary_stone_width, p.primary_stone_ct);
  const secondary = getSafeStoneCT(p.secondary_stone_shape, p.secondary_stone_count, p.secondary_stone_length, p.secondary_stone_width, p.secondary_stone_ct);
  const shank = getSafeStoneCT(p.shank_stone_shape, p.shank_stone_count, p.shank_stone_length, p.shank_stone_width, p.shank_stone_ct);
  
  return parseFloat((primary + secondary + shank).toFixed(3));
};

/**
 * Helper per visualizzare stringhe in modo sicuro (evita buchi nella UI)
 */
export const getSafeDisplayValue = (value: any, fallback: string = "—") => {
  if (value === undefined || value === null || value === "" || value === 0) return fallback;
  return value;
};