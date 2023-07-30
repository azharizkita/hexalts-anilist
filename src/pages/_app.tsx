import { anilistClient } from "@/config/apolloClient";
import { SEO } from "@/config/seo";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={anilistClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
