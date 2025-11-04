export function vectorMagnitude(vect: TermMatrixRow[]): number {
  return Math.sqrt(vect.reduce((sum, item) => sum + item.tfidf ** 2, 0))
}
