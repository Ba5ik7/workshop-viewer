import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-fab',
  templateUrl: './profile-fab.component.html',
  styleUrls: ['./profile-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
