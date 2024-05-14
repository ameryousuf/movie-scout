import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { injectAppConfig } from '../config';
import { SKIP_AUTH } from './auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly config = injectAppConfig();
  private readonly http = inject(HttpClient);
  private readonly accessToken$ = this.fetchAuthToken().pipe(
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  /**
   * Get the access token.
   */
  getAccessToken(): Observable<string> {
    return this.accessToken$;
  }

  /** Fetch a valid access token to be used in the API requests */
  private fetchAuthToken(): Observable<string> {
    return this.http
      .get<{ token: string }>(`${this.config.apiBaseUrl}/auth/token`, {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(map(({ token }) => token));
  }
}
