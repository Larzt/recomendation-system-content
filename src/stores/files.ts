import { defineStore } from 'pinia'
import processText from '@/utils/processText'
import processStopWords from '@/utils/processStopWords'
export const useFilesStore = defineStore('files', {
  state: () => ({
    documents: [] as IFile[],
    stopWords: [] as string[],
    corpus: {} as IFile
  }),

  getters: {
    amount: (state) => state.documents.length
  },

  actions: {
    setDocuments(documents: IFile[]) {
      // hacer que se procese el contenido de cada documento al establecer los documentos
      this.documents = documents.map((doc) => {
        const content = typeof doc.content === 'string' ? processText(doc.content) : doc.content
        return { ...doc, content }
      })
      // muestra por consola el contenido de los documentos cargados
      console.log("Documentos cargados en FilesStore:" , this.documents);
    },
    setStopWords(stopWordsFile: IFile) {
      // stopWordsFile.content is expected to be a string with one stopword per line
      if (!stopWordsFile) {
        this.stopWords = []
        return
      }


      const content = typeof stopWordsFile.content === 'string' ? stopWordsFile.content : Array.isArray(stopWordsFile.content) ? (stopWordsFile.content as string[]).join('\n') : ''
      const words = processStopWords(content)
      this.stopWords = words

      // muestra por consola las stopwords procesadas
      console.log("Stopwords procesadas en FilesStore:", this.stopWords);
    },
    setCorpus(corpus: IFile) {
      this.corpus = corpus
    },
  }
})
