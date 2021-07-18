import "module-alias/register";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import express from "express";
import { QuestionResolver } from "@resolvers/QuestionResolver";
import { UserResolver } from "@resolvers/UserResolver";
import { getUserFromToken } from "@utils/AuthHelpers";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

(async () => {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [QuestionResolver, UserResolver],
    });
    const server = new ApolloServer({
        schema,
        context: async ({ req, res }) => {
            let token = req.cookies["token"];
            const user = await getUserFromToken(token);
            return { req, res, user };
        },
    });
    await server.start();
    const app = express();
    app.use(cookieParser());
    server.applyMiddleware({
        app,
        cors: {
            origin: 'https://studio.apollographql.com',
            credentials: true,
        },
    });
    app.listen({ port: 4000 });
    console.log(
        `🚀  Server ready at http://localhost:4000${server.graphqlPath}`
    );
})();
