import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemePickerComponent implements OnInit {

  themes: Map<string, string> = new Map([
    ['deeppurple-amber', 'Deep Purple & Amber'],
    ['indigo-pink', 'Indigo & Pink'],
    ['pink-bluegrey', 'Pink & Blue-grey'],
    ['purple-green', 'Purple & Green']
  ]);

  constructor() { }

  ngOnInit(): void { }

  selectTheme(theme: string) {
    console.log(theme);
  }

}
