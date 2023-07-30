import type { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  title: undefined,
  titleTemplate: "%s | Hexalts x AniList",
  defaultTitle: "Hexalts x AniList",

  description: "The best watchlister site ever for your inner weebs",

  additionalMetaTags: [
    {
      name: "viewport",
      content:
        "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no",
    },
  ],
  additionalLinkTags: [{
    rel: "icon",
    href: "/favicon.ico"
  }],
  twitter: {
    cardType: "summary_large_image",
  },
};
