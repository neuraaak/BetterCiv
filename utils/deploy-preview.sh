#!/bin/bash

# Script de déploiement en préproduction
# Usage: ./utils/deploy-preview.sh

set -e

echo "🚀 Déploiement en préproduction..."

# Vérifier que nous sommes sur la branche develop
if [ "$(git branch --show-current)" != "develop" ]; then
    echo "❌ Erreur: Vous devez être sur la branche develop pour déployer en préproduction"
    exit 1
fi

# Vérifier que le working directory est propre
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Il y a des changements non commités"
    echo "Veuillez commiter ou stasher vos changements avant de déployer"
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

# Build pour la préproduction
echo "🏗️ Build pour la préproduction..."
npm run build:preview

# Déployer sur Vercel (preview)
echo "🚀 Déploiement sur Vercel (preview)..."
vercel --prod --confirm

echo "✅ Déploiement en préproduction terminé!"
echo "🌐 URL: https://betterciv5-preview.vercel.app"