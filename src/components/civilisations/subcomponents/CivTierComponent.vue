<template>
    <Tag>
        <div class="font-sans font-light text-xs">
            <span class="bg-zinc-700 px-2 py-0.5 font-medium tracking-wider rounded-sm"
                :class="store.getTierPropertyById(tier_id, 'color')">{{
                    store.getTierPropertyById(tier_id, 'lib') }}</span>
        </div>
    </Tag>
</template>

<script setup>

// IMPORT
// ##############
// import {  } from 'vue';
import { correspondanceStore } from '../../../stores/index';
import Tag from 'primevue/tag';

// VARIABLES
// ##############
const props = defineProps({
    tier_id: Number,
});

const store = correspondanceStore()

</script>

<style scoped></style>../../stores/index
