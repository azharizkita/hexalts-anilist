import { CollectionItem } from "@/components/Collection/CollectionItem";
import { EmptyMessage } from "@/components/base/EmptyMessage";
import { useAnimeContext } from "@/context/anime";
import { useCollectionContext } from "@/context/collection";
import { Center, Flex, SimpleGrid } from "@chakra-ui/react";

export const ModalContent = () => {
  const { collections } = useCollectionContext();
  const {
    filteredCollection,
    selectedCollection,
    isCreateMode,
    selectedAnime,
    setSelectedCollection,
    collectionTitle,
  } = useAnimeContext();

  const isCollectionExist = collections.length !== 0;

  if (!isCreateMode && filteredCollection.length !== 0) {
    return (
      <SimpleGrid w="full" columns={[2, 3, 3, 3]} spacing="1em" overflow="auto">
        {filteredCollection.map((collection, i) => {
          const isSelected = selectedCollection?.id === collection.id;
          const handleClickCollectionItem = () => {
            if (isSelected) {
              setSelectedCollection(null);
              return;
            }
            setSelectedCollection(collection);
          };
          return (
            <Center key={i} w="100%" onClick={handleClickCollectionItem}>
              <CollectionItem
                {...collection}
                previewMode
                isSelected={isSelected}
              />
            </Center>
          );
        })}
      </SimpleGrid>
    );
  }

  if (!isCreateMode && filteredCollection.length === 0) {
    const emptyMessage = !isCollectionExist
      ? "You have no collection yet..."
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
          watchlist={selectedAnime}
          title={collectionTitle}
          previewMode
        />
      </Flex>
    );
  }

  return null;
};
