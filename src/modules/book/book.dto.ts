/**
 * DTO para la creación de libros.
 * Representa la información necesaria para registrar un nuevo libro y
 * asociarlo a un usuario
 */
export class CreateBookInput {
  userId!: string;
  title!: string;
  author!: string;
}

/**
 * DTO para la actualización de libros.
 * PErmite modificar uno o varios campos de un libro existente
 */
export class UpdateBookInput {
  id!: string;
  title?: string;
  author?: string;
}
