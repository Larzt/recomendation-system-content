<script setup lang="ts">
import { ref } from 'vue'
import { useFilesStore } from '@/stores'
import { toIFile } from '@/utils'

const store = useFilesStore()
const selectedCorpusContent = ref<string>('')

async function handleCorpus(event: Event | DragEvent) {
  let files: FileList | null = null
  if (event instanceof DragEvent && event.dataTransfer?.files) {
    files = event.dataTransfer.files
  } else if (event.target instanceof HTMLInputElement && event.target.files) {
    files = event.target.files
  }
  if (!files) return

  const fileArray = Array.from(files)
  const converted = await Promise.all(fileArray.map(file => toIFile(file)))
  store.setCorpus(converted)
}

function readCorpus(file: IFile) {
  selectedCorpusContent.value = file.content
}
</script>

<template>
  <div class="uploader">
    <h2 class="title">Subir carpeta del Corpus</h2>
    <p class="subtitle">Selecciona o arrastra una carpeta con los textos del corpus.</p>

    <div class="drop-zone">
      <p>Selecciona o arrastra una carpeta con tus documentos</p>
      <label class="file-btn"> Elegir carpeta
        <input type="file" webkitdirectory mozdirectory @change="handleFiles" />
      </label>
    </div>
    <h3 v-if="store.corpus.length" class="files-title">
      Archivos encontrados ({{ store.corpus.length }}):
    </h3>
    <ul v-if="store.corpus.length">
      <li v-for="file in store.corpus" :key="file.name">
        <button @click="readCorpus(file)">{{ file.name }}</button>
      </li>
    </ul>

    <div v-else class="empty">
      <p>No se ha cargado ninguna carpeta aún.</p>
    </div>

    <div v-if="selectedCorpusContent">
      <h3>📄 Contenido del archivo Corpus:</h3>
      <pre>{{ selectedCorpusContent }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/uploader' as *;
</style>
