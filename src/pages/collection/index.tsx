import { Center, Divider, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import type { AnimeItem } from "@/queries/getAnimeList";
import { CollectionAdditionButton } from "@/components/Collection/CollectionAdditionButton";
import {
  CollectionContextProvider,
  useCollectionContext,
} from "@/context/collection";
import { CollectionDeleteModal } from "@/components/Collection/CollectionDeleteModal";
import { CollectionItem } from "@/components/Collection/CollectionItem";
import { CollectionEditModal } from "@/components/Collection/CollectionEditModal";
export interface WatchlistItem {
  id: string;
  title: string;
  imageUrl: string | null;
  watchlist: AnimeItem[];
}

const CollectionPage = () => {
  const { collections } = useCollectionContext();

  return (
    <Flex gap="1em" direction="column" overflow="auto">
      <Flex justify="space-between" justifyItems="center">
        <Heading>My collection</Heading>
        <CollectionAdditionButton />
      </Flex>
      <Divider />
      <Flex direction="column" overflow="auto" id="asd">
        <SimpleGrid columns={2} spacing="1em" overflow="auto" py="1em">
          {collections.map(({ id, title, imageUrl, watchlist }) => (
            <Center key={id} w="100%">
              <CollectionItem
                id={id}
                imageUrl={imageUrl}
                title={title}
                watchlist={watchlist}
              />
            </Center>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default function Collection() {
  return (
    <CollectionContextProvider>
      <CollectionPage />
      <CollectionEditModal />
      <CollectionDeleteModal />
    </CollectionContextProvider>
  );
}
