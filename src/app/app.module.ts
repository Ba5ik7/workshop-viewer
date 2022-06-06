import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';

import { HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          html: () => import('highlight.js/lib/languages/xml')
        },
        themePath: 'assets/css/highlightjs-themes/gradient-dark.css'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
