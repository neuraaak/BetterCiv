@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Ajout de mot au dictionnaire cspell
echo ========================================
echo.

if "%~1"=="" (
    echo Usage: add-cspell-word.bat "mot_a_ajouter"
    echo.
    echo Exemples:
    echo   add-cspell-word.bat "nouveauMot"
    echo   add-cspell-word.bat "NomCivilisation"
    echo.
    pause
    exit /b 1
)

set "new_word=%~1"
set "project_dict=cspell-project-words.txt"

echo Ajout du mot: %new_word%
echo.

REM Vérifier si le mot existe déjà
findstr /i /c:"%new_word%" "%project_dict%" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Le mot "%new_word%" existe déjà dans le dictionnaire.
    echo.
    pause
    exit /b 0
)

REM Ajouter le mot à la fin du fichier
echo %new_word%>> "%project_dict%"

if %errorlevel% equ 0 (
    echo ✅ Mot "%new_word%" ajouté avec succès!
    echo 📁 Fichier: %project_dict%
    echo.
    echo 🔄 Redémarrez votre éditeur pour voir les changements.
) else (
    echo ❌ Erreur lors de l'ajout du mot.
)

echo.
pause 