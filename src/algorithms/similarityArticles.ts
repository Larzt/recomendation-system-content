import { vectorMagnitude } from '@/utils'

function dotProduct(vect1: TermMatrixRow[], vect2: TermMatrixRow[]): number {
  let product = 0
  for (const item1 of vect1) {
    const item2 = vect2.find(item => item.term === item1.term)
    if (item2) {
      product += item1.tfidf * item2.tfidf
    }
  }
  return product
}


export function similarityArticles(vect1: TermMatrixRow[], vect2: TermMatrixRow[]): number {
  const numerator = dotProduct(vect1, vect2)
  const denom = vectorMagnitude(vect1) * vectorMagnitude(vect2)

  if (denom === 0) return 0

  const similarity = numerator / denom
  console.log(`similarityArticles: ${numerator} / ${denom} = ${similarity}`)
  return similarity
}
