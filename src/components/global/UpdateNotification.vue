<template>
    <div
        v-if="showUpdateNotification"
        class="update-notification fixed top-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm"
        role="alert"
        aria-live="polite"
    >
        <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="flex-1">
                <h3 class="text-sm font-medium">
                    Mise à jour disponible
                </h3>
                <p class="mt-1 text-sm opacity-90">
                    Une nouvelle version de l'application est disponible.
                </p>
                <div class="mt-3 flex space-x-2">
                    <button
                        @click="handleUpdate"
                        class="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
                        :disabled="isUpdating"
                    >
                        {{ isUpdating ? 'Mise à jour...' : 'Mettre à jour' }}
                    </button>
                    <button
                        @click="dismissNotification"
                        class="text-white opacity-75 hover:opacity-100 text-sm transition-opacity"
                    >
                        Plus tard
                    </button>
                </div>
            </div>
            <button
                @click="dismissNotification"
                class="flex-shrink-0 text-white opacity-75 hover:opacity-100 transition-opacity"
                aria-label="Fermer la notification"
            >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
    updateAvailable: boolean;
    onUpdate: () => Promise<void>;
}

const props = defineProps<Props>();

const showNotification = ref(false);
const isUpdating = ref(false);
const dismissed = ref(false);

const showUpdateNotification = computed(() => {
    return props.updateAvailable && showNotification.value && !dismissed.value;
});

// Afficher la notification après un délai
watch(() => props.updateAvailable, (newValue) => {
    if (newValue && !dismissed.value) {
        setTimeout(() => {
            showNotification.value = true;
        }, 2000); // Délai de 2 secondes
    }
});

const handleUpdate = async () => {
    isUpdating.value = true;
    try {
        await props.onUpdate();
        showNotification.value = false;
    } catch (error) {
        console.error('Update failed:', error);
    } finally {
        isUpdating.value = false;
    }
};

const dismissNotification = () => {
    showNotification.value = false;
    dismissed.value = true;
    
    // Réinitialiser après 1 heure
    setTimeout(() => {
        dismissed.value = false;
    }, 60 * 60 * 1000);
};
</script>

<style scoped>
.update-notification {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>