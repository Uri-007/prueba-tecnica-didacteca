export const ERROR_CODES = {
  INVALID_ID: {
    message: "Parámetros de entrada inválidos",
    status: 400,
  },

  USER_NOT_FOUND: {
    message: "Usuario no encontrado",
    status: 404,
  },

  BOOK_NOT_FOUND: {
    message: "Libro no encontrado",
    status: 404,
  },

  USER_REQUIRED: {
    message: "El usuario es obligatorio",
    status: 400,
  },

  BOOK_ALREADY_EXISTS: {
    message: "El libro ya existe para este usuario",
    status: 409,
  },

  INTERNAL_ERROR: {
    message: "Ocurrió un error interno",
    status: 500,
  },
  EMAIL_ALREADY_EXISTS: {
    message: "No se pudo completar la operación",
    statusCode: 409,
  },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
