import { Component, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, fromEvent, map, Observable, pairwise, scan, startWith } from 'rxjs';
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
    });

    const konamiCode: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

    const konamiCode$ = keyup$.pipe(
      map(event => event.keyCode),
      scan((acc: number[], curr: number) => {
        acc.push(curr);
        if (acc.length > 10) {
          acc.shift();
        }
        return acc;
      }, []),
      filter(sequence => sequence.join(',') === konamiCode.join(','))
    );
    
    konamiCode$.subscribe(() => {
      alert("Konami code entered!");
    });

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