import { UserService } from "./user.service";
import { CreateUserInput, UpdateUserInput } from "./user.dto";

/**
 * Resolver GraphQL para las operaciones relacionadas con usuarios
 * Conecta las consultas y mutaciones definidas en el esquema GraphQL con
 * los metodos expuestos por el servicio "UserService"
 */

export const userResolver = {
  /**
   * Definicion de consutas (Queries) disponibles en GraphQL
   */
  Query: {
    /**
     * Obtiene la lista completa de usuarios
     * @returns Lista de uruarios
     */
    users: () => new UserService().findAll(),

    /**
     * Obtiene un usuario por su identificador unico (_id)
     * @param _ - Argumento no utilizado del root
     * @param args - Contiene el ID del usuario a consultar
     * @returns Usuario correspondiente al ID proporcionado
     */
    user: (_: unknown, args: { id: string }) =>
      new UserService().findById(args.id),
  },

  /**
   * Definicion de mutaciones disponibles en GraphQL
   */

  Mutation: {
    /**
     * Crea un nuevo usuario en la Base de datos
     * @param _ - Argumento no utilizado en el root
     * @param args - Contiene el input con la información de usuario
     * @returns Usuario creado
     */
    createUser: (_: unknown, args: { input: CreateUserInput }) =>
      new UserService().create(args.input),

    /**
     * Actualiza los datos de un usuario existente
     * @param _ - Argumento no utilizado en el root
     * @param args - Contiene el input con los campos a actualizar
     * @returns Usuario actualizado
     */
    updateUser: (_: unknown, args: { input: UpdateUserInput }) =>
      new UserService().update(args.input),

    /**
     * Elimina un usuario segun su ID
     * @param _ -Argumento no utilizado en el root
     * @param args - Contiene el ID del usuario a eliminar
     * @returns Resultado de la operación de eiminación
     */
    deleteUser: (_: unknown, args: { id: string }) =>
      new UserService().delete(args.id),
  },
};
