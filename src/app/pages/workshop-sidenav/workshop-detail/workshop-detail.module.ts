import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { WorkshopViewerModule } from 'src/app/shared/components/workshop-viewer/workshop-viewer.module';
import { WorkshopDetailRoutingModule } from './workshop-detail-routing.module';



@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule,
    WorkshopDetailRoutingModule,
    WorkshopViewerModule
  ]
})
export class WorkshopDetailModule { }
