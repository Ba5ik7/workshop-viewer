import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, Observable, tap } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Section } from '../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sectionsSubject = new BehaviorSubject<{ [key: string]: Section } | undefined>(undefined);
  sections$: Observable<any> = this.sectionsSubject.asObservable();
  sections!: { [key: string]: Section };

  categoriesSubject = new BehaviorSubject<{ [key: string]: Category[] } | undefined>(undefined);
  categories$: Observable<any> = this.categoriesSubject.asObservable();
  categories!: { [key: string]: Category[] };

  currentSectionSubject = new BehaviorSubject<any>(undefined);
  currentSection$: Observable<any> = this.currentSectionSubject.asObservable();
  
  currentCategorySubject = new BehaviorSubject<any>(undefined);
  currentCategory$: Observable<any> = this.currentCategorySubject.asObservable();
  
  currentSectionRouteSubject = new BehaviorSubject<string | undefined>(undefined);
  currentSectionRoute$: Observable<any> = this.currentSectionRouteSubject.asObservable();
  
  currentCategoryRouteSubject = new BehaviorSubject<string | undefined>(undefined);
  currentCategoryRoute$: Observable<any> = this.currentCategoryRouteSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  initializeAppData(): void {
    this.getSections();
    this.getCategories();

    combineLatest([
      this.currentSectionRoute$,
      this.currentCategoryRoute$
    ])
    .subscribe(([section, category]) => {
      this.currentSectionSubject
      .next(this.sections ? this.sections[section] : {});

      this.currentCategorySubject
      .next(this.categories ? this.categories[section].filter(({ id }) => id === category) : {});
    })
  }

  getSections(): void {
    this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections')
    .subscribe((res) => {
      this.sections = res;
      this.sectionsSubject.next(res)
    });
  }

  getCategories(): void {
    this.httpClient.get<{ [key: string]: Category[] }>('/api/navigation/categories')
    .subscribe((res) => {
      this.categories = res;
      this.categoriesSubject.next(res)
    });
  }
}
