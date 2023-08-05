import type { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  title: undefined,
  titleTemplate: "%s | Hexalts x AniList",
  defaultTitle: "Hexalts x AniList",
  openGraph: {
    images: [
      {
        url: "https://hexalts-anilist.vercel.app/banner.png",
        alt: "Hexalts x AniList",
      },
    ],
  },
  description:
    "Discover the ultimate watchlist site tailored for avid anime enthusiasts and passionate weebs. Unleash your inner otaku as you explore a curated collection of must-watch series and films. Elevate your anime experience with the best watchlist platform designed to cater to your anime cravings.",

  additionalMetaTags: [
    {
      name: "viewport",
      content:
        "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "any",
    },
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  twitter: {
    cardType: "summary_large_image",
  },
};
