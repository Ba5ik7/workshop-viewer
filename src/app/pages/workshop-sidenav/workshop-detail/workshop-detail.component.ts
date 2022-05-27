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

  constructor(private activatedRoute: ActivatedRoute, private navigationService: NavigationService) {
    console.log('constructor');
    
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => this.navigationService.categoryRouteSub.next(data['categoryId']));
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    
  }

  ngOnDestroy(): void {
    console.log('Destoryed');
    
    this.destory.next(true);
  }
}
