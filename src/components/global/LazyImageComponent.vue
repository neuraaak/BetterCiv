<template>
    <div 
        ref="imageContainer" 
        class="lazy-image-container"
        :class="{ 'loading': isLoading, 'error': hasError, 'loaded': isLoaded }"
    >
        <!-- Placeholder de chargement -->
        <div v-if="isLoading && !isLoaded" class="image-placeholder">
            <div class="loading-spinner"></div>
        </div>
        
        <!-- Image avec lazy loading -->
        <img
            v-show="isLoaded && !hasError"
            :src="imageSrc"
            :alt="alt"
            :class="imageClass"
            @load="onImageLoad"
            @error="onImageError"
            loading="lazy"
        />
        
        <!-- Fallback en cas d'erreur -->
        <div v-if="hasError" class="image-error">
            <div class="error-icon">⚠️</div>
            <span class="error-text">{{ errorText }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Props {
    src: string;
    alt: string;
    imageClass?: string;
    placeholderClass?: string;
    errorText?: string;
    threshold?: number;
    rootMargin?: string;
}

const props = withDefaults(defineProps<Props>(), {
    imageClass: '',
    placeholderClass: '',
    errorText: 'Image non disponible',
    threshold: 0.1,
    rootMargin: '50px'
});

// État du composant
const imageContainer = ref<HTMLElement>();
const imageSrc = ref<string>('');
const isLoading = ref(false);
const isLoaded = ref(false);
const hasError = ref(false);
const observer = ref<IntersectionObserver | null>(null);

// Méthodes
const onImageLoad = () => {
    isLoading.value = false;
    isLoaded.value = true;
    hasError.value = false;
};

const onImageError = () => {
    isLoading.value = false;
    isLoaded.value = false;
    hasError.value = true;
};

const loadImage = () => {
    if (!props.src || hasError.value) return;
    
    isLoading.value = true;
    imageSrc.value = props.src;
};

const setupIntersectionObserver = () => {
    if (!imageContainer.value) return;

    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage();
                    observer.value?.unobserve(entry.target);
                }
            });
        },
        {
            threshold: props.threshold,
            rootMargin: props.rootMargin
        }
    );

    observer.value.observe(imageContainer.value);
};

// Watchers
watch(() => props.src, (newSrc) => {
    if (newSrc && newSrc !== imageSrc.value) {
        // Reset state for new image
        isLoading.value = false;
        isLoaded.value = false;
        hasError.value = false;
        imageSrc.value = '';
        
        // Setup observer again if needed
        if (observer.value && imageContainer.value) {
            observer.value.observe(imageContainer.value);
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
.lazy-image-container {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #374151;
    color: #9ca3af;
    min-height: 50px;
    min-width: 50px;
}

.loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #6b7280;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.image-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1f2937;
    color: #ef4444;
    min-height: 50px;
    min-width: 50px;
    padding: 8px;
}

.error-icon {
    font-size: 16px;
    margin-bottom: 4px;
}

.error-text {
    font-size: 12px;
    text-align: center;
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}

/* Transitions pour une meilleure UX */
.lazy-image-container img {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.lazy-image-container.loaded img {
    opacity: 1;
}
</style>