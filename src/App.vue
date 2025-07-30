<template>
    <HeaderComponent class="fixed" />
    <ContentComponent :civilisations="civ_data" />
    <StagewiseToolbar :config="{ plugins: [VuePlugin] }" />
    
    <!-- Notification de mise à jour -->
    <UpdateNotification
        :updateAvailable="updateAvailable"
        :onUpdate="installUpdate"
    />
    
    <!-- Indicateur hors ligne -->
    <div
        v-if="swState.isOffline"
        class="offline-indicator fixed bottom-4 left-4 z-50 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg"
        role="alert"
    >
        <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
            <span class="text-sm font-medium">Mode hors ligne</span>
        </div>
    </div>
</template>

<script setup>
// IMPORT
// ##############
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { translationStore } from './stores/index';
import HeaderComponent from './components/layout/HeaderComponent.vue';
import ContentComponent from './components/layout/ContentComponent.vue';
import { StagewiseToolbar } from '@stagewise/toolbar-vue';
import VuePlugin from '@stagewise-plugins/vue';
import { validateApiResponse, type ApiCivilization } from './utils/validation';
import { useServiceWorker } from './composables/useServiceWorker';
import UpdateNotification from './components/global/UpdateNotification.vue';

// VARIABLES
// ##############
const store = translationStore();
const { state: swState, updateAvailable, installUpdate } = useServiceWorker();

//
const civ_data = ref<ApiCivilization[]>([]);
const civ_tiers_and_tags = ref([
    { id: 1, tags_id: [5, 6], tier_id: 1 }, // 'America'
    { id: 2, tags_id: [5, 2], tier_id: 0 }, // 'Arabia'
    { id: 3, tags_id: [6, 1], tier_id: 2 }, // 'Aztecs'
    { id: 4, tags_id: [6], tier_id: 2 }, // 'China'
    { id: 5, tags_id: [4], tier_id: 2 }, // 'Egypt'
    { id: 6, tags_id: [6], tier_id: 1 }, // 'England'
    { id: 7, tags_id: [1], tier_id: 4 }, // 'France'
    { id: 8, tags_id: [6, 5], tier_id: 1 }, // 'Germany'
    { id: 9, tags_id: [0], tier_id: 1 }, // 'Greece'
    { id: 10, tags_id: [0], tier_id: 4 }, // 'India'
    { id: 11, tags_id: [0], tier_id: 4 }, // 'Iroquois'
    { id: 12, tags_id: [6, 1], tier_id: 3 }, // 'Japan'
    { id: 13, tags_id: [6], tier_id: 3 }, // 'Ottomans'
    { id: 14, tags_id: [0], tier_id: 0 }, // 'Persia'
    { id: 15, tags_id: [4], tier_id: 4 }, // 'Rome'
    { id: 16, tags_id: [4], tier_id: 2 }, // 'Russia'
    { id: 17, tags_id: [0], tier_id: 3 }, // 'Siam'
    { id: 18, tags_id: [6], tier_id: 1 }, // 'Songhai'
    { id: 19, tags_id: [6], tier_id: 1 }, // 'Mongolia'
    { id: 20, tags_id: [0], tier_id: 1 }, // 'Incas'
    { id: 21, tags_id: [1], tier_id: 2 }, // 'Spain'
    { id: 22, tags_id: [6], tier_id: 2 }, // 'Polynesia'
    { id: 23, tags_id: [6], tier_id: 2 }, // 'Denmark'
    { id: 24, tags_id: [3], tier_id: 0 }, // 'Korea'
    { id: 25, tags_id: [3], tier_id: 0 }, // 'Babylon'
    { id: 26, tags_id: [0], tier_id: 3 }, // 'Austria'
    { id: 27, tags_id: [2], tier_id: 4 }, // 'Byzantium'
    { id: 28, tags_id: [0], tier_id: 4 }, // 'Carthage'
    { id: 29, tags_id: [2], tier_id: 2 }, // 'Celts'
    { id: 30, tags_id: [6], tier_id: 2 }, // 'Ethiopia'
    { id: 31, tags_id: [6, 4], tier_id: 1 }, // 'Huns'
    { id: 32, tags_id: [0], tier_id: 1 }, // 'Mayans'
    { id: 33, tags_id: [0], tier_id: 2 }, // 'Netherlands'
    { id: 34, tags_id: [0], tier_id: 2 }, // 'Sweden'
    { id: 35, tags_id: [3], tier_id: 3 }, // 'Assyria'
    { id: 36, tags_id: [1], tier_id: 2 }, // 'Brazil'
    { id: 37, tags_id: [0], tier_id: 4 }, // 'Indonesia'
    { id: 38, tags_id: [5, 1], tier_id: 2 }, // 'Morocco'
    { id: 39, tags_id: [0], tier_id: 0 }, // 'Poland'
    { id: 40, tags_id: [5], tier_id: 4 }, // 'Portugal'
    { id: 41, tags_id: [0], tier_id: 2 }, // 'Shoshone'
    { id: 42, tags_id: [5], tier_id: 1 }, // 'Venice'
    { id: 43, tags_id: [6], tier_id: 0 }, // 'Zulus'
]);

// COMPUTED
// ##############
const fetchUrl = computed(
    () =>
        `https://eyefyre.github.io/civvapi/v1/${store.getLanguage}/civilizations/civilizations.json`
);

// WATCHER
// ##############
watch(
    () => store.getLanguage,
    (newLanguage, oldLanguage) => {
        // Calls fetchCivilizations every time the language changes
        fetchCivilizations();
    },
    { immediate: true }
); // { immediate: true } ensures that fetchCivilizations is called when the component mounts

// HOOKS
// ##############
onMounted(() => {
    document.title = 'Better Civ5';
    document.documentElement.lang = 'fr';
    window.addEventListener('mousemove', movingBackground);
    fetchCivilizations();
});

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', movingBackground);
});

// FUNCTIONS
// ##############
function movingBackground(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Use CSS custom properties for better performance (no reflow)
    const positionX = 50 - (clientX / screenWidth) * 2;
    const positionY = 50 - (clientY / screenHeight) * 2;

    document.documentElement.style.setProperty('--bg-x', `${positionX}%`);
    document.documentElement.style.setProperty('--bg-y', `${positionY}%`);
}

async function fetchCivilizations(): Promise<void> {
    try {
        const response = await fetch(fetchUrl.value);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Validate API response
        const validatedData = validateApiResponse(data);
        if (!validatedData) {
            throw new Error('Invalid API response data');
        }
        
        civ_data.value = mergeCivilizationData(validatedData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        civ_data.value = []; // Reset to empty array on error
    }
}

function mergeCivilizationData(civilizations: ApiCivilization[]): ApiCivilization[] {
    return civilizations.map(civ => {
        // Finds the corresponding object in additionalData
        const additionalInfo = civ_tiers_and_tags.value.find(addCiv => addCiv.id === civ.id);

        // If found, adds the new properties to the civ object
        if (additionalInfo) {
            return {
                ...civ,
                tags_id: additionalInfo.tags_id,
                tier_id: additionalInfo.tier_id,
            };
        }

        // If not found, returns the civ object without modifications
        return civ;
    });
}
</script>
