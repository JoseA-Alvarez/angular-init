import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <form [formGroup]="userForm">
      <a routerLink="/users">< Users</a>
      <h2>User</h2>
      <mat-form-field>
        <mat-label for="email">Email:</mat-label>
        <input matInput id="email" type="text" formControlName="email">
      </mat-form-field>

      <mat-form-field>
        <mat-label for="name">Password:</mat-label>
        <input matInput id="password" type="text" formControlName="password">
      </mat-form-field>

      <mat-form-field>
        <mat-label for="name">Name:</mat-label>
        <input matInput id="name" type="text" formControlName="name">
      </mat-form-field>

      <mat-form-field>
        <mat-label for="surname">SurName:</mat-label>
        <input matInput id="surname" type="text" formControlName="surname">
      </mat-form-field>

      <mat-form-field>
        <mat-label for="other">Other:</mat-label>
        <input matInput id="other" type="text" formControlName="other">
      </mat-form-field>
      <button [disabled]="!userForm.valid" mat-button mat-raised-button color="primary" type="submit"
              (click)="save()">Save
      </button>
    </form>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    form > * {
      width: 50%;
    }`
})
export class CreateComponent {
  httpClient = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  userForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    surname: [''],
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    name: ['', Validators.required],
    other: [''],
    id: [0]
  });


  save() {
    this.httpClient.put(`http://localhost:8000/users`, this.userForm.value)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }
}
