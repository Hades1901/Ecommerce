import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins/700.css";
import { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import theme from "../theme";

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[Graphql error]:Message:${message} , Location : ${locations} , Path : ${path}`
      );
    });
  if (networkError) console.log(`[Netword error] :${networkError}`);
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  cache: cache,
  credentials: "include",
  link: ApolloLink.from([errorLink, httpLink]),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
