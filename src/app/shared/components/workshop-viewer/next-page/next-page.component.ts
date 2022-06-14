import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextPageComponent implements OnInit {

  title: string = 'Test';
  icon: string = 'Test';
  clickEvent: string = 'Test';

  constructor() { }

  ngOnInit(): void {
  }

  handleNextClick(clickEvent: any) {
    console.log(clickEvent);
  }

}
