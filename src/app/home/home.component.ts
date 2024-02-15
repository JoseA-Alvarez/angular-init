import {Component, effect, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../shared/data-access/auth.service';
import {RouterLink} from '@angular/router';

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
          <a [routerLink]="['/users']">Users</a>
      </div>
  `,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
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

  constructor() {
    effect(() => {
      // if (!this.authService.user-edit()) {
      //   this.router.navigate(['auth', 'login']);
      // }
    });
  }
}
