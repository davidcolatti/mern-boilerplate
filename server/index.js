const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  engine: {
    reportSchema: true,
  },
});

const app = express();

server.applyMiddleware({ app });

app.use(bodyParser.json());
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
app.listen(PORT);
