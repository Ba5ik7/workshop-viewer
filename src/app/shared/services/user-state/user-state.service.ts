import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { IUserMetadata } from '../../interfaces/user-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private httpClient: HttpClient) { }

  signedIn = new BehaviorSubject<boolean>(false);
  signedIn$ = this.signedIn.asObservable();

  openSignInModal = new BehaviorSubject<boolean>(false);
  openSignInModal$ = this.openSignInModal.asObservable();

  userMetadata = new BehaviorSubject<IUserMetadata | null>(null);
  userMetadata$ = this.userMetadata.asObservable();

  // is the user logged in?
  isUserLoggedIn() {
    return this.httpClient.get<boolean>('/api/authentication/is-user-logged-in')
    .pipe(
      tap(() => this.signedIn.next(true)),
      catchError(() => {
        this.signedIn.next(false)
        return of(false)
      })
    );
  }

  signOut() {
    this.httpClient.get('/api/authentication/sign-out')
    .pipe(tap(() => this.signedIn.next(false)))
    .subscribe();
  }
}
