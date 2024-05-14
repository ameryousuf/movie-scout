import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SKIP_AUTH } from '../auth';
import { AppConfig } from './config.model';

/**
 * Inject the application configuration.
 * @returns {AppConfig}
 */
export function injectAppConfig(): AppConfig {
  return inject(ConfigService).config;
}

/**
 * The app's configuration service.
 * Use `provideAppConfigInitializer` to make this service available for injection.
 */
@Injectable()
export class ConfigService {
  private readonly http = inject(HttpClient);

  /**
   * The application configuration.
   */
  public config!: AppConfig;

  /**
   * Load the application configuration.
   * @returns {Observable<AppConfig>}
   */
  loadAppConfig(configUrl: string): Observable<AppConfig> {
    return this.http
      .get<AppConfig>(configUrl, {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(tap((config) => (this.config = config)));
  }
}
