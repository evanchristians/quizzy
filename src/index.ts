import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "_resolvers/BookResolver";

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [BookResolver],
    });
    const server = new ApolloServer({ schema });

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};

main();
