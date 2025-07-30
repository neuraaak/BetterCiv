<template>
    <div class="loading-component">
        <div class="loading-spinner"></div>
        <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    message?: string;
}

withDefaults(defineProps<Props>(), {
    message: 'Chargement...'
});
</script>

<style scoped>
.loading-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 100px;
}

.loading-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #374151;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
}

.loading-message {
    color: #9ca3af;
    font-size: 14px;
    margin: 0;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>