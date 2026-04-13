@echo off
title Nitflex Launcher
setlocal enabledelayedexpansion

echo ================================
echo Iniciando entorno Nitflex...
echo ================================
echo.

:: ------------------------------------------------------------
:: RUTAS DEL PROYECTO
:: ------------------------------------------------------------
set NITFLEX_DIR=C:\aplic\nitflex
set FRONTEND_DIR=%NITFLEX_DIR%\frontend
set BACKEND_DIR=%NITFLEX_DIR%\backend

:: ------------------------------------------------------------
:: 1. DETECTAR MONGODB (cualquier version instalada)
:: ------------------------------------------------------------
echo Buscando MongoDB...

set MONGO_BIN=

for /d %%D in ("C:\Program Files\MongoDB\Server\*") do (
    if exist "%%D\bin\mongod.exe" (
        set MONGO_BIN=%%D\bin\mongod.exe
    )
)

if defined MONGO_BIN (
    echo MongoDB detectado en:
    echo %MONGO_BIN%
) else (
    echo MongoDB NO encontrado. No se iniciara.
)

echo.

:: ------------------------------------------------------------
:: 2. INICIAR MONGODB (solo si existe)
:: ------------------------------------------------------------
if defined MONGO_BIN (
    tasklist /FI "IMAGENAME eq mongod.exe" | find /I "mongod.exe" >NUL
    if "%ERRORLEVEL%"=="0" (
        echo MongoDB ya esta ejecutandose.
    ) else (
        echo Iniciando MongoDB...
        if not exist C:\data\db mkdir C:\data\db
        start "" "%MONGO_BIN%" --dbpath "C:\data\db"
        timeout /t 2 >nul
    )
)

echo.

:: ------------------------------------------------------------
:: 3. INSTALAR DEPENDENCIAS SI FALTAN
:: ------------------------------------------------------------
echo Comprobando dependencias del frontend...

if not exist "%FRONTEND_DIR%\node_modules" (
    echo Instalando dependencias del frontend...
    cd /d "%FRONTEND_DIR%"
    call npm install
) else (
    echo Dependencias del frontend OK.
)

echo Comprobando plugin React de Vite...

if not exist "%FRONTEND_DIR%\node_modules\@vitejs\plugin-react" (
    echo Instalando @vitejs/plugin-react compatible con Vite 5...
    cd /d "%FRONTEND_DIR%"
    call npm install @vitejs/plugin-react@4 --save-dev
) else (
    echo Plugin React OK.
)
echo.

echo Comprobando libreria react-icons...

if not exist "%FRONTEND_DIR%\node_modules\react-icons" (
    echo Instalando react-icons...
    cd /d "%FRONTEND_DIR%"
    call npm install react-icons --save
) else (
    echo react-icons OK.
)
echo.

echo Comprobando react-router-dom...

if not exist "%FRONTEND_DIR%\node_modules\react-router-dom" (
    echo Instalando react-router-dom...
    cd /d "%FRONTEND_DIR%"
    call npm install react-router-dom --save
) else (
    echo react-router-dom OK.
)
echo.

echo Comprobando dependencias del backend...

if not exist "%BACKEND_DIR%\node_modules" (
    echo Instalando dependencias del backend...
    cd /d "%BACKEND_DIR%"
    call npm install
) else (
    echo Dependencias del backend OK.
)

echo.

:: ------------------------------------------------------------
:: 4. INICIAR NITFLEX (npm run dev en el root)
:: ------------------------------------------------------------
echo Iniciando Nitflex (npm run dev)...
start "Nitflex" cmd.exe /k "cd /d %NITFLEX_DIR% && npm run dev"
echo.

:: ------------------------------------------------------------
:: 5. INICIAR MONGODB COMPASS (si existe)
:: ------------------------------------------------------------
echo Buscando MongoDB Compass...

set COMPASS_EXE=

for /r "%LOCALAPPDATA%\MongoDBCompass" %%F in (MongoDBCompass.exe) do (
    set COMPASS_EXE=%%F
)

if defined COMPASS_EXE (
    tasklist /FI "IMAGENAME eq MongoDBCompass.exe" | find /I "MongoDBCompass.exe" >NUL
    if "%ERRORLEVEL%"=="0" (
        echo MongoDB Compass ya esta abierto.
    ) else (
        echo Abriendo MongoDB Compass...
        if exist "%COMPASS_EXE%" (
            start "" "%COMPASS_EXE%"
        ) else (
            echo Postman no encontrado, se omite.
        )
    )
) else (
    echo MongoDB Compass no encontrado.
)

echo.

:: ------------------------------------------------------------
:: 6. INICIAR POSTMAN (si existe)
:: ------------------------------------------------------------
echo Buscando Postman...

set POSTMAN_EXE=

for /r "%LOCALAPPDATA%\Postman" %%F in (Postman.exe) do (
    set POSTMAN_EXE=%%F
)

if defined POSTMAN_EXE (
    tasklist /FI "IMAGENAME eq Postman.exe" | find /I "Postman.exe" >NUL
    if "%ERRORLEVEL%"=="0" (
        echo Postman ya esta abierto.
    ) else (
        echo Abriendo Postman...
        if exist "%POSTMAN_EXE%" (
            start "" "%POSTMAN_EXE%"
        ) else (
            echo Postman no encontrado, se omite.
        )
    )
) else (
    echo Postman no encontrado.
)

echo.
echo ================================
echo Todo listo. Nitflex esta en marcha.
echo ================================
pause
