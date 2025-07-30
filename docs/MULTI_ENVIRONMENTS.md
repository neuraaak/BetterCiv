# Configuration Multi-Environnements - BetterCiv5

## Vue d'ensemble

Cette configuration permet de déployer automatiquement des versions de production et préproduction sur Vercel à partir du même repository GitHub.

## 🌍 **Environnements configurés**

### **Production** 🚀
- **Branche** : `main`
- **URL** : `https://betterciv5.vercel.app`
- **Configuration** : `vercel.production.json`
- **Variables** : `.env.production`

### **Préproduction** 🔧
- **Branche** : `develop`
- **URL** : `https://betterciv5-preview.vercel.app`
- **Configuration** : `vercel.preview.json`
- **Variables** : `.env.preview`

### **Pull Requests** 🔄
- **Déclencheur** : Toute PR vers `main` ou `develop`
- **URL** : Générée automatiquement par Vercel
- **Configuration** : Basée sur la branche source

## 📁 **Structure des fichiers**

```
├── vercel.json              # Configuration par défaut
├── vercel.production.json   # Configuration production
├── vercel.preview.json      # Configuration préproduction
├── .env.production          # Variables production
├── .env.preview             # Variables préproduction
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions
└── utils/
    ├── deploy-production.sh # Script production
    └── deploy-preview.sh    # Script préproduction
```

## 🔧 **Configuration Vercel**

### **Configuration par défaut** (`vercel.json`)
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": true,
      "preview": true
    }
  }
}
```

### **Configuration Production** (`vercel.production.json`)
```json
{
  "env": {
    "VITE_APP_ENV": "production",
    "VITE_APP_VERSION": "1.2.0"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### **Configuration Preview** (`vercel.preview.json`)
```json
{
  "env": {
    "VITE_APP_ENV": "preview",
    "VITE_APP_VERSION": "1.2.0-preview"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

## 🚀 **Workflow de déploiement**

### **1. Développement**
```bash
# Travailler sur une feature
git checkout -b feature/nouvelle-fonctionnalite
# ... développement ...
git push origin feature/nouvelle-fonctionnalite
```

### **2. Pull Request**
```bash
# Créer une PR vers develop
# GitHub Actions déploie automatiquement une preview
# URL de preview dans les commentaires de la PR
```

### **3. Préproduction**
```bash
# Merge vers develop
git checkout develop
git merge feature/nouvelle-fonctionnalite
git push origin develop
# Déploiement automatique en préproduction
```

### **4. Production**
```bash
# Merge vers main
git checkout main
git merge develop
git push origin main
# Déploiement automatique en production
```

## 📦 **Scripts de déploiement**

### **Déploiement manuel Production**
```bash
# Vérifications automatiques
./utils/deploy-production.sh
```

### **Déploiement manuel Preview**
```bash
# Vérifications automatiques
./utils/deploy-preview.sh
```

### **Scripts npm**
```bash
# Build et déploiement production
npm run deploy

# Build et déploiement preview
npm run deploy:preview

# Build preview uniquement
npm run build:preview
```

## 🔄 **GitHub Actions**

### **Déclencheurs**
- **Push sur `main`** → Déploiement production
- **Push sur `develop`** → Déploiement préproduction
- **Pull Request** → Déploiement preview

### **Étapes automatiques**
1. ✅ Checkout du code
2. ✅ Installation des dépendances
3. ✅ Linting et type checking
4. ✅ Build pour l'environnement
5. ✅ Déploiement sur Vercel
6. ✅ Notification

## 🌍 **Variables d'environnement**

### **Production** (`.env.production`)
```env
VITE_APP_ENV=production
VITE_APP_NAME=Better Civ5
VITE_APP_VERSION=1.2.0
VITE_ENABLE_ANALYTICS=true
VITE_CSP_ENABLED=true
```

### **Preview** (`.env.preview`)
```env
VITE_APP_ENV=preview
VITE_APP_NAME=Better Civ5 (Preview)
VITE_APP_VERSION=1.2.0-preview
VITE_ENABLE_ANALYTICS=false
VITE_CSP_ENABLED=true
```

## 🔒 **Sécurité par environnement**

### **Production**
- ✅ Headers de sécurité stricts
- ✅ Analytics activés
- ✅ Rate limiting activé
- ✅ CSP strict

### **Preview**
- ✅ Headers de sécurité modérés
- ✅ Analytics désactivés
- ✅ Rate limiting désactivé
- ✅ CSP modéré

## 📊 **Monitoring et métriques**

### **URLs de monitoring**
- **Production** : `https://betterciv5.vercel.app`
- **Preview** : `https://betterciv5-preview.vercel.app`
- **Vercel Dashboard** : `https://vercel.com/dashboard`

### **Métriques importantes**
- Temps de déploiement
- Taux de succès des builds
- Performance par environnement
- Erreurs de déploiement

## 🛠️ **Configuration locale**

### **Développement local**
```bash
# Mode développement
npm run dev

# Mode preview
npm run dev -- --mode preview

# Mode production
npm run dev -- --mode production
```

### **Build local**
```bash
# Build production
npm run build

# Build preview
npm run build:preview
```

## 🚨 **Dépannage**

### **Problèmes courants**

#### **1. Déploiement échoue**
```bash
# Vérifier les logs
vercel logs

# Vérifier la configuration
vercel inspect

# Redéployer
vercel --prod
```

#### **2. Variables d'environnement manquantes**
```bash
# Vérifier les variables
vercel env ls

# Ajouter une variable
vercel env add VITE_APP_VERSION
```

#### **3. Cache problématique**
```bash
# Nettoyer le cache
vercel --clear-cache

# Forcer le rebuild
vercel --prod --force
```

### **Commandes utiles**
```bash
# Vérifier l'état des déploiements
vercel ls

# Voir les détails d'un déploiement
vercel inspect [deployment-url]

# Rollback vers une version précédente
vercel rollback [deployment-url]
```

## 📈 **Bonnes pratiques**

### **1. Workflow Git**
- ✅ Toujours travailler sur des branches feature
- ✅ PR vers `develop` pour les tests
- ✅ Merge vers `main` uniquement après validation
- ✅ Tags pour les releases

### **2. Déploiement**
- ✅ Tests automatiques avant déploiement
- ✅ Rollback rapide en cas de problème
- ✅ Monitoring des déploiements
- ✅ Documentation des changements

### **3. Sécurité**
- ✅ Variables sensibles dans les secrets
- ✅ Headers de sécurité appropriés
- ✅ Validation des données
- ✅ Monitoring des erreurs

Cette configuration multi-environnements offre un workflow de développement professionnel avec déploiement automatique, tests et monitoring ! 🚀