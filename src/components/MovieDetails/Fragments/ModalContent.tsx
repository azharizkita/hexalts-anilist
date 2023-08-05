import { CollectionItem } from "@/components/Collection/CollectionItem";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { Center, Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { MdSentimentDissatisfied } from "react-icons/md";

export const ModalContent = () => {
  const {
    isCreateMode,
    collectionTitle,
    handleSelectCollectionItem,
    selectedCollection,
    filteredCollection,
    currentAnimeItemData,
  } = useAnimeDetailsContext();
  if (!isCreateMode && filteredCollection.length !== 0) {
    return (
      <SimpleGrid w="full" columns={[2, 3, 3, 3]} spacing="1em" overflow="auto">
        {filteredCollection.map((collection, i) => {
          const isSelected = selectedCollection.includes(collection.id);
          const handleClickCollectionItem = () => {
            handleSelectCollectionItem({
              id: collection.id,
              isSelected,
            });
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
    return (
      <Flex
        align="center"
        justify="center"
        h="100%"
        gap="0.5em"
        direction="column"
        color="gray.400"
      >
        <Icon fontSize="5xl" as={MdSentimentDissatisfied} />
        <Text>We found nothing...</Text>
      </Flex>
    );
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
