<template>
    <Tag>
        <div class="font-sans font-light text-xs">
            <span class="bg-zinc-700 px-3 py-0.5 font-medium tracking-wider rounded-xl"
                :class="store.getTagPropertyById(tag_id, 'color')">{{
                    store.getTagPropertyById(tag_id, 'lib') }}</span>
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
    tag_id: Number,
});

const store = correspondanceStore()

</script>

<style scoped></style>
../../stores/index