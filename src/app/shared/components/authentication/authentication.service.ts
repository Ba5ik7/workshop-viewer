import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signIn(user: IUser) {
    this.httpClient.post<IUser>('/api/auth/local/login', user)
    .subscribe({
      next: (user) => {
        console.log({
          user
        });
      },
      error: (httpError: HttpErrorResponse) => {
        console.log({
          httpError
        });
      }
    });
  }
  
  createAccountFormErrorSubject = new Subject<number>();
  createAccountFormError$ = this.createAccountFormErrorSubject.asObservable();

  createAccountFormSuccessSubject = new Subject<IUser>();
  createAccountFormSuccess$ = this.createAccountFormSuccessSubject.asObservable();

  createAccount(user: IUser) {
    this.httpClient.post<IUser>('/api/auth/local/create-account', user)
    .subscribe({
      next: (user) => this.createAccountFormSuccessSubject.next(user),
      error: (httpError: HttpErrorResponse) => this.createAccountFormErrorSubject.next(httpError.status)
    });
  }
}
