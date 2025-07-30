<template>
  <Tag>
    <div class="font-sans font-light text-xs">
      <span
        class="bg-zinc-700 px-3 py-0.5 font-medium tracking-wider rounded-xl"
        :class="store.getTagPropertyById(tag_id, 'color')"
        >{{ store.getTagPropertyById(tag_id, "label") }}</span
      >
    </div>
  </Tag>
</template>

<script setup>
/**
 * Civilization Tag Component - Displays civilization tags with styling
 * Uses translation store to get tag properties and colors
 */
// IMPORT
// ##############
import { translationStore } from "../../../stores/index";
import Tag from "primevue/tag";

// VARIABLES
// ##############
const props = defineProps({
  tag_id: Number,
});

const store = translationStore();
</script>

<style scoped></style>
../../stores/index
