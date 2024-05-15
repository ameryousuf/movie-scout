import { TestBed } from '@angular/core/testing';
import { ApiService, ConfigService } from '@movie-scout/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { MockInstance, MockProvider } from 'ng-mocks';
import { Observable, of, throwError } from 'rxjs';
import { MOVIES_PAGE_SIZE } from '../constants/page';
import * as MovieCatalogActions from './movie-catalog.actions';
import { MovieCatalogEffects } from './movie-catalog.effects';
import { selectMoviesTotalCountLoaded } from './movie-catalog.reducer';

describe('MovieCatalogEffects', () => {
  let actions$: Observable<Action>;
  let effects: MovieCatalogEffects;
  let store: MockStore;
  let mockSelectMoviesTotalCountLoadedSelector: MemoizedSelector<any, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MovieCatalogEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        MockProvider(ConfigService),
        MockProvider(ApiService),
      ],
    });

    store = TestBed.inject(MockStore);
    mockSelectMoviesTotalCountLoadedSelector = store.overrideSelector(
      selectMoviesTotalCountLoaded,
      false,
    );
  });

  describe('loadMovies$', () => {
    let getMoviesSpy: jest.Mock;

    beforeEach(MockInstance.remember);
    afterEach(MockInstance.restore);

    beforeEach(() => {
      getMoviesSpy = MockInstance(ApiService, 'getMovies', jest.fn());
      effects = TestBed.inject(MovieCatalogEffects);
    });

    it('should work', (done) => {
      actions$ = of(MovieCatalogActions.loadMovies({ page: 1 }));

      getMoviesSpy.mockReturnValue(of({ data: [], totalPages: 0 }));

      const expected = MovieCatalogActions.loadMoviesSuccess({
        movies: [],
        totalPages: 0,
      });

      effects.loadMovies$.subscribe((result) => {
        expect(result).toEqual(expected);
        done();
      });
    });

    it('should handle errors', (done) => {
      const error = new Error('error');

      actions$ = of(MovieCatalogActions.loadMovies({ page: 1 }));

      getMoviesSpy.mockReturnValue(throwError(() => error));

      const expected = MovieCatalogActions.loadMoviesFailure({ error });

      effects.loadMovies$.subscribe((result) => {
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  describe('loadMoviesCount$', () => {
    let getMoviesSpy: jest.Mock;

    beforeEach(MockInstance.remember);
    afterEach(MockInstance.restore);

    beforeEach(() => {
      getMoviesSpy = MockInstance(ApiService, 'getMovies', jest.fn());
      effects = TestBed.inject(MovieCatalogEffects);
    });

    it('should work', (done) => {
      actions$ = of(
        MovieCatalogActions.loadMoviesSuccess({
          movies: Array.from({ length: MOVIES_PAGE_SIZE }),
          totalPages: 2,
        }),
      );

      getMoviesSpy.mockReturnValue(
        of({ data: Array.from({ length: 20 }), totalPages: 2 }),
      );

      const expected = MovieCatalogActions.loadMoviesCountSuccess({
        count: MOVIES_PAGE_SIZE + 20,
      });

      effects.loadMoviesCount$.subscribe((result) => {
        expect(result).toEqual(expected);
        done();
      });
    });

    it('should not fetch the API if the total count is already loaded', () => {
      actions$ = hot('-a--', {
        a: MovieCatalogActions.loadMoviesSuccess({
          movies: Array.from({ length: MOVIES_PAGE_SIZE }),
          totalPages: 2,
        }),
      });

      // there is no output, because the total count is already loaded.
      const expected = hot('----');

      mockSelectMoviesTotalCountLoadedSelector.setResult(true);

      expect(effects.loadMoviesCount$).toBeObservable(expected);
    });

    it('should not call the API if the total pages is zero and return count = 0', () => {
      actions$ = hot('-a--', {
        a: MovieCatalogActions.loadMoviesSuccess({
          movies: [],
          totalPages: 0,
        }),
      });

      const expected = hot('-a--', {
        a: MovieCatalogActions.loadMoviesCountSuccess({
          count: 0,
        }),
      });

      expect(effects.loadMoviesCount$).toBeObservable(expected);
      expect(getMoviesSpy).not.toHaveBeenCalled();
    });

    it('should not call the API if the total pages is one and return the movies count directly', () => {
      actions$ = hot('-a--', {
        a: MovieCatalogActions.loadMoviesSuccess({
          movies: Array.from({ length: 20 }),
          totalPages: 1,
        }),
      });

      const expected = hot('-a--', {
        a: MovieCatalogActions.loadMoviesCountSuccess({
          count: 20,
        }),
      });

      expect(effects.loadMoviesCount$).toBeObservable(expected);
      expect(getMoviesSpy).not.toHaveBeenCalled();
    });
  });
});
