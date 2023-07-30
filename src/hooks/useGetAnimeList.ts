import { AnimeListData, GET_ANIME_LIST } from "@/queries/getAnimeList";
import { useQuery } from "@apollo/client";
import type { QueryHookOptions } from "@apollo/client";

interface UseGetAnimeList extends QueryHookOptions {
  offset: number;
}

const PAGE_ITEM_LIMIT = 20;

export const useGetAnimeList = ({ offset, ...config }: UseGetAnimeList) => {
  const { data: _data, ...rest } = useQuery<AnimeListData>(GET_ANIME_LIST, {
    variables: { offset, limit: PAGE_ITEM_LIMIT },
    skip: typeof offset !== "number",
    ...config,
  });

  const data = _data?.Page?.media ?? null;

  const paginationMeta = _data?.Page?.pageInfo ?? null;

  return { data, paginationMeta, ...rest };
};
