import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopViewerComponent } from './workshop-viewer.component';
import { WorkshopViewerService } from './workshop-viewer.service';



@NgModule({
  declarations: [WorkshopViewerComponent],
  exports: [WorkshopViewerComponent],
  imports: [
    CommonModule,
  ],
  providers: [WorkshopViewerService]
})
export class WorkshopViewerModule { }
