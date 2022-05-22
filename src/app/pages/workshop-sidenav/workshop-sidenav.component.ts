import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, merge, Observable, Subject, takeUntil, tap } from 'rxjs';
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

  section!: string;
  sectionTitle!: string;
  categoryTitle!: string;
  headerSvgPath!: string;
  navList!: any[];

  constructor(breakpoints: BreakpointObserver, activatedRoute: ActivatedRoute, navigationService: NavigationService) {
    this.isScreenSmall = breakpoints.observe(`(max-width: 959px)`)
    .pipe(map(breakpoint => breakpoint.matches));

    combineLatest([
      activatedRoute.params,
      navigationService.sections$,
      navigationService.categories$])
    .pipe(
      takeUntil(this.destory),
      map(([params, sections, categories]) => {
        return {
          section: params['section'], 
          sectionTitle:sections[params['section']].sectionTitle ?? 'ERROR',
          headerSvgPath: sections[params['section']].headerSvgPath,
          navList: categories[params['section']]
        }
      }),
    )
    .subscribe(({ section, sectionTitle, headerSvgPath, navList }) => {
      this.section = section;
      this.sectionTitle = sectionTitle;
      this.headerSvgPath = headerSvgPath;
      this.navList = navList;
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  updateCategory(categoryName: string): void {
    this.categoryTitle = categoryName;
  }
}
