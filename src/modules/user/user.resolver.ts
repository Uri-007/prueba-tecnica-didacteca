import { UserService } from "./user.service";
import { CreateUserInput, UpdateUserInput } from "./user.dto";

export const userResolver = {
  Query: {
    users: () => new UserService().findAll(),

    user: (_: unknown, args: { id: string }) =>
      new UserService().findById(args.id),
  },

  Mutation: {
    createUser: (_: unknown, args: { input: CreateUserInput }) =>
      new UserService().create(args.input),

    updateUser: (_: unknown, args: { input: UpdateUserInput }) =>
      new UserService().update(args.input),

    deleteUser: (_: unknown, args: { id: string }) =>
      new UserService().delete(args.id),
  },
};
