import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    root: resolve(__dirname, '..'),
    css: {
        postcss: resolve(__dirname, 'postcss.config.js'),
    },
    build: {
        outDir: resolve(__dirname, '../dist'),
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Séparer les composants lourds
                    'civilizations': [
                        './src/components/civilisations/MasterCardComponent.vue',
                        './src/components/civilisations/CivCardComponent.vue'
                    ],
                    'subcomponents': [
                        './src/components/civilisations/subcomponents/CivTierComponent.vue',
                        './src/components/civilisations/subcomponents/CivTagComponent.vue'
                    ],
                    'lazy-components': [
                        './src/components/global/LazyImageComponent.vue',
                        './src/components/global/LazyIconComponent.vue',
                        './src/components/global/TextWithIconsComponent.vue'
                    ],
                    // Séparer PrimeVue
                    'primevue': ['primevue/card', 'primevue/tag']
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
        },
    },
    // Optimisations pour le lazy loading
    optimizeDeps: {
        include: ['vue', 'pinia']
    }
});
