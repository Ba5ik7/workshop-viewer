import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopViewerComponent } from './workshop-viewer.component';
import { WorkshopViewerService } from './workshop-viewer.service';
import { LiveExampleComponent } from './live-example/live-example.component';



@NgModule({
  declarations: [WorkshopViewerComponent, LiveExampleComponent],
  exports: [WorkshopViewerComponent],
  imports: [
    CommonModule,
  ],
  providers: [WorkshopViewerService]
})
export class WorkshopViewerModule { }
