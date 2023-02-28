import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserMetadata } from '../../interfaces/user-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  signedIn = new BehaviorSubject<boolean>(false);
  signedIn$ = this.signedIn.asObservable();

  openSignInModal = new BehaviorSubject<boolean>(false);
  openSignInModal$ = this.openSignInModal.asObservable();

  userMetadata = new BehaviorSubject<IUserMetadata | null>(null);
  userMetadata$ = this.userMetadata.asObservable();

  hasAccessToken() {
    const accessToken = getCookie('access_token');
    return getCookie('accessToken') !== '';
  }
}

// Really just need to check if the access token is set
// https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname: string) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  console.log('getCookie', decodedCookie);
  
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};