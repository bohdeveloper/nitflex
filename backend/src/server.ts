// Cargar las variables de entorno desde el archivo .env
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

import { app } from "./app";
import { connectDB } from "./config/db";

// Puerto en el que se levantará el servidor
// Se obtiene desde variable de entorno o usa 5000 por defecto
const PORT = process.env.PORT || 5000;

/**
 * Conexión a la base de datos.
 *
 * - Establece la conexión con MongoDB antes de aceptar peticiones.
 * - Si la conexión falla, la aplicación se detiene.
 */
connectDB();

/**
 * Arranque del servidor Express.
 *
 * - Comienza a escuchar peticiones HTTP en el puerto configurado.
 * - Muestra un mensaje informativo en consola al iniciarse correctamente.
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});