<script setup lang="ts">
import { FolderLoader, StopWordsLoader, CorpusLoader, Header, MatrixViewer } from '@/components'
</script>

<template>
  <Header/>
  <div class="uploader-container">
    <FolderLoader />
    <StopWordsLoader />
    <CorpusLoader />
  </div>
  <MatrixViewer />
</template>

<style lang="scss">
html, body {
  background-color: var(--bg);
}

.uploader-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  height: 100vh;
  width: 100vw;
}
</style>
