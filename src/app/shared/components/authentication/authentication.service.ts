import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signIn(value: any) {
    console.log(value);
  }
  
  createAccountFormErrorSubject = new Subject<number>();
  createAccountFormError$ = this.createAccountFormErrorSubject.asObservable();

  createAccountFormSuccessSubject = new Subject<IUser>();
  createAccountFormSuccess$ = this.createAccountFormSuccessSubject.asObservable();

  createAccount(value: IUser) {
    this.httpClient.post<IUser>('/api/auth/local/create-account', value)
    .subscribe({
      next: (user) => this.createAccountFormSuccessSubject.next(user),
      error: (httpError: HttpErrorResponse) => this.handleCreateAccountError(httpError)
    });
  }

  handleCreateAccountError(httpError: HttpErrorResponse): void {
    if(httpError.status === 409) {
      this.createAccountFormErrorSubject.next(httpError.status);
    }
  }
}
