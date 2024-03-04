<script setup>

// IMPORT
// ##############
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { correspondanceStore } from './stores/index';
import HeaderComponent from './components/HeaderComponent.vue';
import ContentComponent from './components/ContentComponent.vue';

// VARIABLES
// ##############
const store = correspondanceStore();
//
const civ_data = ref([]);
const civ_tiers_and_tags = ref([
  { "id": 1, "tags_id": [5, 6], "tier_id": 1 }, // 'Amérique'
  { "id": 2, "tags_id": [5, 2], "tier_id": 0 }, // 'Arabie'
  { "id": 3, "tags_id": [6, 1], "tier_id": 2 }, // 'Aztèques'
  { "id": 4, "tags_id": [6], "tier_id": 2 }, // 'Chine'
  { "id": 5, "tags_id": [4], "tier_id": 2 }, // 'Égypte'
  { "id": 6, "tags_id": [6], "tier_id": 1 }, // 'Angleterre'
  { "id": 7, "tags_id": [1], "tier_id": 4 }, // 'France'
  { "id": 8, "tags_id": [6, 5], "tier_id": 1 }, // 'Allemagne'
  { "id": 9, "tags_id": [0], "tier_id": 1 }, // 'Grèce'
  { "id": 10, "tags_id": [0], "tier_id": 4 }, // 'Inde'
  { "id": 11, "tags_id": [0], "tier_id": 4 }, // 'Iroquois'
  { "id": 12, "tags_id": [6, 1], "tier_id": 3 }, // 'Japon'
  { "id": 13, "tags_id": [6], "tier_id": 3 }, // 'Ottomans'
  { "id": 14, "tags_id": [0], "tier_id": 0 }, // 'Perse'
  { "id": 15, "tags_id": [4], "tier_id": 4 }, // 'Rome'
  { "id": 16, "tags_id": [4], "tier_id": 2 }, // 'Russie'
  { "id": 17, "tags_id": [0], "tier_id": 3 }, // 'Siam'
  { "id": 18, "tags_id": [6], "tier_id": 1 }, // 'Songhaï'
  { "id": 19, "tags_id": [6], "tier_id": 1 }, // 'Mongolie'
  { "id": 20, "tags_id": [0], "tier_id": 1 }, // 'Incas'
  { "id": 21, "tags_id": [1], "tier_id": 2 }, // 'Espagne'
  { "id": 22, "tags_id": [6], "tier_id": 2 }, // 'Polynésie'
  { "id": 23, "tags_id": [6], "tier_id": 2 }, // 'Danemark'
  { "id": 24, "tags_id": [3], "tier_id": 0 }, // 'Corée'
  { "id": 25, "tags_id": [3], "tier_id": 0 }, // 'Babylone'
  { "id": 26, "tags_id": [0], "tier_id": 3 }, // 'Autriche'
  { "id": 27, "tags_id": [2], "tier_id": 4 }, // 'Byzance'
  { "id": 28, "tags_id": [0], "tier_id": 4 }, // 'Carthage'
  { "id": 29, "tags_id": [2], "tier_id": 2 }, // 'Celtes'
  { "id": 30, "tags_id": [6], "tier_id": 2 }, // 'Éthiopie'
  { "id": 31, "tags_id": [6, 4], "tier_id": 1 }, // 'Huns'
  { "id": 32, "tags_id": [0], "tier_id": 1 }, // 'Mayas'
  { "id": 33, "tags_id": [0], "tier_id": 2 }, // 'Pays-Bas'
  { "id": 34, "tags_id": [0], "tier_id": 2 }, // 'Suède'
  { "id": 35, "tags_id": [3], "tier_id": 3 }, // 'Assyrie'
  { "id": 36, "tags_id": [1], "tier_id": 2 }, // 'Brésil'
  { "id": 37, "tags_id": [0], "tier_id": 4 }, // 'Indonésie'
  { "id": 38, "tags_id": [5, 1], "tier_id": 2 }, // 'Maroc'
  { "id": 39, "tags_id": [0], "tier_id": 0 }, // 'Pologne'
  { "id": 40, "tags_id": [5], "tier_id": 4 }, // 'Portugal'
  { "id": 41, "tags_id": [0], "tier_id": 2 }, // 'Shoshones'
  { "id": 42, "tags_id": [5], "tier_id": 1 }, // 'Venise'
  { "id": 43, "tags_id": [6], "tier_id": 0 }, // 'Zoulous'
]);

// COMPUTED
// ##############
const fetchUrl = computed(() => `https://eyefyre.github.io/civvapi/v1/${store.getLanguage}/civilizations/civilizations.json`);

// WATCHER
// ##############
watch(() => store.getLanguage, (newLanguage, oldLanguage) => {
  // Appelle fetchCivilizations chaque fois que la langue change
  fetchCivilizations();
}, { immediate: true }); // { immediate: true } assure que fetchCivilizations est appelé au montage du composant

// HOOKS
// ##############
onMounted(() => {
  document.title = "Better Civ5";
  document.documentElement.lang = 'fr';
  window.addEventListener('mousemove', movingBackground);
  fetchCivilizations();
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', movingBackground);
});

// FUNCTIONS
// ##############
function movingBackground(event) {
  const { clientX, clientY } = event;
  const largeurEcran = window.innerWidth;
  const hauteurEcran = window.innerHeight;

  // Réduit le mouvement à 10% de la position de la souris et inverse le sens
  const positionX = 50 - (clientX / largeurEcran * 2);
  const positionY = 50 - (clientY / hauteurEcran * 2);

  document.body.style.backgroundPosition = `${positionX}% ${positionY}%`;
};

async function fetchCivilizations() {
  try {
    const response = await fetch(fetchUrl.value);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    civ_data.value = mergeCivilizationData(data);
    // console.log(civ_data.value)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

function mergeCivilizationData(civilizations) {
  return civilizations.map(civ => {
    // Trouve l'objet correspondant dans additionalData
    let additionalInfo = civ_tiers_and_tags.value.find(addCiv => addCiv.id === civ.id);

    // Si trouvé, ajoute les nouvelles propriétés à l'objet civ
    if (additionalInfo) {
      return { ...civ, tags_id: additionalInfo.tags_id, tier_id: additionalInfo.tier_id };
    }

    // Si non trouvé, retourne l'objet civ sans modifications
    return civ;
  });
};

</script>

<template>
  <HeaderComponent class="fixed" />
  <ContentComponent :civilisations="civ_data" />
</template>
