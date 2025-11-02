/**
 * Lematizador sencillo.
 * Dado una palabra, devuelve su forma lematizada si existe en el mapeo.
 * Si no existe, devuelve la palabra normalizada (trim + toLowerCase).
 */

import { useFilesStore } from "@/stores";
import { normalize } from '@/utils'

// Mapa de ejemplo. En producción puedes cargar un fichero JSON más completo.
// TODO: cargar desde un archivo externo, y guardar las lemas en un vector global o en el store
const LEMMAS: Record<string, string> = {
	"áfrica": "áfrica",
	"ángela": "ángela",
	"ábaco": "ábaco",
	"ábrelo": "abrir",
	"ábreme": "abrir",
	"ábside": "ábside",
	"ácana": "ácana",
	"ácaro": "ácaro",
	"ácido": "ácido",
	"ácigos": "ácigos",
	"ácimo": "ácimo",
	"ácoro": "ácoro",
	"ácrata": "ácrata"
};

/**
 * Devuelve la forma lematizada de una palabra si existe en el mapeo.
 * Si no existe, devuelve la palabra normalizada.
 *
 * @param word Palabra a lematizar
 */
export function lematize(word: string): string {
	if (word === undefined || word === null || word === "") return word;
	return LEMMAS[word] ?? word;
}

/**
 * Comprueba si una palabra está en la lista de stopwords.
 * @param word Palabra a comprobar
 * @param stopWords Lista de stopwords (opcional). Si no se pasa, se usa la lista por defecto.
 * @returns true si la palabra es una stopword
 */
export function isStopWord(word: string): boolean {
  //usa la lista de stopwords del store
  // TODO: revisar esto
  const stopWords = useFilesStore().stopWords;
  const list = stopWords;
  if (!word) return false;
  return list.indexOf(word) !== -1;
}

// función que recibe un texto string grande y devuelve un array de palabras lematizadas y sin stopwords, y normalizadas
export function processText(text: string): string[] {
	if (!text) return [];

	// dividir por cualquier espacio en blanco (espacios, tabs, saltos de línea)
	const tokens = text.split(/\s+/);
	const out: string[] = [];

	for (const raw of tokens) {
		if (!raw) continue;
		// normalizar (trim, lowercase, quitar puntuación al inicio/fin)
		const norm = normalize(raw);
		if (!norm) continue;

		// verificar que siga siendo una sola "palabra" (sin espacios ni símbolos internos)
		// Permitimos letras, dígitos y caracteres acentuados comunes
		if (!/^[A-Za-z0-9áéíóúüñÁÉÍÓÚÜÑ]+$/.test(norm)) continue;

		// Filtrar stopwords
		if (isStopWord(norm)) continue;

		// Lematizar
		const lemma = lematize(norm);
		out.push(lemma);
	}

	return out;
}
