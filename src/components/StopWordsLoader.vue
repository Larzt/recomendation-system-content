<script setup lang="ts">
import { useFilesStore } from '@/stores'
import { fileToIFile } from '@/utils'
import { ref } from 'vue'

const store = useFilesStore()
const fileName = ref<string | null>(null)

async function handleStopWords(event: Event | DragEvent) {
  let file: File | null = null

  if (event instanceof DragEvent && event.dataTransfer?.files?.[0]) {
    file = event.dataTransfer.files[0]
  } else if (event.target instanceof HTMLInputElement && event.target.files?.[0]) {
    file = event.target.files[0]
  }

  if (!file) return

  const converted: IFile = await fileToIFile(file)
  store.setStopWords(converted)
  fileName.value = converted.name
}
</script>

<template>
  <div class="uploader">
    <h2 class="title">Subir archivo de StopWords</h2>
    <p class="subtitle">Selecciona o arrastra tu archivo de stopwords.</p>

    <div class="drop-zone" @dragover.prevent @drop.prevent="handleStopWords">
      <p>Selecciona o arrastra tu archivo</p>
      <label class="file-btn">
        Elegir archivo
        <input type="file" accept=".txt,.csv" @change="handleStopWords" />
      </label>
    </div>
    <h3 v-if="fileName" class="subtitle">
      Archivo subido: {{ fileName }}
    </h3>
    <div v-else class="empty">
      <p>No se ha cargado ninguna carpeta aún.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/uploader' as *;
</style>
