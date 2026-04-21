import mongoose from "mongoose";

/**
 * Establece la conexión con la base de datos MongoDB.
 *
 * - Utiliza Mongoose como ODM.
 * - La URI de conexión se obtiene desde la variable de entorno MONGO_URI.
 * - Si la conexión es exitosa, muestra un mensaje informativo por consola.
 * - Si ocurre un error, se muestra el error y se finaliza el proceso
 *   para evitar que la aplicación siga ejecutándose sin base de datos.
 */
export const connectDB = async () => {
  try {
    // Intento de conexión a MongoDB usando la URL definida en el entorno
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error conectando MongoDB", error);
    // Finaliza el proceso para evitar estados inconsistentes
    process.exit(1);
  }
};
