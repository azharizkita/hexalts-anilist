import { Center, Divider, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { CollectionItem } from "@/components/CollectionItem";
import type { AnimeItem } from "@/queries/getAnimeList";

interface WatchlistItem {
  id: string;
  title: string;
  imageUrl: string;
  watchlist: AnimeItem[];
}

export default function Home() {
  const data: WatchlistItem[] = [
    {
      id: Date.now().toString(),
      title: "test",
      watchlist: [],
      imageUrl:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx114129-RLgSuh6YbeYx.jpg",
    },
  ];

  return (
    <Flex gap="1em" direction="column" overflow="auto">
      <Heading>My collection</Heading>
      <Divider />
      <Flex direction="column" overflow="auto" id="asd">
        <SimpleGrid columns={2} spacing="1em" overflow="auto">
          {data.map(({ id, title, imageUrl, watchlist }) => (
            <Center key={id} w="100%">
              <CollectionItem
                id={id}
                imageUrl={imageUrl}
                title={title}
                totalItem={watchlist.length}
              />
            </Center>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
