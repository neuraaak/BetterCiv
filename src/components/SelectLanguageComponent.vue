<script setup>

// IMPORT
// ##############
import { ref } from 'vue';
import { correspondanceStore } from '../stores/index';

// VARIABLES
// ##############
const store = correspondanceStore()
//
const options = ref([
    { value: 'US', lang: 'en' },
    { value: 'DE', lang: 'de' },
    { value: 'ES', lang: 'es' },
    { value: 'FR', lang: 'fr' },
    { value: 'IT', lang: 'it' },
    { value: 'JP', lang: 'jp' },
    { value: 'KR', lang: 'kr' },
    { value: 'PL', lang: 'pl' },
    { value: 'RU', lang: 'ru' },
    { value: 'CN', lang: 'zh' }
]);
//
const selectedLang = ref('fr');

// FUNCTIONS
// ##############
function updateLanguage() {
    store.setLanguage(selectedLang.value);
}

</script>

<template>
    <div class="bg-zinc-200 border-zinc-200 text-zinc-800 rounded-sm flex items-center w-16">
        <select v-model="selectedLang" @change="updateLanguage" class="px-2 py-1 rounded-sm bg-zinc-200 border-zinc-200 text-zinc-800">
            <option v-for="option in options" :key="option.value" :value="option.lang">
                {{ option.value }}
            </option>
        </select>
    </div>
</template>

<style scoped>
h1,
.muted {
    color: #2c3e5099;
}

.flag-text {
    margin-left: 10px;
}
</style>
