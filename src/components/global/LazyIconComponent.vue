<template>
    <span 
        ref="iconContainer" 
        class="lazy-icon-container"
        :class="{ 'loading': isLoading, 'error': hasError, 'loaded': isLoaded }"
    >
        <!-- Placeholder de chargement pour les icônes -->
        <span v-if="isLoading && !isLoaded" class="icon-placeholder">
            <div class="icon-spinner"></div>
        </span>
        
        <!-- Icône avec lazy loading -->
        <img
            v-show="isLoaded && !hasError"
            :src="iconSrc"
            :alt="alt"
            :class="iconClass"
            @load="onIconLoad"
            @error="onIconError"
            loading="lazy"
        />
        
        <!-- Fallback en cas d'erreur -->
        <span v-if="hasError" class="icon-error">
            {{ fallbackText }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Props {
    src: string;
    alt: string;
    iconClass?: string;
    fallbackText?: string;
    threshold?: number;
    rootMargin?: string;
}

const props = withDefaults(defineProps<Props>(), {
    iconClass: '',
    fallbackText: '⚡',
    threshold: 0.1,
    rootMargin: '20px'
});

// État du composant
const iconContainer = ref<HTMLElement>();
const iconSrc = ref<string>('');
const isLoading = ref(false);
const isLoaded = ref(false);
const hasError = ref(false);
const observer = ref<IntersectionObserver | null>(null);

// Méthodes
const onIconLoad = () => {
    isLoading.value = false;
    isLoaded.value = true;
    hasError.value = false;
};

const onIconError = () => {
    isLoading.value = false;
    isLoaded.value = false;
    hasError.value = true;
};

const loadIcon = () => {
    if (!props.src || hasError.value) return;
    
    isLoading.value = true;
    iconSrc.value = props.src;
};

const setupIntersectionObserver = () => {
    if (!iconContainer.value) return;

    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadIcon();
                    observer.value?.unobserve(entry.target);
                }
            });
        },
        {
            threshold: props.threshold,
            rootMargin: props.rootMargin
        }
    );

    observer.value.observe(iconContainer.value);
};

// Watchers
watch(() => props.src, (newSrc) => {
    if (newSrc && newSrc !== iconSrc.value) {
        // Reset state for new icon
        isLoading.value = false;
        isLoaded.value = false;
        hasError.value = false;
        iconSrc.value = '';
        
        // Setup observer again if needed
        if (observer.value && iconContainer.value) {
            observer.value.observe(iconContainer.value);
        }
    }
});

// Lifecycle
onMounted(() => {
    setupIntersectionObserver();
});

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
});
</script>

<style scoped>
.lazy-icon-container {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
}

.icon-placeholder {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
}

.icon-spinner {
    width: 12px;
    height: 12px;
    border: 1px solid #6b7280;
    border-top: 1px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.icon-error {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 12px;
    color: #ef4444;
}

img {
    display: inline;
    height: 16px;
    vertical-align: middle;
    max-width: none;
}

/* Transitions pour une meilleure UX */
.lazy-icon-container img {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.lazy-icon-container.loaded img {
    opacity: 1;
}
</style>