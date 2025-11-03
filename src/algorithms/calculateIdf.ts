import { useFilesStore } from "@/stores";
import { calculateDf } from '@/algorithms'



export function calculateIdf(term: string): number {
  const filesStore = useFilesStore();
  const totalDocuments = filesStore.amount; // corpus
  if (totalDocuments === 0) return 1;
  // realizar el cálculo de idf según la fórmula: idf(t) = log_e(Total number of documents / Number of documents with term t in it)
  const documentsWithTerm = calculateDf(term);
  if (documentsWithTerm === 0) return 1;
  const idfValue = Math.log(totalDocuments / documentsWithTerm);
  console.log(`IDF for term "${term}": ${idfValue}`);
  return idfValue;
}

