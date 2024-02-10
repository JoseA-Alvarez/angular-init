import { Component, effect, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageInputComponent } from './ui/message-input.component';
import { MessageService } from '../shared/data-access/message.service';
import { MessageListComponent } from './ui/message-list.component';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

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
      </div>
  `,
  imports: [
    MessageInputComponent,
    MessageListComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
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
  messageService = inject(MessageService);
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
