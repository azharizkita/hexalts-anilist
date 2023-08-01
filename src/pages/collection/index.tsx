import {
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import type { AnimeItem } from "@/queries/getAnimeList";
import { CollectionAdditionButton } from "@/components/Collection/CollectionAdditionButton";
import {
  CollectionContextProvider,
  useCollectionContext,
} from "@/context/collection";
import { CollectionDeleteModal } from "@/components/Collection/CollectionDeleteModal";
import { CollectionItem } from "@/components/Collection/CollectionItem";
import { CollectionEditModal } from "@/components/Collection/CollectionEditModal";
import { NextSeo } from "next-seo";
import { MdSentimentDissatisfied } from "react-icons/md";

export interface WatchlistItem {
  id: string;
  title: string;
  imageUrl: string | null;
  watchlist: AnimeItem[];
}

const CollectionPage = () => {
  const { collections } = useCollectionContext();

  return (
    <Flex gap="1em" direction="column" overflow="auto" h="full">
      <Flex direction="column" gap="1em">
        <Flex justify="space-between" justifyItems="center">
          <Heading>My collection</Heading>
          <CollectionAdditionButton />
        </Flex>
        <Divider />
      </Flex>
      <Flex
        direction="column"
        overflow="auto"
        h="100%"
        justify={collections.length !== 0 ? "initial" : "center"}
      >
        {collections.length !== 0 ? (
          <SimpleGrid
            columns={[2, 3, 4, 5]}
            spacing="1em"
            overflow="auto"
            py="1em"
          >
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
            <Text>You don&apos;t have collection yet</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default function Collection() {
  return (
    <CollectionContextProvider>
      <NextSeo title="My collection" />
      <CollectionPage />
      <CollectionEditModal />
      <CollectionDeleteModal />
    </CollectionContextProvider>
  );
}
