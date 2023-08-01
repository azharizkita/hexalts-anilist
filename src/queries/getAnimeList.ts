import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query GetAnimeList($offset: Int!, $limit: Int!) {
    Page(page: $offset, perPage: $limit) {
      pageInfo {
        total
        perPage
        lastPage
        hasNextPage
      }
      media(sort: [SCORE_DESC], type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export const GET_ANIME_LIST_WITH_SEARCH = gql`
  query GetAnimeList($offset: Int!, $limit: Int!, $keyword: String) {
    Page(page: $offset, perPage: $limit) {
      pageInfo {
        total
        perPage
        lastPage
        hasNextPage
      }
      media(sort: [SCORE_DESC], type: ANIME, search: $keyword) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export type PageInfo = {
  total: number;
  perPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

export type AnimeItem = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  bannerImage: string;
  coverImage: {
    extraLarge: string;
    color: string;
  };
};

export interface AnimeListData {
  Page: {
    pageInfo: PageInfo;
    media: AnimeItem[];
  };
}
