import mongoose, { Document, Schema, Types } from "mongoose";

/**
 * Interfaz que define la estrcutura del documento Book dentro de MongoDB.
 * Se extiende de "Document" para incluir caracteristicas propias de Mongoose
 */
export interface IBook extends Document {
  title: string;
  author: string;
  /**
   * Referencia al usuario propietario del libro
   * Representado mediante ObjectId.
   */
  user: Types.ObjectId;
}

/**
 * Esquema de Mongoose que define la estrcutura y validaciones de
 * la colección "Book"
 */
const BookSchema = new Schema<IBook>(
  {
    /**
     * Titulo del libro (Campo requeridp)
     */
    title: { type: String, required: true },
    /**
     * Autor del libro (campo requerido)
     */
    author: { type: String, required: true },
    /**
     * Id del usuario que posee este libro.
     * Referencia a la colección "User"
     * Campo requerido
     */
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
