import { useFilesStore } from "@/stores";
import { calculateIdf } from "./calculateIdf";

const normalizedMatrix : Record<string, Record<string, number>> = {};

export function similarityArticles( normalizedMatrix: Record<string, Record<string, number>>): Record<string, Record<string, number>> {
  // matriz que tendra la similitud entre articulos
  const similarityMatrix: Record<string, Record<string, number>> = {};

  const filesStore = useFilesStore();
  const totalDocuments = filesStore.documents.length;

  // En normalizedMatrix ya tenemos los tf-idf normalizados (es decir, los vectores normalizados)

  for (let i = 0; i < totalDocuments; i++) {
    const docA = filesStore.documents[i];
    similarityMatrix[docA.name] = {};

    for (let j = 0; j < totalDocuments; j++) {
      const docB = filesStore.documents[j];

      let dotProduct = 0;

      for (const term in normalizedMatrix) {
        const tfIdfA = normalizedMatrix[term][docA.name] || 0;
        const tfIdfB = normalizedMatrix[term][docB.name] || 0;
        dotProduct += tfIdfA * tfIdfB;
      }

      similarityMatrix[docA.name][docB.name] = dotProduct;
    }
  }

  return similarityMatrix;

}
