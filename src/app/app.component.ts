import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationService } from './shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'workshop-viewer';

  constructor(navigationService: NavigationService) {
    navigationService.initializeAppData();
  }
}
