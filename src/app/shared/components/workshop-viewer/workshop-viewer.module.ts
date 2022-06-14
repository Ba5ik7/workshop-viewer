import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopViewerComponent } from './workshop-viewer.component';
import { WorkshopViewerService } from './workshop-viewer.service';
import { LiveExampleComponent } from './live-example/live-example.component';
import { CodeHighlighterModule } from '../code-highlighter/code-highlighter.module';
import { NextPageComponent } from './next-page/next-page.component';



@NgModule({
  declarations: [
    WorkshopViewerComponent,
    LiveExampleComponent,
    NextPageComponent
  ],
  exports: [WorkshopViewerComponent],
  imports: [
    CommonModule,
    CodeHighlighterModule
  ],
  providers: [WorkshopViewerService]
})
export class WorkshopViewerModule { }
