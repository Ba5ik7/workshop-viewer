import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemePickerService } from './theme-picker.service';

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

  constructor(
      private themePickerService: ThemePickerService,
      iconRegistry: MatIconRegistry,
      sanitizer: DomSanitizer
  ) {
    const themeExampleIconURL = sanitizer.bypassSecurityTrustResourceUrl(ThemePickerService.THEME_EXAMPLE_ICON);
    iconRegistry.addSvgIcon('theme-example', themeExampleIconURL);

    const themeName = themePickerService.getStoredThemeName();
    this.selectTheme(themeName !== ThemePickerService.NOT_FOUND ? themeName : ThemePickerService.DEFAULT_THEME);
  }

  ngOnInit(): void { }

  selectTheme(theme: string): void {
    console.log(theme);
    this.themePickerService.setStyle('theme', `${theme}.css`);
    this.themePickerService.storeTheme(theme);
  }

}
