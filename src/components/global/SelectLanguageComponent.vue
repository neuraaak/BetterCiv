<template>
    <div class="bg-zinc-200 border-zinc-200 text-zinc-800 rounded-sm flex items-center w-20">
        <select
            v-model="selectedLang"
            @change="updateLanguage"
            class="px-2 py-1 rounded-sm bg-zinc-200 border-zinc-200 text-zinc-800 w-full"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.lang"
                class="bg-gray-800 text-white"
            >
                {{ option.label }} {{ option.flag }}
            </option>
        </select>
    </div>
</template>

<script setup>
    /**
     * Select Language Component - Language selector dropdown
     * Allows users to change the application language with flag display
     */
    // IMPORT
    // ##############
    import { ref } from 'vue';
    import { translationStore } from '../../stores/index';

    // VARIABLES
    // ##############
    const store = translationStore();

    // Available languages with flags and labels
    const options = ref([
        { label: 'EN', flag: '🇺🇸', lang: 'en' },
        { label: 'DE', flag: '🇩🇪', lang: 'de' },
        { label: 'ES', flag: '🇪🇸', lang: 'es' },
        { label: 'FR', flag: '🇫🇷', lang: 'fr' },
        { label: 'IT', flag: '🇮🇹', lang: 'it' },
        { label: 'JP', flag: '🇯🇵', lang: 'jp' },
        { label: 'KR', flag: '🇰🇷', lang: 'kr' },
        { label: 'PL', flag: '🇵🇱', lang: 'pl' },
        { label: 'RU', flag: '🇷🇺', lang: 'ru' },
        { label: 'ZH', flag: '🇨🇳', lang: 'zh' },
    ]);

    // Current selected language
    const selectedLang = ref('fr');

    // FUNCTIONS
    // ##############
    function updateLanguage() {
        store.setLanguage(selectedLang.value);
    }
</script>

<style scoped>
    /* Muted text color for headers */
    h1,
    .muted {
        color: #2c3e5099;
    }

    /* Flag text spacing */
    .flag-text {
        margin-left: 10px;
    }

    /* Custom select styling for better flag display */
    select option {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>
