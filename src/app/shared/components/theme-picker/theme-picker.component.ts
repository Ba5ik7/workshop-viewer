import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SiteTheme } from './site-theme';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemePickerComponent implements OnInit {

  themes: Map<string, SiteTheme> = new Map([
    ['deeppurple-amber', { displayName: 'Deep Purple & Amber', isDefault: false }],
    ['indigo-pink', { displayName: 'Indigo & Pink', isDefault: true }],
    ['pink-bluegrey', { displayName: 'Pink & Blue-grey', isDefault: false }],
    ['purple-green', { displayName: 'Purple & Green', isDefault: false }]
  ]);

  constructor() { }

  ngOnInit(): void { }

  selectTheme(themeName: string) {
    const theme = this.themes.get(themeName);
    console.log(theme);
  }

}
