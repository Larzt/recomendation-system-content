import { useFilesStore } from "@/stores";

const filesStore = useFilesStore();

export function df_calculate(term: string): number {
  if (!term) return 0;

  const corpus = filesStore.corpus;
  if (!corpus || corpus.length === 0) return 0;

  // calcular el numero de veces que aparece el término en los documentos del corpus
  let count = 0;
  // filtrar los documentos que contienen el término. Usar filter y some.
  for (const file of corpus) {
  // dividir el contenido del archivo en palabras
  // asegurarse de que `file.content` sea string para que `words` sea string[]
  const words: string[] = (file.content ?? "").split(/\s+/);
    // comprobar si el término está en las palabras del archivo
    if (words.some((w) => w === term)) {
      // si está, incrementar el contador
      count++;
    }
    // imprimir la salida para depuración
    console.log(`Documento: ${file.name}, contiene término "${term}": ${words.some((w) => w === term)}`);
  }
  return count;
}
export function idf(words: string[]): number {
  if (!words || words.length === 0) return 0;

  const totalDocuments = filesStore.corpus.length; // corpus
  if (totalDocuments === 0) return 0;
  
}

