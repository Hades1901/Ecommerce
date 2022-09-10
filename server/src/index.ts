import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectReids from "connect-redis";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";

import cors from "cors";
import { Product } from "./Entities/Product";
import { User } from "./Entities/User";
import { ProductResolver } from "./Resolver/PostResolver";
import { TestResolver } from "./Resolver/Test";
import { UserResolver } from "./Resolver/UserResolver";
import { Context } from "./Type/Contain";
import { COOKIE_NAME } from "./Utils/Contain";

dotenv.config();

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  new DataSource({
    type: "postgres",
    database: "Ecommerce",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User, Product],
  })
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const RedisStore = connectReids(session);
  const redis = new Redis(process.env.REDIS_URL as string);

  app.use(
    session({
      name: COOKIE_NAME,
      secret: process.env.MY_SECRET as string,
      store: new RedisStore({ client: redis, disableTouch: true }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TestResolver, ProductResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.listen(port, () =>
    console.log(
      `Server started on port${port} , Graphql started on localhost : ${port}${apolloServer.graphqlPath}`
    )
  );
};

main().catch((err) => {
  console.log(err);
});
