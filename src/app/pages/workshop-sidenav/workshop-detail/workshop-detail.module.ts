import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { WorkshopViewerModule } from 'src/app/shared/components/workshop-viewer/workshop-viewer.module';
import { WorkshopDetailRoutingModule } from './workshop-detail-routing.module';
import { TableOfContentsModule } from 'src/app/shared/components/table-of-contents/table-of-contents.module';



@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule,
    WorkshopDetailRoutingModule,
    WorkshopViewerModule,
    TableOfContentsModule
  ]
})
export class WorkshopDetailModule { }
