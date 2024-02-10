import {HttpInterceptorFn} from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  console.log('interceptor')

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  });

  return next(authReq);
};
