const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const startServer = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  // Connecting server with mongodb using mongoose
  try {
    const res = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    );
  } catch (err) {
    console.error(`Error connecting to mongo ${err}`);
  }

  // Creating a new apollo server with playground
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
  });

  const app = express();

  await server.start();

  server.applyMiddleware({ app });

  app.use(express.json());

  app.use("/api", routes);

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

  if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
  }

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startServer();
