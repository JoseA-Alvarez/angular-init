import {Injectable, computed, inject, signal} from '@angular/core';
import {Credentials} from '../interfaces/credentials';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";


interface AuthState {
  user: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // sources
  http = inject(HttpClient)
  // state
  private state = signal<any>({
    user: null,
  });

  // selectors
  user = computed(() => this.state().user);

  constructor() {
    // this.user$.pipe(takeUntilDestroyed()).subscribe((user) =>
    //   this.state.update((state) => ({
    //     ...state,
    //     user,
    //   }))
    // );
  }

  login(credentials: Credentials) {
    const form = new FormData();
    form.append('username', credentials.username);
    form.append('password', credentials.password);
    form.append('grant_type', 'password');

    return this.http.post('http://localhost:8000/token', form)
      .pipe(tap((response: any) => {
        this.state.set({user: credentials.username});
      })) as Observable<{access_token: string}>;

    // return from(
    //   defer(() =>
    //     signInWithEmailAndPassword(
    //       this.auth,
    //       credentials.email,
    //       credentials.password
    //     )
    //   )
    // );
  }

  logout() {
    // signOut(this.auth);
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
