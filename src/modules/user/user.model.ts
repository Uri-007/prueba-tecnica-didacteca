import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "../book/book.model";

export interface IUser extends Document {
  name: string;
  email: string;
  books: IBook[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.model<IUser>("User", UserSchema);
