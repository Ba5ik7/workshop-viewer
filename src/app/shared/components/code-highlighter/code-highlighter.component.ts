import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';

@Component({
  selector: 'app-code-highlighter',
  templateUrl: './code-highlighter.component.html',
  styleUrls: ['./code-highlighter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeHighlighterComponent {

  @Input() code: string = '';

  themeMap: Map<string, string> = new Map([
    ['gradient-dark', 'assets/css/highlight-themes/gradient-dark.css'],
    ['github-dark', 'assets/css/highlight-themes/github-dark.css'],
    ['github', 'assets/css/highlight-themes/github.css']
  ]);

  constructor(private hljsLoader: HighlightLoader) { }

  changeTheme(themeColor: string): void {
    const themePath = this.themeMap.get(themeColor) ?? 'gradient-dark';
    this.hljsLoader.setTheme(themePath);
  }
}
