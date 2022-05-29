import { Component, ViewEncapsulation } from '@angular/core';
import { IndexDbService } from './shared/services/indexed-db/indexed-db.service';
import { NavigationService } from './shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'workshop-viewer';

  constructor(navigationService: NavigationService, indexDbService: IndexDbService) {
    navigationService.initializeAppData();
    indexDbService.initializeAppData();
  }
}
