import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopViewerComponent } from './workshop-viewer.component';



@NgModule({
  declarations: [WorkshopViewerComponent],
  exports: [WorkshopViewerComponent],
  imports: [
    CommonModule
  ]
})
export class WorkshopViewerModule { }
