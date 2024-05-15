import { Movie } from '@movie-scout/core';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as MovieCatalogActions from './movie-catalog.actions';

export interface MovieCatalogState extends EntityState<Movie> {
  loaded: boolean; // has the MovieCatalog list been loaded
  totalCount: number; // total count of movies
  totalCountLoaded: boolean; // has the total count of movies been loaded
  page: number; // current page (starts from 1)
  searchTerm: string; // search term
  error: string | null; // last known error (if any)
}

export const movieCatalogAdapter: EntityAdapter<Movie> =
  createEntityAdapter<Movie>();

export const initialMovieCatalogState: MovieCatalogState =
  movieCatalogAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    totalCountLoaded: false,
    totalCount: 0,
    page: 1,
    searchTerm: '',
    error: null,
  });

const movieCatalogReducer = createReducer(
  initialMovieCatalogState,
  on(MovieCatalogActions.loadMovies, (state, { page, search }) => {
    // keep the previous search term if not provided
    const searchTerm = search ?? state.searchTerm;
    const searchChanged = searchTerm !== state.searchTerm;

    // if the search term has changed, we need to reload the total count of movies
    const totalCountLoaded = state.totalCountLoaded && !searchChanged;

    return {
      ...state,
      loaded: false,
      error: null,
      page,
      searchTerm,
      totalCountLoaded,
      totalCount: totalCountLoaded ? state.totalCount : 0,
    };
  }),
  on(MovieCatalogActions.loadMoviesSuccess, (state, { movies: moveis }) =>
    movieCatalogAdapter.setAll(moveis, { ...state, loaded: true }),
  ),
  on(MovieCatalogActions.loadMoviesCountSuccess, (state, { count }) => ({
    ...state,
    totalCount: count,
    totalCountLoaded: true,
  })),
  on(MovieCatalogActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export const movieCatalogFeature = createFeature({
  name: 'movieCatalog',
  reducer: movieCatalogReducer,
  extraSelectors: ({ selectMovieCatalogState }) => {
    const { selectAll } = movieCatalogAdapter.getSelectors();

    return {
      selectAllMovies: createSelector(selectMovieCatalogState, (state) =>
        selectAll(state),
      ),
    };
  },
});

export const {
  name,
  reducer,
  selectMovieCatalogState,
  selectAllMovies,
  selectLoaded: selectMovieLoaded,
  selectTotalCount: selectMoviesTotalCount,
  selectTotalCountLoaded: selectMoviesTotalCountLoaded,
  selectPage: selectCurrentPage,
  selectSearchTerm,
  selectError,
} = movieCatalogFeature;
