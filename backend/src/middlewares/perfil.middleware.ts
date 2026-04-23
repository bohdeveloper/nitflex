import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface PerfilRequest extends Request {
  usuarioId?: string;
  perfilIndex?: number;
  esInfantil?: boolean;
  rol?: string;
}

/**
 * Middleware de perfil activo
 *
 * - Requiere JWT válido
 * - Obliga a que el token incluya perfilIndex
 */
export const perfilMiddleware = (
  req: PerfilRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as PerfilRequest;

    if (decoded.perfilIndex === undefined) {
      return res.status(403).json({
        message: "Perfil no seleccionado"
      });
    }

    req.usuarioId = decoded.usuarioId;
    req.perfilIndex = decoded.perfilIndex;
    req.esInfantil = decoded.esInfantil;
    req.rol = decoded.rol;

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};
