import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";
import { Response } from "express";
import { Request } from "express";
import fs from "fs";
import path from "path";


/**
 * Reutilizamos el mismo tipo que en auth.middleware
 */
interface AuthRequest extends Request {
  usuarioId?: string;
  file?: Express.Multer.File;
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
  const { nombrePerfil, esInfantil } = req.body;

  if (!req.body || !req.body.nombrePerfil) {
    console.error("Body vacío:", req.body);
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

    const avatarPath = req.file
      ? `/uploads/avatars/${req.file.filename}`
      : "";

    usuario.perfiles.push({
      nombrePerfil,
      avatar: avatarPath,
      esInfantil: esInfantil === "true",
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
  const { nombrePerfil, esInfantil } = req.body;

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

    const perfil = usuario.perfiles[index];

    // ✅ Actualizar nombre
    if (nombrePerfil !== undefined) {
      perfil.nombrePerfil = nombrePerfil;
    }

    // ✅ Actualizar perfil infantil
    if (esInfantil !== undefined) {
      perfil.esInfantil = esInfantil === "true" || esInfantil === true;
    }

    // ✅ Si viene nuevo avatar
    if (req.file) {
      // borrar avatar antiguo si existe
      if (perfil.avatar) {
        const oldAvatarPath = path.join(
          __dirname,
          "..",
          perfil.avatar
        );

        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }

      perfil.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    await usuario.save();

    res.json(perfil);
  } catch (error) {
    console.error(error);
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

    const perfil = usuario.perfiles[index];

    // ✅ borrar avatar si existe
    if (perfil.avatar) {
      const avatarPath = path.join(__dirname, "..", perfil.avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    usuario.perfiles.splice(index, 1);
    await usuario.save();

    res.json(usuario.perfiles); // ✅ devolvemos lista actualizada
  } catch (error) {
    console.error(error);
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