import {
  Center,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import type { AnimeItem } from "@/queries/getAnimeList";
import { MovieItem } from "@/components/Movie/MovieItem";
import { useGetAnimeList } from "@/hooks/useGetAnimeList";
import { useRouter } from "next/router";
import { Pagination } from "@/components/base/Pagination";
export interface WatchlistItem {
  id: string;
  title: string;
  imageUrl: string | null;
  watchlist: AnimeItem[];
}

const sampleAnimeItem: AnimeItem = {
  id: 1,
  title: {
    romaji: "Sample Anime",
    english: "Sample Anime",
    native: "Sample Anime",
  },
  bannerImage: "sample_banner_image_url",
  coverImage: {
    color: "gray",
    extraLarge: "sample_cover_image_url",
  },
};

const mockedItems: AnimeItem[] = Array(10).fill(sampleAnimeItem);

const AnimePage = () => {
  const { query, push } = useRouter();
  const { keyword = "", page = 1 } = query;
  const { data, paginationMeta, loading } = useGetAnimeList({
    offset: Number(page),
    ...(keyword && { keyword: keyword as string }),
    skip: !Boolean(page),
  });

  const handleChangePage = (newPage: number) => {
    push({
      query: {
        ...(keyword && { keyword }),
        page: newPage,
      },
    });
  };

  const _movieItems = !loading && data !== null ? data : mockedItems;

  return (
    <Flex direction="column" overflow="auto" h="100%">
      <Flex direction="column" gap="1em">
        <Flex justify="space-between" justifyItems="center">
          <Heading>Anime</Heading>
        </Flex>
        <Divider />
      </Flex>
      <Flex
        direction="column"
        overflow="auto"
        id="asd"
        h="100%"
        justify="center"
      >
        <SimpleGrid
          h="100%"
          columns={[2, 3, 4, 5]}
          spacing="1em"
          overflow="auto"
          py="0.5em"
        >
          {_movieItems.map(({ id, title, coverImage }, i) => (
            <Center key={i} w="100%">
              <MovieItem
                id={id.toString()}
                imageUrl={coverImage.extraLarge}
                backgroundColor={coverImage.color}
                subtitle={title.native}
                title={title.romaji}
                isLoading={loading}
              />
            </Center>
          ))}
        </SimpleGrid>
        <Spacer />
        <Divider />
        <Flex w="full" align="center" justify="center" py="1em">
          <Pagination
            page={Number(page)}
            lastPage={paginationMeta?.lastPage}
            onClickNext={handleChangePage}
            onClickPrev={handleChangePage}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default function Collection() {
  return <AnimePage />;
}
