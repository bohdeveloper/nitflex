::::::::::::::: Manual técnico de la aplicación Nitflex :::::::::::::::

1️⃣ Visión general
Nitflex es una aplicación web tipo streaming inspirada en Netflix, construida con una arquitectura full‑stack moderna:

Backend: API REST con Node.js, Express y MongoDB
Frontend: React + Vite
Autenticación: JWT con selección de perfiles
Gestión de perfiles: CRUD completo con avatares
Datos externos: TMDB (The Movie Database)

La aplicación tiene dos niveles de sesión:

Usuario autenticado
Perfil activo (estilo Netflix)


2️⃣ Backend – API REST
🔧 Tecnologías usadas

Node.js: Entorno de ejecución
Express: Framework HTTP
MongoDB + Mongoose: Base de datos y ODM
JWT: Autenticación y autorización
bcrypt: Hash seguro de contraseñas
multer: Subida de avatares
dotenv: Variables de entorno


📂 Estructura principal del backend
backend/
├─ controllers/
│  ├─ auth.controller.ts
│  └─ perfiles.controller.ts
├─ middlewares/
│  ├─ auth.middleware.ts
│  └─ uploadAvatar.ts
├─ models/
│  └─ Usuario.ts
├─ routes/
│  ├─ auth.routes.ts
│  └─ perfiles.routes.ts
├─ uploads/avatars/
├─ config/db.ts
├─ app.ts
└─ server.ts


🔐 Autenticación (auth)

Endpoint            Método          Descripción
/auth/registro      POST            Registro de usuario
/auth/login         POST            Login y JWT
/auth/me            GET             Datos del usuario autenticado

- Las contraseñas se hashean con bcrypt
- El token JWT incluye el usuarioId
- authMiddleware valida el token y añade req.usuarioId


👤 Perfiles (perfiles)
Cada usuario puede tener varios perfiles embebidos.

Endpoint                Método      Descripción
/perfiles               GET         Obtener perfiles
/perfiles               POST        Crear perfil
/perfiles/:index        PUT         Editar perfil
/perfiles/:index        DELETE      Eliminar perfil
/perfiles/seleccionar   POST        Seleccionar perfil activo

Características clave:
- Avatares subidos con Multer
- Los avatares se almacenan en /uploads/avatars
- Al cambiar/eliminar perfil → el avatar antiguo se borra del disco
- Al seleccionar perfil → se genera un nuevo JWT específico

Incluye perfilIndex, esInfantil, rol

3️⃣ Frontend – React + Vite
⚛️ Tecnologías usadas

React (hooks, Context API)
Vite (build rápido)
React Router
Fetch API
react-icons
Tailwind / CSS personalizado


📂 Estructura frontend simplificada
frontend/
├─ components/
│  ├─ layout/
│  │  ├─ Plantilla.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ Header.tsx
│  │  ├─ Nav.tsx
│  │  └─ Footer.tsx
│  ├─ Pelicula.tsx
│  └─ Serie.tsx
├─ pages/
│  ├─ Inicio.tsx
│  ├─ Login.tsx
│  ├─ Registro.tsx
│  ├─ Perfiles.tsx
│  ├─ Peliculas.tsx
│  └─ Series.tsx
├─ context/
│  └─ AuthContext.tsx
├─ hooks/
│  └─ useMe.ts
├─ services/
│  └─ tmdb.ts
├─ App.tsx
└─ main.tsx


4️⃣ AuthContext – Núcleo del estado global
AuthContext gestiona toda la sesión global:

Estado

token: JWT actual
perfilActivo: perfil seleccionado

Métodos

login(token)
seleccionarPerfil(token, perfil)
logout()

Características

Persistencia con localStorage
Diferencia clara entre:

sesión de usuario
sesión de perfil


Accesible desde cualquier componente


5️⃣ Pantallas principales
🔑 Login

Envía credenciales a /auth/login
Guarda el token
Redirige a /perfiles

📝 Registro

Validación frontend
Registro en /auth/registro
Guarda token → /perfiles

👨‍👩‍👧 Perfiles
Funcionalidad completa:

Listar perfiles
Crear perfil
Editar perfil
Eliminar perfil
Seleccionar perfil activo

UX clara:

Click avatar → usar perfil
Botón “Editar” → mantenimiento


6️⃣ Sidebar y layout

Plantilla define el layout global
Sidebar:

Usa useMe para mostrar nombre del usuario
Acceso a perfiles
Logout


El menú lateral solo aparece si hay token


7️⃣ Integración con TMDB
📡 tmdb.ts

Centraliza llamadas a la API TMDB
Usa API Key desde .env
Función genérica tmdbFetch

🎬 Componentes

Pelicula.tsx
Serie.tsx

Responsabilidades:

Buscar por título
Renderizar pósters
No gestionan lógica de perfiles ni auth


8️⃣ Flujo completo de uso

Usuario entra a la app
Registro o login
Selección de perfil
Se genera token específico del perfil
Navegación por contenido
Logout limpia usuario y perfil


9️⃣ Buenas prácticas aplicadas
✅ Separación frontend / backend
✅ JWT seguro
✅ Hash de contraseñas
✅ Context API bien encapsulada
✅ Subida de archivos controlada
✅ Limpieza de recursos (avatars)
✅ Código documentado y mantenible