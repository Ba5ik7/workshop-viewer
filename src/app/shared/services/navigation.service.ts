import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, lastValueFrom, Observable, OperatorFunction, pipe, tap, UnaryFunction } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Section } from '../interfaces/section.interface';

// RXJS Doesn't have something to filter out null and undefined values
function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(
    filter(x => x != null) as OperatorFunction<T | null |  undefined, T>
  );
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sectionsSub = new BehaviorSubject<{ [key: string]: Section } | undefined>(undefined);
  sections$: Observable<any> = this.sectionsSub.asObservable();
  sections!: { [key: string]: Section };

  categoriesSub = new BehaviorSubject<{ [key: string]: Category[] } | undefined>(undefined);
  categories$: Observable<any> = this.categoriesSub.asObservable();
  categories!: { [key: string]: Category[] };

  sectionSub = new BehaviorSubject<any>(undefined);
  section$: Observable<any> = this.sectionSub.asObservable();
  
  categorySub = new BehaviorSubject<any>(undefined);
  category$: Observable<any> = this.categorySub.asObservable();
  
  sectionRouteSub = new BehaviorSubject<string | undefined>(undefined);
  sectionRoute$: Observable<any> = this.sectionRouteSub.asObservable();
  sectionRoute: string = '';

  categoryRouteSub = new BehaviorSubject<string | undefined>(undefined);
  categoryRoute$: Observable<any> = this.categoryRouteSub.asObservable();
  categoryRoute: string = '';

  sectionNavListSub = new BehaviorSubject<any>(undefined);
  sectionNavList$: Observable<any> = this.sectionNavListSub.asObservable();

  sectionTitleSub = new BehaviorSubject<any>(undefined);
  sectionTitle$: Observable<any> = this.sectionTitleSub.asObservable();

  headerSvgPathSub = new BehaviorSubject<any>(undefined);
  headerSvgPath$: Observable<any> = this.headerSvgPathSub.asObservable();

  categoryTitleSub = new BehaviorSubject<any>(undefined);
  categoryTitle$: Observable<any> = this.categoryTitleSub.asObservable();


  constructor(private httpClient: HttpClient) { }

  async initializeAppData(): Promise<void> {
    await this.getSections();
    await this.getCategories();

    this.sectionRoute$
    .pipe(filterNullish())
    .subscribe((section) => this.setSectionProperties(section));
    
    this.categoryRoute$
    .pipe(filterNullish())
    .subscribe((category) => this.setCategoryProperties(category));
  }

  private async getSections(): Promise<void> {
    return await lastValueFrom(this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections'))
    .then((res) => {
      this.sections = res;
      this.sectionsSub.next(res);
    });
  }

  private async getCategories(): Promise<void> {
    return await lastValueFrom(this.httpClient.get<{ [key: string]: Category[] }>('/api/navigation/categories'))
    .then((res) => {
      this.categories = res;
      this.categoriesSub.next(res);
    });
  }

  private setSectionProperties(section: string): void {
    this.sectionRoute = section;
    this.sectionSub.next(this.sections[section]);    
    this.sectionNavListSub.next(this.categories[section]);
    this.sectionTitleSub.next(this.sections[section].sectionTitle);
    this.headerSvgPathSub.next(this.sections[section].headerSvgPath);
  }

  private setCategoryProperties(category: string): void {
    const categoryObject = this.categories[this.sectionRoute].find(({ id }) => id === category);
    this.categoryRoute = category;
    this.categorySub.next(categoryObject);
    this.categoryTitleSub.next(categoryObject?.name ?? 'Categories');
  }
}
