import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo conectado");
  } catch (error) {
    console.error("Error al conectar a Mongo");
    process.exit(1);
  }
};
