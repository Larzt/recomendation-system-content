<script setup lang="ts">
import { FolderLoader, StopWordsLoader, CorpusLoader, Header } from '@/components'
</script>

<template>
  <Header/>
  <div class="uploader-container">
    <FolderLoader />
    <StopWordsLoader />
    <CorpusLoader />
  </div>
</template>

<style lang="scss">
html, body {
  background-color: $bg-dark;
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
