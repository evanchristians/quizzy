import "reflect-metadata";
import "module-alias/register";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { QuestionResolver } from "@resolvers/QuestionResolver";

(async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [QuestionResolver],
    });

    const server = new ApolloServer({ schema });

    await server
        .listen()
        .then(({ url }) => console.log(`🚀  Server ready at ${url}`));
})();
