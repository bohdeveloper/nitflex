import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Extiende el tipo Request de Express para permitir
 * añadir el identificador del usuario autenticado.
 *
 * Este usuarioId se extrae del token JWT y se utiliza
 * posteriormente en los controladores.
 */
interface AuthRequest extends Request {
  usuarioId?: string;
}

/**
 * Middleware de autenticación.
 *
 * - Extrae el token JWT del header Authorization.
 * - Valida el token usando la clave secreta.
 * - Si es válido, añade usuarioId a la request.
 * - Si no es válido o no existe, bloquea el acceso.
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Obtener el header Authorization (formato: Bearer TOKEN)
  const authHeader = req.headers.authorization;

  // Si no se envía el token, se deniega el acceso
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Extraer el token eliminando el prefijo "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      usuarioId: string;
    };

    // Inyectar el usuarioId en la request para uso posterior
    req.usuarioId = decoded.usuarioId;

    // Continuar con la ejecución de la ruta protegida
    next();
  } catch {
    // Token inválido o expirado
    return res.status(401).json({ message: "Token inválido" });
  }
};