# 📚 Documentation BetterCiv5

Bienvenue dans la documentation du projet BetterCiv5. Cette section contient tous les guides et informations nécessaires pour comprendre, développer et déployer l'application.

## 📖 Guides disponibles

### 🚀 Déploiement
- **[README_DEPLOYMENT.md](./README_DEPLOYMENT.md)** - Guide rapide de déploiement sur Vercel
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Guide détaillé de déploiement

### 🎯 Configuration
- **[CSPELL_GUIDE.md](./CSPELL_GUIDE.md)** - Configuration et utilisation de cspell

## 🏗️ Architecture du projet

### Structure des dossiers
```
BetterCiv5/
├── src/
│   ├── components/          # Composants Vue
│   │   ├── civilisations/   # Composants liés aux civilisations
│   │   ├── global/          # Composants globaux
│   │   └── layout/          # Composants de mise en page
│   ├── stores/              # Stores Pinia
│   ├── assets/              # Assets statiques
│   ├── App.vue              # Composant principal
│   ├── main.js              # Point d'entrée
│   └── main.css             # Styles globaux
├── docs/                    # Documentation (ce dossier)
├── _temp/                   # Fichiers temporaires
├── public/                  # Assets publics
└── dist/                    # Build de production
```

### Technologies utilisées
- **Vue.js 3** - Framework frontend
- **Vite** - Build tool
- **Pinia** - State management
- **TailwindCSS** - Framework CSS
- **PrimeVue** - Composants UI
- **Vercel** - Déploiement

## 🔧 Configuration

### Variables d'environnement
```env
NODE_ENV=production
```

### Scripts npm
```bash
npm run dev          # Développement
npm run build        # Build production
npm run deploy       # Déploiement Vercel
npm run lint         # Linting
npm run spell        # Vérification orthographe
npm run clean        # Nettoyage
```

## 📝 Conventions

### Nommage
- **Composants** : PascalCase (ex: `CivilizationCard.vue`)
- **Fichiers** : kebab-case (ex: `civilization-data.js`)
- **Variables** : camelCase (ex: `civilizationName`)
- **Constantes** : UPPER_SNAKE_CASE (ex: `MAX_CIVILIZATIONS`)

### Structure des composants
```vue
<template>
  <!-- Template -->
</template>

<script setup>
// Imports
// Props
// Composables
// Computed
// Methods
</script>

<style scoped>
/* Styles */
</style>

## 🚨 Dépannage

### Problèmes courants
1. **Build échoue** : Vérifier les dépendances avec `npm install`
2. **Erreurs cspell** : Utiliser `npm run spell:fix`
3. **Déploiement échoue** : Vérifier la configuration Vercel

### Logs utiles
```bash
npm run build --verbose    # Build avec logs détaillés
vercel logs               # Logs de déploiement
```

## 🤝 Contribution

Voir le README principal pour les instructions de contribution.

---

*Documentation générée pour BetterCiv5 - Vue.js + Vite* 