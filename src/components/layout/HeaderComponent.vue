<template>
  <header class="header flex flex-row">
    <div class="flex grow justify-center w-full ml-20">
      <img src="/img/logo.png" alt="Logo" class="logo" />
    </div>
    <SelectLanguageComponent class="mr-8" />
  </header>
</template>

<script setup>
/**
 * Header Component - Top navigation bar with logo and language selector
 */
// IMPORT
// ##############
import SelectLanguageComponent from "../global/SelectLanguageComponent.vue";
</script>

<style scoped>
.header {
  z-index: 100;
  width: 100%;
  height: var(--header-height);
  background-color: #0a0a0a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* Added to align content to the left */
  /* padding: 0 20px; */
}

.logo {
  height: calc(var(--header-height) * 0.8);
  width: auto;
}

nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 15px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
