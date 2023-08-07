import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useGetAnimeDetails } from "@/hooks/useGetAnimeDetails";
import { CollectionContextProvider } from "@/context/collection";
import { AnimeDetailsContextProvider } from "@/context/animeDetails";
import { useEffect } from "react";
import { AnimeDetails } from "@/types";
import { GetServerSideProps } from "next";
import { anilistClient } from "@/config/apolloClient";
import {
  AnimeDetailsProps,
  GET_ANIME_DETAILS,
} from "@/queries/getAnimeDetails";
import { AnimeDetailsPage } from "@/components/MovieDetails/AnimeDetailsPage";
import dynamic from "next/dynamic";

const DynamicAnimeDetailsPage = dynamic(
  () => Promise.resolve(AnimeDetailsPage),
  { ssr: false }
);

export default function AnimeDetail({ seoData }: { seoData?: AnimeDetails }) {
  const { query, push } = useRouter();
  const { anime_id } = query;

  const animeId = anime_id as string;
  const { data, error } = useGetAnimeDetails({ id: animeId });

  const seoTitle = seoData ? seoData.title.romaji : data?.title.romaji;
  const seoDescription = seoData ? seoData.description : data?.description;
  const seoImage = seoData
    ? seoData.coverImage.extraLarge
    : data?.coverImage.extraLarge;

  useEffect(() => {
    if (!error) {
      return;
    }
    push("/404");
  }, [error]);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          images: [
            {
              url: seoImage ?? "https://hexalts-anilist.vercel.app/banner.png",
            },
          ],
        }}
      />
      <CollectionContextProvider>
        <AnimeDetailsContextProvider animeData={data ?? undefined}>
          <DynamicAnimeDetailsPage />
        </AnimeDetailsContextProvider>
      </CollectionContextProvider>
    </>
  );
}

interface ErrorResponse {
  message: string;
  status: number;
}

// i am completely aware that serverside props might suits better for
// SEO improvements. but after reading the API limitation at:
//
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting
//
// I decided to make additional condition so the page would act normally
// when server side achieve rate limit.
//
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params?.anime_id) {
      const animeId = params.anime_id as string;
      const { data } = await anilistClient.query<AnimeDetailsProps>({
        query: GET_ANIME_DETAILS,
        variables: { id: animeId },
      });
      return {
        props: {
          seoData: data.Media,
          notFound: false,
        },
      };
    }
  } catch (err) {
    // @ts-ignore
    const errors = err.graphQLErrors as ErrorResponse[];

    // normal behavior but returns no SEO data
    // https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting
    if (errors?.some((error) => error.status === 429)) {
      return {
        props: {
          notFound: false,
        },
      };
    }

    // not found
    if (errors?.some((error) => error.status === 404)) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    // trigger ISR page
    throw new Error("Something went wrong");
  }

  return {
    props: {},
  };
};
