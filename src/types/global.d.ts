declare global {
  // Here goes types and interfaces
  interface IFile {
    name: string;
    content: string | string[];
  }

  interface TermInfo {
    /** índice de la primera aparición en el vector original */
    index: number;
    /** término normalizado */
    term: string;
    /** TF = count */
    tf: number;
  }

  /**
   * Registro por fila de la matriz de términos
   */
  interface TermMatrixRow {
    index: number;
    term: string;
    tf: number;
    idf: number;
    tfidf: number;
  }
}

export {}
