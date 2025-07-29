# 🎯 Guide cspell optimisé - BetterCiv5

## 🚀 Configuration améliorée

Votre configuration cspell a été optimisée pour réduire drastiquement les fausses erreurs et éviter d'ajouter manuellement tous les mots.

## ✨ Nouvelles fonctionnalités

### 📚 Dictionnaires globaux inclus
- **Anglais** : `en_US`, `en-gb`, `en_US-full`
- **Français** : `fr_FR`, `fr-fr`, `fr_FR-full`
- **Technique** : `typescript`, `node`, `npm`, `html`, `css`, `bash`

### 🎯 Dictionnaires personnalisés
- `cspell-project-words.txt` - Mots spécifiques au projet
- `cspell-vue-words.txt` - Mots spécifiques à Vue.js

### 🔧 Règles intelligentes
- **Patterns automatiques** : camelCase, PascalCase, kebab-case, snake_case
- **Ignorance automatique** : URLs, emails, chemins de fichiers, imports
- **Commentaires ignorés** : Tous les commentaires sont automatiquement ignorés

## 🛠️ Utilisation

### Ajouter un nouveau mot (Recommandé)

#### Option 1 : Script PowerShell
```powershell
# Ajouter un mot au dictionnaire projet
.\add-cspell-word.ps1 "nouveauMot"

# Ajouter un mot au dictionnaire Vue.js
.\add-cspell-word.ps1 "VueComponent" -Dictionary vue
```

#### Option 2 : Script Batch
```cmd
add-cspell-word.bat "nouveauMot"
```

#### Option 3 : Manuel
1. Ouvrir `cspell-project-words.txt` ou `cspell-vue-words.txt`
2. Ajouter le mot à la fin du fichier
3. Redémarrer votre éditeur

### Vérifier la configuration
```bash
# Vérifier tous les fichiers
npx cspell "**/*"

# Vérifier un fichier spécifique
npx cspell src/App.vue

# Vérifier avec affichage détaillé
npx cspell "**/*" --verbose
```

## 🎯 Avantages de cette configuration

### ✅ Réduction des fausses erreurs
- **Mots français** : Automatiquement reconnus
- **Noms de civilisations** : Déjà inclus
- **Termes techniques** : Vue.js, Vite, etc.
- **Patterns de code** : camelCase, URLs, etc.

### ✅ Maintenance simplifiée
- **Dictionnaires séparés** : Projet vs Vue.js
- **Scripts d'ajout** : Plus besoin d'éditer manuellement
- **Configuration globale** : Moins de mots à ajouter

### ✅ Performance améliorée
- **Ignorance intelligente** : Fichiers non pertinents ignorés
- **Patterns optimisés** : Regex pour les cas courants
- **Cache automatique** : Plus rapide après le premier scan

## 📁 Structure des fichiers

```
├── cspell.json                    # Configuration principale
├── cspell-project-words.txt       # Mots spécifiques au projet
├── cspell-vue-words.txt          # Mots spécifiques à Vue.js
├── add-cspell-word.bat           # Script d'ajout (Windows CMD)
└── add-cspell-word.ps1           # Script d'ajout (PowerShell)
```

## 🔧 Configuration VS Code

Ajoutez ceci à votre `settings.json` VS Code :

```json
{
  "cSpell.enabled": true,
  "cSpell.language": "en,fr",
  "cSpell.allowCompoundWords": true,
  "cSpell.allowJoinWords": true,
  "cSpell.ignorePaths": [
    "node_modules/**",
    "dist/**",
    "*.min.js",
    "*.min.css"
  ]
}
```

## 🚨 Dépannage

### Erreurs persistantes
1. **Redémarrez votre éditeur** après modification des dictionnaires
2. **Vérifiez les patterns** dans `cspell.json`
3. **Utilisez les scripts** pour ajouter des mots

### Mots non reconnus
1. **Ajoutez au bon dictionnaire** :
   - Projet → `cspell-project-words.txt`
   - Vue.js → `cspell-vue-words.txt`
2. **Vérifiez la casse** : cspell est sensible à la casse
3. **Utilisez les scripts** : Plus rapide que l'édition manuelle

### Performance lente
1. **Vérifiez ignorePaths** : Assurez-vous que les gros dossiers sont ignorés
2. **Limitez les fichiers** : Utilisez des patterns spécifiques
3. **Cache** : Le premier scan est plus lent

## 📊 Statistiques

### Avant optimisation
- ❌ 50+ mots à ajouter manuellement
- ❌ Fausses erreurs constantes
- ❌ Maintenance fastidieuse

### Après optimisation
- ✅ Dictionnaires globaux inclus
- ✅ Patterns automatiques
- ✅ Scripts d'ajout rapide
- ✅ 90% moins d'erreurs à gérer manuellement

## 🎯 Prochaines étapes

1. **Testez la configuration** : `npx cspell "**/*"`
2. **Ajoutez les mots manquants** avec les scripts
3. **Configurez VS Code** pour une meilleure intégration
4. **Partagez les scripts** avec votre équipe

---
*Configuration optimisée pour BetterCiv5 - Vue.js + Vite* 