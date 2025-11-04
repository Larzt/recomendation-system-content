import { useFilesStore } from "@/stores";
import { calculateIdf } from "./calculateIdf";




// IDF de los textos (al final es 1 por articulo), para que no se esté calculando todo el rato
// deberiamos de tener una variable donde se almacenen todos los
//const idfs: Record<string, number> = {};

// matriz que tiene los df en función item-articulo
//const dfMatrix: Record<string, Record<string, number>> = {};

// const vectorLengths: Record<string, number> = {};

//const tfIdfMatrix: Record<string, Record<string, number>> = {};


// const filesStore = useFilesStore();
// const totalDocuments = filesStore.documents;
// for (const document of totalDocuments) {

// }
/// esto deberia de ser una llamada a una función que pueda ir calculando para todos los terminos
/// todos los textos hasta sacar los respectivos IDFS



// export function tf_x_idf ( dfMatrix: Record<string, Record<string, number>>, idfs: Record<string, number>): Record<string, Record<string, number>> {
//   const tfIdfMatrix: Record<string, Record<string, number>> = {};

//   for (const term in dfMatrix) {
//     tfIdfMatrix[term] = {};
//     for (const doc in dfMatrix[term]) {
//       const tf = dfMatrix[term][doc];
//       const idf = idfs[term] || 0;
//       // comprobar que sea el mismo termino
//       if (tf && idf) {
//         tfIdfMatrix[term][doc] = tf * idf;
//       } else {
//         tfIdfMatrix[term][doc] = 0;
//       }
//     }
//   }

//   return tfIdfMatrix;
// }

// // funcion de longitud de vector normalizado
// export function normalizedVectorLength(tfIdfMatrix: Record<string, Record<string, number>>, vectorLengths: Record<string, number>): Record<string, number> {

//   for (const term in tfIdfMatrix) {
//     let sumOfSquares = 0;
//     for (const doc in tfIdfMatrix[term]) {
//       const tfIdfValue = tfIdfMatrix[term][doc];
//       sumOfSquares += tfIdfValue * tfIdfValue;
//     }
//     vectorLengths[term] = Math.sqrt(sumOfSquares);
//   }

//   return vectorLengths;

// }
// // función para normalizar el vector
// export function normalizeTfIdfVector(tfIdfMatrix: Record<string, Record<string, number>>, vectorLengths: Record<string, number>): Record<string, Record<string, number>> {

//   const normalizedMatrix: Record<string, Record<string, number>> = {};

//   for (const term in tfIdfMatrix) {
//     normalizedMatrix[term] = {};
//     const length = vectorLengths[term];
//     for (const doc in tfIdfMatrix[term]) {
//       const tfIdfValue = tfIdfMatrix[term][doc];
//       if (length !== 0) {
//         normalizedMatrix[term][doc] = tfIdfValue / length;
//       } else {
//         normalizedMatrix[term][doc] = 0;
//       }
//     }
//   }

//   return normalizedMatrix;
// }

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
