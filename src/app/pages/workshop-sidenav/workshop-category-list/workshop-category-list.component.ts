import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-category-list',
  templateUrl: './workshop-category-list.component.html',
  styleUrls: ['./workshop-category-list.component.scss']
})
export class WorkshopCategoryListComponent implements OnInit {

  constructor(navigationService: NavigationService) {
    navigationService.categoryRouteSub.next('categories');
  }

  ngOnInit(): void {
  }

}
