import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MovieCatalogEffects } from './+state/movie-catalog.effects';
import { movieCatalogFeature } from './+state/movie-catalog.reducer';
import { MovieCatalogComponent } from './movie-catalog.component';

export const movieCatalogRoutes: Routes = [
  {
    path: '',
    component: MovieCatalogComponent,
    providers: [
      provideState(movieCatalogFeature.name, movieCatalogFeature.reducer),
      provideEffects(MovieCatalogEffects),
    ],
  },
];
