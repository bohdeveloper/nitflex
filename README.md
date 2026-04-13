NITFLEX – GUÍA DE INSTALACIÓN Y USO
=================================

Nitflex es una aplicación web tipo streaming que permite:
- Registro y login de usuarios
- Persistencia de sesión mediante token (JWT)
- Consumo de la API pública de TMDB para mostrar películas y series
- Interfaz tipo Netflix con React
- Backend propio con Express y MongoDB

********************************************************************************
IMPORTANTE:
Puedes ejecutar el archivo "setup.bat" para agilizar el montaje del proyecto
en tu sistema.  
Si utilizas este método, puedes saltarte los puntos 2, 3, 4 y 5.

El archivo se encarga de detectar si existen los programas MongoDB, Postman y VSC.
Si existen los arrancará junto al servidor de Vite.

Esto iniciará:
- Frontend en http://localhost:5173
- Backend en  http://localhost:5000

********************************************************************************

======= 1. REQUISITOS PREVIOS =======

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- MongoDB Community Server (en local)
- MongoDB Compass (opcional, para visualizar la base de datos)
- Git


======= 2. DESCARGA DEL PROYECTO =======

Clonar el repositorio desde Git:

git clone <URL_DEL_REPOSITORIO>
cd nitflex


Estructura del proyecto:

nitflex/<br>
 ├── frontend/    → React + Vite + Tailwind<br>
 ├── backend/     → Express + MongoDB<br>
 └── package.json → Orquestador para desarrollo

======= 3. CONFIGURACIÓN DEL BACKEND =======

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


======= 4. CONFIGURACIÓN DEL FRONTEND =======

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
- Las variables de entorno de Vite deben empezar por "VITE_"


======= 5. ARRANQUE DE LA APLICACIÓN =======

Desde la carpeta raíz del proyecto:

cd ..


Instalar dependencias del orquestador (solo la primera vez):

npm install


Arrancar frontend y backend simultáneamente:

npm run dev


Esto iniciará:
- Frontend en http://localhost:5173
- Backend en  http://localhost:5000


======= 6. FUNCIONAMIENTO GENERAL =======

Acceso sin sesión:
- Se muestra la landing pública
- Posibilidad de registro o login


Registro:
- Se crea el usuario en MongoDB
- Se genera un token JWT
- El token se guarda en localStorage
- Redirección automática al inicio


Login:
- Se validan las credenciales
- Se genera y almacena el token
- Redirección a la vista autenticada


Sesión:
- Mientras exista el token, el usuario permanece autenticado
- El contenido mostrado depende del estado de sesión


Logout:
- Se elimina el token
- Se cierra el sidebar
- Se vuelve a la vista pública


======= 7. BASE DE DATOS =======

- Motor: MongoDB
- Base de datos: nitflex
- Colección principal: usuarios


Cada usuario contiene:
- Datos de cuenta (email y contraseña cifrada)
- Información adicional del usuario
- Perfiles (estilo Netflix)
- Favoritos (IDs de TMDB)


La base de datos puede visualizarse con MongoDB Compass.


======= 8. TECNOLOGÍAS UTILIZADAS =======

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

======= 9. NOTAS FINALES =======

- El proyecto está preparado para futuras ampliaciones:
  - Perfiles por usuario
  - Favoritos
  - Control parental
  - Historial de visualización

- El token JWT se gestiona desde el frontend mediante Context API.
- El backend expone una API REST para autenticación y gestión de usuarios.