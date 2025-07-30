import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'
                ],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/eyefyre\.github\.io\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/.*\.githubusercontent\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'github-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                            }
                        }
                    }
                ]
            },
            manifest: {
                name: 'Better Civ5',
                short_name: 'BetterCiv5',
                description: 'Une application web moderne pour explorer et comparer les civilisations de Civilization V',
                theme_color: '#111010',
                background_color: '#111010',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/img/logo.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/img/logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            devOptions: {
                enabled: true,
                type: 'module'
            }
        })
    ],
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
