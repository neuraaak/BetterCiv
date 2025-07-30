# 🏛️ BetterCiv5

[![Repository](https://img.shields.io/badge/Repository-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/neuraaak/BetterCiv5)
[![Version](https://img.shields.io/badge/Version-1.1.0-green?style=for-the-badge)](https://github.com/neuraaak/BetterCiv5/releases)
[![Tests](https://img.shields.io/badge/Tests-passing-green?style=for-the-badge&logo=jest)](https://github.com/neuraaak/BetterCiv5/actions)

A modern web application for exploring and comparing Civilization V civilizations, built with Vue.js 3 and Vite.

## 📦 **Installation**

```bash
# Clone the repository
git clone https://github.com/neuraaak/BetterCiv5.git
cd BetterCiv5

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 **Quick Start**

```javascript
// After installation, the app will be available at http://localhost:5173
// The main application automatically loads with:
// - Civilization exploration interface
// - Search and autocomplete functionality
// - Tag-based filtering system
// - Tier visualization

// Example: Access the main civilization store
import { useCivilizationStore } from './src/stores/index.js';

const store = useCivilizationStore();
const civilizations = store.civilizations;
```

## 📚 **Documentation**

- **[📖 Complete Documentation](docs/README.md)** - Main documentation guide
- **[🎯 API Reference](docs/api/README.md)** - Complete API documentation
- **[🎨 Style Guide](docs/style/README.md)** - Styling and customization guide
- **[🧪 Tests](docs/tests/README.md)** - Test documentation and execution guide
- **[📋 Changelog](CHANGELOG.md)** - Version history

## 🎯 **Available Features**

### 🏛️ **Civilization Management (Core Features)**

- **Civilization Explorer** - Browse all Civilization V civilizations
- **Search & Autocomplete** - Real-time search with civilization name suggestions
- **Reset Functionality** - Quick search field clearing
- **Tag System** - Filter civilizations by characteristics and specialties

### 🎨 **UI Components (4 categories)**

- **Layout Components** - Header, navigation, and layout management
- **Global Components** - Reusable UI elements and utilities
- **Civilization Components** - Civilization-specific display components
- **Form Components** - Input fields, selectors, and form controls

### 📊 **Data Management (3 systems)**

- **Pinia Store** - Centralized state management
- **Type Definitions** - TypeScript interfaces and types
- **Translation System** - Multi-language support (FR/EN)

## ✨ **Features**

- **✅ Vue.js 3 Compatibility** - Built with Vue 3 Composition API
- **✅ TypeScript Support** - Complete type annotation support
- **✅ Responsive Design** - Mobile-friendly interface with TailwindCSS
- **✅ Modern Build System** - Vite for fast development and building
- **✅ State Management** - Pinia for reactive state management
- **✅ UI Framework** - PrimeVue components with PrimeIcons
- **✅ Search System** - Advanced search with autocomplete functionality
- **✅ Code Quality** - ESLint, Prettier, and cSpell configuration

## 🧪 Tests

Le projet utilise **Vitest** pour les tests unitaires avec une couverture complète des composants et de la logique métier.

### Structure des tests

```
tests/
├── setup.ts                    # Configuration globale des tests
├── unit/                       # Tests unitaires
│   ├── types.test.ts          # Tests des types TypeScript
│   ├── stores.test.ts         # Tests du store Pinia
│   ├── main.test.ts           # Tests du point d'entrée
│   └── components/            # Tests des composants
│       ├── SelectLanguageComponent.test.ts
│       └── SearchInputComponent.test.ts
├── integration/               # Tests d'intégration
│   └── app.test.ts           # Tests de l'application complète
└── utils/                     # Utilitaires de test
    └── test-helpers.ts       # Helpers et mocks
```

### Commandes de test

```bash
# Lancer les tests en mode watch
yarn test

# Lancer les tests avec interface graphique
yarn test:ui

# Exécuter tous les tests une fois
yarn test:run

# Générer un rapport de couverture
yarn test:coverage

# Lancer les tests en mode watch
yarn test:watch
```

### Couverture des tests

Les tests couvrent :

- ✅ **Types TypeScript** : Validation de la structure des interfaces
- ✅ **Store Pinia** : Getters, actions et état
- ✅ **Composants Vue** : Rendu, props, événements, interactions utilisateur
- ✅ **Intégration** : Fonctionnement global de l'application
- ✅ **Utilitaires** : Helpers et mocks pour faciliter les tests

### Exécution des tests

```bash
# Tests unitaires uniquement
yarn test:run --reporter=verbose

# Tests avec couverture détaillée
yarn test:coverage --reporter=html

# Tests spécifiques
yarn test:run stores.test.ts
```

## 🔧 **Development**

### **Project Structure**

```
BetterCiv5/
├── README.md                    # This file
├── docs/                        # Documentation
│   ├── README.md               # Documentation index
│   ├── api/                    # API documentation
│   └── tests/                  # Test documentation
├── src/                        # Source code
│   ├── components/             # Vue components
│   │   ├── layout/            # Layout components
│   │   ├── global/            # Global components
│   │   └── civilisations/     # Civilization components
│   ├── stores/                # Pinia stores
│   ├── types/                 # TypeScript definitions
│   ├── assets/                # Static assets
│   ├── App.vue                # Main application component
│   ├── main.js                # Application entry point
│   └── main.css               # Global styles
├── config/                     # Configuration files
├── public/                     # Public assets
├── dist/                       # Build output
└── package.json                # Project configuration
```

### **Development Installation**

```bash
git clone https://github.com/neuraaak/BetterCiv5.git
cd BetterCiv5
npm install
npm run dev

# Verify installation
# Open http://localhost:5173 in your browser
```

## 📄 **License**

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**BetterCiv5** - Explore civilizations like never before! 🏛️⚔️
