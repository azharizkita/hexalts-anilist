import { AnimeDetails } from "@/types";
import { gql } from "@apollo/client";

export const GET_ANIME_DETAILS = gql`
  query GetAnimeById($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        extraLarge
        color
      }
      bannerImage
      episodes
      duration
      status
      genres
      averageScore
      isAdult
    }
  }
`;

export interface AnimeDetailsProps {
  Media: AnimeDetails;
}

