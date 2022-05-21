import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { combineLatest, forkJoin, map, Observable, of, Subject, takeUntil } from 'rxjs';

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
  idTitle!: string;

  constructor(breakpoints: BreakpointObserver, private activatedRoute: ActivatedRoute) {
    this.isScreenSmall = breakpoints.observe(`(max-width: 959px)`)
    .pipe(map(breakpoint => breakpoint.matches));

    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((params) => {
      this.sectionTitle = params['section'] ?? 'ERROR';
      this.idTitle = params['id'] ?? 'categories';
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
