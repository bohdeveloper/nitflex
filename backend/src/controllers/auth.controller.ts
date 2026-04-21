import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";

/**
 * Devuelve los datos del usuario autenticado.
 *
 * - El usuarioId se obtiene previamente desde el JWT
 *   gracias al middleware de autenticación.
 * - No se devuelve la contraseña por seguridad.
 */
export const me = async (req: any, res: Response) => {
  // Buscar el usuario por su ID y excluir el campo password
  const usuario = await Usuario.findById(req.usuarioId).select("-password");

  // Si no existe el usuario, se devuelve un error 404
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // Devuelve la información del usuario autenticado
  res.json(usuario);
};

/**
 * Registro de un nuevo usuario.
 *
 * - Valida que el email no esté ya en uso.
 * - Hashea la contraseña antes de guardarla en base de datos.
 * - Crea el usuario y genera un token JWT.
 * - Devuelve el token para que el frontend lo almacene.
 */
export const registro = async (req: Request, res: Response) => {
  const { nombre, apellido1, apellido2, email, password, fechaNacimiento } = req.body;

  // Comprobar si ya existe un usuario con el mismo email
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Hashea la contraseña antes de guardarla
  const passwordOK = await bcrypt.hash(password, 10);

  // Crear el nuevo usuario en la base de datos
  const usuario = await Usuario.create({
    nombre,
    apellido1,
    apellido2,
    email,
    password: passwordOK,
    fechaNacimiento
  });

  // Generar un token JWT con el id del usuario
  const token = jwt.sign(
    { usuarioId: usuario._id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  // Respuesta con token y datos básicos del usuario
  res.status(201).json({
    message: "Usuario creado correctamente",
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      email: usuario.email,
      password: usuario.password,
      fechaNacimiento: usuario.fechaNacimiento
    }
  });
};

/**
 * Login de usuario existente.
 *
 * - Busca el usuario por email.
 * - Compara la contraseña usando bcrypt.
 * - Si las credenciales son correctas, genera un token JWT.
 * - Devuelve el token para iniciar sesión en el frontend.
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }

  // Comparar la contraseña introducida con la almacenada
  const isValid = await bcrypt.compare(password, usuario.password);
  if (!isValid) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }

  // Generar token JWT si las credenciales son válidas
  const token = jwt.sign(
    { usuarioId: usuario._id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  // Devolver token y datos del usuario
  res.json({
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      email: usuario.email,
      password: usuario.password,
      fechaNacimiento: usuario.fechaNacimiento
    }
  });
};
