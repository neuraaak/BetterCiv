# Script pour ajouter des mots au dictionnaire cspell
# PowerShell

param(
    [Parameter(Mandatory=$true)]
    [string]$Word,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("project", "vue")]
    [string]$Dictionary = "project"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Ajout de mot au dictionnaire cspell" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Définir le fichier de dictionnaire
$dictFile = if ($Dictionary -eq "vue") { "cspell-vue-words.txt" } else { "cspell-project-words.txt" }

# Vérifier si le fichier existe
if (-not (Test-Path $dictFile)) {
    Write-Host "❌ Erreur: Le fichier $dictFile n'existe pas!" -ForegroundColor Red
    exit 1
}

Write-Host "Mot à ajouter: $Word" -ForegroundColor Yellow
Write-Host "Dictionnaire: $dictFile" -ForegroundColor Gray
Write-Host ""

# Vérifier si le mot existe déjà
$existingWords = Get-Content $dictFile | Where-Object { $_ -match "^$Word$" }
if ($existingWords) {
    Write-Host "⚠️  Le mot '$Word' existe déjà dans le dictionnaire." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 0
}

# Ajouter le mot
try {
    Add-Content -Path $dictFile -Value $Word
    Write-Host "✅ Mot '$Word' ajouté avec succès!" -ForegroundColor Green
    Write-Host "📁 Fichier: $dictFile" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔄 Redémarrez votre éditeur pour voir les changements." -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erreur lors de l'ajout du mot: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Commandes utiles:" -ForegroundColor Magenta
Write-Host "  .\add-cspell-word.ps1 'nouveauMot'" -ForegroundColor Gray
Write-Host "  .\add-cspell-word.ps1 'VueComponent' -Dictionary vue" -ForegroundColor Gray
Write-Host ""

Read-Host "Appuyez sur Entrée pour terminer" 