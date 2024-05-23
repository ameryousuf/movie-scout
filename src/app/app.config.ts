import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import {
  authInterceptor,
  provideAppConfigInitializer,
  provideCoreStatesWithEffects,
  provideOptimizedImageLoader,
} from '@movie-scout/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideCoreStatesWithEffects(),
    provideAppConfigInitializer('/assets/config.json'),
    provideOptimizedImageLoader(),
  ],
};
