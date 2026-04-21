import { Schema, model } from "mongoose";

/**
 * Esquema de un perfil dentro de un usuario.
 *
 * - Cada usuario puede tener varios perfiles (estilo Netflix).
 * - Se usan subdocumentos embebidos para simplificar consultas.
 * - _id se desactiva porque los perfiles se gestionan por índice.
 */
const perfilSchema = new Schema(
  {
    // Nombre visible del perfil
    nombrePerfil: {
      type: String,
      required: true
    },

    // Ruta del avatar asociado al perfil
    avatar: {
      type: String,
      default: ""
    },

    // Indica si el perfil es infantil
    esInfantil: {
      type: Boolean,
      default: false
    },

    // Lista de contenidos marcados como favoritos (IDs de TMDB)
    favoritos: {
      type: [Number],
      default: []
    },

    // Historial de visualización del perfil
    historial: {
      type: [
        {
          tmdbId: Number,   // ID del contenido en TMDB
          progreso: Number // Porcentaje visto
        }
      ],
      default: []
    },

    // Preferencias del perfil (géneros, categorías, etc.)
    preferencias: {
      type: [String],
      default: []
    },

    // Idioma preferido del perfil
    idiomaPerfil: {
      type: String,
      default: "es"
    },

    // Fecha de creación del perfil
    fechaCreacion: {
      type: Date,
      default: Date.now
    }
  },
  {
    // Evita que Mongoose genere un _id para cada perfil
    _id: false
  }
);

/**
 * Esquema principal del usuario.
 *
 * - Contiene datos de autenticación, información personal
 *   y los perfiles asociados al usuario.
 * - Usa timestamps para auditoría (createdAt / updatedAt).
 */
const usuarioSchema = new Schema(
  {
    // Email del usuario (único y normalizado)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    // Contraseña hasheada (bcrypt)
    password: {
      type: String,
      required: true
    },

    // Datos personales
    nombre: {
      type: String,
      required: true
    },
    apellido1: {
      type: String,
      required: true
    },
    apellido2: {
      type: String,
      required: true
    },

    // Fecha de nacimiento del usuario
    fechaNacimiento: {
      type: Date,
      required: true
    },

    // Edad calculada o almacenada (opcional)
    edad: {
      type: Number
    },

    // País del usuario
    pais: {
      type: String,
      default: "ES"
    },

    // Idioma principal del usuario
    idioma: {
      type: String,
      default: "es"
    },

    // Rol del usuario dentro de la aplicación
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // Indica si el usuario ha verificado su cuenta
    verificado: {
      type: Boolean,
      default: false
    },

    // Indica si la cuenta está activa
    activo: {
      type: Boolean,
      default: true
    },

    // Fecha de registro del usuario
    fechaRegistro: {
      type: Date,
      default: Date.now
    },

    // Última fecha de inicio de sesión
    ultimoLogin: {
      type: Date
    },

    // Perfiles asociados al usuario
    perfiles: {
      type: [perfilSchema],
      default: []
    }
  },
  {
    // Añade automáticamente createdAt y updatedAt
    timestamps: true
  }
);

/**
 * Modelo Usuario.
 *
 * - Representa a un usuario completo del sistema.
 * - Incluye autenticación, perfiles y preferencias.
 */
export const Usuario = model("Usuario", usuarioSchema);