import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Section } from '../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sectionsSubject = new BehaviorSubject<{ [key: string]: Section } | undefined>(undefined);
  sections$: Observable<any> = this.sectionsSubject.asObservable();

  categoriesSubject = new BehaviorSubject<{ [key: string]: Category[] } | undefined>(undefined);
  categories$: Observable<any> = this.categoriesSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  initializeAppData(): void {
    this.getSections();
  }

  getSections(): void {
    this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections')
    .subscribe((res) => this.sectionsSubject.next(res));
  }

  getCategories(): void {
    this.httpClient.get<{ [key: string]: Category[] }>('/api/navigation/categories')
    .subscribe((res) => this.categoriesSubject.next(res));
  }
}
