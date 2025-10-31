<script setup lang="ts">
import { ref } from 'vue'
import { useFilesStore } from '@/stores'
import { toIFile } from '@/utils'

const store = useFilesStore()
const selectedStopWordContent = ref<string>('')

async function handleStopWords(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  const fileArray = Array.from(input.files)
  const converted = await Promise.all(fileArray.map(file => toIFile(file)))

  store.setStopWords(converted)
}

function readStopWord(file: IFile) {
  selectedStopWordContent.value = file.content
}
</script>

<template>
  <div class="uploader">
    <input type="file" webkitdirectory mozdirectory @change="handleStopWords" />

    <h3>StopWords encontrados ({{ store.stopWords.length }}):</h3>
    <ul>
      <li v-for="file in store.stopWords" :key="file.name">
        <button @click="readStopWord(file)">{{ file.name }}</button>
      </li>
    </ul>

    <div v-if="selectedStopWordContent">
      <h3>Contenido del archivo StopWords:</h3>
      <pre>{{ selectedStopWordContent }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.uploader {
  background: $primary-lighten;
  border: 1px solid $border;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 2px 6px $shadow-light;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px $shadow-hover;
    transform: translateY(-2px);
  }

  input[type="file"] {
    display: block;
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border: 2px dashed $primary;
    border-radius: 0.75rem;
    background-color: $primary-bg;
    color: $primary-darken;
    cursor: pointer;
    width: 100%;
    font-weight: 500;
    text-align: center;

    &:hover {
      background-color: lighten($primary-bg, 4%);
    }
  }

  h3 {
    color: $heading;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid $border;
    padding-bottom: 0.25rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;

    li {
      margin-bottom: 0.5rem;

      button {
        background: $primary;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
        box-shadow: 0 1px 3px $shadow-light;

        &:hover {
          background: darken($primary, 8%);
          transform: translateY(-1px);
          box-shadow: 0 2px 5px $shadow-hover;
        }
      }
    }
  }

  pre {
    background: $primary-bg;
    color: $text;
    border-radius: 0.75rem;
    padding: 1rem;
    border: 1px solid $border;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}
</style>
