export interface WatchlistItem {
  id: string;
  title: string;
  watchlist: Partial<AnimeItem>[];
}

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
