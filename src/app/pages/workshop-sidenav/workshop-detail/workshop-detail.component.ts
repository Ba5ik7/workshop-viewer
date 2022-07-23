import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  workshopDocuments!: Observable<Category[]>

  constructor(private activatedRoute: ActivatedRoute, private navigationService: NavigationService) {    
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => {
      this.navigationService.categoryRouteSub.next(data['categoryId'])
    });

    this.workshopDocuments = navigationService.workshopDocuments$;
    this.navigationService.workshopDocumentsViewReady$
    .pipe(takeUntil(this.destory))
    .subscribe((html) => this.updateTableOfContents('HELLO WORLD', html))
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
}
