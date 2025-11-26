import mongoose from "mongoose";

/**
 * Establece la conexión con la base de datos MongoDB utilizando Mongoose.
 *
 * La URI de conexión se obtiene desde la variable de entorno `MONGO_URI`.
 * En caso de que la conexión falle, se captura el error, se registra un mensaje
 * descriptivo en consola y el proceso se finaliza con código de salida `1`.
 *
 * @async
 * @function connectDb
 * @returns {Promise<void>} No retorna ningún valor. Solo intenta establecer la conexión.
 *
 * @example
 * // Llamar esta función al iniciar el servidor:
 * await connectDb();
 *
 * @throws Termina la ejecución del proceso si ocurre un error durante la conexión.
 */
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo conectado");
  } catch (error) {
    console.error("Error al conectar a Mongo");
    process.exit(1);
  }
};
