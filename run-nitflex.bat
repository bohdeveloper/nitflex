@echo off
title Nitflex Launcher

echo ================================
echo Iniciando entorno Nitflex...
echo ================================
echo.

:: ------------------------------------------------------------
:: 1. Comprobar si MongoDB esta en marcha
:: ------------------------------------------------------------
tasklist /FI "IMAGENAME eq mongod.exe" | find /I "mongod.exe" >NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB ya esta ejecutandose.
) else (
    echo Iniciando MongoDB...
    start "" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
    timeout /t 2 >nul
)

:: ------------------------------------------------------------
:: 2. Iniciar Vite en otra ventana
:: ------------------------------------------------------------
echo Iniciando Vite Dev Server...
start "Vite" cmd.exe /k "cd /d C:\Cursos\react\apps\nitflex && npm run dev"

:: ------------------------------------------------------------
:: 3. Iniciar MongoDB Compass si no esta abierto
:: ------------------------------------------------------------
tasklist /FI "IMAGENAME eq MongoDBCompass.exe" | find /I "MongoDBCompass.exe" >NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB Compass ya esta abierto.
) else (
    echo Abriendo MongoDB Compass...
    start "" "C:\Users\%USERNAME%\AppData\Local\MongoDBCompass\MongoDBCompass.exe"
)

:: ------------------------------------------------------------
:: 4. Iniciar Postman si no esta abierto
:: ------------------------------------------------------------
tasklist /FI "IMAGENAME eq Postman.exe" | find /I "Postman.exe" >NUL
if "%ERRORLEVEL%"=="0" (
    echo Postman ya esta abierto.
) else (
    echo Abriendo Postman...
    start "" "C:\Users\%USERNAME%\AppData\Local\Postman\Postman.exe"
)

:: ------------------------------------------------------------
:: 5. Abrir VS Code si no esta abierto
:: ------------------------------------------------------------
tasklist /FI "IMAGENAME eq Code.exe" | find /I "Code.exe" >NUL
if "%ERRORLEVEL%"=="0" (
    echo VS Code ya esta abierto.
) else (
    echo Abriendo VS Code...
