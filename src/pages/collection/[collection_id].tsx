import {
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import type { AnimeItem } from "@/queries/getAnimeList";
import {
  CollectionContextProvider,
  useCollectionContext,
} from "@/context/collection";
import { CollectionDeleteModal } from "@/components/Collection/CollectionDeleteModal";
import { CollectionEditModal } from "@/components/Collection/CollectionEditModal";
import { NextSeo } from "next-seo";
import {
  MdArrowBackIosNew,
  MdEdit,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { MovieItem } from "@/components/Movie/MovieItem";

export interface WatchlistItem {
  id: string;
  title: string;
  watchlist: Partial<AnimeItem>[];
}

const CollectionDetailsPage = () => {
  const { query, push } = useRouter();
  const { collection_id } = query;
  const collectionId = collection_id as string | undefined;

  const {
    collections,
    setCollectionToBeEdited,
    removeAnimeItemFromCollection,
  } = useCollectionContext();

  const currentCollection = useMemo(() => {
    return (
      collections.find((collection) => collection.id === collectionId) ?? null
    );
  }, [collectionId, collections]);

  return (
    <>
      <NextSeo title="My collection" />
      <Flex gap="1em" direction="column" overflow="auto" h="full">
        <Flex direction="column" gap="1em">
          <Flex align="center" gap="0.5em">
            <IconButton
              onClick={() => push("/collection")}
              variant="outline"
              size="sm"
              icon={<MdArrowBackIosNew />}
              shadow="md"
              colorScheme="blue"
              borderRadius="full"
              aria-label="Remove"
            />
            <Divider orientation="vertical" />
            <Heading noOfLines={2}>{currentCollection?.title}</Heading>
            <Spacer />
            <IconButton
              onClick={() => setCollectionToBeEdited(currentCollection)}
              size="sm"
              icon={<MdEdit />}
              shadow="md"
              colorScheme="blue"
              borderRadius="full"
              aria-label="Remove"
            />
          </Flex>
          <Divider />
        </Flex>
        <Flex
          direction="column"
          overflow="auto"
          h="100%"
          justify={
            currentCollection?.watchlist.length !== 0 ? "initial" : "center"
          }
        >
          {currentCollection?.watchlist.length !== 0 ? (
            <SimpleGrid
              columns={[2, 3, 4, 5]}
              spacing="1em"
              overflow="auto"
              py="1em"
            >
              {currentCollection?.watchlist.map(
                ({ id, title, coverImage }, i) => {
                  const handleClickItem = () => {
                    if (!id) {
                      return;
                    }
                    removeAnimeItemFromCollection(currentCollection.id, id);
                  };
                  return (
                    <Center key={i} w="100%">
                      <MovieItem
                        onClickDelete={handleClickItem}
                        id={id?.toString()}
                        imageUrl={coverImage?.extraLarge}
                        backgroundColor={coverImage?.color ?? ""}
                        subtitle={title?.native}
                        title={title?.romaji}
                      />
                    </Center>
                  );
                }
              )}
            </SimpleGrid>
          ) : (
            <Flex
              align="center"
              justify="center"
              h="100%"
              gap="0.5em"
              direction="column"
              color="gray.400"
            >
              <Icon fontSize="5xl" as={MdSentimentDissatisfied} />
              <Text>This collection is empty</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default function CollectionDetails() {
  return (
    <CollectionContextProvider>
      <CollectionDetailsPage />
      <CollectionEditModal />
      <CollectionDeleteModal />
    </CollectionContextProvider>
  );
}
