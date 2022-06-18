import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent implements OnDestroy {

  destory: Subject<boolean> = new Subject();
  workshopDocuments!: Observable<string[]>

  constructor(private activatedRoute: ActivatedRoute, private navigationService: NavigationService) {    
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => {
      this.navigationService.categoryRouteSub.next(data['categoryId'])
    });

    this.workshopDocuments = navigationService.workshopDocuments$;
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
