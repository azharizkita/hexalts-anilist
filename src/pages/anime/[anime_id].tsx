import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useGetAnimeDetails } from "@/hooks/useGetAnimeDetails";
import { AnimeDetails } from "@/queries/getAnimeDetails";
import { MdPlaylistPlay } from "react-icons/md";

const AnimeDetailsPage = ({
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
}: Partial<AnimeDetails>) => {
  const status = _status?.toLowerCase();
  const adultry = isAdult ? "Yes" : "No";
  return (
    <Flex direction="column" overflow="auto" h="100%" w="full" gap="1em">
      <Flex h="12em" w="full" overflow="hidden" flexShrink={0}>
        <Image
          objectFit="cover"
          w="full"
          src={bannerImage}
          alt="anime-banner"
        />
      </Flex>
      <Flex px="1em" gap="1em">
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
            src={coverImage?.large}
            alt="anime-banner"
          />
        </Flex>
        <Flex direction="column" gap="0.5em" w="full">
          <Heading fontSize="2xl">{title?.romaji}</Heading>
          <SimpleGrid columns={2} spacing="0.5em" fontSize="sm" maxW="300px">
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
      </Flex>
      <Divider />
      <Flex justify="space-around" align="center">
        <Flex direction="column" w="fit-content" align="center">
          <Text fontSize="2xl" fontWeight="bold">
            {averageScore} / 100
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Rating
          </Text>
        </Flex>
        <Button leftIcon={<Icon boxSize="1.5em" as={MdPlaylistPlay} />}>
          Add to collection
        </Button>
      </Flex>
      <Divider />
      <Container maxW="container.xl" as={Flex} flexDirection="column" gap="1em">
        <Heading as="h2" fontSize="2xl">
          Genres
        </Heading>
        <Flex
          wrap="wrap"
          gap="0.5em"
          justify="space-evenly"
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
  return (
    <>
      <NextSeo title={data?.title.romaji} description={data?.description} />
      <AnimeDetailsPage {...data} />
    </>
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
