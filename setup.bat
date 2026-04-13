@echo off
setlocal enabledelayedexpansion

:: ================================================
:: EVITAR CIERRE DE VENTANA AL HACER DOBLE CLIC
:: ================================================
if "%1" neq "run" (
    start cmd /k "%~f0" run
    exit /b
)

echo ================================================
echo      INSTALADOR AUTOMATICO DE NITFLEX
echo ================================================
echo.

:: ================================================
:: 1. Comprobacion de Git
:: ================================================
echo [1/6] Comprobando Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Git no esta instalado.
    echo Instala Git desde: https://git-scm.com/downloads
    pause
    exit /b
)
echo Git detectado.
echo.

:: ================================================
:: 2. Preparar repositorio Git en esta carpeta
:: ================================================
echo [2/6] Preparando repositorio Git...

if not exist ".git" (
    echo Esta carpeta no es un repositorio Git.
    echo Creando repositorio Git a partir del remoto...

    git clone https://github.com/bohdeveloper/nitflex.git temp_repo
    if %errorlevel% neq 0 (
        echo Error al clonar el repositorio.
        pause
        exit /b
    )

    xcopy temp_repo\.git .git /E /H /C /I >nul
    rmdir /S /Q temp_repo

    echo Repositorio Git inicializado correctamente.
) else (
    echo Esta carpeta ya es un repositorio Git. Actualizando...
    git pull
)

echo.
echo Repositorio listo.
echo.

:: ================================================
:: 3. Comprobacion de Node.js
:: ================================================
echo [3/6] Comprobando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js no esta instalado.
    echo Instala Node.js desde: https://nodejs.org
    pause
    exit /b
)
echo Node.js detectado.
echo.

:: ================================================
:: 4. BACKEND
:: ================================================
echo [4/6] Configurando BACKEND...
cd backend

if not exist node_modules (
    echo Instalando dependencias del backend...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: npm install ha fallado en backend.
        echo Revisa el error mostrado arriba.
        pause
        exit /b
    )
) else (
    echo Dependencias del backend ya instaladas.
)

if not exist .env (
    echo Creando archivo .env del backend...
    copy .env.example .env >nul
    echo Archivo .env del backend creado.
) else (
    echo Archivo .env del backend ya existe.
)

cd ..
echo.

:: ================================================
:: 5. FRONTEND
:: ================================================
echo [5/6] Configurando FRONTEND...
cd frontend

if not exist node_modules (
    echo Instalando dependencias del frontend...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: npm install ha fallado en frontend.
        echo Revisa el error mostrado arriba.
        pause
        exit /b
    )
) else (
    echo Dependencias del frontend ya instaladas.
)

if not exist .env (
    echo Creando archivo .env del frontend...
    copy .env.example .env >nul
    echo Archivo .env del frontend creado.
) else (
    echo Archivo .env del frontend ya existe.
)

cd ..
echo.

:: ================================================
:: 6. ORQUESTADOR ROOT
:: ================================================
echo [6/6] Configurando dependencias raiz...

if not exist node_modules (
    echo Instalando dependencias raiz...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: npm install ha fallado en la raiz.
        echo Revisa el error mostrado arriba.
        pause
        exit /b
    )
) else (
    echo Dependencias raiz ya instaladas.
)

echo.
echo ================================================
echo      INSTALACION COMPLETADA CON EXITO
echo ================================================
echo.
echo Pasos siguientes:
echo 1. Edita backend\.env
echo 2. Edita frontend\.env
echo 3. Asegurate de que MongoDB esta en marcha
echo 4. Ejecuta: npm run dev
echo.
pause
