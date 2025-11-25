import { CreateUserInput, UpdateUserInput } from "./user.dto";
import User from "./user.model";
import Book from "../book/book.model";
import { validateId } from "../../common/validators/validateId";
import { AppError } from "../../common/exceptions/AppError";

export class UserService {
  async create(data: CreateUserInput) {
    return await User.create(data);
  }

  async findAll() {
    return await User.find().populate("books");
  }

  async findById(id: string) {
    if (!validateId(id)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(id).populate("books");
    if (!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    return user;
  }

  async update(data: UpdateUserInput) {
    if (!validateId(data.id)) {
      throw new AppError("INVALID_ID");
    }

    const updated = await User.findByIdAndUpdate(data.id, data, { new: true });
    if (!updated) {
      throw new AppError("USER_NOT_FOUND");
    }

    return updated;
  }

  async delete(id: string) {
    if (!validateId(id)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    await Book.deleteMany({ user: id });
    await User.findByIdAndDelete(id);

    return "Usuario eliminado.";
  }
}
