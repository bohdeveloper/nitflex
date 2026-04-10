import { Response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";
import { Request } from "express";

/**
 * Reutilizamos el mismo tipo que en auth.middleware
 */
interface AuthRequest extends Request {
  usuarioId?: string;
}

/**
 * Obtener perfiles
 */
export const obtenerPerfiles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const usuario = await Usuario.findById(req.usuarioId).select("perfiles");

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(usuario.perfiles);
  } catch {
    res.status(500).json({ message: "Error al obtener perfiles" });
  }
};

/**
 * Crear perfil
 */
export const crearPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { nombrePerfil, avatar, esInfantil, idiomaPerfil } = req.body;

  if (!nombrePerfil) {
    res.status(400).json({ message: "El nombre del perfil es obligatorio" });
    return;
  }

  try {
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    usuario.perfiles.push({
      nombrePerfil,
      avatar: avatar || "",
      esInfantil: esInfantil ?? false,
      idiomaPerfil: idiomaPerfil || "es",
      fechaCreacion: new Date()
    });

    await usuario.save();

    res.status(201).json(usuario.perfiles);
  } catch {
    res.status(500).json({ message: "Error al crear perfil" });
  }
};

/**
 * Actualizar perfil
 */
export const actualizarPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const index = Number(req.params.index);
  const data = req.body;

  try {
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario || !usuario.perfiles[index]) {
      res.status(404).json({ message: "Perfil no encontrado" });
      return;
    }

    Object.assign(usuario.perfiles[index], data);
    await usuario.save();

    res.json(usuario.perfiles[index]);
  } catch {
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

/**
 * Eliminar perfil
 */
export const eliminarPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const index = Number(req.params.index);

  try {
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario || !usuario.perfiles[index]) {
      res.status(404).json({ message: "Perfil no encontrado" });
      return;
    }

    usuario.perfiles.splice(index, 1);
    await usuario.save();

    res.json({ message: "Perfil eliminado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar perfil" });
  }
};

/**
 * Seleccionar perfil activo
 */
export const seleccionarPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { index } = req.body;

  if (index === undefined) {
    res.status(400).json({ message: "Índice de perfil requerido" });
    return;
  }

  try {
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario || !usuario.perfiles[index]) {
      res.status(404).json({ message: "Perfil no válido" });
      return;
    }

    const perfil = usuario.perfiles[index];

    const token = jwt.sign(
      {
        usuarioId: usuario._id,
        perfilIndex: index,
        esInfantil: perfil.esInfantil,
        rol: usuario.rol
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      perfilActivo: perfil
    });
  } catch {
    res.status(500).json({ message: "Error al seleccionar perfil" });
  }
};