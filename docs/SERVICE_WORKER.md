# Service Worker - BetterCiv5

## Vue d'ensemble

Le Service Worker de BetterCiv5 est spécialement conçu pour être compatible avec Vercel et offre des fonctionnalités avancées de cache, de mise à jour et de performance.

## 🔧 **Configuration Vercel**

### Fichier `vercel.json`
```json
{
  "routes": [
    {
      "src": "/sw.js",
      "dest": "/sw.js",
      "headers": {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Service-Worker-Allowed": "/"
      }
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

### Points clés pour Vercel :
- ✅ **Cache-Control** : `max-age=0, must-revalidate` pour forcer la mise à jour
- ✅ **Service-Worker-Allowed** : `/` pour permettre le contrôle de toute l'app
- ✅ **Headers** : Configuration spécifique pour les fichiers SW

## 📦 **Installation et configuration**

### Dépendances
```bash
npm install vite-plugin-pwa workbox-window --save-dev
```

### Configuration Vite
```javascript
// config/vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/eyefyre\.github\.io\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 jours
              }
            }
          }
        ]
      }
    })
  ]
});
```

## 🚀 **Fonctionnalités**

### 1. **Cache intelligent**
- **Cache statique** : Ressources de base (HTML, CSS, JS, images)
- **Cache API** : Données de l'API avec expiration de 7 jours
- **Cache GitHub** : Images et ressources externes (30 jours)

### 2. **Gestion des mises à jour**
- ✅ Détection automatique des nouvelles versions
- ✅ Notification utilisateur
- ✅ Installation en arrière-plan
- ✅ Gestion des erreurs

### 3. **Mode hors ligne**
- ✅ Fonctionnement sans connexion
- ✅ Cache des données essentielles
- ✅ Indicateur visuel de statut

### 4. **Performance**
- ✅ Chargement rapide des ressources en cache
- ✅ Optimisation des requêtes réseau
- ✅ Gestion intelligente du cache

## 📁 **Structure des fichiers**

```
public/
├── sw.js                    # Service Worker principal
src/
├── composables/
│   └── useServiceWorker.ts  # Composable Vue pour SW
├── components/global/
│   └── UpdateNotification.vue # Notification de mise à jour
```

## 🔄 **Cycle de vie du Service Worker**

### 1. **Installation**
```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(API_CACHE).then(cache => cache)
    ])
  );
});
```

### 2. **Activation**
```javascript
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('betterciv5-'))
          .map(name => caches.delete(name))
      );
    })
  );
});
```

### 3. **Interception des requêtes**
```javascript
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.method !== 'GET') return;
  
  if (url.origin === self.location.origin) {
    event.respondWith(handleStaticAssets(request));
  } else if (API_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(handleApiRequest(request));
  }
});
```

## 🛠️ **Utilisation dans Vue**

### Composable `useServiceWorker`
```typescript
import { useServiceWorker } from './composables/useServiceWorker';

const { state, updateAvailable, installUpdate } = useServiceWorker();
```

### État du Service Worker
```typescript
interface ServiceWorkerState {
  isSupported: boolean;    // Support du navigateur
  isInstalled: boolean;    // SW installé
  isUpdated: boolean;      // Mise à jour disponible
  isOffline: boolean;      // Mode hors ligne
  version: string;         // Version actuelle
}
```

### Méthodes disponibles
- `registerServiceWorker()` : Enregistrer le SW
- `updateServiceWorker()` : Vérifier les mises à jour
- `installUpdate()` : Installer la mise à jour
- `clearCache()` : Nettoyer le cache
- `getCacheStats()` : Statistiques du cache

## 📊 **Cache et performance**

### Stratégies de cache
1. **CacheFirst** : Pour les ressources statiques
2. **NetworkFirst** : Pour les données API
3. **StaleWhileRevalidate** : Pour les ressources critiques

### Optimisations
- ✅ Cache intelligent avec expiration
- ✅ Compression des ressources
- ✅ Préchargement des assets critiques
- ✅ Gestion des erreurs réseau

## 🔒 **Sécurité**

### Headers de sécurité
```html
<meta http-equiv="Content-Security-Policy" content="...">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
```

### Validation des requêtes
- ✅ Vérification des origines
- ✅ Validation des URLs
- ✅ Gestion des erreurs

## 🧪 **Tests et débogage**

### Outils de développement
1. **Chrome DevTools** : Onglet Application > Service Workers
2. **Console** : Logs détaillés du SW
3. **Network** : Vérification du cache

### Commandes utiles
```javascript
// Vérifier l'état du SW
navigator.serviceWorker.getRegistrations()

// Nettoyer le cache
caches.keys().then(names => names.forEach(name => caches.delete(name)))

// Forcer la mise à jour
navigator.serviceWorker.getRegistration().then(reg => reg.update())
```

## 🚨 **Dépannage**

### Problèmes courants
1. **SW ne s'installe pas** : Vérifier les headers Vercel
2. **Cache obsolète** : Nettoyer le cache navigateur
3. **Mises à jour bloquées** : Vérifier la stratégie de cache

### Solutions
- ✅ Vérifier la configuration Vercel
- ✅ Nettoyer le cache manuellement
- ✅ Redémarrer le navigateur
- ✅ Vérifier les logs d'erreur

## 📈 **Métriques et monitoring**

### Métriques importantes
- Taux de cache hit/miss
- Temps de chargement
- Taille du cache
- Fréquence des mises à jour

### Monitoring
```typescript
// Statistiques du cache
const stats = await getCacheStats();
console.log('Cache stats:', stats);

// État du SW
console.log('SW state:', swState);
```

## 🔄 **Mise à jour et maintenance**

### Versioning
- ✅ Version dans le nom du cache
- ✅ Gestion des anciens caches
- ✅ Mise à jour automatique

### Maintenance
1. Surveiller la taille du cache
2. Nettoyer les anciennes versions
3. Optimiser les stratégies de cache
4. Tester les mises à jour

Le Service Worker de BetterCiv5 offre une expérience utilisateur optimale avec un cache intelligent, des mises à jour fluides et une compatibilité parfaite avec Vercel ! 🚀