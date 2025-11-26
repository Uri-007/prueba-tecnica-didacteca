import mongoose from "mongoose";

/**
 * Valida si una cadena corresponde a un ObjectId valido en MongoDB
 * @param id - Cadena que representa el identificador a validar
 * @returns "true" si el ID tiene un formato válido; de lo contrario "false"
 */
export const validateId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};
