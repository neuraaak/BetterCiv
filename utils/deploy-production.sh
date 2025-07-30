#!/bin/bash

# Script de déploiement en production
# Usage: ./utils/deploy-production.sh

set -e

echo "🚀 Déploiement en production..."

# Vérifier que nous sommes sur la branche main
if [ "$(git branch --show-current)" != "main" ]; then
    echo "❌ Erreur: Vous devez être sur la branche main pour déployer en production"
    exit 1
fi

# Vérifier que le working directory est propre
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Il y a des changements non commités"
    echo "Veuillez commiter ou stasher vos changements avant de déployer"
    exit 1
fi

# Vérifier que nous sommes à jour avec l'origine
git fetch origin
if [ "$(git rev-list HEAD...origin/main --count)" != "0" ]; then
    echo "❌ Erreur: Votre branche n'est pas à jour avec origin/main"
    echo "Veuillez faire un pull avant de déployer"
    exit 1
fi

echo "✅ Vérifications passées"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Linter le code
echo "🔍 Vérification du code..."
npm run lint
npm run type-check

# Build pour la production
echo "🏗️ Build pour la production..."
npm run build

# Déployer sur Vercel
echo "🚀 Déploiement sur Vercel..."
vercel --prod --confirm

echo "✅ Déploiement en production terminé!"
echo "🌐 URL: https://betterciv5.vercel.app"