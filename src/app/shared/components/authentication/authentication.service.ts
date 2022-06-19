import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    this.httpClient.post('/api/auth/local/create-account', value).subscribe((res) => {
      console.log(res);
      
    });
  }
}
