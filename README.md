# recomendation-system-content

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

## Code description

Relevant structure:

- `src/algorithms/` — recommendation engine logic: DF/IDF calculation, text processing, normalization and similarity calculation.
- `src/components/` — Vue components: `CorpusLoader`, `FolderLoader`, `StopWordsLoader`, `SimilarityViewer`, `MatrixViewer`, etc.
- `src/utils/` — helper utilities: build term matrix, normalization, file converters.
- `public/` — resources: `corpus/`, `exampleDocuments/`, `stopWords/`.

App workflow:

1. Load corpus/documents (JSON or plain text files).
2. Preprocess: normalize text, remove stop words.
3. Compute TF/IDF and normalize vectors.
4. Produce similarity matrix and recommendation rankings.

## Contract (inputs/outputs)

- Input: documents (text), stop words.
- Output: TF/IDF vectors per document, similarity matrix and rankings of similar documents.

## Quick usage example

1. Install dependencies and start the dev server:

   ```sh
   bun install
   bun dev
   # or npm install && npm run dev
   ```

2. Open your browser at http://localhost:5173.

3. In the UI, load a corpus using `CorpusLoader` (e.g. `public/corpus/corpus_es.json`) or drag a folder with `FolderLoader` pointing to `public/exampleDocuments/`.

4. (Optional) Load stop words with `StopWordsLoader` using `public/stopWords/stopWords_es.txt`.

5. Inspect `SimilarityViewer` or `MatrixViewer` to see the term-document matrix and the most similar documents.

Practical example: load `public/exampleDocuments/document_01.txt`...`document_05.txt` and observe which documents are closest to `document_01`.

## Important files

- `package.json` — scripts: `dev`, `build`, `preview`, `type-check`, `lint`.
- `src/algorithms/` — core logic.
- `public/exampleDocuments/` and `public/corpus/` — sample data.


