import { AfterViewInit, Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { TableOfContentsComponent } from 'src/app/shared/components/table-of-contents/table-of-contents';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService, filterNullish } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent implements OnDestroy, AfterViewInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private router: Router) { }

  @ViewChild('toc', { static: true }) tableOfContents!: TableOfContentsComponent;
  @ViewChild('paginator') paginator!: MatPaginator;

  destory: Subject<boolean> = new Subject();
  workshopDocument!: string;
  workshopDocumentsLength: number = 0;
  hasMoreThanOneDocument: boolean = false;
  workshopDocuments!: Category[];
  hasWorkshopId: boolean = false;

  ngAfterViewInit(): void {
    this.activatedRoute.params
    .pipe(
      filterNullish(),
      tap((params) => this.navigationService.categoryRouteSub.next(params['categoryId'])),
      switchMap((params) => (
        combineLatest({
          params: of(params),
          workshopDocuments: this.navigationService.workshopDocuments$
        })
      )),
      takeUntil(this.destory),
    )
    .subscribe(({ params, workshopDocuments }) => {
      if(!workshopDocuments) return;

      this.workshopDocuments = workshopDocuments;
      if(params['workshopId']) {
        this.hasWorkshopId = true;
        this.workshopDocument = params['workshopId'];
        this.setPaginatorIndex();
      } else { 
        this.workshopDocument = workshopDocuments[0]._id!;
      }

      this.hasMoreThanOneDocument = workshopDocuments.length > 1;
      this.workshopDocumentsLength = workshopDocuments.length;
    });

    this.navigationService.workshopDocumentsViewReady$
    .pipe(takeUntil(this.destory))
    .subscribe((html) => this.updateTableOfContents('HELLO WORLD', html));    
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {    
    if (this.tableOfContents) {
      this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
      this.tableOfContents.updateScrollPosition();
    }
  }

  pageEventChange({ pageIndex }: PageEvent) {
    this.router.navigate([this.hasWorkshopId ? '../': './', this.workshopDocuments[pageIndex]._id], { relativeTo: this.activatedRoute });
  }

  setPaginatorIndex() {
    requestAnimationFrame(() => {
      this.paginator.pageIndex = this.workshopDocuments.findIndex((workshopDocument) => workshopDocument._id === this.workshopDocument);
    });
  }
}
