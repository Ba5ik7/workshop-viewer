import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, merge, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Section } from 'src/app/shared/interfaces/section.interface';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent implements OnInit, OnDestroy {

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
          categoryTitle: categories[params['section']].name ?? 'Categories',
          sectionTitle:sections[params['section']].sectionTitle ?? 'ERROR',
          headerSvgPath: sections[params['section']].headerSvgPath,
          navList: categories[params['section']]
        }
      }),
    )
    .subscribe(({ section, sectionTitle, categoryTitle, headerSvgPath, navList }) => {
      this.section = section;
      this.sectionTitle = sectionTitle;
      this.categoryTitle = categoryTitle;
      this.headerSvgPath = headerSvgPath;
      this.navList = navList;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
