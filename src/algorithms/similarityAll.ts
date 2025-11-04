import { useFilesStore } from '@/stores'
import { similarityArticles } from './similarityArticles'

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
      console.log("Similitudes vecA, vecB: ", sim)
			results.push({ docA: nameA, docB: nameB, similarity: sim })
		}
	}

  console.log("Similitudes result: ", results)
	return results
}
