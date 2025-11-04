import { useFilesStore } from '@/stores'
import { similarityArticles } from './similarityArticles'

/** Resultado de una comparación entre dos documentos */
export interface SimilarityResult {
	docA: string
	docB: string
	similarity: number
}

/**
 * Recorre `termMatrices` del store y calcula la similaridad entre
 * cada par de documentos (pares únicos i < j). Devuelve un array de
 * `SimilarityResult` con {docA, docB, similarity}.
 */
export function similarityAll(): SimilarityResult[] {
	const store = useFilesStore()

	const docs = store.documents || []
	const termMatrices = store.termMatrices || {}

	const results: SimilarityResult[] = []

	const n = docs.length
	for (let i = 0; i < n; i++) {
		const nameA = docs[i]?.name
		if (!nameA) continue
		const vecA = termMatrices[nameA] || []

		for (let j = i + 1; j < n; j++) {
			const nameB = docs[j]?.name
			if (!nameB) continue
			const vecB = termMatrices[nameB] || []

			const sim = similarityArticles(vecA, vecB)
			results.push({ docA: nameA, docB: nameB, similarity: sim })
		}
	}

	return results
}