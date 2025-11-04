<script setup lang="ts">
import {MatrixViewer, SimilarityViewer} from '@/components'

</script>

<template>
  <div class="term-matrix-view">
    <SimilarityViewer />
    <MatrixViewer />
  </div>
</template>

<style scoped>
.term-matrix-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}
</style>
