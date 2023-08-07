import { CollectionItem } from "@/components/Collection/CollectionItem";
import { EmptyMessage } from "@/components/base/EmptyMessage";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { useCollectionContext } from "@/context/collection";
import { Center, Flex, SimpleGrid } from "@chakra-ui/react";

export const ModalContent = () => {
  const {
    animeData,
    isCreateMode,
    collectionTitle,
    animeInCollection,
    currentAnimeItemData,
  } = useAnimeDetailsContext();
  const { collections } = useCollectionContext();

  const isCollectionExist = collections.length !== 0;

  if (!isCreateMode && animeInCollection.length !== 0) {
    return (
      <SimpleGrid
        w="full"
        columns={[2, 3, 3, 3]}
        spacing="1em"
        overflow="auto"
        py="0.5em"
      >
        {animeInCollection.map((collection, i) => {
          return (
            <Center key={i} w="100%">
              <CollectionItem {...collection} />
            </Center>
          );
        })}
      </SimpleGrid>
    );
  }

  if (!isCreateMode && animeInCollection.length === 0) {
    const emptyMessage = !isCollectionExist
      ? `${animeData?.title?.romaji} as not been added into any collection`
      : undefined;
    return <EmptyMessage message={emptyMessage} />;
  }

  if (isCreateMode) {
    return (
      <Flex
        align="center"
        justify="center"
        h="100%"
        gap="0.5em"
        direction="column"
      >
        <CollectionItem
          watchlist={[currentAnimeItemData]}
          title={collectionTitle}
          previewMode
        />
      </Flex>
    );
  }

  return null;
};
