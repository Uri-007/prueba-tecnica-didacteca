import { CreateBookInput, UpdateBookInput } from "./book.dto";
import Book from "./book.model";
import User from "../user/user.model";
import { validateId } from "../../common/validators/validateId";
import { AppError } from "../../common/exceptions/AppError";

export class BookService {
  async create(data: CreateBookInput) {
    if (!validateId(data.userId)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(data.userId);
    if (!user) {
      throw new AppError("BOOK_NOT_FOUND");
    }

    const exists = await Book.findOne({
      user: data.userId,
      title: data.title,
      author: data.author,
    });

    if (exists) throw new AppError("BOOK_ALREADY_EXISTS");

    const book = await Book.create({
      user: data.userId,
      title: data.title,
      author: data.author,
    });

    await User.findByIdAndUpdate(data.userId, { $push: { books: book._id } });

    return book;
  }

  async update(data: UpdateBookInput) {
    if (!validateId(data.id)) {
      throw new AppError("INVALID_ID");
    }

    const updated = await Book.findByIdAndUpdate(data.id, data, { new: true });

    if (!updated) {
      throw new AppError("BOOK_NOT_FOUND");
    }

    return updated;
  }

  async delete(id: string) {
    if (!validateId(id)) {
      throw new AppError("INVALID_ID");
    }

    const book = await Book.findById(id);
    if (!book) throw new AppError("BOOK_NOT_FOUND");

    await User.findByIdAndUpdate(book.user, { $pull: { books: id } });

    await Book.findByIdAndDelete(id);

    return "Libro eliminado.";
  }

  async findByUser(userId: string) {
    if (!validateId(userId)) {
      throw new AppError("INVALID_ID");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("BOOK_NOT_FOUND");
    }

    return await Book.find({ user: userId });
  }
}
