import { AnimeDetails, GET_ANIME_DETAILS } from "@/queries/getAnimeDetails";
import { useQuery } from "@apollo/client";
import type { QueryHookOptions } from "@apollo/client";

interface UseGetAnimeDetails extends QueryHookOptions {
  id: number;
}

export const useGetAnimeDetails = ({ id, ...config }: UseGetAnimeDetails) => {
  const { data: _data, ...rest } = useQuery<AnimeDetails>(GET_ANIME_DETAILS, {
    variables: { id },
    skip: typeof id !== "number",
    
    ...config,
  });

  const data = _data?.Media ?? null;

  return { data, ...rest };
};
