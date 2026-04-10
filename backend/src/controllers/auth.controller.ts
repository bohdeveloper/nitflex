import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";

/* Buscar el usuario por usuarioId */
export const me = async (req: any, res: Response) => {
  const usuario = await Usuario.findById(req.usuarioId).select("-password");

  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(usuario);
};

/* Crea usuario / Devuelve token / El frontend ya puede guardarlo */
export const registro = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña obligatorios" });
  }

  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const passwordOK = await bcrypt.hash(password, 10);

  const usuario = await Usuario.create({
    nombre,
    email,
    password: passwordOK
  });

  const token = jwt.sign(
    { usuarioId: usuario._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    message: "Usuario creado correctamente",
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email
    }
  });
};

/* Login correcto / Password seguro / Token JWT generado */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }

  const isValid = await bcrypt.compare(password, usuario.password);
  if (!isValid) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { usuarioId: usuario._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    usuario: {
      id: usuario._id,
      email: usuario.email
    }
  });

};