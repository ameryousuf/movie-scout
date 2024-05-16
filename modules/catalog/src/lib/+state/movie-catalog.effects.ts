import { Injectable, inject } from '@angular/core';
import { ApiService, UIStateActions } from '@movie-scout/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { MOVIES_PAGE_SIZE } from '../constants/page';
import * as MovieCatalogActions from './movie-catalog.actions';
import {
  selectMoviesTotalCountLoaded,
  selectSearchTerm,
} from './movie-catalog.reducer';

@Injectable()
export class MovieCatalogEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieCatalogActions.loadMovies),
      // Fetch movies using the most recent search term from the store.
      // This is because the action's payload may not always contain the search term.
      // For instance, when the user switches to a different movie page, the search term should be retrieved from the store.
      withLatestFrom(this.store.select(selectSearchTerm)),
      switchMap(([{ page }, searchTerm]) =>
        this.apiService
          .getMovies({
            page,
            limit: MOVIES_PAGE_SIZE,
            search: searchTerm,
          })
          .pipe(
            map(({ data, totalPages }) =>
              MovieCatalogActions.loadMoviesSuccess({
                movies: data,
                totalPages,
              }),
            ),
            catchError((error) =>
              of(MovieCatalogActions.loadMoviesFailure({ error })),
            ),
          ),
      ),
    ),
  );

  loadMoviesCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieCatalogActions.loadMoviesSuccess),
      withLatestFrom(
        this.store.select(selectMoviesTotalCountLoaded),
        this.store.select(selectSearchTerm),
      ),
      filter(([, totalCountLoaded]) => !totalCountLoaded),
      switchMap(([{ movies, totalPages }, _, searchTerm]) => {
        // Since we don't have a separate endpoint to get the total count of movies, and the original endpoint doesn't return it,
        // We should calculate the total count of movies based on the total number of pages and the number of movies per page + the number of movies in the last page.
        // To get the total count of movies, we need to fetch the last page of movies.
        // Unless there are no movies or only one page of movies, in which case we already have the total count of movies.

        if (totalPages === 0 || totalPages === 1) {
          return of(
            MovieCatalogActions.loadMoviesCountSuccess({
              count: movies.length,
            }),
          );
        }

        // Fetch the last page of movies
        return this.apiService
          .getMovies({
            page: totalPages,
            limit: MOVIES_PAGE_SIZE,
            search: searchTerm,
          })
          .pipe(
            map(({ data }) =>
              MovieCatalogActions.loadMoviesCountSuccess({
                // Calculate the total count of movies
                count: (totalPages - 1) * MOVIES_PAGE_SIZE + data.length,
              }),
            ),
            catchError((error) =>
              of(MovieCatalogActions.loadMoviesFailure({ error })),
            ),
          );
      }),
    ),
  );

  applyMovieSearchFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UIStateActions.applySearchFilter),
      map(({ searchTerm }) =>
        MovieCatalogActions.loadMovies({ page: 1, search: searchTerm }),
      ),
    ),
  );
}
