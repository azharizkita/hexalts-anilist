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
        }
        bannerImage
        coverImage {
          medium
        }
      }
    }
  }
`;

type PageInfo = {
  total: number;
  perPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

type AnimeItem = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  bannerImage: string;
  coverImage: {
    medium: string;
  };
};

export interface AnimeListData {
  Page: {
    pageInfo: PageInfo;
    media: AnimeItem[];
  };
}
