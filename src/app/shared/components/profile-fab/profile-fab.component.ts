import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'profile-fab',
  template: `<button mat-icon-button color="accent" [matMenuTriggerFor]="menu">
  <mat-icon>account_circle</mat-icon>
</button>
<mat-menu #menu xPosition="before">
<button mat-menu-item>
  <mat-icon>manage_accounts</mat-icon>
    <span>Account</span>
  </button>
  <button mat-menu-item>
    <mat-icon>settings</mat-icon>
    <span>Settings</span>
  </button>
  <button mat-menu-item>
    <mat-icon>logout</mat-icon>
    <span>Sign Out</span>
  </button>
</mat-menu>`,
  styleUrls: ['./profile-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileFabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
