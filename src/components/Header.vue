<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// --- i18n setup ---
const { locale } = useI18n()

// --- Tema (oscuro / claro) ---
const theme = ref<'light' | 'dark'>('light')

onMounted(() => {
  // Detecta preferencia inicial del sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  theme.value = prefersDark ? 'dark' : 'light'
  applyTheme()
})

watch(theme, applyTheme)

// --- Función que aplica la clase al body ---
function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme.value)
}

// --- Cambio de idioma ---
const languages = [
  { label: '🇪🇸 Español', value: 'es' },
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇫🇷 Français', value: 'fr' },
]

function changeLanguage(lang: string) {
  locale.value = lang
}
</script>

<template>
  <div class="settings-panel">
    <div class="setting">
      <label for="theme">🎨 Tema:</label>
      <select id="theme" v-model="theme">
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </select>
    </div>

    <div class="setting">
      <label for="language">🌐 Idioma:</label>
      <select id="language" v-model="locale" @change="changeLanguage(locale)">
        <option v-for="lang in languages" :key="lang.value" :value="lang.value">
          {{ lang.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/colors' as *;

.settings-panel {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--panel-bg);
  color: var(--panel-text);
  border: 1px solid var(--panel-border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.95rem;
  z-index: 1000;

  label {
    font-weight: 600;
    margin-right: 0.5rem;
  }

  select {
    border: 1px solid $border;
    border-radius: 0.5rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.9rem;
    background-color: var(--input-bg);
    color: var(--input-text);
    cursor: pointer;
  }

  .setting {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

/* --- Modo claro / oscuro --- */
:global(:root[data-theme='light']) {
  --panel-bg: #ffffff;
  --panel-text: #111;
  --panel-border: #ddd;
  --input-bg: #f9fafb;
  --input-text: #111;
}

:global(:root[data-theme='dark']) {
  --panel-bg: #1e1e1e;
  --panel-text: #f9fafb;
  --panel-border: #333;
  --input-bg: #2c2c2c;
  --input-text: #f9fafb;
}
</style>
