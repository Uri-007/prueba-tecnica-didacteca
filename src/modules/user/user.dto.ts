/**
 * DTO para la creacion de un usuario
 * Representa la estructura que se requiere para crear un nuevo usuario
 */
export class CreateUserInput {
  name!: string;
  email!: string;
}

/**
 * DTO para la actualización de usuarios
 * Este permite actualizar uno o varios campos de un usuario ya existente
 */
export class UpdateUserInput {
  id!: string;
  name?: string;
  email?: string;
}
