@echo off
echo =====================================
echo    SETUP AUTOMATICO DE NITFLEX
echo =====================================
echo.

REM Comprobacion de Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo ❌ Node.js no esta instalado.
  echo 👉 Instala Node.js desde https://nodejs.org
  pause
  exit /b
)

echo ✅ Node.js detectado
echo.

REM BACKEND
echo === Configurando BACKEND ===
cd backend

if not exist node_modules (
  echo Instalando dependencias del backend...
  npm install
) else (
  echo Dependencias del backend ya instaladas
)

if not exist .env (
  echo Creando archivo .env del backend...
  copy .env.example .env >nul
  echo ⚠️  Edita backend\.env antes de continuar
) else (
  echo Archivo .env del backend ya existe
)

cd ..
echo.

REM FRONTEND
echo === Configurando FRONTEND ===
cd frontend

if not exist node_modules (
  echo Instalando dependencias del frontend...
  npm install
) else (
  echo Dependencias del frontend ya instaladas
)

if not exist .env (
  echo Creando archivo .env del frontend...
  copy .env.example .env >nul
  echo ⚠️  Edita frontend\.env antes de continuar
) else (
  echo Archivo .env del frontend ya existe
)

cd ..
echo.

REM ROOT
echo === Configurando ORQUESTADOR ===
if not exist node_modules (
  npm install
) else (
  echo Dependencias raiz ya instaladas
)

echo.
echo =====================================
echo ✅ SETUP COMPLETADO
echo =====================================
echo.
echo Pasos siguientes:
echo 1. Edita backend\.env
echo 2. Edita frontend\.env
echo 3. Asegura que MongoDB esta en marcha
echo 4. Ejecuta: npm run dev
echo.
pause