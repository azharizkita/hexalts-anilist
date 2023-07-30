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
        large
      }
      episodes
      duration
      status
      genres
    }
  }
`;

export interface AnimeDetails {
  Media: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    description: string;
    coverImage: {
      large: string;
    };
    episodes: number;
    duration: number;
    status: string;
    genres: string[];
  };
}
