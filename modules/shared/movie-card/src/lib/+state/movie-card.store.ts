import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiService, MovieInfo } from '@movie-scout/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  EMPTY,
  Observable,
  catchError,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

export interface MovieCardState {
  movie: MovieInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieCardState = {
  movie: null,
  loading: false,
  error: null,
};

@Injectable()
export class MovieCardStore extends ComponentStore<MovieCardState> {
  private readonly apiService = inject(ApiService);

  constructor() {
    super(initialState);
  }

  readonly movieInfo = this.selectSignal((state) => state.movie);

  readonly vm = this.selectSignal(
    this.movieInfo,
    this.selectSignal((state) => state.loading),
    (movieInfo, loading) => ({
      loading,
      movie: this.preapreMovieInfo(movieInfo),
    }),
  );

  readonly fetchMovieInfo = this.effect((movieId$: Observable<string>) => {
    return movieId$.pipe(
      withLatestFrom(this.select((state) => state.movie)),
      tap(() => this.patchState({ loading: true })),
      switchMap(([movieId, movieInfo]) =>
        // If the movie info is already in the store, don't fetch it again
        (movieInfo ? EMPTY : this.apiService.getMovie(movieId)).pipe(
          tap({
            next: (movie) => this.patchState({ movie }),
            error: (e: HttpErrorResponse) =>
              this.patchState({ movie: null, error: e.error }),
            finalize: () => this.patchState({ loading: false }),
          }),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  private preapreMovieInfo(movie: MovieInfo | null): Partial<MovieInfo> {
    return {
      ...(movie ?? {}),
      summary: movie?.summary ?? '',
      genres: movie?.genres ?? [],
      duration: this.parseDuration(movie?.duration) ?? undefined,
      rating: movie?.rating !== 'Not Rated' ? movie?.rating : '',
      // Convert the rating value from a 0-10 scale to a 0-5 scale.
      ratingValue: movie?.ratingValue ? Math.round(movie?.ratingValue / 2) : 0,
    };
  }

  private parseDuration(duration = ''): string | null {
    if (!duration) return null;

    // PT2H18M -> 2 h 18 min
    // PT2H -> 2 h
    // PT18M -> 18 min
    // Use regex to extract hours and minutes from the duration string based on the pattern above
    const [, hours, mins] = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/) ?? [];

    if (!hours && !mins) return null;

    const hoursStr = hours ? `${hours} h` : '';
    const minsStr = mins ? `${mins} min` : '';

    return `${hoursStr} ${minsStr}`.trim();
  }
}
