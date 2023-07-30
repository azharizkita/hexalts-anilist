import { Html, Head, Main, NextScript } from "next/document";
import { MainLayout } from "@/components/MainLayout";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <MainLayout>
          <Main />
        </MainLayout>
        <NextScript />
      </body>
    </Html>
  );
}
