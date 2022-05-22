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

  sectionTitle!: string;
  categoryTitle!: string;
  headerSvgPath!: string;

  constructor(breakpoints: BreakpointObserver, activatedRoute: ActivatedRoute, navigationService: NavigationService) {
    this.isScreenSmall = breakpoints.observe(`(max-width: 959px)`)
    .pipe(map(breakpoint => breakpoint.matches));

    // activatedRoute.params
    // .pipe(takeUntil(this.destory))
    // .subscribe((params) => {
    //   this.sectionTitle = params['section'] ?? 'ERROR';
    //   this.idTitle = params['id'] ?? 'categories';
    // });

    combineLatest([
      activatedRoute.params,
      navigationService.sections$,
      navigationService.categories$])
    .pipe(
      takeUntil(this.destory),
      map(([params, sections, categories]) => {
        return {
          categoryTitle: categories[params['section']].name ?? 'Categories',
          sectionTitle:sections[params['section']].sectionTitle ?? 'ERROR',
          headerSvgPath: sections[params['section']].headerSvgPath 
        }
      }),
    )
    .subscribe(({ sectionTitle, categoryTitle, headerSvgPath }) => {
      this.sectionTitle = sectionTitle;
      this.categoryTitle = categoryTitle;
      this.headerSvgPath = headerSvgPath;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
