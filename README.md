NITFLEX – GUÍA DE INSTALACIÓN Y USO
===================================

Nitflex es una aplicación web tipo streaming que permite:
- Registro y login de usuarios
- Persistencia de sesión mediante token (JWT)
- Consumo de la API pública de TMDB para mostrar películas y series
- Interfaz tipo Netflix con React
- Backend propio con Express y MongoDB

1. REQUISITOS PREVIOS
===================================

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 18 o superior)
- npm (incluido con Node)
- MongoDB Community Server (en local)
- MongoDB Compass (opcional, para ver la base de datos)
- Git

2. DESCARGA DEL PROYECTO
===================================

Clonar el repositorio desde Git:

git clone <URL_DEL_REPOSITORIO>
cd nitflex

La estructura del proyecto es:

nitflex/
 ├── frontend/   → React + Vite + Tailwind
 ├── backend/    → Express + MongoDB
 └── package.json (orquestador para desarrollo)

 ***************************************************************************************************************
 * IMPORTANTE: Puedes ejecutar el archivo "setup.bat" para agilizar el montaje del proyecto en tu sistema.
 Si deseas hacerlo de este modo, saltate el punto 3, 4 y 5.
 ***************************************************************************************************************

3. CONFIGURACIÓN DEL BACKEND
===================================

Entrar en la carpeta backend:

cd backend

Instalar dependencias:

npm install

Crear el archivo de variables de entorno:

backend/.env

Contenido recomendado:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nitflex
JWT_SECRET=clave_secreta_para_jwt

Asegúrate de que MongoDB esté ejecutándose como servicio local.

4. CONFIGURACIÓN DEL FRONTEND
===================================

Entrar en la carpeta frontend:

cd ../frontend

Instalar dependencias:

npm install

Crear el archivo de variables de entorno:

frontend/.env

Contenido recomendado:

VITE_TMDB_API_KEY=TU_API_KEY_DE_TMDB
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

IMPORTANTE:
- La API Key debe obtenerse desde https://www.themoviedb.org/
- Las variables de Vite deben empezar por VITE_

5. ARRANQUE DE LA APLICACIÓN
===================================

Desde la carpeta raíz del proyecto:

cd ..

Instalar dependencias del orquestador (solo la primera vez):

npm install

Arrancar frontend y backend a la vez:

npm run dev

Esto arrancará:
- Frontend en http://localhost:5173
- Backend en http://localhost:5000

6. FUNCIONAMIENTO GENERAL
===================================

- Al acceder a la aplicación sin sesión:
  - Se muestra la landing pública
  - Opción de registro o login

- Registro:
  - Se crea un usuario en MongoDB
  - Se genera un token JWT
  - El token se guarda en localStorage
  - Redirección automática al inicio

- Login:
  - Se validan credenciales
  - Se genera y guarda el token
  - Redirección al inicio autenticado

- Sesión:
  - Mientras exista el token, el usuario permanece autenticado
  - El contenido cambia según el estado de sesión

- Logout:
  - Se elimina el token
  - Se cierra el sidebar
  - Se vuelve a la vista pública

7. BASE DE DATOS
===================================

- Base de datos: MongoDB
- Nombre por defecto: nitflex
- Colección principal: usuarios

Cada usuario contiene:
- Datos de cuenta (email, contraseña)
- Información adicional del usuario
- Perfiles (tipo Netflix)
- Favoritos (IDs de TMDB)

La base de datos puede visualizarse con MongoDB Compass.

8. TECNOLOGÍAS UTILIZADAS
===================================

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

Backend:
- Node.js
- Express
- TypeScript
- Mongoose
- JWT
- bcrypt

API externa:
- The Movie Database (TMDB)

9. NOTAS FINALES
===================================

- El proyecto está preparado para ampliaciones futuras:
  - Perfiles por usuario
  - Favoritos
  - Control parental
  - Historial de visualización

- El token se gestiona desde frontend mediante Context API.
- El backend expone una API REST para autenticación y usuario.
