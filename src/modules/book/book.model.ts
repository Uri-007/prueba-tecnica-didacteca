import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  user: Types.ObjectId;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
