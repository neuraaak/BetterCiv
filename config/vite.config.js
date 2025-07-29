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
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
        },
    },
});
