/**
 * Mapa centralizado de códigos de error utilizados en toda la aplicación.
 *
 * Cada entrada define:
 *  - `message`: Descripción legible del error que se enviará al cliente.
 *  - `status`: Código HTTP sugerido que representa el tipo de error.
 *
 * Este esquema permite:
 *  - Estandarizar la forma en la que se reportan errores.
 *  - Evitar mensajes hardcodeados dispersos en el código.
 *  - Mantener un catálogo claro y mantenible de todos los errores del sistema.
 */
export const ERROR_CODES = {
  /**
   * ID proporcionado no es válido o no cumple el formato de ObjectId.
   */
  INVALID_ID: {
    message: "Parámetros de entrada inválidos",
    status: 400,
  },

  /**
   * No se encontró un usuario con el ID proporcionado.
   */
  USER_NOT_FOUND: {
    message: "Usuario no encontrado",
    status: 404,
  },

  /**
   * No se encontró un libro con el ID proporcionado.
   */
  BOOK_NOT_FOUND: {
    message: "Libro no encontrado",
    status: 404,
  },

  /**
   * Falta el usuario requerido para procesar la operación.
   */
  USER_REQUIRED: {
    message: "El usuario es obligatorio",
    status: 400,
  },

  /**
   * Ya existe un libro con el mismo título y autor para el mismo usuario.
   */
  BOOK_ALREADY_EXISTS: {
    message: "El libro ya existe para este usuario",
    status: 409,
  },

  /**
   * Error inesperado o no controlado dentro del servidor.
   */
  INTERNAL_ERROR: {
    message: "Ocurrió un error interno",
    status: 500,
  },

  /**
   * Ya existe un usuario registrado con el email proporcionado.
   * (El mensaje es genérico apropósito para no exponer datos sensibles).
   */
  EMAIL_ALREADY_EXISTS: {
    message: "No se pudo completar la operación",
    status: 409,
  },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
