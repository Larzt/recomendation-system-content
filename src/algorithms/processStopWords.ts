/**
 * Procesador de stopwords.
 * Dado un string que contiene palabras separadas por saltos de línea,
 * devuelve un array de palabras (trim, lowercase) sin líneas vacías.
 */

/**
 * Convierte un texto de stopwords (una palabra por línea) en string[]
 * @param text Texto con stopwords separados por '\n' o '\r\n'
 */
export function processStopWords(text: string): string[] {
  if (!text) return [];
  // Dividir por saltos de línea (soporta CRLF y LF)
  const lines = text.split(/\r?\n/);
  // Normalizar: trim y toLowerCase, filtrar vacíos
  const words = lines
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l.length > 0);
  return words;
}

export default processStopWords;
