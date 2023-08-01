import {
  AnimeListData,
  GET_ANIME_LIST,
  GET_ANIME_LIST_WITH_SEARCH,
} from "@/queries/getAnimeList";
import { useQuery } from "@apollo/client";
import type { QueryHookOptions } from "@apollo/client";

interface UseGetAnimeList extends QueryHookOptions {
  offset: number;
  keyword?: string;
}

const PAGE_ITEM_LIMIT = 10;

export const useGetAnimeList = ({
  offset,
  keyword = "",
  ...config
}: UseGetAnimeList) => {
  const { data: _data, ...rest } = useQuery<AnimeListData>(
    keyword ? GET_ANIME_LIST_WITH_SEARCH : GET_ANIME_LIST,
    {
      variables: { offset, limit: PAGE_ITEM_LIMIT, keyword },
      skip: typeof offset !== "number",
      ...config,
    }
  );

  const data = _data?.Page?.media ?? null;

  const paginationMeta = _data?.Page?.pageInfo ?? null;

  return { data, paginationMeta, ...rest };
};
