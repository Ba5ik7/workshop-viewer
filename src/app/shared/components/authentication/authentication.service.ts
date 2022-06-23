import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signIn(value: any) {
    console.log(value);
  }
  
  createAccount(value: any) {
    console.log(value);
    this.httpClient.post('/api/auth/local/create-account', value)
    .pipe(catchError((error: HttpErrorResponse) => this.handleCreateAccountError(error)))
    .subscribe((res) => {
      console.log(res);      
    });
  }

  handleCreateAccountError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(error);
    return of(error)
  }

}
