import { defineStore } from 'pinia'
export const useFilesStore = defineStore('files', {
  state: () => ({
    documents: [] as IFile[],
    stopWords: {} as IFile,
    corpus: {} as IFile
  }),

  getters: {
    amount: (state) => state.documents.length
  },

  actions: {
    setDocuments(documents: IFile[]) {
      this.documents = documents
    },
    setStopWords(stopWords: IFile) {
      this.stopWords = stopWords
    },
    setCorpus(corpus: IFile) {
      this.corpus = corpus
    },
  }
})
