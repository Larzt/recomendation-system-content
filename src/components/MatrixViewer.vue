<script setup lang="ts">
import { ref } from 'vue'
import { useFilesStore } from '@/stores/files'
import { storeToRefs } from 'pinia'

const filesStore = useFilesStore()
const { documents, termMatrices } = storeToRefs(filesStore)

const expandedDocs = ref<Record<string, boolean>>({})

function handleBuildMatrices() {
  filesStore.buildTermMatrices()

  expandedDocs.value = Object.keys(filesStore.termMatrices).reduce(
    (acc, name) => ({ ...acc, [name]: false }),
    {}
  )
}

function toggleDoc(name: string) {
  expandedDocs.value[name] = !expandedDocs.value[name]
}
</script>

<template>
  <div class="term-matrix">
    <h2 class="title">Matrices TF-IDF</h2>

    <div v-if="documents.length === 0" class="empty-state">
      <p>No hay documentos cargados.</p>
    </div>

    <div v-else>
      <button
        v-if="filesStore.documents.length && filesStore.stopWords.length && Object.keys(filesStore.corpus).length"
        class="btn-primary"
        @click="handleBuildMatrices"
      >
        Calcular matrices TF-IDF
      </button>

      <div v-if="Object.keys(termMatrices).length === 0" class="empty-state">
        <p>Aún no se ha calculado ninguna matriz.</p>
      </div>

      <div
        v-else
        v-for="(matrix, docName) in termMatrices"
        :key="docName"
        class="matrix-card"
      >
        <div class="doc-header" @click="toggleDoc(docName)">
          <h3 class="doc-title">{{ docName }}</h3>
          <span class="arrow" :class="{ open: expandedDocs[docName] }">⌄</span>
        </div>

        <transition name="collapse">
          <div v-show="expandedDocs[docName]" class="table-wrapper">
            <table>
              <thead>
              <tr>
                <th>Término</th>
                <th>TF</th>
                <th>IDF</th>
                <th>TF-IDF</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="row in matrix" :key="row.term">
                <td>{{ row.term }}</td>
                <td>{{ row.tf.toFixed(4) }}</td>
                <td>{{ row.idf.toFixed(4) }}</td>
                <td>{{ row.tfidf.toFixed(4) }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/viewers' as *;
</style>
