<script setup>

// IMPORT
// ##############
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { correspondanceStore } from '../stores/index';
import Card from 'primevue/card';
import CivTierComponent from './CivTierComponent.vue';
import CivTagComponent from './CivTagComponent.vue';

// VARIABLES
// ##############
const props = defineProps({
    id: Number,
    name: String,
    desc: String,
    tags_id: Array,
    tier_id: Number,
    civ_icon: String,
    civ_leader: String,
    civ_leader_icon: String,
    civ_leader_effect: String,
    civ_units: Array,
    civ_building: Array,

});

const store = correspondanceStore();
//
const unitData = ref([]);
const buildingData = ref([]);
const descriptionLabel = ref('');
const unitsLabel = ref('');
const buildingsLabel = ref('');
const keywordIcons = ref([]);

const updateLabels = () => {
    descriptionLabel.value = store.getTranslation("description");
    unitsLabel.value = store.getTranslation("unique_units");
    buildingsLabel.value = store.getTranslation("unique_buildings");
};

const buildKeywordIcons = () => {
    keywordIcons.value = store.getIconKeywordsDict;
};

// COMPUTED
const civBackground = computed(() => {
    return `/img/card-cover2.jpg`;
});

const civLeaderEffectWithIcons = computed(() => {
    let text = props.civ_leader_effect?.replace(/\[.*?\]/g, '').trim();

    keywordIcons.value.forEach(({ text: keyword, icon }) => {
        const iconPath = icon;
        let regex = null;
        if (["ru", "jp", "kr", "zh"].includes(store.lang)) {
            regex = new RegExp(`${keyword}`, 'ui');
        } else {
            regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        }

        if (text !== undefined) {
            text = text.replace(regex, `<span class="keyword-icon translate-y-[0.2rem]" style="display: inline-flex; align-items: center; height: 20px;"><img src="${iconPath}" alt="${keyword}" style="display: inline; height: 16px; vertical-align: middle;">${keyword}</span>`);
        }
    });

    return text;
});

// WATCHER
// ##############
watch(() => store.getLanguage, () => {
    buildKeywordIcons();
}, { immediate: false });

watch(() => store.getLanguage, () => {
    updateLabels();
    // Appelle fetchUnitsBuildings chaque fois que la langue change
    fetchUnitsBuildings();
}, { immediate: true }); // { immediate: true } assure que fetchUnitsBuildings est appelé au montage du composant

// HOOKS
// ##############
onMounted(() => {
    fetchUnitsBuildings();
    buildKeywordIcons();

    const handleMouseMove = e => {
        for (const card of document.getElementsByClassName("mastercard")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Nettoyage lors de la destruction du composant
    onUnmounted(() => {
        document.removeEventListener("mousemove", handleMouseMove);
    });
});

// FUNCTIONS
// ##############
async function fetchUnitsBuildings() {
    // Charger les données des unités
    const units = props.civ_units || []; // S'assurer que l'array existe
    const unitFetches = units.map(async unit => {
        try {
            const response = await fetch(unit.url.replace('/en/', `/${store.getLanguage}/`));
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return { ...unit, icon: data.icon }; // Conserver le nom et ajouter l'icône
        } catch (error) {
            console.error('Error fetching unit data:', error);
            return { ...unit, icon: undefined }; // Gérer l'erreur en conservant le nom de l'unité
        }
    });

    // Charger les données des bâtiments
    const buildings = props.civ_building || []; // S'assurer que l'array existe
    const buildingFetches = buildings.map(async building => {
        try {
            const response = await fetch(building.url.replace('/en/', `/${store.getLanguage}/`));
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return { ...building, icon: data.icon }; // Conserver le nom et ajouter l'icône
        } catch (error) {
            console.error('Error fetching building data:', error);
            return { ...building, icon: undefined }; // Gérer l'erreur en conservant le nom du bâtiment
        }
    });

    // Résoudre toutes les promesses et stocker les résultats
    unitData.value = await Promise.all(unitFetches);
    buildingData.value = await Promise.all(buildingFetches);
}

function getTranslation(key) {
    const item = translations.find(translation => translation.key === key);
    const translationObj = item.translations.find(t => t.lang === store.lang);
    return translationObj ? translationObj.text : key; // Retourne le mot-clé par défaut si aucune traduction n'est trouvée
}

</script>

<template>
    <div class="h-full rounded-xl">
        <div class="content w-full h-full rounded-xl overflow-hidden">
            <div class="back absolute flex justify-center items-center w-full h-full bg-zinc-800">
                <div class="back-content absolute flex justify-center items-center bg-zinc-900 rounded-xl">
                    <Card
                        class="mastercard bg-zinc-950 rounded-xl hover:border-zinc-800 flex flex-col h-full justify-items-stretch"
                        style="width: 100%; overflow: hidden" @click="">
                        <template #header>
                            <div class="overflow-hidden h-[220px]">
                                <img :src=civBackground alt="user header"
                                    class="object-cover object-top w-full h-full" />
                            </div>
                        </template>

                        <template #title>
                            <div class="flex flex-row items-baseline gap-0 px-4 pb-1 mt-1">
                                <div class="flex h-full">
                                    <img :src=civ_icon
                                        class="object-contain object-bottom h-[36px] w-auto translate-y-1"
                                        alt="Icon of the civilization" />
                                </div>
                                <h1 class="font-mono font-bold text-[2.75rem] pl-3">{{ name?.split('|')[0] }}</h1>
                                <div class="grow -translate-y-1 pl-4">
                                    <CivTierComponent :key="tier_id" :tier_id="tier_id" class="">
                                    </CivTierComponent>
                                </div>
                            </div>
                        </template>

                        <template #subtitle>
                            <!-- Description -->
                            <div id="desc">
                                <h3 class="font-mono font-bold text-md px-4">{{ descriptionLabel }}</h3>
                                <p class="font-sans italic font-light text-sm leading-5 px-4 max-h-16"
                                    style="overflow-y: scroll;">
                                    {{ desc }}
                                </p>
                            </div>
                        </template>

                        <template #content>
                            <div class="overflow-y-auto">
                                <!-- Catégories -->
                                <div id="category" class="bg-zinc-900 rounded-md mt-4 mx-4 px-2 py-1">
                                    <div class="flex flex-row flex-wrap gap-x-1 mt-2 mb-2">
                                        <CivTagComponent v-for="tag_id in tags_id" :key="tag_id" :tag_id="tag_id">
                                        </CivTagComponent>
                                    </div>
                                </div>

                                <!-- Leader -->
                                <div id="leader" class="bg-zinc-900 rounded-md mt-3 mx-4 px-2 py-1">
                                    <!-- <h3 class="font-mono font-bold text-md">{{ civ_leader }}</h3> -->
                                    <div class="flex flex-row gap-x-1">
                                        <div v-if="civ_leader_icon !== undefined" class="flex h-full shrink-0 w-16">
                                            <img :src="civ_leader_icon"
                                                class="object-contain object-bottom max-h-full w-full translate-y-1"
                                                alt="Icon of the civilization" />
                                        </div>
                                        <div class="flex flex-col flex-grow shrink flex-nowrap gap-x-1 mb-2">
                                            <h2 class="font-mono font-bold text-2xl pl-1 pt-1">{{
                            civ_leader?.split('|')[0] }}</h2>
                                            <p v-html="civLeaderEffectWithIcons"
                                                class="font-sans font-light text-sm pl-1 -translate-y-0.5"></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Unique items -->
                                <div class="flex flex-row gap-x-3">

                                    <!-- Unique unit -->
                                    <div class="flex flex-col bg-zinc-900 rounded-md w-1/2 mt-3 ml-4 px-2 py-1">
                                        <h3 class="font-mono font-bold text-sm text-left ml-1 mt-1">{{ unitsLabel }}
                                        </h3>
                                        <div v-for="(unit, index) in unitData" :key="unit.name">
                                            <div class="flex flex-row gap-x-1 h-8">
                                                <div class="flex h-full shrink-0 w-6">
                                                    <img v-if="unit.icon !== undefined" :src="unit.icon"
                                                        class="object-contain object-center h-full w-full"
                                                        :alt="unit.name.split('|')[0]" />
                                                </div>
                                                <div class="flex flex-col flex-grow shrink flex-nowrap gap-x-1 mb-2">
                                                    <h3 v-if="unit.name !== undefined"
                                                        class="font-sans font-normal text-sm my-1 pl-1 pt-1">{{
                            unit.name.split('|')[0]
                        }}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div v-if="index != unitData.length - 1" class="bg-zinc-800 h-[1px] mt-1">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Unique building -->
                                    <div class="flex flex-col bg-zinc-900 rounded-md w-1/2 mt-3 mr-4 px-2 py-1">
                                        <h3 class="font-mono font-bold text-sm text-left ml-1 mt-1">{{ buildingsLabel }}
                                        </h3>
                                        <div v-for="(building, index) in buildingData">
                                            <div class="flex flex-row gap-x-1 h-8">
                                                <div class="flex h-full shrink-0 w-6">
                                                    <img v-if="building.name !== undefined" :src="building.icon"
                                                        class="object-contain object-center h-full w-full"
                                                        :alt="building.name.split('|')[0]" />
                                                </div>
                                                <div class="flex flex-col flex-grow shrink flex-nowrap gap-x-1 mb-2">
                                                    <h3 v-if="building.name !== undefined"
                                                        class="font-sans font-normal text-sm my-1 pl-1 pt-1">{{
                            building.name.split('|')[0]
                                                        }}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div v-if="index != buildingData.length - 1"
                                                class="bg-zinc-800 h-[1px] mt-1">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </template>

                        <template #footer>
                            <div class="flex flex-row flex-wrap gap-x-2 pl-3 mt-1">
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    transform-style: preserve-3d;
    transition: transform 300ms;
}

.back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 120%;
    height: 120%;
    background-image: linear-gradient(to right,
            rgb(39 39 42) 0%,
            rgb(82 82 91) 7%,
            rgb(113 113 122) 25%,
            rgb(82 82 91) 38%,
            rgb(24 24 27) 50%,
            rgb(82 82 91) 66%,
            rgb(113 113 122) 75%,
            rgb(82 82 91) 92%,
            rgb(39 39 42) 100%);
    animation: rotation_481 24000ms infinite cubic-bezier(0.172, 0.5, 0.662, 1);
    box-sizing: content-box !important;
}

.back-content {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
}


@keyframes rotation_481 {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

/* CARD */
.mastercard:hover::before {
    opacity: 1;
}

.mastercard::before,
.mastercard::after {
    pointer-events: none;
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
}

.mastercard::before {
    background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.06),
            transparent 40%);
    z-index: 3;
}

.mastercard::after {
    background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.4),
            transparent 40%);
    z-index: 1;
}
</style>
