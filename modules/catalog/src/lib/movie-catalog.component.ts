import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovieCardComponent } from '@movie-scout/movie-card';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  loadMovies,
  selectAllMovies,
  selectCurrentPage,
  selectMovieLoaded,
  selectMoviesTotalCount,
  selectMoviesTotalCountLoaded,
  selectSelectedGenre,
} from './+state';
import { MOVIES_PAGE_SIZE } from './constants/page';

@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MovieCardComponent,
  ],
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss',
})
export class MovieCatalogComponent {
  private readonly store = inject(Store);

  readonly movies = this.store.selectSignal(selectAllMovies);
  readonly moviesLoaded = this.store.selectSignal(selectMovieLoaded);
  readonly totalCount = this.store.selectSignal(selectMoviesTotalCount);
  readonly totalCountLoaded = this.store.selectSignal(
    selectMoviesTotalCountLoaded,
  );
  readonly currentPage = this.store.selectSignal(selectCurrentPage);
  readonly selectedGenre = this.store.selectSignal(selectSelectedGenre);

  readonly pageSize = MOVIES_PAGE_SIZE;

  readonly loadingSkeletonArray = Array.from({ length: 13 });

  constructor() {
    // Load the first page of movies when the component is initialized
    this.store.dispatch(loadMovies({ page: 1 }));
  }

  pageChange(page: number): void {
    this.store.dispatch(loadMovies({ page }));
  }
}
