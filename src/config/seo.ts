import type { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  title: undefined,
  titleTemplate: "%s | Hexalts AniList",
  defaultTitle: "Hexalts AniList",

  description: "The best site for your inner weebs",

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
