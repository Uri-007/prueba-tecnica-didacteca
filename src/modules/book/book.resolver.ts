import { BookService } from "./book.service";
import { CreateBookInput, UpdateBookInput } from "./book.dto";

/**
 * Resolver de GraphQL para las colecciones relacionadas con libros.
 * Conecta la queries y mutaciones definidas en el esquema con
 * la logica implementada en "BookService"
 */

export const bookResolver = {
  /**
   * Definicion de consutas (Queries) disponibles en GraphQL
   */
  Query: {
    /**
     * Obtiene los libros asociados a un usuario especifico.
     * @param _ - Argumento no utilizado del root
     * @param args - Contiene el "userId" del propietario
     * @returns Lista de libros del usuario
     */
    booksByUser: (_: unknown, args: { userId: string }) =>
      new BookService().findByUser(args.userId),
  },

  /**
   * Definicion de mutaciones disponibles en GraphQL
   */

  Mutation: {
    /**
     * Crea un nuevo libro asociado a un usuario
     * @param _ - Argumento no utilizado del root
     * @param args - Contiene el inputo con la información para crear un libro
     * @returns Libro creado
     */
    createBook: (_: unknown, args: { input: CreateBookInput }) =>
      new BookService().create(args.input),

    /**
     * Actualiza los datos de un libro existente
     * @param _ - Argumento no utilizado del root
     * @param args - Contiene el ID y los campos a actualizar.
     * @returns Libro actualizado
     */
    updateBook: (_: unknown, args: { input: UpdateBookInput }) =>
      new BookService().update(args.input),

    /**
     * Elimina un libro segun su ID
     * @param _ - Argumento no utilizado en el root
     * @param args - Contiene el ID del libro a eliminar
     * @returns Mensaje de confirmación
     */
    deleteBook: (_: unknown, args: { id: string }) =>
      new BookService().delete(args.id),
  },
};
