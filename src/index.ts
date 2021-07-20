import "module-alias/register";
import "reflect-metadata";
import { QuestionResolver } from "@resolvers/QuestionResolver";
import { UserResolver } from "@resolvers/UserResolver";
import { getUserFromToken } from "@utils/AuthHelpers";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { execute, subscribe } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

(async () => {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [QuestionResolver, UserResolver],
    });
    const apolloServer = new ApolloServer({
        schema,
        context: async ({ req, res }) => {
            let token = req.cookies["token"];

            if (!token) {
                return { req, res };
            }

            try {
                const user = await getUserFromToken(token);
                return { user, req, res };
            } catch {
                return { req, res };
            }
        },
    });
    await apolloServer.start();
    const app = express();
    app.use(cookieParser());
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: [
                "http://localhost:3000",
                "https://studio.apollographql.com",
            ],
            credentials: true,
        },
    });
    new PubSub();
    const server = createServer(app);
    server.listen(4000, () => {
        console.log("🚀  Server ready at http://localhost:4000/graphql");
        new SubscriptionServer(
            {
                execute,
                subscribe,
                schema,
            },
            {
                server,
                path: "/subscriptions",
            }
        );
    });
})();
