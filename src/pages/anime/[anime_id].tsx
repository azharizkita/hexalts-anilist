import {
  Badge,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useGetAnimeDetails } from "@/hooks/useGetAnimeDetails";
import { AnimeDetails } from "@/queries/getAnimeDetails";
import { AddToCollectionButton } from "@/components/MovieDetails/AddToCollectionButton";
import { CollectionContextProvider } from "@/context/collection";
import { AnimeDetailsContextProvider } from "@/context/animeDetails";
import { EmptyMessage } from "@/components/base/EmptyMessage";
import { AddedInCollectionButton } from "@/components/MovieDetails/AddedInCollectionButton";

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

  const status = _status?.toLowerCase();
  const adultry = isAdult ? "Yes" : "No";
  const [isLarge] = useMediaQuery("(min-width: 625px)");

  return (
    <Flex direction="column" overflow="auto" h="100%" w="full" gap="2em">
      <Flex h="12em" w="full" overflow="hidden" flexShrink={0}>
        <Image
          objectFit="cover"
          w="full"
          src={bannerImage}
          alt="anime-banner"
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

export default function AnimeDetail() {
  const { query } = useRouter();
  const { anime_id } = query;

  const animeId = anime_id as string;
  const { data } = useGetAnimeDetails({ id: animeId });
  if (!data) {
    return (
      <>
        <NextSeo title="Anime Not Found" />
        <Flex h="full" w="full" direction="column">
          <EmptyMessage />
        </Flex>
      </>
    );
  }
  return (
    <CollectionContextProvider>
      <AnimeDetailsContextProvider animeData={data}>
        <NextSeo title={data.title.romaji} description={data.description} />
        <AnimeDetailsPage {...data} />
      </AnimeDetailsContextProvider>
    </CollectionContextProvider>
  );
}

// i am completely aware that serverside props might suits better for
// SEO improvements. but after reading the API limitation at:
//
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting
//
// I decided not to put the gql in the server side to avoid unintentional
// rate limit blocking.
//
// but here is the code as a prove that I have tried to implement
// SEO improvement via serverside props
//
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   if (params?.anime_id) {
//     const animeId = params.anime_id as string;
//     const { data, error } = await anilistClient.query<AnimeDetails>({
//       query: GET_ANIME_DETAILS,
//       variables: { id: animeId },
//     });
//     if (!error) {
//       return {
//         props: {
//           data,
//           notFound: false,
//         },
//       };
//     }
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     notFound: true,
//   };
// };
