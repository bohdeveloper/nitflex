import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";
import { deleteAvatarIfExists } from "../utils/avatar.utils";
import { Response } from "express";
import { Request } from "express";
import fs from "fs";
import path from "path";

/**
 * Extiende el tipo Request de Express para incluir:
 * - usuarioId: inyectado por el middleware de autenticación desde el JWT
 * - file: archivo subido mediante Multer (avatar del perfil)
 */
interface AuthRequest extends Request {
  usuarioId?: string;
  file?: Express.Multer.File;
}

/**
 * Obtener perfiles del usuario autenticado.
 *
 * - Requiere que el usuario esté autenticado.
 * - Devuelve únicamente el array de perfiles del usuario.
 */
export const obtenerPerfiles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // Verifica que el usuario esté autenticado
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    // Buscar el usuario y devolver solo el campo "perfiles"
    const usuario = await Usuario.findById(req.usuarioId).select("perfiles");

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Devuelve la lista de perfiles
    res.json(usuario.perfiles);
  } catch {
    res.status(500).json({ message: "Error al obtener perfiles" });
  }
};

/**
 * Crear un nuevo perfil para el usuario autenticado.
 *
 * - Permite subir un avatar mediante Multer.
 * - Añade el perfil al array de perfiles del usuario.
 * - Devuelve la lista completa de perfiles actualizada.
 */
export const crearPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { nombrePerfil, esInfantil } = req.body;

  // Validación básica del body
  if (!req.body || !req.body.nombrePerfil) {
    console.error("Body vacío:", req.body);
    res.status(400).json({ message: "El nombre del perfil es obligatorio" });
    return;
  }

  try {
    // Verifica autenticación
    if (!req.usuarioId) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Si se ha subido avatar, se guarda la ruta, si no se deja vacío
    const avatarPath = req.file
      ? `/uploads/avatars/${req.file.filename}`
      : "";

    // Añadir el nuevo perfil al usuario
    usuario.perfiles.push({
      nombrePerfil,
      avatar: avatarPath,
      esInfantil: esInfantil === "true",
      fechaCreacion: new Date()
    });

    await usuario.save();

    // Devolver lista completa de perfiles
    res.status(201).json(usuario.perfiles);
  } catch {
    res.status(500).json({ message: "Error al crear perfil" });
  }
};

/**
 * Actualizar un perfil existente.
 *
 * - Permite modificar nombre y tipo (infantil/adulto).
 * - Permite sustituir el avatar, borrando el anterior del disco.
 * - Devuelve únicamente el perfil actualizado.
 */
export const actualizarPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const index = Number(req.params.index);
  const { nombrePerfil, esInfantil } = req.body;

  try {
    // Verifica autenticación
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

    // Actualizar nombre del perfil si se proporciona
    if (nombrePerfil !== undefined) {
      perfil.nombrePerfil = nombrePerfil;
    }

    // Actualizar si el perfil es infantil
    if (esInfantil !== undefined) {
      perfil.esInfantil = esInfantil === "true" || esInfantil === true;
    }

    // Si se sube un nuevo avatar, se elimina el anterior
    if (req.file) {
      deleteAvatarIfExists(perfil.avatar);
      perfil.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    await usuario.save();

    // Devuelve el perfil actualizado
    res.json(perfil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

/**
 * Eliminar un perfil.
 *
 * - Elimina el perfil del array.
 * - Borra el avatar del disco si existe.
 * - Devuelve la lista de perfiles actualizada.
 */
export const eliminarPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const index = Number(req.params.index);

  try {
    // Verifica autenticación
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

    // Si se sube un nuevo avatar, se elimina el anterior
    deleteAvatarIfExists(perfil.avatar);

    // Eliminar el perfil del array
    usuario.perfiles.splice(index, 1);
    await usuario.save();

    // Devolver lista de perfiles actualizada
    res.json(usuario.perfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar perfil" });
  }
};

/**
 * Seleccionar un perfil activo.
 *
 * - Genera un nuevo token JWT específico para el perfil.
 * - Incluye información como:
 *   - índice del perfil
 *   - si es infantil
 *   - rol del usuario
 * - Devuelve el token y el perfil activo al frontend.
 */
export const seleccionarPerfil = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { index } = req.body;

  // Validar que se reciba el índice del perfil
  if (index === undefined) {
    res.status(400).json({ message: "Índice de perfil requerido" });
    return;
  }

  try {
    // Verifica autenticación
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

    // Generar token JWT asociado al perfil seleccionado
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

    // Devuelve el nuevo token y el perfil activo
    res.json({
      token,
      perfilActivo: perfil,
      perfilIndex: index
    });
  } catch {
    res.status(500).json({ message: "Error al seleccionar perfil" });
  }
};