# 📁 Organisation du projet BetterCiv5

## 🏗️ Structure des dossiers

```
BetterCiv5/
├── 📁 src/                    # Code source
│   ├── 📁 components/         # Composants Vue
│   ├── 📁 stores/            # Stores Pinia
│   ├── 📁 assets/            # Assets statiques
│   ├── App.vue               # Composant principal
│   ├── main.js               # Point d'entrée
│   └── main.css              # Styles globaux
├── 📁 config/                # Fichiers de configuration
│   ├── cspell.json           # Configuration cspell
│   ├── .eslintrc.js          # Configuration ESLint
│   ├── vite.config.js        # Configuration Vite
│   ├── tailwind.config.js    # Configuration TailwindCSS
│   └── postcss.config.cjs    # Configuration PostCSS
├── 📁 utils/                 # Scripts utilitaires
│   ├── deploy.bat            # Script déploiement Windows
│   ├── deploy.ps1            # Script déploiement PowerShell
│   ├── add-cspell-word.bat   # Script ajout mots cspell
│   └── add-cspell-word.ps1   # Script ajout mots cspell PowerShell
├── 📁 docs/                  # Documentation
│   ├── README.md             # Index documentation
│   ├── CSPELL_GUIDE.md       # Guide cspell
│   ├── DEPLOYMENT_GUIDE.md   # Guide déploiement
│   ├── README_DEPLOYMENT.md  # Guide rapide déploiement
│   └── ORGANIZATION.md       # Ce fichier
├── 📁 _temp/                 # Fichiers temporaires
│   └── .gitkeep              # Versionnage du dossier
├── 📁 public/                # Assets publics
├── 📁 dist/                  # Build production
├── README.md                 # Documentation principale
├── package.json              # Configuration projet
├── .gitignore               # Fichiers ignorés
├── vercel.json              # Configuration Vercel
├── cspell-project-words.txt # Dictionnaire projet
└── cspell-vue-words.txt     # Dictionnaire Vue.js
```

## 🎯 Avantages de cette organisation

### ✅ Séparation claire
- **Code source** : `src/`
- **Configuration** : `config/`
- **Utilitaires** : `utils/`
- **Documentation** : `docs/`
- **Temporaires** : `_temp/`

### ✅ Maintenabilité
- **Configurations centralisées** dans `config/`
- **Scripts organisés** dans `utils/`
- **Documentation structurée** dans `docs/`

### ✅ Évolutivité
- **Facile d'ajouter** de nouvelles configurations
- **Scripts réutilisables** dans `utils/`
- **Documentation extensible** dans `docs/`

## 🔧 Configuration des outils

### Vite
```bash
npm run dev          # Utilise config/vite.config.js
npm run build        # Utilise config/vite.config.js
npm run preview      # Utilise config/vite.config.js
```

### ESLint
```bash
npm run lint         # Utilise config/.eslintrc.js
```

### CSpell
```bash
npm run spell        # Utilise config/cspell.json
npm run spell:fix    # Utilise config/cspell.json
```

### Scripts utilitaires
```bash
npm run deploy:win   # Exécute utils/deploy.bat
npm run deploy:ps    # Exécute utils/deploy.ps1
npm run spell:add    # Exécute utils/add-cspell-word.bat
npm run spell:add:ps # Exécute utils/add-cspell-word.ps1
```

## 📝 Conventions

### Nommage des fichiers
- **Configuration** : `config/nom-outil.config.js`
- **Scripts** : `utils/nom-action.extension`
- **Documentation** : `docs/nom-guide.md`

### Chemins relatifs
- **Depuis config/** : `../` pour remonter à la racine
- **Depuis utils/** : `../` pour remonter à la racine
- **Depuis docs/** : `../` pour remonter à la racine

## 🚀 Utilisation

### Développement
```bash
npm run dev          # Lance le serveur de développement
npm run build        # Build de production
npm run lint         # Vérification du code
npm run spell        # Vérification orthographe
```

### Déploiement
```bash
npm run deploy       # Déploiement Vercel
npm run deploy:win   # Script Windows
npm run deploy:ps    # Script PowerShell
```

### Maintenance
```bash
npm run clean        # Nettoyage des fichiers temporaires
npm run clean:all    # Nettoyage complet
```

---

*Organisation optimisée pour BetterCiv5 - Vue.js + Vite* 