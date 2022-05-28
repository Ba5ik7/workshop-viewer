import { Injectable } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';


export interface LocalStorage {
  key: string,
  value: any
}


@Injectable({
  providedIn: 'root'
})
export class WebstorageService {

  LOCALSTORAGE_ITEM_NOT_FOUND_ERROR = 'LOCALSTORAGE_ITEM_NOT_FOUND_ERROR';
  LOCALSTORAGE_MAX_SIZE_REACHED = 'LOCALSTORAGE_MAX_SIZE_REACHED';
  

  constructor() { }

  localStorageValueChangeSub: Subject<LocalStorage> = new Subject();
  localStorageValueChange$: Observable<LocalStorage> = this.localStorageValueChangeSub.asObservable();

  getLocalStorageSize(): any {
    return new Blob(Object.values(localStorage)).size;
  }

  getLocalstorageItem(key: string): LocalStorage {
    const item = { key, value: localStorage.getItem(key) ?? this.LOCALSTORAGE_ITEM_NOT_FOUND_ERROR };
    this.localStorageValueChangeSub.next(item);
    return item;
  }
  
  setLocalstorageItem({ key, value }: LocalStorage): void {
    localStorage.setItem(key, value);
    this.localStorageValueChangeSub.next({ key, value });
  }
  
  removeLocalstorageItem(key: string): void {
    const item = { key, value: localStorage.getItem(key) ?? this.LOCALSTORAGE_ITEM_NOT_FOUND_ERROR };
    item.value !== this.LOCALSTORAGE_ITEM_NOT_FOUND_ERROR && localStorage.removeItem(key); 
    this.localStorageValueChangeSub.next(item);
  }

  private clearLocalstorage(): void {
    localStorage.clear();
  }
}
