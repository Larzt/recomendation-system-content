import { useFilesStore } from "@/stores";

const filesStore = useFilesStore();

export function df_calculate(term: string): number {
  if (!term) return 0;

  const files = filesStore.documents;
  if (!files || files.length === 0) return 0;

  // calcular el numero de veces que aparece el término en los documentos del corpus
  let count = 0;
  for (const file of files) {
    // los documentos ya están procesados y normalizados y divididos en palabras
    // usar some
    if ((file.content as string[]).some((word) => word === term)) {
      count += 1;
    }
  }
  console.log(`DF for term "${term}": ${count}`);
  return count;
}
export function idf(term: string): number {

  const totalDocuments = filesStore.amount; // corpus
  if (totalDocuments === 0) return 1;
  // realizar el cálculo de idf según la fórmula: idf(t) = log_e(Total number of documents / Number of documents with term t in it)
  const documentsWithTerm = df_calculate(term);
  if (documentsWithTerm === 0) return 1;
  const idfValue = Math.log(totalDocuments / documentsWithTerm);
  console.log(`IDF for term "${term}": ${idfValue}`);
  return idfValue;


}

