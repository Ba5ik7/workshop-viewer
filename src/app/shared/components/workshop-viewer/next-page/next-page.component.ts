import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
