@echo off
echo ========================================
echo    Deploiement BetterCiv5 sur Vercel
echo ========================================
echo.

echo [1/4] Verification du build local...
call npm run build
if %errorlevel% neq 0 (
    echo ERREUR: Le build a echoue!
    pause
    exit /b 1
)
echo ✅ Build reussi!

echo.
echo [2/4] Deploiement sur Vercel...
vercel --prod
if %errorlevel% neq 0 (
    echo ERREUR: Le deploiement a echoue!
    pause
    exit /b 1
)

echo.
echo [3/4] Ouverture du dashboard...
start https://vercel.com/dashboard

echo.
echo [4/4] Deploiement termine!
echo.
echo 🌐 Votre application est maintenant en ligne!
echo 📊 Consultez le dashboard pour plus d'informations
echo.
pause 