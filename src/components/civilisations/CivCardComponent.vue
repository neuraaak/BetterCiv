<template>
    <Card
        class="bg-zinc-950 border-4 border-zinc-900 rounded-xl hover:border-zinc-800 flex flex-col h-full justify-items-stretch pb-1"
        style="width: 100%; overflow: hidden" @click="toggleSelected">
        <template #header>
            <img alt="user header" :src=imagePath />
        </template>

        <template #title>
            <div class="flex flex-row items-baseline gap-0 pb-1">
                <h1 class="font-mono font-bold text-2xl px-3 pt-2">{{ name?.split('|')[0] }}</h1>
                <CivTierComponent :key="tier_id" :tier_id="tier_id" class="-translate-y-0.5"></CivTierComponent>
            </div>
        </template>

        <template #subtitle>
            <p class="font-sans italic font-light text-sm leading-5 px-3 h-16" style="overflow-y: scroll;">{{ desc }}
            </p>
            <div id="leader"
                class="bg-zinc-900 rounded-md mt-2 mx-2 px-2 pb-2 max-h-[3.75rem] min-h-[3.75rem] overflow-y-auto">
                <p v-html="civLeaderEffectWithIcons" class="font-sans font-light text-sm pl-1 py-1">
                </p>
            </div>
        </template>

        <template #content>
            <div class="h-1"></div>
        </template>

        <template #footer>
            <div class="flex flex-row flex-wrap gap-x-2 pl-3 mt-2">
                <CivTagComponent v-for="tag_id in tags_id" :key="tag_id" :tag_id="tag_id"></CivTagComponent>
            </div>
        </template>
    </Card>
</template>

<script setup>

// IMPORT
// ##############
import { ref, watch, computed, onMounted } from 'vue';
import { correspondanceStore } from '../../stores/index';
import Card from 'primevue/card';
import CivTierComponent from './subcomponents/CivTierComponent.vue';
import CivTagComponent from './subcomponents/CivTagComponent.vue';

// VARIABLES
// ##############
const props = defineProps({
    id: Number,
    name: String,
    desc: String,
    tags_id: Array,
    tier_id: Number,
    civ_leader_effect: String
});

const store = correspondanceStore();
//
const selectedState = ref(false);
const selectedCard = ref(null);
const keywordIcons = ref([]);

const buildKeywordIcons = () => {
    keywordIcons.value = store.getIconKeywordsDict;
};

// COMPUTED
const imagePath = computed(() => {
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
watch(() => store.getLanguage, buildKeywordIcons);

// HOOKS
// ##############
onMounted(buildKeywordIcons);

// FUNCTIONS
function toggleSelected() {
    selectedCard.value = props.id;
    store.setSelectedCard(selectedCard.value);
    //
    selectedState.value = !selectedState.value;
    store.setSelectedState(selectedState.value);
}

</script>


<style scoped>
.h-30 {
    height: 6.5rem;
}

.card-height {
    height: 24rem;
    max-height: 24rem;
}
</style>../../stores/index./subcomponents/CivTagComponent.vue./subcomponents/CivTierComponent.vue
