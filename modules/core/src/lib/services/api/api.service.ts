import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { injectAppConfig } from '../../config';
import {
  ApiListResult,
  Movie,
  MovieGenreWithMovies,
  MovieInfo,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly config = injectAppConfig();
  private readonly http = inject(HttpClient);

  /** Check status of the app */
  healthCheck(): Observable<void> {
    return this.http.get<void>(`${this.config.apiBaseUrl}/healthcheck`);
  }

  /** Fetch a list of all movie IDs grouped by genre */
  getMoviesIDsGroupedByGenre(params: {
    page: number;
    limit: number;
  }): Observable<ApiListResult<MovieGenreWithMovies>> {
    return this.http.get<ApiListResult<MovieGenreWithMovies>>(
      `${this.config.apiBaseUrl}/genres/movies`,
      { params },
    );
  }

  /** Fetch a list of all movies */
  getMovies(params: {
    page: number;
    limit: number;
    search: string;
    genre?: string;
  }): Observable<ApiListResult<Movie>> {
    return this.http.get<ApiListResult<Movie>>(
      `${this.config.apiBaseUrl}/movies`,
      { params },
    );
  }

  /** Fetch details of a specific movie */
  getMovie(id: string): Observable<MovieInfo> {
    return this.http.get<MovieInfo>(`${this.config.apiBaseUrl}/movies/${id}`);
  }
}
