import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "../book/book.model";

/**
 *Interfaz que define la estructura del documento User dentro de MongoDB
 *Extiende de "Document" para incluir las propiedades y métodos propios de Mongoose
 */
export interface IUser extends Document {
  name: string;
  email: string;
  /**
   * Lista de libros asociados al usuario
   */
  books: IBook[];
}

/**
 * Esquema de Mongoose para la colección de usuarios
 * Define la estructura, validaciones y relaciones del documento
 */
const UserSchema = new Schema<IUser>(
  {
    /**Nombre del usuario (Campo requerido) */
    name: { type: String, required: true },
    /**Correo electronico del usuario (Debe ser unico y es requerido) */
    email: { type: String, required: true, unique: true },
    /**
     * Relacion con los libros
     * Contiene ObjetosIds que referencian documentos de la colección "Book"
     */
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
