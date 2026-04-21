import { Router } from "express";
import { login, registro, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// Crear un nuevo router de Express para las rutas de autenticación
const router = Router();

/**
 * Ruta de registro de usuario.
 *
 * - Crea un nuevo usuario en el sistema.
 * - Devuelve un token JWT si el registro es correcto.
 */
router.post("/registro", registro);

/**
 * Ruta de login.
 *
 * - Valida las credenciales del usuario.
 * - Devuelve un token JWT para iniciar sesión.
 */
router.post("/login", login);

/**
 * Ruta para obtener los datos del usuario autenticado.
 *
 * - Protegida por el middleware de autenticación.
 * - Devuelve la información del usuario asociada al token.
 */
router.get("/me", authMiddleware, me);

// Exportar el router para ser usado en la aplicación principal
export default router;