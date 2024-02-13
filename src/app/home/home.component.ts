import { Component, effect, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {UsersComponent} from "./users/users.component";

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
      <div class="container">
          <mat-toolbar color="primary">
              <span class="spacer"></span>
              <button mat-icon-button (click)="authService.logout()">
                  <mat-icon>logout</mat-icon>
              </button>
          </mat-toolbar>
          <h1>Bienvenido a Home</h1>
          <button mat-button (click)="test()">test</button>

          <app-users></app-users>

      </div>
  `,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    UsersComponent,
  ],
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      mat-toolbar {
        box-shadow: 0px -7px 11px 0px var(--accent-color);
      }


    `,
  ],
})
export default class HomeComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  private htppClient = inject(HttpClient);

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  test(){
    this.htppClient.get('http://127.0.0.1:8000/users/?skip=0&limit=100').subscribe((data) => {
      console.log(data);
    });
  }
}
