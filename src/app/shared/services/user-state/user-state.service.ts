import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor() { }

  user!: IUser;
  setUser(user: IUser) {
    this.user = user;
    console.log({ state: this });
  }
}
