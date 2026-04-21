import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Ruta absoluta donde se almacenarán los avatares.
 *
 * - Se construye usando path.join para garantizar compatibilidad
 *   entre sistemas operativos.
 * - Los avatares se guardan en /uploads/avatars.
 */
const uploadDir = path.join(__dirname, "..", "uploads", "avatars");

/**
 * Comprobar si la carpeta de subida existe.
 * Si no existe, se crea de forma recursiva.
 *
 * Esto evita errores al subir archivos
 * en entornos donde la carpeta aún no está creada.
 */
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Configuración del almacenamiento de Multer.
 *
 * - destination: carpeta donde se guardan los archivos.
 * - filename: genera un nombre único para evitar colisiones.
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

/**
 * Filtro de archivos.
 *
 * - Solo permite la subida de archivos de tipo imagen.
 * - Si el archivo no es una imagen, se rechaza la subida.
 */
const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes"));
  }
};

/**
 * Middleware de Multer para subida de avatares.
 *
 * - Usa el almacenamiento configurado.
 * - Aplica el filtro de imágenes.
 * - Limita el tamaño máximo del archivo a 2 MB.
 *
 * Este middleware se utiliza en las rutas
 * que permiten crear o actualizar perfiles.
 */
export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB
  }
});