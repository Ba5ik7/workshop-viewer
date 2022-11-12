import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, concatMap, of, Subject, takeUntil, tap } from 'rxjs';
import { TableOfContentsComponent } from 'src/app/shared/components/table-of-contents/table-of-contents';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent implements OnDestroy {

  @ViewChild('toc') tableOfContents!: TableOfContentsComponent;

  destory: Subject<boolean> = new Subject();
  workshopDocument!: string;
  workshopDocumentsLength: number = 0;
  hasMoreThanOneDocument: boolean = false;
  workshopDocuments!: Category[];
  hasWorkshopId: boolean = false;

  paginatorCurrentIndex = new BehaviorSubject<number>(0);
  paginatorCurrentIndex$ = this.paginatorCurrentIndex.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private router: Router) {

      console.log('WorkshopDetailComponent constructor');
      

    combineLatest({ params: this.activatedRoute.params, index: this.paginatorCurrentIndex$ })
    .pipe(
      tap(({ params }) => this.navigationService.categoryRouteSub.next(params['categoryId'])),
      concatMap(({ params, index }) => (
        combineLatest({
          index: of(index),
          params: of(params),
          workshopDocuments: this.navigationService.workshopDocuments$
        })
      )),
      takeUntil(this.destory),
    )
    .subscribe(({ params, workshopDocuments, index }) => {
      // console.log({ params, workshopDocuments, index });
      if(!workshopDocuments) return;

      this.workshopDocuments = workshopDocuments;
      if(params['workshopId']) {
        console.log('has workshopId', params['workshopId']);
        
        this.hasWorkshopId = true;
        this.workshopDocument = params['workshopId'];
      } else {
        console.log('no workshopId', index);
        
        this.workshopDocument = workshopDocuments[index]._id!;
      }

      // console.log('workshopDocuments',this.workshopDocument);
      
      this.hasMoreThanOneDocument = workshopDocuments.length > 1;
      this.workshopDocumentsLength = workshopDocuments.length;
    });

    this.navigationService.workshopDocumentsViewReady$
    .pipe(takeUntil(this.destory))
    .subscribe((html) => this.updateTableOfContents('HELLO WORLD', html))  
  }

  ngOnDestroy(): void {    
    console.log('WorkshopDetailComponent ngOnDestroy');
    
    this.destory.next(true);
  }

  updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {    
    if (this.tableOfContents) {
      this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
      this.tableOfContents.updateScrollPosition();
    }
  }

  pageEventChange({ pageIndex }: PageEvent) {
    this.paginatorCurrentIndex.next(pageIndex);
    console.log(this.hasWorkshopId ? '../': './', this.workshopDocuments[pageIndex]._id, pageIndex);
    this.router.navigate([this.hasWorkshopId ? '../': './', this.workshopDocuments[pageIndex]._id], { relativeTo: this.activatedRoute });
  }
}
