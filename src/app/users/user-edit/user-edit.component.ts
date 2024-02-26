import {Component, inject, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {rolesList} from "../types";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, MatLabel, MatInput, MatFormField, MatButton, MatOption, MatSelect],
  template: `
    <form [formGroup]="userForm">
      <a routerLink="/home/users">< Users</a>
      <h2>User</h2>
      <mat-form-field>
        <mat-label for="email">Email:</mat-label>
        <input matInput id="email" type="text" formControlName="email">
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

      <mat-form-field>
        <mat-label>Roles</mat-label>
        <mat-select formControlName="roles" multiple>
          @for (role of rolesList; track rolesList) {
            <mat-option [value]="role">{{ role }}</mat-option>
          }
        </mat-select>
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
    }
  `
})
export class UserEditComponent implements OnInit {
  @Input() id = '';
  snackBar = inject(MatSnackBar)
  httpClient = inject(HttpClient);
  formBuilder = inject(FormBuilder);

  userForm = this.formBuilder.group({
    email: [{value: '', disabled: true}, [Validators.email, Validators.required]],
    surname: [''],
    name: [''],
    other: [''],
    id: [0],
    roles: new FormControl([], Validators.required)
  });
  rolesList = rolesList;

  ngOnInit(): void {
    this.httpClient.get(`http://localhost:8000/users/${this.id}`)
      .subscribe((res) => {
        this.userForm.patchValue(res);
      }, (err) => {
        console.log(err);
      });
  }

  save() {
    console.log(this.userForm.value)
    this.httpClient.post(`http://localhost:8000/users/${this.id}`, this.userForm.value)
      .subscribe((res) => {
        this.snackBar.open('User saved', 'Close', {duration: 5000});
      }, (err) => {
        this.snackBar.open('Error ', 'Close', {duration: 5000});

      });
  }
}
