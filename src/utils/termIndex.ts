/**
 * Utilities to build a simple term index / term-frequency vector from a document
 */

import { CLEAN_WORD_REGEX } from '@/constants'

/** Resultado por término */
export interface TermInfo {
  /** índice de la primera aparición en el vector original */
  index: number;
  /** término normalizado */
  term: string;
  /** TF = count */
  tf: number;
}

/** Normaliza una palabra: trim + lowercase + quitar puntuación inicial/ final */
function normalize(word: string): string {
  if (!word) return word;
  let w = word.trim().toLowerCase();
  w = w.replace(CLEAN_WORD_REGEX, "");
  return w;
}

/**
 * Dado un vector de strings (documento tokenizado), calcula para cada término:
 * - índice de la primera aparición
 * - término (normalizado)
 * - número de ocurrencias
 * - TF (frecuencia de término = count / totalTerms)
 *
 * Devuelve un array de `TermInfo` ordenado por la primera aparición del término.
 */
export function computeTermFrequencies(words: string[]): Record<string, TermInfo> {
  const map: Record<string, TermInfo> = {};
  if (!words || words.length === 0) return map;

  for (let i = 0; i < words.length; i++) {
    const term = words[i];
    if (!term) continue; // ignorar tokens vacíos

    const existing = map[term];
    if (existing) {
      existing.tf += 1; // tf es frecuencia absoluta según petición
    } else {
      map[term] = {
        index: i,
        term,
        tf: 1,
      };
    }
  }

  return map;
}
