import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent implements OnInit {

  isScreenSmall: Observable<boolean>;

  constructor(breakpoints: BreakpointObserver) {
    this.isScreenSmall = breakpoints.observe(`(max-width: 959px)`)
    .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit(): void {
  }

}
