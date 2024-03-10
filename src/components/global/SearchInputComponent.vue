<template>
    <input v-model="searchText" type="text" name="text"
        class="input bg-zinc-800 text-amber-500 border-amber-500 border-2 rounded-lg h-5" placeholder="Recherche"
        @change="updateSearchText">
</template>

<script setup>

// IMPORT
// ##############
import { ref } from 'vue';

// VARIABLES
// ##############
const searchText = ref(''); // Track the search text input by the user.

const emit = defineEmits(['update:searchText']);

// FUNCTIONS
// ##############
function updateSearchText() {
    emit('update:searchText', searchText.value);
}

</script>

<style scoped>
.input {
    padding: 10px 25px;
    max-width: 190px;
}

.input:active {
    box-shadow: 2px 2px 15px #8707ff inset;
}
</style>
