<template>
    <Card
        class="bg-zinc-950 border-4 border-zinc-900 rounded-xl hover:border-zinc-800 flex flex-col h-full justify-items-stretch pb-1"
        style="width: 100%; overflow: hidden"
        @click="toggleSelected"
    >
        <template #header>
            <LazyImageComponent 
                :src="imagePath" 
                alt="user header"
                threshold="0.1"
            />
        </template>

        <template #title>
            <div class="flex flex-row items-baseline gap-0 pb-1">
                <h1 class="shrink font-mono font-bold px-3 pt-2" :class="sizeClass">
                    {{ name?.split('|')[0] }}
                </h1>
                <CivTierComponent
                    :key="tier_id"
                    :tier_id="tier_id"
                    class="shrink-0 -translate-y-0.5 pr-3"
                >
                </CivTierComponent>
            </div>
        </template>

        <template #subtitle>
            <p
                class="font-sans italic font-light text-sm leading-5 px-3 h-16"
                style="overflow-y: scroll"
            >
                {{ desc }}
            </p>
            <div
                id="leader"
                class="bg-zinc-900 rounded-md mt-2 mx-2 px-2 pb-2 max-h-[3.75rem] min-h-[3.75rem] overflow-y-auto"
            >
                <TextWithIconsComponent
                    :text="civ_leader_effect"
                    :keywordIcons="keywordIcons"
                    :language="store.lang"
                    class="font-sans font-light text-sm pl-1 py-1"
                />
            </div>
        </template>

        <template #content>
            <div class="h-1"></div>
        </template>

        <template #footer>
            <div class="flex flex-row flex-wrap gap-x-2 px-3 mt-2">
                <CivTagComponent
                    v-for="tag_id in tags_id"
                    :key="tag_id"
                    :tag_id="tag_id"
                ></CivTagComponent>
            </div>
        </template>
    </Card>
</template>

<script setup>
/**
 * Civilization Card Component - Displays civilization information in a card format
 * Shows civilization name, tier, description, leader effect, and tags
 */
// IMPORT
// ##############
import { ref, watch, computed, onMounted } from 'vue';
import { translationStore } from '../../stores/index';
import Card from 'primevue/card';
import { defineAsyncComponent } from 'vue';
import LazyImageComponent from '../global/LazyImageComponent.vue';
import TextWithIconsComponent from '../global/TextWithIconsComponent.vue';

// Lazy loading des sous-composants
const CivTierComponent = defineAsyncComponent({
    loader: () => import('./subcomponents/CivTierComponent.vue'),
    loadingComponent: () => import('../global/LoadingComponent.vue'),
    delay: 100,
    timeout: 2000
});

const CivTagComponent = defineAsyncComponent({
    loader: () => import('./subcomponents/CivTagComponent.vue'),
    loadingComponent: () => import('../global/LoadingComponent.vue'),
    delay: 100,
    timeout: 2000
});

// VARIABLES
// ##############
const props = defineProps({
    id: Number,
    name: String,
    desc: String,
    tags_id: Array,
    tier_id: Number,
    civ_leader_effect: String,
});

const store = translationStore();

// Component state
const selectedState = ref(false);
const selectedCard = ref(null);
const keywordIcons = ref([]);
const sizeClass = ref('');

// Initialize keyword icons from store
const buildKeywordIcons = () => {
    keywordIcons.value = store.getIconKeywordsDict;
};

// Set font size based on language (smaller for CJK languages)
const sizeLabelUnicode = () => {
    sizeClass.value = ['jp', 'kr', 'zh'].includes(store.lang)
        ? 'text-[1.4rem] leading-8'
        : 'text-2xl';
};

// COMPUTED
const imagePath = computed(() => {
    return `/img/card-cover2.jpg`;
});



// WATCHER
// ##############
watch(() => store.getLanguage, buildKeywordIcons);

watch(
    () => store.getLanguage,
    () => {
        sizeLabelUnicode();
    },
    { immediate: true }
); // { immediate: true } ensures that sizeLabelUnicode is called on component mount

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
</style>
../../stores/index./subcomponents/CivTagComponent.vue./subcomponents/CivTierComponent.vue
