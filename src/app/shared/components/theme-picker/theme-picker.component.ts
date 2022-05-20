import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemePickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
