import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import perfilesRoutes from "./routes/perfiles.routes";
import tmdbRoutes from "./routes/tmdb.routes";
import path from "path";

// Crear la aplicación Express
export const app = express();

/**
 * Middlewares globales
 */

// Habilita CORS para permitir peticiones desde el frontend
app.use(cors());

// Permite recibir y parsear JSON en el body de las peticiones
app.use(express.json());

/**
 * Rutas de la aplicación
 */

// Rutas de autenticación (registro, login, me)
app.use("/auth", authRoutes);

// Rutas de gestión de perfiles (crear, editar, eliminar, seleccionar)
app.use("/perfiles", perfilesRoutes);

// Rutas de integración con TMDB (trending, populares)
app.use("/tmdb", tmdbRoutes);

/**
 * Servir archivos estáticos
 *
 * - Expone públicamente la carpeta /uploads
 * - Permite acceder a los avatares mediante URLs
 *   como: http://localhost:PUERTO/uploads/avatars/archivo.png
 */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));