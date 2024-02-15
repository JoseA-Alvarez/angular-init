import {HttpInterceptorFn} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {switchMap, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./shared/data-access/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
  });

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 406) {
        console.log('error 406 refresco');
        return authService.renewToken().pipe(
          catchError((e) => {
            console.info('error en refresco de token', e);
            authService.logout();
            return throwError(e);
          }),
          switchMap((response) => {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('refresh_token', response.refresh_token);
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
              }));
            }
          ));

      }
      return throwError(err);
    })
  );
};
