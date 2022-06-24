import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signIn(value: any) {
    console.log(value);
  }
  
  createAccountFormErrorSubject = new BehaviorSubject<string>('');
  createAccountFormError$ = this.createAccountFormErrorSubject.asObservable()

  createAccount(value: IUser) {
    this.httpClient.post<IUser>('/api/auth/local/create-account', value)
    .subscribe({
      next: (user) => this.handleCreateAccountSuccess(user),
      error: (httpError: HttpErrorResponse) => this.handleCreateAccountError(httpError)
    });
  }

  handleCreateAccountSuccess(user: IUser): void {
    console.log({
      user
    });
  }

  handleCreateAccountError(httpError: HttpErrorResponse): void {
    if(httpError.status === 409) {
      this.createAccountFormErrorSubject.next('Email has been taken. Choose another or login.');
    }
  }
}
