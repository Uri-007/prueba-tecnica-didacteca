import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDb } from "./database/database";
import fs from "fs";
import path from "path";
import { userResolver } from "./modules/user/user.resolver";
import { bookResolver } from "./modules/book/book.resolver";

export const startServer = async () => {
  await connectDb();

  const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers: [userResolver, bookResolver],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
  });

  console.log("Servidor listo en", url);
};
