<script setup>
import { ref, computed } from 'vue';
import { fetchAndProcess } from '@/composables/useFetchAndProcessK10PlusData.js';

const citations = ref(null);
const loading = ref(false);
const error = ref(null);
const currentInput = ref('');
const selectedId = ref(null);
const showInfo = computed (() => !selectedId.value);

async function fetchData() {
  const regex = /^\d{8,11}$/;
  if (!regex.test(currentInput.value)) {
    currentInput.value = '';
    return;
  }
  selectedId.value = currentInput.value;
  try {
    const data = await fetchAndProcess({ id: currentInput.value }); 
    citations.value = data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

function clearSearch() {
  currentInput.value = '';
  selectedId.value = null;
  citations.value = null;
}

function getK10PlusLink(ppn) {
  return `https://opac.k10plus.de/DB=2.299/PPNSET?PPN=${ppn}`;
}
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}
</script>

<template>
  <main>
    <div class="headings content-element">
      <h1>Formatierungstool bibliografische Informationen</h1>
      <h2>für K10plus-Daten</h2>
    </div>
    <div class="controls content-element">
      <div class="search-control">
        <input type="text" class="search" v-model="currentInput" 
          placeholder="PPN eingeben"
        />
        <button @click="fetchData()" v-if="currentInput.length">Abschicken</button>
        <img src="@/assets/icons/x-circle.svg" alt="Edit" class="icon close-icon"
          @click="clearSearch()"
          v-if="currentInput"
        />
      </div>
    </div>
    <template v-if="showInfo">
      <div class="content-element info">
        <p>
          Dieses Tool ermöglicht die Formatierung bibliografischer Informationen aus dem <a href="https://opac.k10plus.de/" alt="zum K10Plus-Katalog" target="_blank">K10plus-Katalog</a>.
          Geben Sie eine Hier die Pica-Produktions-Nummer (PPN) ein und klicken Sie auf "Abschicken", um die bibliografischen Informationen
          für das entsprechende Werk zu erhalten. Die Informationen können als Text oder HTML kopiert werden.
        </p>
        <p>Die PPN steht bei Einträgen im <a href="https://opac.k10plus.de/" alt="zum K10Plus-Katalog" target="_blank">OPAC von K10plus</a>im ersten Feld.</p>
      </div>
    </template>
    <template  v-if="citations">
      <div class="display content-element">
        <div>
          <h4>Literaturangabe für  
            <a :href="getK10PlusLink(selectedId)" alt="Link zum Katalogeintrag" target="_blank">PPN {{ selectedId }}</a></h4>
          <div class="output">{{ citations?.plainText }}</div>
          <button @click="copyToClipboard(citations.plainText)">In die Zwischenablage kopieren</button>
        </div>
      </div>
      <div class="display content-element">
        <div v-if="true">
          <h4>Literaturangabe für  
            <a :href="getK10PlusLink(selectedId)" alt="Link zum Katalogeintrag" target="_blank">PPN {{ selectedId }}</a>im HTML-Format</h4>
          <div class="output">{{ citations?.html }}</div>
          <button @click="copyToClipboard(citations.plainText)">In die Zwischenablage kopieren</button>
        </div>
      </div>
    </template>
  <div class="data-output" v-if="false">
    <pre v-if="true">{{ citations }}</pre>
  </div>
</main>
</template>

<style scoped>
a {
  color: #0078d4;
  text-decoration: none;
}
.controls {
  position: relative;
}
.shortcuts {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
.suggestions {
  position: absolute;
  top: 100%;
  left: 1rem;
  padding: 1rem;
  width: 40rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: 0;
  display: block;
}
.suggestion {
  cursor: pointer;
  letter-spacing: .015rem;
}
.suggestion:hover {
  font-weight: bold;
  letter-spacing: 0;
}
.search-control {
  display: flex;
  gap: .25rem;
  align-items: center;
}
.search {
  width: 24rem;
  padding: 0.5rem;
  font-size: 1rem;
} 
.content-element {
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: #fff;
  border-radius: 0.5rem;
}
.display {
  display: block;
  margin-top: 2rem;
}
.data-output {
  margin-top: 2rem;
  background-color: #fff;
  padding: 1rem;
}
.icon {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
}
.close-icon {
  height: 2rem;
  width: 2rem;
  opacity: 0.5;
}
h2 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
h4 {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}
.controls button {
  margin-left: 0.5rem;
}
.display h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}
.display .output {
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.display button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #0078d4;
  color: #fff;
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>