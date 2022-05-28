import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss']
})
export class WorkshopDetailComponent implements OnDestroy {

  destory: Subject<boolean> = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private navigationService: NavigationService) {
    console.log('constructor');
    
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => this.navigationService.categoryRouteSub.next(data['categoryId']));
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
