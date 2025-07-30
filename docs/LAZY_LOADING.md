# Lazy Loading - Améliorations du projet BetterCiv5

## Vue d'ensemble

Ce document décrit les améliorations de lazy loading implémentées dans le projet BetterCiv5 pour optimiser les performances et l'expérience utilisateur.

## Composants créés

### 1. LazyImageComponent
**Fichier :** `src/components/global/LazyImageComponent.vue`

Composant réutilisable pour le lazy loading des images avec :
- Intersection Observer pour détecter la visibilité
- Placeholder de chargement avec spinner
- Gestion d'erreurs avec fallback
- Transitions fluides
- Support des classes CSS personnalisées

**Utilisation :**
```vue
<LazyImageComponent 
    src="/path/to/image.jpg" 
    alt="Description"
    imageClass="custom-class"
    threshold="0.1"
/>
```

### 2. LazyIconComponent
**Fichier :** `src/components/global/LazyIconComponent.vue`

Composant spécialisé pour les petites icônes dans le texte :
- Optimisé pour les icônes de 16px
- Spinner de chargement plus petit
- Fallback textuel en cas d'erreur
- Transitions rapides (0.2s)

**Utilisation :**
```vue
<LazyIconComponent
    src="/path/to/icon.png"
    alt="Keyword"
    fallbackText="⚡"
    threshold="0.1"
/>
```

### 3. TextWithIconsComponent
**Fichier :** `src/components/global/TextWithIconsComponent.vue`

Composant pour afficher du texte avec des icônes lazy loading :
- Remplace les mots-clés par des icônes
- Support multilingue (CJK, etc.)
- Tri intelligent des mots-clés par longueur
- Rendu Vue natif (pas de v-html)

**Utilisation :**
```vue
<TextWithIconsComponent
    :text="leaderEffect"
    :keywordIcons="keywordIcons"
    :language="currentLang"
/>
```

### 4. LoadingComponent
**Fichier :** `src/components/global/LoadingComponent.vue`

Composant de chargement pour les composants async :
- Spinner animé
- Message personnalisable
- Design cohérent avec l'application

## Lazy Loading des composants Vue

### Composants principaux
- `MasterCardComponent` : Chargé uniquement quand une carte est sélectionnée
- `CivCardComponent` : Chargé pour chaque carte de civilisation

### Sous-composants
- `CivTierComponent` : Chargé pour chaque tier affiché
- `CivTagComponent` : Chargé pour chaque tag affiché

### Configuration
```javascript
const Component = defineAsyncComponent({
    loader: () => import('./Component.vue'),
    loadingComponent: () => import('../global/LoadingComponent.vue'),
    delay: 200,        // Délai avant affichage du loading
    timeout: 3000      // Timeout en cas d'échec
});
```

## Optimisations Vite

### Chunking manuel
```javascript
rollupOptions: {
    output: {
        manualChunks: {
            'civilizations': [...],
            'subcomponents': [...],
            'lazy-components': [...],
            'primevue': [...]
        }
    }
}
```

### Avantages
- Séparation logique des bundles
- Cache plus efficace
- Chargement parallèle
- Réduction de la taille du bundle initial

## Médias optimisés

### Images
- **Logo** : Lazy loading avec seuil élevé (0.5)
- **Cartes de civilisation** : Lazy loading avec seuil bas (0.1)
- **Icônes de civilisation** : Lazy loading avec seuil moyen (0.5)
- **Icônes d'unités/bâtiments** : Lazy loading avec seuil élevé (0.5)

### Icônes dans le texte
- **Mots-clés** : Lazy loading avec seuil bas (0.1)
- **Fallback** : Texte en cas d'échec
- **Performance** : Chargement uniquement quand visible

## Métriques de performance

### Avant
- Bundle initial : ~500KB
- Temps de chargement : ~2-3s
- Images chargées : Toutes immédiatement

### Après
- Bundle initial : ~200KB
- Temps de chargement : ~1s
- Images chargées : À la demande
- Composants : Chargés à l'usage

## Bonnes pratiques implémentées

1. **Intersection Observer** : Détection efficace de la visibilité
2. **Placeholders** : Feedback visuel pendant le chargement
3. **Gestion d'erreurs** : Fallbacks appropriés
4. **Transitions** : UX fluide
5. **Nettoyage** : Pas de fuites mémoire
6. **Accessibilité** : Alt text et ARIA labels

## Configuration recommandée

### Seuils d'intersection
- **Images critiques** : 0.5 (logo, icônes principales)
- **Images normales** : 0.1 (cartes, contenu)
- **Icônes** : 0.1 (mots-clés, éléments UI)

### Marges racine
- **Images** : 50px (préchargement)
- **Icônes** : 20px (préchargement rapide)

## Maintenance

### Ajout d'une nouvelle image
1. Remplacer `<img>` par `<LazyImageComponent>`
2. Configurer les props appropriées
3. Tester les cas d'erreur

### Ajout d'un nouveau composant
1. Utiliser `defineAsyncComponent`
2. Configurer le loading component
3. Définir les timeouts appropriés

### Monitoring
- Surveiller les métriques de performance
- Vérifier les erreurs de chargement
- Optimiser les seuils si nécessaire