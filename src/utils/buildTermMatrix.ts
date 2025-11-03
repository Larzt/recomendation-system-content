import { computeTermFrequencies } from './computeTermFrequencies.ts'
import { calculateIdf, processText } from '@/algorithms'

export function buildTermMatrix(file: any): TermMatrixRow[] {
  if (!file) return [];

  // Obtener tokens: si es string, procesar; si es array, usar tal cual
  let tokens: string[] = []
  if (typeof file.content === 'string') {
    tokens = processText(file.content)
  } else if (Array.isArray(file.content)) {
    tokens = file.content as string[]
  }

  if (!tokens || tokens.length === 0) return [];

  // obtener mapeo de term -> TermInfo (con count, index, tf)
  const termMap = computeTermFrequencies(tokens)

  const rows: TermMatrixRow[] = []
  for (const term of Object.keys(termMap)) {
    const info = termMap[term]
    if (!info) continue
    const idf = calculateIdf(term)
    const tfidf = info.tf * idf
    rows.push({ index: info.index, term: info.term, tf: info.tf, idf, tfidf })
  }

  // ordenar por tf
  rows.sort((a, b) => b.tf - a.tf)
  return rows
}
