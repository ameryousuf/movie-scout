import { Action } from '@ngrx/store';

import { Movie } from '@movie-scout/core';
import * as MovieCatalogActions from './movie-catalog.actions';
import {
  MovieCatalogState,
  initialMovieCatalogState,
  reducer as movieCatalogReducer,
} from './movie-catalog.reducer';

describe('MovieCatalog Reducer', () => {
  const createMovieCatalogEntity = (id: string, name = ''): Movie => ({
    id,
    title: name || `name-${id}`,
  });

  describe('valid MovieCatalog actions', () => {
    it('loadMovieCatalogSuccess should return the list of known MovieCatalog', () => {
      const movies = [
        createMovieCatalogEntity('PRODUCT-AAA'),
        createMovieCatalogEntity('PRODUCT-zzz'),
      ];
      const action = MovieCatalogActions.loadMoviesSuccess({
        movies,
        totalPages: 2,
      });

      const result: MovieCatalogState = movieCatalogReducer(
        initialMovieCatalogState,
        action,
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = movieCatalogReducer(initialMovieCatalogState, action);

      expect(result).toBe(initialMovieCatalogState);
    });
  });
});
