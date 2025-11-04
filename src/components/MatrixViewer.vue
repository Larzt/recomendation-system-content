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
      <button v-if="filesStore.documents && filesStore.stopWords.length && Object.keys(filesStore.corpus)" class="btn-primary" @click="handleBuildMatrices">
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
          <span
            class="arrow"
            :class="{ open: expandedDocs[docName] }"
            aria-hidden="true"
          >⌄</span>
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
.term-matrix {
  padding: 2rem;
  min-height: 100%;
  color: var(--text-white);

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-white);
    margin-bottom: 1.5rem;
  }

  .btn-primary {
    background-color: var(--primary);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      background-color: var(--primary-darken);
      box-shadow: 0 4px 10px var(--shadow-hover);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .empty-state {
    background-color: var(--primary-bg);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
    color: var(--heading);
    margin-top: 1rem;
  }

  .matrix-card {
    margin-top: 2rem;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
    background: var(--primary-lighten);
    box-shadow: 0 2px 6px var(--shadow-light);
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 4px 10px var(--shadow-hover);
    }

    .doc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--primary-bg);
      padding: 1rem 1.25rem;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease;

      &:hover {
        background: var(--primary-light);
      }

      .doc-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary);
      }

      .arrow {
        font-size: 1.2rem;
        color: var(--primary);
        transform: rotate(-90deg);
        transition: transform 0.25s ease;

        &.open {
          transform: rotate(0deg);
        }
      }
    }

    .table-wrapper {
      overflow-x: auto;
      border-top: 1px solid var(--border);
      background: var(--primary-lighten);

      table {
        width: 100%;
        border-collapse: collapse;

        th {
          background-color: var(--primary-bg);
          color: var(--heading);
          font-weight: 600;
          text-align: left;
          padding: 0.6rem 1rem;
          border-bottom: 2px solid var(--border);
        }

        td {
          padding: 0.6rem 1rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.95rem;
        }

        tr:hover td {
          background-color: var(--primary-light);
        }
      }
    }
  }

  .collapse-enter-active,
  .collapse-leave-active {
    transition: all 0.25s ease;
  }

  .collapse-enter-from,
  .collapse-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .collapse-enter-to,
  .collapse-leave-from {
    opacity: 1;
    max-height: 1000px;
  }
}
</style>
