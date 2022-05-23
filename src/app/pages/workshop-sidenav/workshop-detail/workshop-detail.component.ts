import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinct, Subject } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss']
})
export class WorkshopDetailComponent implements OnInit,OnDestroy {

  destory: Subject<boolean> = new Subject();

  constructor(activatedRoute: ActivatedRoute, navigationService: NavigationService) {
    activatedRoute.params.subscribe((data) => {
      navigationService.categoryRouteSub.next(data['categoryId']);
    });

    navigationService.category$
    .pipe(distinct())
    .subscribe((data) => {
      // console.log(data);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
