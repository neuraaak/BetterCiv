# Guide de déploiement Vercel - BetterCiv5

## 🚀 Déploiement sur Vercel

### Prérequis
- ✅ Vercel CLI installé
- ✅ Projet Vue.js configuré
- ✅ Compte Vercel (gratuit)

## 📋 Étapes de déploiement

### 1. Connexion à Vercel
```bash
vercel login
```
- Ouvrez votre navigateur
- Connectez-vous avec GitHub, GitLab ou email

### 2. Déploiement initial
```bash
vercel
```
- Répondez aux questions :
  - **Set up and deploy?** → `Y`
  - **Which scope?** → Votre compte
  - **Link to existing project?** → `N`
  - **What's your project's name?** → `better-civ5`
  - **In which directory is your code located?** → `./` (dossier actuel)
  - **Want to override the settings?** → `N`

### 3. Configuration automatique
Vercel détectera automatiquement :
- ✅ Framework : Vue.js
- ✅ Build command : `npm run build`
- ✅ Output directory : `dist`
- ✅ Install command : `npm install`

### 4. Déploiement automatique
Une fois configuré, chaque push sur votre branche principale déclenchera un nouveau déploiement.

## 🔧 Configuration avancée

### Variables d'environnement (si nécessaire)
```bash
vercel env add NODE_ENV production
```

### Domaine personnalisé (optionnel)
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Settings → Domains
4. Ajoutez votre domaine

## 📊 Monitoring

### Dashboard Vercel
- **URL** : https://vercel.com/dashboard
- **Fonctionnalités** :
  - Analytics de performance
  - Logs de déploiement
  - Gestion des domaines
  - Variables d'environnement

### Commandes utiles
```bash
# Voir les déploiements
vercel ls

# Déployer en preview
vercel --prod

# Voir les logs
vercel logs

# Ouvrir le dashboard
vercel dashboard
```

## 🎯 Avantages Vercel

### Performance
- ⚡ CDN global (Edge Network)
- 🚀 Builds optimisés
- 📱 Optimisation automatique des images

### Développement
- 🔄 Déploiement automatique
- 🌿 Preview deployments pour chaque PR
- 🔧 Configuration simple

### Gratuité
- 💰 100GB bande passante/mois
- 🏗️ Builds illimités
- 🌐 Domaine personnalisé inclus

## 🚨 Dépannage

### Erreurs courantes

#### Build échoue
```bash
# Vérifier les logs
vercel logs

# Tester localement
npm run build
```

#### Assets non trouvés
- Vérifiez que `dist` contient tous les fichiers
- Assurez-vous que les chemins sont relatifs

#### Variables d'environnement
```bash
# Lister les variables
vercel env ls

# Ajouter une variable
vercel env add VARIABLE_NAME
```

## 📞 Support

- **Documentation** : https://vercel.com/docs
- **Support** : https://vercel.com/support
- **Community** : https://github.com/vercel/vercel/discussions

---
*Guide créé pour BetterCiv5 - Vue.js + Vite* 