import {computed, inject, Injectable, signal} from '@angular/core';
import {Credentials} from '../interfaces/credentials';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from '@angular/router';


interface AuthState {
  user: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // sources
  http = inject(HttpClient)
  router = inject(Router);
  // state
  private state = signal<any>({
    user: null,
  });

  // selectors
  user = computed(() => this.state().user);

  constructor() {
    // this.user-edit$.pipe(takeUntilDestroyed()).subscribe((user-edit) =>
    //   this.state.update((state) => ({
    //     ...state,
    //     user-edit,
    //   }))
    // );
  }

  renewToken() {
    return this.http.post('http://localhost:8000/refresh', {refresh_token: localStorage.getItem('refresh_token')})
      .pipe(tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      })) as Observable<{ access_token: string, refresh_token: string }>;
  }

  login(credentials: Credentials) {
    const form = new FormData();
    form.append('username', credentials.username);
    form.append('password', credentials.password);
    form.append('grant_type', 'password');

    return this.http.post('http://localhost:8000/login', form)
      .pipe(tap((response: any) => {
        this.state.set({user: credentials.username});
      })) as Observable<{ access_token: string, refresh_token: string }>;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);

  }

  createAccount(credentials: Credentials) {
    // return from(
    //   defer(() =>
    //     createUserWithEmailAndPassword(
    //       this.auth,
    //       credentials.email,
    //       credentials.password
    //     )
    //   )
    // );
  }
}
