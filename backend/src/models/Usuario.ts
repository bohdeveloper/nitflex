import { Schema, model } from "mongoose";

const perfilSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ""
    },
    edadAdulto: {
      type: Number,
      default: 18
    },
    esInfantil: {
      type: Boolean,
      default: false
    },
    favoritos: {
      type: [Number], // IDs de TMDB
      default: []
    },
    historial: {
      type: [
        {
          tmdbId: Number,
          progreso: Number // porcentaje visto
        }
      ],
      default: []
    },
    preferencias: {
      type: [String], // géneros: action, comedy...
      default: []
    },
    idiomaPerfil: {
      type: String,
      default: "es"
    }
  },
  { _id: false }
);

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    nombreCompleto: {
      type: String,
      default: ""
    },
    fechaNacimiento: {
      type: Date
    },
    edad: {
      type: Number
    },
    pais: {
      type: String,
      default: "ES"
    },
    idioma: {
      type: String,
      default: "es"
    },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    verificado: {
      type: Boolean,
      default: false
    },
    activo: {
      type: Boolean,
      default: true
    },
    ultimoLogin: {
      type: Date
    },
    perfiles: {
      type: [perfilSchema],
      default: []
    }
  },
  { timestamps: true }
);

export const Usuario = model("Usuario", usuarioSchema);