import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import theme from "../theme";
import client from "../utils/apolloClient";
import OnlineUserWrapper from "../utils/onlineUserWrapper";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ChakraProvider resetCSS theme={theme}>
                <OnlineUserWrapper>
                    <Component {...pageProps} />
                </OnlineUserWrapper>
            </ChakraProvider>
        </ApolloProvider>
    );
}

export default MyApp;
