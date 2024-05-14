import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Provider,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { ConfigService } from './config.service';

/**
 * Configures App's `ConfigService` to be available for injection.
 */
export function provideAppConfigInitializer(
  configUrl: string,
): EnvironmentProviders {
  const providers: Provider[] = [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const config = inject(ConfigService);
        return () => config.loadAppConfig(configUrl);
      },
      multi: true,
    },
  ];

  return makeEnvironmentProviders(providers);
}
