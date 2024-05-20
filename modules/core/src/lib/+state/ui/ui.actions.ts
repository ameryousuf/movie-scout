import { createAction, props } from '@ngrx/store';

export const applySearchFilter = createAction(
  '[Movie UI] Apply Search Filter',
  props<{ searchTerm: string }>(),
);

export const applyGenreFilter = createAction(
  '[Movie UI] Apply Genre Filter',
  props<{ genre: string }>(),
);

export const setLoading = createAction(
  '[Movie UI] Set Loading',
  props<{ loading: boolean }>(),
);

export const UIStateActions = {
  applySearchFilter,
  applyGenreFilter,
  setLoading,
};
