// @/components/filters/filterConfig.ts
// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION-DRIVEN FILTER MATRIX (Centralized Version)
// ─────────────────────────────────────────────────────────────────────────────

import { Product } from './types';
import * as CONST from './constants';

export type SectionId =
  | 'style' | 'primary' | 'secondary' | 'shank' | 'weight'
  | 'hoop' | 'bracelet_sizing' | 'closure';

export interface SelectOption { label: string; value: string; }

export interface FilterSection {
  id: SectionId;
  label: string;
  icon: string; 
  fields: FilterField[];
}

export type FilterField =
  | { type: 'select';      key: string; label: string; options: SelectOption[]; }
  | { type: 'multiselect';  key: string; label: string; options: SelectOption[]; }
  | { type: 'number_range'; keyMin: string; keyMax: string; labelMin: string; labelMax: string; step?: number; placeholder?: [string, string]; }
  | { type: 'stone_section'; stoneKey: 'primary' | 'secondary' | 'shank'; showCT: boolean; showCount: boolean; }
  | { type: 'radio';         key: string; label: string; options: SelectOption[]; }

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS (Mapping constants to options)
// ─────────────────────────────────────────────────────────────────────────────

const mapToOptions = (arr: readonly string[]): SelectOption[] => 
  arr.map(s => ({ label: s, value: s }));

const ALL_STYLES_OPTION = { label: 'Tutti gli stili', value: '' };

// ─────────────────────────────────────────────────────────────────────────────
// FILTER_CONFIG MATRIX
// ─────────────────────────────────────────────────────────────────────────────

export const FILTER_CONFIG: Record<Product['category'] | 'all', FilterSection[]> = {

  // ── TUTTI I GIOIELLI ──────────────────────────────────────────────────────
  all: [
    {
      id: 'primary',
      label: 'Pietra Principale',
      icon: 'Diamond',
      fields: [{ type: 'stone_section', stoneKey: 'primary', showCT: true, showCount: true }],
    },
    {
      id: 'weight',
      label: 'Metallo e Caratura Totale',
      icon: 'Sparkles',
      fields: [
        { type: 'number_range', keyMin: 'min_weight', keyMax: 'max_weight', labelMin: 'Peso Min (gr)', labelMax: 'Peso Max (gr)', step: 0.5, placeholder: ['0.0', '80.0'] },
        { type: 'number_range', keyMin: 'min_total_ct', keyMax: 'max_total_ct', labelMin: 'CT Totali Min', labelMax: 'CT Totali Max', step: 0.1, placeholder: ['0.0', '20.0'] },
      ],
    },
  ],

  // ── ANELLI ────────────────────────────────────────────────────────────────
  rings: [
    {
      id: 'style',
      label: 'Design e Stile',
      icon: 'Settings2',
      fields: [
        {
          type: 'select',
          key: 'head_style',
          label: 'Stile Anello',
          options: [ALL_STYLES_OPTION, ...mapToOptions(CONST.RING_STYLES)],
        },
        {
          type: 'multiselect',
          key: 'shank_style',
          label: 'Stile Gambo (Shank)',
          options: mapToOptions(CONST.SHANK_STYLES),
        },
      ],
    },
    {
      id: 'primary',
      label: 'Pietra Principale',
      icon: 'Diamond',
      fields: [{ type: 'stone_section', stoneKey: 'primary', showCT: true, showCount: true }],
    },
    {
      id: 'shank',
      label: 'Pietre sul Gambo',
      icon: 'CircleDot',
      fields: [{ type: 'stone_section', stoneKey: 'shank', showCT: true, showCount: true }],
    },
    {
      id: 'weight',
      label: 'Metallo e Caratura',
      icon: 'Sparkles',
      fields: [
        { type: 'number_range', keyMin: 'min_weight', keyMax: 'max_weight', labelMin: 'Peso Min (gr)', labelMax: 'Peso Max (gr)', step: 0.1, placeholder: ['0.0', '50.0'] },
        { type: 'number_range', keyMin: 'min_total_ct', keyMax: 'max_total_ct', labelMin: 'CT Totali Min', labelMax: 'CT Totali Max', step: 0.05, placeholder: ['0.0', '10.0'] },
      ],
    },
  ],

  // ── ORECCHINI ──────────────────────────────────────────────────────────────
  earrings: [
    {
      id: 'style',
      label: 'Design Orecchini',
      icon: 'Settings2',
      fields: [
        {
          type: 'select',
          key: 'earring_style',
          label: 'Stile',
          options: [ALL_STYLES_OPTION, ...mapToOptions(CONST.EARRING_STYLES)],
        },
      ],
    },
    {
      id: 'hoop',
      label: 'Specifiche Cerchi / Huggies',
      icon: 'Circle',
      fields: [
        { type: 'number_range', keyMin: 'earring_diameter_min', keyMax: 'earring_diameter_max', labelMin: 'Ø Min mm', labelMax: 'Ø Max mm', step: 1, placeholder: ['0', '60'] },
      ],
    },
    {
      id: 'primary',
      label: 'Pietre',
      icon: 'Diamond',
      fields: [{ type: 'stone_section', stoneKey: 'primary', showCT: true, showCount: true }],
    },
    {
      id: 'weight',
      label: 'Metallo e Caratura (Coppia)',
      icon: 'Sparkles',
      fields: [
        { type: 'number_range', keyMin: 'min_weight', keyMax: 'max_weight', labelMin: 'Peso Min (gr)', labelMax: 'Peso Max (gr)', step: 0.1, placeholder: ['0.0', '30.0'] },
        { type: 'number_range', keyMin: 'min_total_ct', keyMax: 'max_total_ct', labelMin: 'CT Totali Min', labelMax: 'CT Totali Max', step: 0.05, placeholder: ['0.0', '10.0'] },
      ],
    },
  ],

  // ── BRACCIALI ─────────────────────────────────────────────────────────────
  bracelets: [
    {
      id: 'style',
      label: 'Stile Bracciale',
      icon: 'Settings2',
      fields: [
        {
          type: 'select',
          key: 'bracelet_style',
          label: 'Modello',
          options: [ALL_STYLES_OPTION, ...mapToOptions(CONST.BRACELET_STYLES)],
        },
      ],
    },
    {
      id: 'bracelet_sizing',
      label: 'Dimensioni e Vestibilità',
      icon: 'Ruler',
      fields: [
        {
          type: 'radio',
          key: 'is_repeatable',
          label: 'Tipo di Costruzione',
          options: [
            { label: 'Tutti', value: '' },
            { label: 'Lunghezza Fissa', value: 'false' },
            { label: 'Modulare (Ripetibile)', value: 'true' },
          ],
        },
        { type: 'number_range', keyMin: 'bracelet_length_min', keyMax: 'bracelet_length_max', labelMin: 'Lunghezza Min (cm)', labelMax: 'Lunghezza Max (cm)', step: 0.5, placeholder: ['14', '22'] },
      ],
    },
    {
      id: 'closure',
      label: 'Chiusura',
      icon: 'Lock',
      fields: [
        {
          type: 'select',
          key: 'closure',
          label: 'Meccanismo',
          options: [ { label: 'Tutte le chiusure', value: '' }, ...mapToOptions(CONST.CLOSURE_TYPES)],
        },
      ],
    },
    {
      id: 'weight',
      label: 'Metallo e Caratura',
      icon: 'Sparkles',
      fields: [
        { type: 'number_range', keyMin: 'min_weight', keyMax: 'max_weight', labelMin: 'Peso Min (gr)', labelMax: 'Peso Max (gr)', step: 0.5, placeholder: ['0.0', '80.0'] },
        { type: 'number_range', keyMin: 'min_total_ct', keyMax: 'max_total_ct', labelMin: 'CT Totali Min', labelMax: 'CT Totali Max', step: 0.1, placeholder: ['0.0', '20.0'] },
      ],
    },
  ],

  // ── PENDENTI ──────────────────────────────────────────────────────────────
  pendants: [
    {
      id: 'style',
      label: 'Design Pendente',
      icon: 'Settings2',
      fields: [
        {
          type: 'select',
          key: 'head_style', // Usiamo head_style come per gli anelli (Solitaire, Halo, ecc)
          label: 'Stile',
          options: [ALL_STYLES_OPTION, ...mapToOptions(CONST.PENDANT_STYLES)],
        },
      ],
    },
    {
      id: 'primary',
      label: 'Pietra Principale',
      icon: 'Diamond',
      fields: [{ type: 'stone_section', stoneKey: 'primary', showCT: true, showCount: true }],
    },
    {
      id: 'weight',
      label: 'Metallo',
      icon: 'Sparkles',
      fields: [
        { type: 'number_range', keyMin: 'min_weight', keyMax: 'max_weight', labelMin: 'Peso Min (gr)', labelMax: 'Peso Max (gr)', step: 0.1, placeholder: ['0.0', '30.0'] },
      ],
    },
  ],
};