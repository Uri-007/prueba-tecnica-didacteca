import { GraphQLError } from "graphql";
import { ERROR_CODES, ErrorCode } from "../errors/message-codes";

/**
 * Clase personalizada para el manejo de errores dentro del ecosistema GraphQL.
 * Esta clase extiende `GraphQLError` para permitir el envío de errores
 * controlados hacia el cliente, incluyendo:
 *  - Código de error interno (`extensions.code`)
 *  - Código HTTP recomendado (`extensions.http.status`)
 *  - Mensaje definido en una tabla centralizada (`ERROR_CODES`)
 *
 * Su objetivo es estandarizar el manejo de errores, evitar mensajes
 * genéricos y proporcionar respuestas consistentes a todos los clientes.
 */
export class AppError extends GraphQLError {
  /**
   * Crea una instancia de error personalizada a partir de un codigo interno.
   * @param code - Codigo de error definido en "ErrorCode", el cual se utiliza para recuperar mensaje y
   * status HTTP desde "ERROR_CODEs"
   */
  constructor(code: ErrorCode) {
    super(ERROR_CODES[code].message, {
      extensions: {
        code,
        http: { status: ERROR_CODES[code].status },
      },
    });
  }
}
