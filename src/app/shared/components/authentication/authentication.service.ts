import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signIn(value: any) {
    console.log(value);
  }
  
  createAccount(value: IUser) {
    this.httpClient.post<IUser>('/api/auth/local/create-account', value)
    .subscribe({
      next: (user) => this.handleCreateAccountSuccess(user),
      error: (error: HttpErrorResponse) => this.handleCreateAccountError(error)
    });
  }

  handleCreateAccountSuccess(user: IUser): void {
    console.log({
      user
    });
  }

  handleCreateAccountError(error: HttpErrorResponse): void {
    console.log({
      error
    });
  }

}
