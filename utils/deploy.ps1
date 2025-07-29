# Script de déploiement BetterCiv5 sur Vercel
# PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Déploiement BetterCiv5 sur Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour afficher les étapes
function Write-Step {
    param($step, $message)
    Write-Host "[$step/4] $message" -ForegroundColor Yellow
}

# Étape 1: Vérification du build
Write-Step 1 "Vérification du build local..."
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Le build a échoué"
    }
    Write-Host "✅ Build réussi!" -ForegroundColor Green
} catch {
    Write-Host "❌ ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

Write-Host ""

# Étape 2: Déploiement
Write-Step 2 "Déploiement sur Vercel..."
try {
    vercel --prod
    if ($LASTEXITCODE -ne 0) {
        throw "Le déploiement a échoué"
    }
    Write-Host "✅ Déploiement réussi!" -ForegroundColor Green
} catch {
    Write-Host "❌ ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

Write-Host ""

# Étape 3: Ouverture du dashboard
Write-Step 3 "Ouverture du dashboard..."
Start-Process "https://vercel.com/dashboard"

# Étape 4: Terminé
Write-Step 4 "Déploiement terminé!"
Write-Host ""
Write-Host "🌐 Votre application est maintenant en ligne!" -ForegroundColor Green
Write-Host "📊 Consultez le dashboard pour plus d'informations" -ForegroundColor Cyan
Write-Host ""

# Commandes utiles
Write-Host "Commandes utiles:" -ForegroundColor Magenta
Write-Host "  vercel ls          - Voir les déploiements" -ForegroundColor Gray
Write-Host "  vercel logs        - Voir les logs" -ForegroundColor Gray
Write-Host "  vercel dashboard   - Ouvrir le dashboard" -ForegroundColor Gray
Write-Host ""

Read-Host "Appuyez sur Entrée pour terminer" 