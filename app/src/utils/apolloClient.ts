import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

const webSocketLink = process.browser
    ? new WebSocketLink({
          uri: "ws://localhost:4000/subscriptions",
          options: {
              reconnect: true,
          },
      })
    : null;

const link = process.browser
    ? split(
          ({ query }) => {
              const def = getMainDefinition(query);
              return (
                  def.kind === "OperationDefinition" &&
                  def.operation === "subscription"
              );
          },
          webSocketLink,
          httpLink
      )
    : httpLink;

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
