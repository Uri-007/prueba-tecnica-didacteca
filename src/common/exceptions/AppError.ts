import { GraphQLError } from "graphql";
import { ERROR_CODES, ErrorCode } from "../errors/message-codes";

export class AppError extends GraphQLError {
  constructor(code: ErrorCode) {
    super(ERROR_CODES[code].message, {
      extensions: {
        code,
        http: { status: ERROR_CODES[code].status },
      },
    });
  }
}
