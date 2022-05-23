import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinct, map, merge, Observable, Subject, takeUntil, tap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent implements OnDestroy {

  isScreenSmall: Observable<boolean>;
  destory: Subject<boolean> = new Subject();

  section!: Observable<string>;
  sectionTitle!: Observable<string>;
  categoryTitle!: Observable<string>;
  headerSvgPath!: Observable<string>;
  navList!: Observable<any[]>;

  constructor(breakpoints: BreakpointObserver,
              activatedRoute: ActivatedRoute,
              navigationService: NavigationService) {

    this.isScreenSmall = breakpoints.observe(`(max-width: 959px)`)
    .pipe(takeUntil(this.destory), map(breakpoint => breakpoint.matches));

    activatedRoute.params
    .pipe(takeUntil(this.destory), distinct())
    .subscribe(params => navigationService.sectionRouteSub.next(params['section']));

    this.section = navigationService.sectionRoute$;
    this.navList = navigationService.sectionNavList$;
    this.sectionTitle = navigationService.sectionTitle$;
    this.headerSvgPath = navigationService.headerSvgPath$;
    this.categoryTitle = navigationService.categoryTitle$;
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
