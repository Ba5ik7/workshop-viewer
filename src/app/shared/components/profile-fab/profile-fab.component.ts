import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-fab',
  template: `<button mat-icon-button color="primary" [matMenuTriggerFor]="menu">
  <mat-icon>account_circle</mat-icon>
</button>
<mat-menu #menu>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
