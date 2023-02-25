import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, lastValueFrom, Observable, OperatorFunction, pipe, Subject, UnaryFunction } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { Section } from '../../interfaces/section.interface';

// RXJS Doesn't have something to filter out null and undefined values
export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
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

  categoriesSub = new BehaviorSubject<Category[] | undefined>(undefined);
  categories$: Observable<any> = this.categoriesSub.asObservable();
  categories!: Category[];

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

  workshopDocumentsSub = new BehaviorSubject<any>(undefined);
  workshopDocuments$: Observable<Category[]> = this.workshopDocumentsSub.asObservable();

  workshopDocumentsViewReadySub = new Subject<HTMLElement>();
  workshopDocumentsViewReady$: Observable<HTMLElement> = this.workshopDocumentsViewReadySub.asObservable();


  constructor(private httpClient: HttpClient) { }

  async initializeAppData(): Promise<void> {

    await this.getSections();
    // await this.getCategories('angular');

    // from(this.getSections$).subscribe((sections) => {
    //   console.log({
    //     sections
    //   });
    //   this.setSections(sections);
    // });

    this.sectionRoute$
    .pipe(filterNullish())
    .subscribe((section) => this.setSectionProperties(section));
    
    this.categoryRoute$
    .pipe(filterNullish())
    .subscribe((category) => {
      this.categoryRoute = category;
      this.setCategoryProperties(category)
    });
  }

  private async getSections(): Promise<void> {
    return await lastValueFrom(this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections'))
    .then((sections) => this.setSections(sections));
  }

  // private getSections$ = this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections');

  private async getCategories(currentSection: string): Promise<void> {
    const params = new HttpParams().set('section', currentSection);
    return await lastValueFrom(this.httpClient
    .get<Category[]>('/api/navigation/categories', { params }))
    .then((categories) => this.setCategories(categories));
  }

  private async setSectionProperties(section: string): Promise<void> {
    await this.getCategories(section);
    
    this.sectionRoute = section;
    this.sectionSub.next(this.sections[section]);  
    this.sectionTitleSub.next(this.sections[section].sectionTitle);
    this.headerSvgPathSub.next(this.sections[section].headerSvgPath);
    this.sectionNavListSub.next(this.categories);
  }

  private setCategoryProperties(category: string): void {
    // When the pages frist loads we need to wait for the categories to be set
    // Once they are this method will be call again.
    if(this.categories === undefined) return;
    const currentCategoryObject = this.categories.find(({ id }) => id === category);
    this.workshopDocumentsSub.next(currentCategoryObject?.workshopDocuments);
    this.categorySub.next(currentCategoryObject);
    this.categoryTitleSub.next(currentCategoryObject?.name ?? 'Categories');
  }

  public setCategories(categories: Category[]): void {
    this.categories = categories;
    this.categoriesSub.next(categories);
    this.setCategoryProperties(this.categoryRoute);
  }
  
  public setSections(sections: { [key: string]: Section; }): void {
    this.sections = sections;
    this.sectionsSub.next(sections);
  }
}
