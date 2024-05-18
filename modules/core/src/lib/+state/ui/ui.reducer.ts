import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UIStateActions } from './ui.actions';

export const uiStateKey = 'ui';

export interface UIState {
  searchTerm: string;
  movieGenres: string[];
  selectedMovieGenre: string | undefined;
}

export const initialState: UIState = {
  searchTerm: '',
  // This is a list of genres that we can filter by
  // We could fetch this from an API, but for now we'll hardcode it here since we don't have a light API for it.
  movieGenres: [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Short',
    'Sport',
    'Thriller',
    'War',
    'Western',
  ],
  selectedMovieGenre: undefined,
};

const uiReducer = createReducer(
  initialState,
  on(UIStateActions.applySearchFilter, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(UIStateActions.applyGenreFilter, (state, { genre }) => ({
    ...state,
    selectedMovieGenre: genre,
  })),
);

export const uiFeature = createFeature({
  name: uiStateKey,
  reducer: uiReducer,
  extraSelectors: ({ selectSelectedMovieGenre }) => ({
    selectFiltersApplied: createSelector(
      selectSelectedMovieGenre,
      (genre) => !!genre,
    ),
  }),
});

export const {
  name,
  reducer,
  selectMovieGenres,
  selectSelectedMovieGenre,
  selectFiltersApplied,
} = uiFeature;
