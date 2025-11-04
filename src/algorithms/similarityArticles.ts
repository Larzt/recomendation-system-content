import { useFilesStore } from "@/stores";
import { calculateIdf } from "./calculateIdf";
import { normalizedVect } from "./normalizedVect";

//  función para multiplicar dos vectores de termMatrixRow, multiplicando solo los TFIDF
function dotProduct(vect1: TermMatrixRow[], vect2: TermMatrixRow[]): number {
  let product = 0;
  for (const item1 of vect1) {
    const item2 = vect2.find(item => item.term === item1.term);
    if (item2) {
      product += item1.tfidf * item2.tfidf;
    }
  }
  return product;
}

export function similarityArticles( vect1: TermMatrixRow[], vect2: TermMatrixRow[] ): number {
  const vect1Norm = normalizedVect(vect1);
  const vect2Norm = normalizedVect(vect2);
  const numProduct = dotProduct(vect1Norm, vect2Norm);
  const denomProduct = dotProduct(vect1Norm, vect2Norm);
  if (denomProduct === 0) return 0;
  return numProduct / denomProduct;
}


