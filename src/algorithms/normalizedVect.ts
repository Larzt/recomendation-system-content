import { useFilesStore } from "@/stores";
import { calculateIdf } from "./calculateIdf";


export function vectLengh(row: TermMatrixRow[]): number {
  let sumOfSquares = 0;
  for (const item of row) {
    sumOfSquares += item.tfidf * item.tfidf;
  }
  return Math.sqrt(sumOfSquares);
}

export function normalizedVect(row: TermMatrixRow[]): TermMatrixRow[] {
  const length = vectLengh(row);
  if (length === 0) {
    return row.map(item => ({ ...item, tfidf: 0 }));
  }
  return row.map(item => ({ ...item, tfidf: item.tfidf / length }));
}
