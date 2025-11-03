import { useFilesStore } from "@/stores";

export function calculateDf(term: string): number {
  if (!term) return 0;
  const filesStore = useFilesStore();

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
