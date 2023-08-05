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

export interface AnimeDetails {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  description: string;
  coverImage: {
    extraLarge: string;
    color: string;
  };
  bannerImage: string;
  episodes: number;
  duration: number;
  status: string;
  genres: string[];
  averageScore: number;
  isAdult: boolean;
}
