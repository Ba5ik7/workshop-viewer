import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-category-list',
  templateUrl: './workshop-category-list.component.html',
  styleUrls: ['./workshop-category-list.component.scss']
})
export class WorkshopCategoryListComponent implements OnInit {

  destory: Subject<boolean> = new Subject();

  categories!: Observable<Category[]>;

  constructor(navigationService: NavigationService) {
    navigationService.categoryRouteSub.next('categories');
    this.categories = navigationService.categories$;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
