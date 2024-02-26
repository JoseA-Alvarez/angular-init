import {Routes} from "@angular/router";
import {isAuthenticatedGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./home/home.component'),
    children:
      [{
        path: 'users',
        canActivate: [isAuthenticatedGuard()],
        children: [
          {path: '', loadComponent: () => import('./users/users.component')},
          {
            path: ':id/edit',
            loadComponent: () => import('./users/user-edit/user-edit.component').then(m => m.UserEditComponent)
          },
          {
            path: 'create',
            loadComponent: () => import('./users/create/user-create.component').then(m => m.UserCreateComponent)
          },

        ],
      }]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
