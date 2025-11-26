import { CreateUserInput, UpdateUserInput } from "./user.dto";
import User from "./user.model";
import Book from "../book/book.model";
import { validateId } from "../../common/validators/validateId";
import { AppError } from "../../common/exceptions/AppError";

/**
 * Servicio encargado de gestionar las operaciones relacionadas con usuarios.
 * Implementa la lógica de negocio y se comunica directamente con los modelos de Mongoose
 */
export class UserService {
  /**
   * Crea un nuevo usuario en la base de datos.
   * Valida que el email no exista previamente
   * @param data - Datos requeridos para crear a un usuario
   * @throws AppError - EMAIL_ALREADY_EXISTS si el correo ya está registrado.
   * @returns El usuario creado
   */
  async create(data: CreateUserInput) {
    const exists = await User.findOne({ email: data.email });

    if (exists) {
      throw new AppError("EMAIL_ALREADY_EXISTS");
    }

    return await User.create(data);
  }

  /**
   * Obtiene los usuarios registrados.
   * Incluye la relación con "Books" mediante "pupulate"
   * @returns Lista de usuarios
   */
  async findAll() {
    return await User.find().populate("books");
  }

  /**
   * Obtiene un usuario por su ID
   * Valida que el ID sea correcto y que el usuario exista.
   * @param id - Identificador del usuario.
   * @throws AppError - INVALID_ID si el formato del ID no es válido.
   * @throws AppError - USER_NOT_FOUND si no existe un usuario con ese ID.
   * @returns Usuario encontrado
   */
  async findById(id: string) {
    if (!validateId(id)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(id).populate("books");
    if (!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    return user;
  }

  /**
   * Actualiza los datos de un usuario existente.
   * Realiza validaciones de ID y de existencia
   * @param data - Contiene el ID y los campos a actualizar
   * @throws AppError - INVALID_ID si el ID no tiene un formato válido.
   * @throws AppError - USER_NOT_FOUND si no se encuentra el usuario.
   * @returns Usuario Actualizado
   */

  async update(data: UpdateUserInput) {
    if (!validateId(data.id)) {
      throw new AppError("INVALID_ID");
    }

    const updated = await User.findByIdAndUpdate(data.id, data, { new: true });
    if (!updated) {
      throw new AppError("USER_NOT_FOUND");
    }

    return updated;
  }

  /**
   * Elimina un usuario de la base de datos.
   * También elimina todos los libros asociados al usuario
   * @param id -ID del usuario a eliminar.
   * @throws AppError - INVALID_ID si el ID no es válido.
   * @throws AppError - USER_NOT_FOUND si no existe el usuario.
   * @returns Mensaje de confirmación de eliminacion
   */
  async delete(id: string) {
    if (!validateId(id)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    //Eliminacion en cascada de los libros relacionados al usuario
    await Book.deleteMany({ user: id });

    //Eliminación del usuario
    await User.findByIdAndDelete(id);

    return "Usuario eliminado.";
  }
}
