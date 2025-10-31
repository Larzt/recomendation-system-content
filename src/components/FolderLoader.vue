<script setup lang="ts">
import { ref } from 'vue'
import { useFilesStore } from '@/stores'
import { directoriesFilesToIFile } from '@/utils'
import { processText } from '@/utils/processText'

const store = useFilesStore()
const selectedFileContent = ref<string>('')

async function handleFiles(event: Event | DragEvent) {
  let files: FileList | null = null
  if (event instanceof DragEvent && event.dataTransfer?.files) {
    files = event.dataTransfer.files
  } else if (event.target instanceof HTMLInputElement && event.target.files) {
    files = event.target.files
  }
  if (!files) return

  const fileArray = Array.from(files)
  const converted = await Promise.all(fileArray.map(file => directoriesFilesToIFile(file)))
  store.setDocuments(converted)
}

function readFile(file: IFile) {
  // selectedFileContent.value = file.content
  let content_divided: string[] = processText(selectedFileContent.value)
  content_divided = file.content as string[]
}
</script>

<template>
  <div class="uploader">
    <h2 class="title">Subir carpeta de documentos</h2>
    <p class="subtitle">Selecciona o arrastra una carpeta con documentos de texto.</p>

    <div class="drop-zone">
      <p>Selecciona o arrastra una carpeta con tus documentos</p>
      <label class="file-btn"> Elegir carpeta
        <input type="file" webkitdirectory mozdirectory @change="handleFiles" />
      </label>
    </div>

    <h3 v-if="store.documents.length" class="files-title">
      Archivos encontrados ({{ store.documents.length }}):
    </h3>
    <ul v-if="store.documents.length">
      <li v-for="file in store.documents" :key="file.name">
        <button @click="readFile(file)">{{ file.name }}</button>
      </li>
    </ul>

    <div v-else class="empty">
      <p>No se ha cargado ninguna carpeta aún.</p>
    </div>

    <div v-if="selectedFileContent">
      <h3>📄 Contenido del archivo:</h3>
      <pre>{{ selectedFileContent }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/uploader' as *;
</style>
