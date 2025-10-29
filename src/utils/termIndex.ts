/**
 * Utilities to build a simple term index / term-frequency vector from a document
 */

/** Resultado por término */
export interface TermInfo {
  /** índice de la primera aparición en el vector original */
  index: number;
  /** término normalizado */
  term: string;
  /** número de veces que aparece en el documento */
  count: number;
  /** TF = count / totalTerms */
  tf: number;
}

/** Normaliza una palabra: trim + lowercase + quitar puntuación inicial/ final */
function normalize(word: string): string {
  if (!word) return word;
  let w = word.trim().toLowerCase();
  w = w.replace(/^[^A-Za-z0-9áéíóúüñÁÉÍÓÚÜÑ]+|[^A-Za-z0-9áéíóúüñÁÉÍÓÚÜÑ]+$/g, "");
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
export function computeTermFrequencies(words: string[]): TermInfo[] {
  if (!words || words.length === 0) return [];

  const total = words.length;
  const map: Record<string, { count: number; firstIndex: number }> = {};

  for (let i = 0; i < words.length; i++) {
    const raw = words[i];
    const term = normalize(raw);
    if (!term) continue; // ignorar tokens vacíos

    const existing = map[term];
    if (existing) {
      existing.count += 1;
    } else {
      map[term] = { count: 1, firstIndex: i };
    }
  }

  const result: TermInfo[] = [];
  for (const term of Object.keys(map)) {
    const info = map[term];
    result.push({
      index: info.firstIndex,
      term,
      count: info.count,
      tf: info.count / total,
    });
  }

  // Ordenar por count
  result.sort((a, b) => b.count - a.count);
  return result;
}

export default computeTermFrequencies;
