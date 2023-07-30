import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const anilistClient = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache,
});
