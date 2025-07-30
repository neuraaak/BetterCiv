/**
 * Service Worker pour BetterCiv5 - Compatible Vercel
 * Gestion du cache, des mises à jour et de la performance
 */

const CACHE_NAME = 'betterciv5-v1.2.0';
const STATIC_CACHE = 'betterciv5-static-v1.2.0';
const API_CACHE = 'betterciv5-api-v1.2.0';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/img/logo.png',
    '/img/card-cover2.jpg',
    '/img/favicon.ico'
];

// Patterns pour les ressources externes
const API_PATTERNS = [
    /^https:\/\/eyefyre\.github\.io\/.*/i,
    /^https:\/\/.*\.githubusercontent\.com\/.*/i
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    
    event.waitUntil(
        Promise.all([
            // Cache des ressources statiques
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Cache des ressources de l'API
            caches.open(API_CACHE).then((cache) => {
                console.log('[SW] API cache ready');
                return cache;
            })
        ]).then(() => {
            console.log('[SW] Service Worker installed successfully');
            return self.skipWaiting();
        })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Supprimer les anciens caches
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== API_CACHE && 
                        cacheName.startsWith('betterciv5-')) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Gestion des ressources statiques
    if (url.origin === self.location.origin) {
        event.respondWith(handleStaticAssets(request));
        return;
    }
    
    // Gestion des requêtes API
    if (API_PATTERNS.some(pattern => pattern.test(request.url))) {
        event.respondWith(handleApiRequest(request));
        return;
    }
    
    // Fallback pour les autres requêtes
    event.respondWith(fetch(request));
});

// Gestion des ressources statiques
async function handleStaticAssets(request) {
    try {
        // Essayer le cache d'abord
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Sinon, faire la requête réseau
        const networkResponse = await fetch(request);
        
        // Mettre en cache si la requête réussit
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Error handling static asset:', error);
        
        // Fallback pour les pages HTML
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

// Gestion des requêtes API
async function handleApiRequest(request) {
    try {
        // Essayer le cache d'abord
        const cache = await caches.open(API_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Vérifier si le cache est encore valide (7 jours)
            const cacheDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            const now = new Date();
            const cacheAge = now.getTime() - cacheDate.getTime();
            const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
            
            if (cacheAge < maxAge) {
                console.log('[SW] Serving from API cache:', request.url);
                return cachedResponse;
            }
        }
        
        // Faire la requête réseau
        const networkResponse = await fetch(request);
        
        // Mettre en cache si la requête réussit
        if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cache-date', new Date().toISOString());
            
            const cachedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
            });
            
            cache.put(request, cachedResponse);
            console.log('[SW] Cached API response:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Error handling API request:', error);
        
        // Retourner la réponse en cache si disponible
        const cache = await caches.open(API_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('[SW] Serving stale API response:', request.url);
            return cachedResponse;
        }
        
        throw error;
    }
}

// Gestion des messages
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Gestion des erreurs
self.addEventListener('error', (event) => {
    console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW] Unhandled promise rejection:', event.reason);
});