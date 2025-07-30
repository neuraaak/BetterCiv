import { ref, onMounted, onUnmounted } from 'vue';

interface ServiceWorkerState {
    isSupported: boolean;
    isInstalled: boolean;
    isUpdated: boolean;
    isOffline: boolean;
    version: string;
}

export function useServiceWorker() {
    const state = ref<ServiceWorkerState>({
        isSupported: false,
        isInstalled: false,
        isUpdated: false,
        isOffline: false,
        version: ''
    });

    const registration = ref<ServiceWorkerRegistration | null>(null);
    const updateAvailable = ref(false);

    // Vérifier si le Service Worker est supporté
    const checkSupport = () => {
        state.value.isSupported = 'serviceWorker' in navigator;
        state.value.isOffline = !navigator.onLine;
    };

    // Enregistrer le Service Worker
    const registerServiceWorker = async () => {
        if (!state.value.isSupported) {
            console.warn('[SW] Service Worker not supported');
            return;
        }

        try {
            registration.value = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none'
            });

            state.value.isInstalled = true;
            console.log('[SW] Service Worker registered:', registration.value);

            // Écouter les mises à jour
            registration.value.addEventListener('updatefound', () => {
                console.log('[SW] Update found');
                updateAvailable.value = true;
            });

            // Écouter les changements d'état
            registration.value.addEventListener('controllerchange', () => {
                console.log('[SW] Controller changed');
                state.value.isUpdated = true;
                updateAvailable.value = false;
            });

        } catch (error) {
            console.error('[SW] Registration failed:', error);
        }
    };

    // Forcer la mise à jour
    const updateServiceWorker = async () => {
        if (!registration.value) return;

        try {
            await registration.value.update();
            console.log('[SW] Update requested');
        } catch (error) {
            console.error('[SW] Update failed:', error);
        }
    };

    // Installer la mise à jour
    const installUpdate = async () => {
        if (!registration.value || !registration.value.waiting) return;

        try {
            registration.value.waiting.postMessage({ type: 'SKIP_WAITING' });
            console.log('[SW] Update installation requested');
        } catch (error) {
            console.error('[SW] Update installation failed:', error);
        }
    };

    // Obtenir la version du Service Worker
    const getVersion = async () => {
        if (!registration.value || !registration.value.active) return;

        try {
            const channel = new MessageChannel();
            channel.port1.onmessage = (event) => {
                if (event.data && event.data.version) {
                    state.value.version = event.data.version;
                }
            };

            registration.value.active.postMessage(
                { type: 'GET_VERSION' },
                [channel.port2]
            );
        } catch (error) {
            console.error('[SW] Version check failed:', error);
        }
    };

    // Gérer les changements de connectivité
    const handleOnline = () => {
        state.value.isOffline = false;
        console.log('[SW] Back online');
    };

    const handleOffline = () => {
        state.value.isOffline = true;
        console.log('[SW] Gone offline');
    };

    // Nettoyer le cache
    const clearCache = async () => {
        if (!state.value.isSupported) return;

        try {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames
                    .filter(name => name.startsWith('betterciv5-'))
                    .map(name => caches.delete(name))
            );
            console.log('[SW] Cache cleared');
        } catch (error) {
            console.error('[SW] Cache clearing failed:', error);
        }
    };

    // Obtenir les statistiques du cache
    const getCacheStats = async () => {
        if (!state.value.isSupported) return {};

        try {
            const cacheNames = await caches.keys();
            const stats: Record<string, number> = {};

            for (const cacheName of cacheNames) {
                if (cacheName.startsWith('betterciv5-')) {
                    const cache = await caches.open(cacheName);
                    const keys = await cache.keys();
                    stats[cacheName] = keys.length;
                }
            }

            return stats;
        } catch (error) {
            console.error('[SW] Cache stats failed:', error);
            return {};
        }
    };

    // Lifecycle
    onMounted(() => {
        checkSupport();
        registerServiceWorker();

        // Écouter les changements de connectivité
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    });

    onUnmounted(() => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    });

    return {
        state: state.value,
        updateAvailable,
        registerServiceWorker,
        updateServiceWorker,
        installUpdate,
        getVersion,
        clearCache,
        getCacheStats
    };
}