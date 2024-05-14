export interface Movie {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
}

export interface MovieInfo extends Movie {
  summary: string;
  duration?: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
  genres: MovieGenre[];
}

export interface MovieGenre {
  id: string;
  title: string;
}

export interface MovieGenreWithMovies extends MovieGenre {
  movies: string[];
}
