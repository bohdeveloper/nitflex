import { Router } from "express";
import {
  crearPerfil,
  obtenerPerfiles,
  actualizarPerfil,
  eliminarPerfil,
  seleccionarPerfil
} from "../controllers/perfiles.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadAvatar } from "../middlewares/uploadAvatar";

// Crear un router de Express para la gestión de perfiles
const router = Router();

/**
 * Middleware global de autenticación para todas las rutas de perfiles.
 *
 * - A partir de aquí, todas las peticiones requieren un token JWT válido.
 * - El usuarioId se añade a la request mediante el authMiddleware.
 */
router.use(authMiddleware);

/**
 * Obtener todos los perfiles del usuario autenticado.
 *
 * GET /perfiles
 */
router.get("/", authMiddleware, obtenerPerfiles);

/**
 * Crear un nuevo perfil.
 *
 * - Permite subir un avatar mediante Multer.
 * - El avatar se recibe en el campo "avatar".
 *
 * POST /perfiles
 */
router.post(
  "/",
  authMiddleware,
  uploadAvatar.single("avatar"),
  crearPerfil
);

/**
 * Actualizar un perfil existente.
 *
 * - El perfil se identifica por su índice en el array.
 * - Permite actualizar nombre, tipo y avatar.
 *
 * PUT /perfiles/:index
 */
router.put(
  "/:index",
  authMiddleware,
  uploadAvatar.single("avatar"),
  actualizarPerfil
);

/**
 * Eliminar un perfil.
 *
 * - Elimina el perfil y su avatar asociado (si existe).
 *
 * DELETE /perfiles/:index
 */
router.delete("/:index", authMiddleware, eliminarPerfil);

/**
 * Seleccionar un perfil activo.
 *
 * - Genera un nuevo token JWT asociado al perfil seleccionado.
 * - Devuelve el token y los datos del perfil activo.
 *
 * POST /perfiles/seleccionar
 */
router.post("/seleccionar", authMiddleware, seleccionarPerfil);

// Exportar el router para usarlo en la aplicación principal
export default router;
