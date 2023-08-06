import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
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
import { useEffect, useMemo, useState } from "react";
import { MovieItem } from "@/components/Movie/MovieItem";
import { Modal } from "@/components/base/Modal";
import type { AnimeItem, WatchlistItem } from "@/types";

const CollectionDetailsPage = () => {
  const { query, push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { collection_id } = query;
  const collectionId = collection_id as string | undefined;

  const {
    collections,
    setCollectionToBeEdited,
    removeAnimeItemFromCollection,
  } = useCollectionContext();

  const [animeToBeDeleted, setAnimeToBeDeleted] =
    useState<Partial<AnimeItem> | null>(null);

  const handleRemoveAnimeItem = () => {
    if (!animeToBeDeleted) {
      return;
    }
    removeAnimeItemFromCollection(
      collectionId as string,
      animeToBeDeleted?.id ?? 0
    );
    setAnimeToBeDeleted(null);
  };

  const currentCollection = useMemo<WatchlistItem | null>(() => {
    return (
      collections.find((collection) => collection.id === collectionId) ?? null
    );
  }, [collectionId, collections]);

  useEffect(() => {
    const checkCollectionExistance = setTimeout(() => {
      if (!currentCollection && !collectionId) {
        push("/404");
      }
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(checkCollectionExistance);
  }, [currentCollection, collectionId]);

  if (isLoading) {
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
    <>
      <NextSeo title="My collection" />
      <Modal
        modalProps={{
          size: "xl",
        }}
        isOpen={Boolean(animeToBeDeleted)}
        onToggle={() => setAnimeToBeDeleted(null)}
        title="Remove Anime"
        footerContent={
          <>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setAnimeToBeDeleted(null)}
            >
              Cancel
            </Button>
            <Spacer />
            <Button colorScheme="red" onClick={handleRemoveAnimeItem}>
              Remove
            </Button>
          </>
        }
      >
        <Flex direction="column" gap="1em" align="center">
          <MovieItem
            imageUrl={animeToBeDeleted?.coverImage?.extraLarge}
            subtitle={animeToBeDeleted?.title?.native}
            title={animeToBeDeleted?.title?.romaji}
          />
          <Text textAlign="center">
            Are you sure want to remove <b>{animeToBeDeleted?.title?.romaji}</b>{" "}
            from your collection?
          </Text>
        </Flex>
      </Modal>
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
                    setAnimeToBeDeleted({ coverImage, title, id });
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
