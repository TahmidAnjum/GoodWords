import express from "express";
import createApolloGraphQLServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());

const startServer = async () => {
  app.get("/", (req, res) => {
    res.json({ msg: "Server is up and running" });
  });
  app.use("/graphql", expressMiddleware(await createApolloGraphQLServer()));

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startServer();
