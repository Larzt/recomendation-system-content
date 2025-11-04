<script setup lang="ts">
import { ref } from 'vue'
import { similarityAll } from '@/algorithms/similarityAll'
import type { SimilarityResult } from '@/types'

const similarities = ref<SimilarityResult[]>([])
const expanded = ref(false)

function handleCalculateSimilarities() {
  similarities.value = similarityAll()
  expanded.value = true
}
</script>

<template>
  <div class="term-matrix">
    <h2 class="title">Similitud entre documentos</h2>

    <button class="btn-secondary" @click="handleCalculateSimilarities">
      Calcular similitud
    </button>

    <div v-if="similarities.length" class="matrix-card">
      <div class="doc-header" @click="expanded = !expanded">
        <h3 class="doc-title">Resultados</h3>
        <span class="arrow" :class="{ open: expanded }">⌄</span>
      </div>

      <transition name="collapse">
        <div v-show="expanded" class="table-wrapper">
          <table>
            <thead>
            <tr>
              <th>Documento A</th>
              <th>Documento B</th>
              <th>Similitud</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="res in similarities" :key="res.docA + res.docB">
              <td>{{ res.docA }}</td>
              <td>{{ res.docB }}</td>
              <td>{{ (res.similarity * 100).toFixed(2) }}%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/viewers' as *;
</style>
