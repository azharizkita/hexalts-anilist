import {
  Badge,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AddToCollectionButton } from "@/components/MovieDetails/AddToCollectionButton";
import { AddedInCollectionButton } from "@/components/MovieDetails/AddedInCollectionButton";
import { MdArrowBackIosNew } from "react-icons/md";
import { ShareButton } from "@/components/ShareButton";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { PageLoader } from "../PageLoader";

export const AnimeDetailsPage = () => {
  const { animeData } = useAnimeDetailsContext();

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
  } = animeData ?? {};

  const { push } = useRouter();
  const status = _status?.toLowerCase();
  const adultry = isAdult ? "Yes" : "No";
  const [isLarge] = useMediaQuery("(min-width: 625px)");

  if (!animeData) {
    return <PageLoader />;
  }

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
          title={title?.romaji}
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
