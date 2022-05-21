import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'workshop-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'workshop-viewer';
}
