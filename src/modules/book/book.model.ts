import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  user: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
