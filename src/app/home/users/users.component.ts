import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    AsyncPipe,
    MatColumnDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    NgIf
  ],
  template: `
      <div *ngIf="users$ | async as users">
      <table mat-table [dataSource]="users" class="mat-elevation-z8 demo-table">
          @for (column of columns;track column) {
              <ng-container [matColumnDef]="column.columnDef">
                  <th mat-header-cell *matHeaderCellDef>
                      {{ column.header }}
                  </th>
                  <td mat-cell *matCellDef="let row">
                      {{ column.cell(row) }}
                  </td>
              </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
           </div>
  `,
  styles: ``
})
export class UsersComponent {
  columns = [
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: User) => `${element.email}`,
    }

  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  httpClient = inject(HttpClient)

  users$ = this.httpClient.get<User[]>('http://localhost:8000/users').pipe(
    catchError(() => of([])) // return an empty array if the request fails
    , startWith([])
  ) as Observable<User[]>;
}

interface User {
  email: string;
}
