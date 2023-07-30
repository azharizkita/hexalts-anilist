import { anilistClient } from "@/config/apolloClient";
import { SEO } from "@/config/seo";
import { theme } from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={anilistClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
