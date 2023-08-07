import {
  Badge,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useGetAnimeDetails } from "@/hooks/useGetAnimeDetails";
import { AddToCollectionButton } from "@/components/MovieDetails/AddToCollectionButton";
import { CollectionContextProvider } from "@/context/collection";
import { AnimeDetailsContextProvider } from "@/context/animeDetails";
import { AddedInCollectionButton } from "@/components/MovieDetails/AddedInCollectionButton";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect } from "react";
import { AnimeDetails } from "@/types";
import { ShareButton } from "@/components/ShareButton";
import { GetServerSideProps } from "next";
import { anilistClient } from "@/config/apolloClient";
import {
  AnimeDetailsProps,
  GET_ANIME_DETAILS,
} from "@/queries/getAnimeDetails";

const AnimeDetailsPage = (props: AnimeDetails) => {
  const {
    title,
    coverImage,
    bannerImage,
    status: _status,
    episodes,
    averageScore,
    duration,
    isAdult,
    description,
    genres,
  } = props;

  const { push } = useRouter();
  const status = _status?.toLowerCase();
  const adultry = isAdult ? "Yes" : "No";
  const [isLarge] = useMediaQuery("(min-width: 625px)");

  return (
    <Flex direction="column" overflow="auto" h="100%" w="full" gap="2em">
      <Flex
        h="14em"
        w="full"
        overflow="hidden"
        flexShrink={0}
        position="relative"
      >
        <IconButton
          position="absolute"
          top="1em"
          left="1em"
          onClick={() => push("/anime")}
          size="sm"
          icon={<MdArrowBackIosNew />}
          shadow="md"
          borderRadius="full"
          aria-label="Remove"
        />
        <Image
          objectFit="cover"
          w="full"
          src={bannerImage}
          alt="anime-banner"
        />
        <ShareButton
          title={title.romaji}
          description={description}
          aria-label="share-button"
          position="absolute"
          top="1em"
          right="1em"
        />
      </Flex>
      <Container maxW="container.xl" as={Flex} gap="1em">
        <Flex
          transform="translateY(-30%)"
          borderRadius="xl"
          borderWidth="thick"
          shadow="lg"
          h="205px"
          minW="145px"
          overflow="hidden"
        >
          <Image
            objectFit="cover"
            w="full"
            src={coverImage?.extraLarge}
            alt="anime-banner"
          />
        </Flex>
        <Flex direction="column" gap="0.5em" w="full">
          <Heading fontSize="2xl">{title?.romaji}</Heading>
          <SimpleGrid columns={2} spacing="0.25em" fontSize="sm" maxW="300px">
            <Text color="gray.500">Status</Text>
            <Text textTransform="capitalize">{status}</Text>
            <Text color="gray.500">Ep. duration</Text>
            <Text>{duration} minutes</Text>
            <Text color="gray.500">Episodes</Text>
            <Text textTransform="capitalize">{episodes}</Text>
            <Text color="gray.500">Adultery</Text>
            <Badge w="fit-content" colorScheme={isAdult ? "red" : "gray"}>
              {adultry}
            </Badge>
          </SimpleGrid>
        </Flex>
      </Container>
      <Divider />
      <Container
        maxW="container.xl"
        as={Flex}
        justify="space-evenly"
        align="center"
        gap="1em"
        w="100%"
      >
        <Flex direction="column" w="fit-content" align="center">
          <Text fontSize="2xl" fontWeight="bold">
            {averageScore} / 100
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Rating
          </Text>
        </Flex>
        <Flex direction="column" gap="0.5em">
          <AddToCollectionButton />
          <AddedInCollectionButton />
        </Flex>
      </Container>
      <Divider />
      <Container maxW="container.xl" as={Flex} flexDirection="column" gap="1em">
        <Heading as="h2" fontSize="2xl">
          Genres
        </Heading>
        <Flex
          wrap="wrap"
          gap="0.5em"
          justify={isLarge ? "start" : "center"}
          w="full"
          fontSize="sm"
        >
          {genres?.map((genre, i) => (
            <Flex key={i}>
              <Badge w="fit-content" colorScheme={isAdult ? "red" : "gray"}>
                {genre}
              </Badge>
            </Flex>
          ))}
        </Flex>
      </Container>
      <Container
        maxW="container.xl"
        as={Flex}
        flexDirection="column"
        gap="1em"
        pb="1em"
      >
        <Heading as="h2" fontSize="2xl">
          Synopsys
        </Heading>
        <Text
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
          textAlign="justify"
        />
      </Container>
    </Flex>
  );
};

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

  if (!data) {
    return (
      <Flex
        h="full"
        w="full"
        direction="column"
        justify="center"
        align="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <CollectionContextProvider>
      <AnimeDetailsContextProvider animeData={data}>
        <NextSeo
          title={seoTitle}
          description={seoDescription}
          openGraph={{
            images: [
              {
                url:
                  seoImage ?? "https://hexalts-anilist.vercel.app/banner.png",
              },
            ],
          }}
        />
        <AnimeDetailsPage {...data} />
      </AnimeDetailsContextProvider>
    </CollectionContextProvider>
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
