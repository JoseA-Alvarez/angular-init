import {Component, effect, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../shared/data-access/auth.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div>
      <mat-toolbar color="primary" class="top-bar">
        <button mat-icon-button (click)="snav.toggle()">
          <mat-icon>lunch_dining</mat-icon>
        </button>
        <span class="spacer"></span>
        <button mat-icon-button (click)="authService.logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>


      <mat-sidenav-container class="example-sidenav-container">
        <mat-sidenav #snav>
          <mat-nav-list>
            <a mat-list-item routerLink="/home/users">Users</a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="mat-container">

          <router-outlet></router-outlet>


        </mat-sidenav-content>
      </mat-sidenav-container>


      <!--      -->
      <!--      <a [routerLink]="['/home/users']">Users</a>-->
      <!--      <div class="container">-->
      <!--      </div>-->


    </div>
  `,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    MatListItem,
    MatSidenavContainer,
    MatNavList,
    MatSidenavModule
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

      mat-sidenav-content {
        height: calc(100vh - 64px);
      }

      mat-nav-list {
        width: 200px;
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
