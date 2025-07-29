<template>
    <Tag>
        <div class="font-sans font-light text-xs">
            <span
                class="bg-zinc-700 px-2 py-0.5 font-medium tracking-wider rounded-sm"
                :class="store.getTierPropertyById(tier_id, 'color')"
                >{{ store.getTierPropertyById(tier_id, 'label') }}</span
            >
        </div>
    </Tag>
</template>

<script setup>
/**
 * Civilization Tier Component - Displays civilization tier with styling
 * Uses translation store to get tier properties and colors
 */
// IMPORT
// ##############
import { translationStore } from '../../../stores/index';
import Tag from 'primevue/tag';

// VARIABLES
// ##############
const props = defineProps({
    tier_id: Number,
});

const store = translationStore();
</script>

<style scoped></style>
../../stores/index
