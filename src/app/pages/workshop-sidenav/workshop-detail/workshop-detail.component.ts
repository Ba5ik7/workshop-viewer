import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinct, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss']
})
export class WorkshopDetailComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => this.navigationService.categoryRouteSub.next(data['categoryId']));
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
