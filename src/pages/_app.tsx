import { PageLayout } from "@/components/PageLayout";
import { anilistClient } from "@/config/apolloClient";
import { SEO } from "@/config/seo";
import { theme } from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={anilistClient}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </AnimatePresence>
      </ApolloProvider>
    </ChakraProvider>
  );
}
