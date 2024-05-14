import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@movie-scout/catalog').then((m) => m.movieCatalogRoutes),
  },
];
