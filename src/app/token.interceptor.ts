import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  return next(req);
};
