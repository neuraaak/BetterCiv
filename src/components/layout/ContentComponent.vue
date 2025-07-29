<template>
    <div
        class="content-overlay w-full fixed flex flex-row justify-center items-center bg-zinc-950/70 backdrop-blur-md backdrop-brightness-80 shadow-xl"
        :class="!selectedState ? 'hidden' : ''"
        @click="closeOverlay"
    >
        <div id="master-card" class="w-[485px] h-[710px] mx-1" @click.stop>
            <MasterCardComponent
                :key="filteredCivilisations[selectedCardIndex]?.id"
                :id="filteredCivilisations[selectedCardIndex]?.id"
                :name="filteredCivilisations[selectedCardIndex]?.name"
                :civ_icon="filteredCivilisations[selectedCardIndex]?.icon"
                :desc="filteredCivilisations[selectedCardIndex]?.historical_info[0]?.text"
                :tags_id="filteredCivilisations[selectedCardIndex]?.tags_id"
                :tier_id="filteredCivilisations[selectedCardIndex]?.tier_id"
                :civ_leader="filteredCivilisations[selectedCardIndex]?.leader.name"
                :civ_leader_icon="filteredCivilisations[selectedCardIndex]?.leader.icon"
                :civ_leader_effect="filteredCivilisations[selectedCardIndex]?.leader.trait.effect"
                :civ_units="filteredCivilisations[selectedCardIndex]?.unique_units"
                :civ_building="filteredCivilisations[selectedCardIndex]?.unique_buildings"
            />
        </div>
    </div>
    <div class="content relative flex flex-col align-top items-start sm:px-8 md:px-12 lg:px-20">
        <div class="fixedcontent flex flex-row align-top gap-8 mt-16">
            <SelectInputComponent
                multiple
                v-model="selectedTags"
                @update:selectedOptions="handleCheckedTags"
                :options="tagList"
                label="name"
                class="md:w-20rem flex flex-row"
                getPropertyFunc="getTagPropertyById"
            >
            </SelectInputComponent>
            <SelectInputComponent
                multiple
                v-model="selectedTiers"
                @update:selectedOptions="handleCheckedTiers"
                :options="tierList"
                label="name"
                class="md:w-20rem flex flex-row"
                getPropertyFunc="getTierPropertyById"
            >
            </SelectInputComponent>
            <SearchInputComponent
                v-model="searchedText"
                :civilizations="filteredCivilisations"
                @update:searchText="handleSearchedText"
            >
            </SearchInputComponent>
        </div>

        <div class="grid-container mt-8 mb-24">
            <CivCardComponent
                v-for="civ in filteredCivilisations"
                :key="civ?.id"
                :id="civ?.id"
                :name="civ?.name"
                :desc="civ?.historical_info[0].text"
                :tags_id="civ?.tags_id"
                :tier_id="civ?.tier_id"
                :civ_leader_effect="civ?.leader.trait.effect"
            />
        </div>
    </div>
</template>

<script setup>
/**
 * Content Component - Main layout component for displaying civilization cards
 * Handles filtering, search, and card navigation functionality
 */
// IMPORT
// ##############
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { translationStore } from '../../stores/index';
import CivCardComponent from '../civilisations/CivCardComponent.vue';
import MasterCardComponent from '../civilisations/MasterCardComponent.vue';
import SelectInputComponent from '../global/SelectInputComponent.vue';
import SearchInputComponent from '../global/SearchInputComponent.vue';

// VARIABLES
// ##############
const props = defineProps({
    civilisations: {
        type: Array,
        required: true,
    },
});

const store = translationStore();

// Store data
const tagList = store.getTagList;
const tierList = store.getTierList;

// Filter state
const selectedTags = ref([]);
const selectedTiers = ref([]);

// Card selection state
const selectedState = ref(false);
const selectedCard = ref(null);

// Search state
const searchedText = ref('');

// COMPUTED
const filteredCivilisations = computed(() => {
    return props.civilisations.filter(civ => {
        // Check if tags match (or if no tags are selected)
        let tagsMatch =
            !selectedTags.value.length ||
            civ.tags_id.some(tag => selectedTags.value.some(selectedTag => selectedTag.id === tag));

        // Check if tiers match (or if no tiers are selected)
        let tiersMatch =
            !selectedTiers.value.length ||
            selectedTiers.value.some(selectedTier => selectedTier.id === civ.tier_id);

        // Check if search text matches
        let regex = null;
        if (['ru', 'jp', 'kr', 'zh'].includes(store.lang)) {
            regex = new RegExp(`${searchedText.value}`, 'ui');
        } else {
            regex = new RegExp(`${searchedText.value}`, 'gi');
        }

        let searchMatch =
            !searchedText.value.length ||
            regex.test(civ.leader.trait.effect) ||
            regex.test(civ.name);

        return tagsMatch && tiersMatch && searchMatch;
    });
});

const selectedCardIndex = computed(() => {
    return filteredCivilisations.value.findIndex(civ => civ.id === selectedCard.value);
});

// WATCHER
// ##############
watch(
    () => store.getSelectedState,
    () => {
        selectedState.value = store.getSelectedState;
        selectedCard.value = store.getSelectedCard;
    },
    { immediate: true }
);

// HOOKS
// ##############
onMounted(() => {
    window.addEventListener('keydown', navigateCards);
});

onUnmounted(() => {
    window.removeEventListener('keydown', navigateCards);
});

// FUNCTIONS
// ##############
function handleCheckedTags(checkedTags) {
    selectedTags.value = checkedTags;
}

function handleCheckedTiers(checkedTiers) {
    selectedTiers.value = checkedTiers;
}

function handleSearchedText(searchText) {
    searchedText.value = searchText;
}

function closeOverlay() {
    store.setSelectedState(false); // Make sure this action/mutation exists and works as expected
}

function navigateCards(event) {
    if (event.key === 'ArrowRight') {
        // Go to next card
        const nextIndex =
            selectedCardIndex.value + 1 < filteredCivilisations.value.length
                ? selectedCardIndex.value + 1
                : 0;
        selectedCard.value = filteredCivilisations.value[nextIndex].id;
    } else if (event.key === 'ArrowLeft') {
        // Go to previous card
        const prevIndex =
            selectedCardIndex.value - 1 >= 0
                ? selectedCardIndex.value - 1
                : filteredCivilisations.value.length - 1;
        selectedCard.value = filteredCivilisations.value[prevIndex].id;
    }
}
</script>

<style scoped>
.content-overlay {
    height: calc(100% - var(--header-height));
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.content {
    top: var(--header-height);
    z-index: 99;
    color: #fff;
    display: flex;
    /* align-items: center; */
}

.grid-container {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 2em;
}

@media (max-width: 1200px) {
    .grid-container {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 520px) {
    .grid-container {
        grid-template-columns: repeat(1, 1fr);
    }

    .content {
        padding-left: 4rem;
        padding-right: 4rem;
    }
}
</style>
../../stores/index
