import { createFeature, createReducer, on } from '@ngrx/store';
import { UIStateActions } from './ui.actions';

export const uiStateKey = 'ui';

export interface UIState {
  searchTerm: string;
}

export const initialState: UIState = {
  searchTerm: '',
};

const uiReducer = createReducer(
  initialState,
  on(UIStateActions.applySearchFilter, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
);

export const uiFeature = createFeature({
  name: uiStateKey,
  reducer: uiReducer,
});

export const { name, reducer } = uiFeature;
