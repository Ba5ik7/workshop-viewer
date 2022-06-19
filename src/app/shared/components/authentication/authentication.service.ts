import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  signIn(value: any) {
    console.log(value);
  }
  createAccount(value: any) {
    console.log(value);
  }

  constructor() { }
}
