import { BookService } from "./book.service";
import { CreateBookInput, UpdateBookInput } from "./book.dto";

export const bookResolver = {
  Query: {
    booksByUser: (_: unknown, args: { userId: string }) =>
      new BookService().findByUser(args.userId),
  },

  Mutation: {
    createBook: (_: unknown, args: { input: CreateBookInput }) =>
      new BookService().create(args.input),

    updateBook: (_: unknown, args: { input: UpdateBookInput }) =>
      new BookService().update(args.input),

    deleteBook: (_: unknown, args: { id: string }) =>
      new BookService().delete(args.id),
  },
};
