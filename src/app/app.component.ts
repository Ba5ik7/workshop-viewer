import { Component, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, pairwise, startWith } from 'rxjs';
import { NavigationService } from './shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'workshop-viewer';

  constructor(navigationService: NavigationService, private router: Router) {
    navigationService.initializeAppData();

    this.router.events
    .pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(''),
      pairwise()
    )
    .subscribe(([fromUrl, toUrl]) => {
        resetScrollPosition();
    })
  }
}


function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = window.document.querySelector('.mat-drawer-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}