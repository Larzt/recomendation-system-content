import { defineStore } from 'pinia'
import { processStopWords, processText } from '@/algorithms'
import { parseIFileToRecord } from '@/utils'
export const useFilesStore = defineStore('files', {
  state: () => ({
    documents: [] as IFile[],
    stopWords: [] as string[],
    corpus: {} as Record<string, string>
  }),

  getters: {
    amount: (state) => state.documents.length
  },

  actions: {
    setDocuments(documents: IFile[]) {
      this.documents = documents.map((doc) => {
        const content = typeof doc.content === 'string' ? processText(doc.content) : doc.content
        return { ...doc, content }
      })
      console.log("Documents loaded in FilesStore:" , this.documents);
    },
    setStopWords(stopWordsFile: IFile) {
      if (!stopWordsFile) return;

      const content = typeof stopWordsFile.content === 'string' ? stopWordsFile.content : Array.isArray(stopWordsFile.content) ? (stopWordsFile.content as string[]).join('\n') : ''
      this.stopWords = processStopWords(content)
      console.log("Stopwords processed in FilesStore:", this.stopWords);
    },

    setCorpus(corpus: IFile) {
      this.corpus = parseIFileToRecord(corpus)
    },
  }
})
