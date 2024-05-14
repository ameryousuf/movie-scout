import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { concatMap } from 'rxjs';

export const SKIP_AUTH = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.has(SKIP_AUTH)) {
    return next(req);
  }

  return inject(AuthService)
    .getAccessToken()
    .pipe(
      concatMap((token) => {
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return next(modifiedReq);
      }),
    );
};
