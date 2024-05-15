import { Movie } from '@movie-scout/core';
import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction(
  '[MovieCatalog Page] Load Movies',
  props<{ page: number; search?: string }>(),
);

export const loadMoviesCountSuccess = createAction(
  '[MovieCatalog/API] Load Movies Count Success',
  props<{ count: number }>(),
);

export const loadMoviesSuccess = createAction(
  '[MovieCatalog/API] Load Movies Success',
  props<{
    movies: Movie[];
    totalPages: number;
  }>(),
);

export const loadMoviesFailure = createAction(
  '[MovieCatalog/API] Load Movies Failure',
  props<{ error: any }>(),
);
