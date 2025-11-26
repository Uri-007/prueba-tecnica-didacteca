import { CreateBookInput, UpdateBookInput } from "./book.dto";
import Book from "./book.model";
import User from "../user/user.model";
import { validateId } from "../../common/validators/validateId";
import { AppError } from "../../common/exceptions/AppError";

/**
 * Servicio encargado de gestionar las operaciones relacionadas con un libro.
 * Implementa la logica de negocio y se comunica directamente con los modelos de Mongoose
 */
export class BookService {
  /**
   * Crea un nuevo libro asociado a un usuario.
   * Incluye validación de ID, verificación de existencia del usuario
   * y previene duplicados del mismo título/autor por usuario.
   * @param data - Información necesaria para crear un libro.
   * @throws AppError - INVALID_ID si el ID de usuario no es válido.
   * @throws AppError - USER_NOT_FOUND si el usuario no existe.
   * @throws AppError - BOOK_ALREADY_EXISTS si ya existe un libro igual para el usuario.
   * @returns Libro creado con la relacion "user" poblada
   */
  async create(data: CreateBookInput) {
    if (!validateId(data.userId)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(data.userId);
    if (!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    const exists = await Book.findOne({
      user: data.userId,
      title: data.title,
      author: data.author,
    });

    if (exists) throw new AppError("BOOK_ALREADY_EXISTS");

    //Creación del libro
    let book = await Book.create({
      user: data.userId,
      title: data.title,
      author: data.author,
    });

    //Relación con User (push del libro)
    await User.findByIdAndUpdate(data.userId, { $push: { books: book._id } });

    //Populate del usuario para retornar información completa
    book = await book.populate("user");

    return book;
  }

  /**
   * Actualiza los datos de un libro existente.
   * Verifica el formato del ID y la existencia del recurso
   * @param data - Datos con el ID y los campos a actualizar.
   * @throws AppError - INVALID_ID si el ID no es válido.
   * @throws AppError - BOOK_NOT_FOUND si no existe el libro.
   * @returns Libro actualizado
   */
  async update(data: UpdateBookInput) {
    if (!validateId(data.id)) {
      throw new AppError("INVALID_ID");
    }

    const updated = await Book.findByIdAndUpdate(data.id, data, { new: true });

    if (!updated) {
      throw new AppError("BOOK_NOT_FOUND");
    }

    return updated;
  }

  /**
   * Elimina un libro de la base de datos
   * También actualiza la relacion en el usuario propietario
   * para mover la referencia del libro
   * @param id - ID del libro a eliminar.
   * @throws AppError - INVALID_ID si el ID no es válido.
   * @throws AppError - BOOK_NOT_FOUND si no existe el libro.
   * @returns Mensaje de confirmación
   */
  async delete(id: string) {
    if (!validateId(id)) {
      throw new AppError("INVALID_ID");
    }

    const book = await Book.findById(id);
    if (!book) throw new AppError("BOOK_NOT_FOUND");

    // Remover la referencia en el usuario
    await User.findByIdAndUpdate(book.user, { $pull: { books: id } });

    //Eliminar el libro
    await Book.findByIdAndDelete(id);

    return "Libro eliminado.";
  }

  /**
   * Obtiene los libros asociados a un usuario
   * Incluye validacion de ID y verifiación de existencia del usuario
   * @param userId - Identificador del usuario
   * @throws AppError - INVALID_ID si el ID no es válido.
   * @throws AppError - BOOK_NOT_FOUND si el usuario no existe.
   * @returns Lista de libros pertenecientes al usuario
   */
  async findByUser(userId: string) {
    if (!validateId(userId)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("BOOK_NOT_FOUND");
    }

    return await Book.find({ user: userId });
  }
}
