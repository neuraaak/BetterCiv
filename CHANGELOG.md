# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2025-07-30

> **Related Commits**: [`9b4f8a0`](https://github.com/neuraaak/BetterCiv5/commit/9b4f8a0) - Tailwind CSS v4 upgrade

### 🚀 Tailwind CSS v4 Major Upgrade

| Feature                    | Description                                                    | Impact                                           |
| -------------------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| **Tailwind CSS v4.1.11**  | Upgraded from v3.4.17 to latest v4.1.11                       | Improved performance and new features            |
| **New CSS Engine**         | Replaced PostCSS with native CSS engine                        | 10x faster CSS generation                        |
| **CSS Nesting Support**    | Native support for CSS nesting rules                           | More powerful and intuitive CSS writing          |
| **Container Queries**      | Native support for container queries                           | Better responsive design capabilities            |
| **Enhanced Colors**        | Extended color palette with improved color system              | More design options and better color management  |

### 🛠️ Technical Implementation

| Component                    | Feature                    | Description                                           |
| ---------------------------- | -------------------------- | ----------------------------------------------------- |
| **PostCSS Integration**     | @tailwindcss/postcss       | New PostCSS plugin for Tailwind CSS v4 compatibility |
| **Configuration Update**    | tailwind.config.js         | Updated configuration for v4 syntax and features     |
| **CSS Imports**             | @import syntax             | New import syntax for Tailwind CSS v4               |
| **Custom Plugin Migration** | .bg-rainbow utility        | Migrated custom plugin to new v4 syntax             |

### 🎯 Benefits

| Benefit                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| **Performance Boost**      | 10x faster CSS generation and build times                   |
| **Modern CSS Features**    | Native CSS nesting and container queries support            |
| **Better Developer UX**    | Improved configuration syntax and error messages           |
| **Future-Proof**           | Latest Tailwind CSS features and long-term support         |
| **Enhanced Styling**       | Extended color palette and improved utility classes        |

### 📁 Files Modified

| File                        | Changes                                    | Impact                           |
| --------------------------- | ------------------------------------------ | -------------------------------- |
| `package.json`              | Updated Tailwind CSS to v4.1.11           | Latest version with new features |
| `tailwind.config.js`        | Updated configuration for v4 syntax        | New configuration format         |
| `src/main.css`              | Updated imports to use new @import syntax  | New CSS import system            |
| `config/postcss.config.js`  | Added @tailwindcss/postcss plugin          | PostCSS compatibility            |

### 🔧 Breaking Changes

| Change                     | Description                                    | Migration Required               |
| -------------------------- | ---------------------------------------------- | ------------------------------- |
| **PostCSS Plugin**         | Moved to separate @tailwindcss/postcss package | Install new package             |
| **CSS Imports**            | Changed from @tailwind to @import syntax      | Update import statements        |
| **Configuration Syntax**   | Updated plugin syntax for v4 compatibility    | Update custom plugins           |

---

## [1.1.0] - 2025-07-30

> **Related Commits**: [`1601d04`](https://github.com/neuraaak/BetterCiv5/commit/1601d047b896361f29ae1db95241685daa229276) - Component reorganization

### 🎯 Search & Autocomplete System Enhancement

| Feature                 | Description                                                         | Impact                                              |
| ----------------------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| **Autocomplete Search** | Implemented search functionality with civilization name suggestions | Enhanced user experience with real-time suggestions |
| **Reset Button**        | Added clear button to search input field                            | Improved usability for quick search reset           |
| **Search Integration**  | Enhanced search component with civilization data props              | Better search accuracy and functionality            |

### 🛠️ Technical Implementation

| Component                | Feature                    | Description                                                     |
| ------------------------ | -------------------------- | --------------------------------------------------------------- |
| **SearchInputComponent** | Autocomplete functionality | Real-time suggestions based on civilization names with dropdown |
| **SearchInputComponent** | Reset button               | Clear search functionality with visual feedback                 |
| **ContentComponent**     | Props integration          | Passes civilization data to search component for suggestions    |

### 🎯 Benefits

| Benefit                | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **Enhanced Search UX** | Users can quickly find civilizations with autocomplete suggestions |
| **Improved Usability** | Reset button allows easy clearing of search field                  |
| **Better Performance** | Real-time filtering with up to 8 suggestions displayed             |
| **Visual Feedback**    | Hover effects and clear visual indicators for interactions         |

### 📁 Files Modified

| File                                             | Changes                                                | Impact                            |
| ------------------------------------------------ | ------------------------------------------------------ | --------------------------------- |
| `src/components/global/SearchInputComponent.vue` | Added autocomplete, reset button, and enhanced styling | Enhanced search experience        |
| `src/components/layout/ContentComponent.vue`     | Updated to pass civilization data to search component  | Proper data flow for autocomplete |

---

## [1.0.0] - 2024-03-10

> **Related Commits**: [`ce4f19a`](https://github.com/neuraaak/BetterCiv5/commit/ce4f19abb9d5a3a7afb5f584661008d8e244583b) - Component reorganization

### 🎯 Component Architecture & Organization

| Component                 | Updates                                                                             | Benefits                                       |
| ------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Folder Structure**      | Reorganized components into proper directories                                      | Better code organization and maintainability   |
| **Template Organization** | Moved template sections to top of components                                        | Improved readability and Vue.js best practices |
| **Subcomponents**         | Created dedicated subcomponents folder for `CivTagComponent` and `CivTierComponent` | Modular component architecture                 |
| **Component Hierarchy**   | Established clear hierarchy: `civilisations/`, `global/`, `layout/`                 | Logical component grouping                     |

### 🔧 Search & Language System Enhancements

> **Related Commits**: [`0c31d69`](https://github.com/neuraaak/BetterCiv5/commit/0c31d6942536c47fc3cab9633fd91e75b4177469) - Search bar & language fixes, [`3230d82`](https://github.com/neuraaak/BetterCiv5/commit/3230d8297c7caa55d1339d2c2ca6be041bb502b0) - Translation icons fix

| Feature                | Description                                    | Impact                    |
| ---------------------- | ---------------------------------------------- | ------------------------- |
| **Search Bar**         | Added search bar functionality                 | Basic search capability   |
| **Language Selector**  | Fixed CSS color conflicts and improved styling | Better visual consistency |
| **Translation Icons**  | Fixed span injection for all languages         | Consistent icon display   |
| **Search Integration** | Added civilization names in search results     | Improved search accuracy  |

### 🛠️ Technical Implementation

> **Related Commits**: [`ce4f19a`](https://github.com/neuraaak/BetterCiv5/commit/ce4f19abb9d5a3a7afb5f584661008d8e244583b) - Component structure, [`0c31d69`](https://github.com/neuraaak/BetterCiv5/commit/0c31d6942536c47fc3cab9633fd91e75b4177469) - Search implementation

| Component                   | Feature                    | Description                                           |
| --------------------------- | -------------------------- | ----------------------------------------------------- |
| **SearchInputComponent**    | Basic search functionality | Text-based civilization search                        |
| **SelectLanguageComponent** | Color scheme fixes         | Resolved CSS conflicts with proper styling            |
| **Translation System**      | Icon span injection        | Fixed translation icon display across all languages   |
| **Component Structure**     | Template organization      | Moved template sections to top for better readability |

### 🎯 Benefits

| Benefit                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **Better Organization** | Components are now logically grouped and easier to find      |
| **Improved Search**     | Users can search civilizations with basic text search        |
| **Consistent Styling**  | Language selector works properly without CSS conflicts       |
| **Enhanced UX**         | Better component structure leads to improved user experience |
| **Maintainable Code**   | Clear folder structure makes development easier              |

### 📁 Files Modified

| File                                                              | Changes                                  | Impact                      |
| ----------------------------------------------------------------- | ---------------------------------------- | --------------------------- |
| `src/components/civilisations/CivCardComponent.vue`               | Template reorganization, UI improvements | Better card display         |
| `src/components/civilisations/MasterCardComponent.vue`            | Template reorganization, UI improvements | Enhanced detail view        |
| `src/components/civilisations/subcomponents/CivTagComponent.vue`  | Moved to subcomponents folder            | Better organization         |
| `src/components/civilisations/subcomponents/CivTierComponent.vue` | Moved to subcomponents folder            | Better organization         |
| `src/components/global/SearchInputComponent.vue`                  | Added basic search functionality         | Basic search capability     |
| `src/components/global/SelectInputComponent.vue`                  | Moved to global folder                   | Better organization         |
| `src/components/global/SelectLanguageComponent.vue`               | Fixed CSS conflicts                      | Consistent styling          |
| `src/components/layout/ContentComponent.vue`                      | Moved to layout folder                   | Better organization         |
| `src/components/layout/HeaderComponent.vue`                       | Moved to layout folder                   | Better organization         |
| `src/App.vue`                                                     | Updated component imports                | Proper component structure  |
| `src/stores/index.js`                                             | Translation system improvements          | Better multilingual support |

---

## [0.1.0] - 2024-03-04

> **Related Commits**: [`d93f787`](https://github.com/neuraaak/BetterCiv5/commit/d93f787422655185d25b7ce818e53d33bd00b229) - Initial project setup, [`5fbfed2`](https://github.com/neuraaak/BetterCiv5/commit/5fbfed2980e3bca30c5924348d3a9d390e3ddc7c) - Initial commit

### 🚀 Initial Project Foundation

| Component              | Features                                        | Impact                                |
| ---------------------- | ----------------------------------------------- | ------------------------------------- |
| **Vue.js Application** | Complete Vue 3 setup with Composition API       | Modern reactive application           |
| **Build System**       | Vite + Tailwind CSS + PostCSS configuration     | Fast development and optimized builds |
| **Development Tools**  | ESLint + VS Code extensions setup               | Code quality and developer experience |
| **Component Library**  | Complete set of civilization display components | Full application functionality        |

### 🎨 Core Components Implementation

> **Related Commits**: [`d93f787`](https://github.com/neuraaak/BetterCiv5/commit/d93f787422655185d25b7ce818e53d33bd00b229) - All core components

| Component                   | Description                       | Features                                         |
| --------------------------- | --------------------------------- | ------------------------------------------------ |
| **CivCardComponent**        | Compact civilization card display | Civilization overview with tags and tiers        |
| **MasterCardComponent**     | Detailed civilization information | Complete civilization details with descriptions  |
| **CivTagComponent**         | Civilization tag display          | Visual representation of civilization attributes |
| **CivTierComponent**        | Civilization tier display         | Tier-based civilization ranking                  |
| **ContentComponent**        | Main content layout               | Civilization grid display with filtering         |
| **HeaderComponent**         | Application header                | Logo and language selector                       |
| **SearchInputComponent**    | Search functionality              | Text-based civilization search                   |
| **SelectInputComponent**    | Multi-select dropdown             | Tag and tier filtering                           |
| **SelectLanguageComponent** | Language selection                | Multilingual support                             |

### 🔧 Build & Development Configuration

> **Related Commits**: [`d93f787`](https://github.com/neuraaak/BetterCiv5/commit/d93f787422655185d25b7ce818e53d33bd00b229) - Build configuration

| Configuration          | Purpose                        | Benefits                                          |
| ---------------------- | ------------------------------ | ------------------------------------------------- |
| **Vite**               | Fast build tool and dev server | Rapid development and optimized production builds |
| **Tailwind CSS**       | Utility-first CSS framework    | Consistent styling and rapid UI development       |
| **PostCSS**            | CSS processing pipeline        | Advanced CSS features and optimization            |
| **ESLint**             | Code linting and formatting    | Code quality and consistency                      |
| **VS Code Extensions** | Development environment setup  | Enhanced developer experience                     |

### 📁 Project Structure

```
src/
├── components/
│   ├── CivCardComponent.vue      # Civilization card display
│   ├── CivTagComponent.vue       # Tag display component
│   ├── CivTierComponent.vue      # Tier display component
│   ├── ContentComponent.vue      # Main content layout
│   ├── HeaderComponent.vue       # Application header
│   ├── MasterCardComponent.vue   # Detailed civilization view
│   ├── SearchInputComponent.vue  # Search functionality
│   ├── SelectInputComponent.vue  # Multi-select dropdown
│   └── SelectLanguageComponent.vue # Language selector
├── stores/
│   └── index.js                  # Pinia store for state management
├── App.vue                       # Main application component
├── main.js                       # Application entry point
└── main.css                      # Global styles

public/
├── icons/                        # Civilization attribute icons
├── img/                          # Images and assets
└── favicon.ico                   # Application icon

Configuration files:
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.cjs           # PostCSS configuration
├── .eslintrc.js                 # ESLint configuration
└── package.json                 # Project dependencies and scripts
```

### 🎯 Benefits

| Benefit                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **Complete Application**  | Fully functional civilization browser with all core features |
| **Modern Stack**          | Built with latest Vue.js, Vite, and Tailwind CSS             |
| **Developer Experience**  | Optimized development environment with proper tooling        |
| **Production Ready**      | Optimized builds and deployment configuration                |
| **Scalable Architecture** | Well-structured component system for future enhancements     |

---

## 📊 Commit History

| Date       | Type   | Hash                                                                                                | Description                                                                         | Files Modified                                                                                                                                                                                                                         |
| ---------- | ------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2024-03-10 | UPDATE | [`8b62632`](https://github.com/neuraaak/BetterCiv5/commit/8b62632cb4e5051bf6b86f8543ed9ceb1c93da8e) | Edited civ name display in cards                                                    | `src/components/civilisations/CivCardComponent.vue`, `src/components/civilisations/MasterCardComponent.vue`                                                                                                                            |
| 2024-03-10 | UPDATE | [`ce4f19a`](https://github.com/neuraaak/BetterCiv5/commit/ce4f19abb9d5a3a7afb5f584661008d8e244583b) | Reorganized components in folder structure and code sections                        | `src/App.vue`, `src/components/civilisations/`, `src/components/global/`, `src/components/layout/`                                                                                                                                     |
| 2024-03-09 | UPDATE | [`3101674`](https://github.com/neuraaak/BetterCiv5/commit/31016744d7624122c96949ef7a6369f42472cb42) | Added civilization name in search results                                           | `src/components/ContentComponent.vue`                                                                                                                                                                                                  |
| 2024-03-06 | UPDATE | [`0c31d69`](https://github.com/neuraaak/BetterCiv5/commit/0c31d6942536c47fc3cab9633fd91e75b4177469) | Edited color of the select language to avoid bugs related to css - Added search bar | `src/components/CivCardComponent.vue`, `src/components/ContentComponent.vue`, `src/components/MasterCardComponent.vue`, `src/components/SearchInputComponent.vue`, `src/components/SelectLanguageComponent.vue`, `src/stores/index.js` |
| 2024-03-06 | HOTFIX | [`3230d82`](https://github.com/neuraaak/BetterCiv5/commit/3230d8297c7caa55d1339d2c2ca6be041bb502b0) | Icons span for tanslations - Span is now injected whatever the language is.         | `src/components/CivCardComponent.vue`, `src/components/MasterCardComponent.vue`, `src/stores/index.js`                                                                                                                                 |
| 2024-03-04 | INIT   | [`d93f787`](https://github.com/neuraaak/BetterCiv5/commit/d93f787422655185d25b7ce818e53d33bd00b229) | Initial project setup with all core components                                      | Complete project structure with 30+ files                                                                                                                                                                                              |
| 2024-03-04 | INIT   | [`5fbfed2`](https://github.com/neuraaak/BetterCiv5/commit/5fbfed2980e3bca30c5924348d3a9d390e3ddc7c) | Initial commit with .gitignore                                                      | `.gitignore`                                                                                                                                                                                                                           |

## 📈 Statistics

| Metric            | Value                         | Details                           |
| ----------------- | ----------------------------- | --------------------------------- |
| **Total Commits** | 7                             | Complete development history      |
| **Author**        | Neuraaak (100%)               | Single developer project          |
| **Date Range**    | 2024-03-04 to 2024-03-10      | 6 days of development             |
| **Commit Types**  | UPDATE: 4, HOTFIX: 1, INIT: 2 | Feature development and bug fixes |
